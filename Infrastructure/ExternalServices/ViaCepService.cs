using Application.DTOs.Endereco;
using Application.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Logging;
using Shared.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace Infrastructure.ExternalServices
{
    public class ViaCepService : IViaCepService
    {
        private readonly HttpClient _httpClient;
        private readonly IDistributedCache _cache;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ILogger<ViaCepService> _logger;

        private static readonly SemaphoreSlim _lock = new(1, 1);
        private static DateTime _lastRequestTime = DateTime.MinValue;

        private static readonly TimeSpan _cacheDuration = TimeSpan.FromHours(1);
        private const int MaxCachedCepsPerClient = 20;

        public ViaCepService(
            HttpClient httpClient,
            IDistributedCache distributedCache,
            IHttpContextAccessor httpContextAccessor,
            ILogger<ViaCepService> logger)
        {
            _httpClient = httpClient;
            _cache = distributedCache;
            _httpContextAccessor = httpContextAccessor;
            _logger = logger;
        }

        public async Task<EnderecoDto?> GetAddressByCepAsync(string cep)
        {
            if (string.IsNullOrWhiteSpace(cep))
                return null;

            cep = new string(cep.Where(char.IsDigit).ToArray());
            if (cep.Length != 8)
                return null;

            string clientId = GetClientId();
            string cacheKey = $"viaCep:{clientId}:{cep}";

            try
            {
                var cachedJson = await _cache.GetStringAsync(cacheKey);
                if (cachedJson != null)
                {
                    var cachedEndereco = JsonSerializer.Deserialize<EnderecoDto>(cachedJson);
                    if (cachedEndereco != null)
                        return cachedEndereco;
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Falha ao ler cache de CEP {Cep}", cep);
            }

            await _lock.WaitAsync();
            try
            {
                var elapsed = DateTime.UtcNow - _lastRequestTime;
                if (elapsed.TotalMilliseconds < 200)
                    await Task.Delay(200 - (int)elapsed.TotalMilliseconds);
                _lastRequestTime = DateTime.UtcNow;
            }
            finally
            {
                _lock.Release();
            }

            var response = await _httpClient.GetAsync($"https://viacep.com.br/ws/{cep}/json/");
            if (!response.IsSuccessStatusCode)
                return null;

            ViaCepResponse result;
            try
            {
                result = await response.Content.ReadFromJsonAsync<ViaCepResponse>();
            }
            catch
            {
                throw new UserFriendlyException($"O CEP informado não é válido.");
            }

            if (result == null || result.Erro)
                return null;

            var endereco = new EnderecoDto
            {
                Cep = result.Cep,
                Logradouro = result.Logradouro,
                Bairro = result.Bairro,
                Cidade = result.Localidade,
                Estado = result.Uf,
                Complemento = result.Complemento ?? string.Empty
            };

            try
            {
                var options = new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = _cacheDuration
                };

                var json = JsonSerializer.Serialize(endereco);
                await _cache.SetStringAsync(cacheKey, json, options);

                await MaintainRecentCepListAsync(clientId, cep);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Falha ao gravar cache de CEP {Cep}", cep);
            }

            return endereco;
        }

        private string GetClientId()
        {
            var user = _httpContextAccessor.HttpContext?.User?.Identity?.Name;
            if (!string.IsNullOrEmpty(user))
                return user;

            var ip = _httpContextAccessor.HttpContext?.Connection?.RemoteIpAddress?.ToString();
            return ip ?? "anon";
        }

        private async Task MaintainRecentCepListAsync(string clientId, string newCep)
        {
            string listKey = $"viaCep:{clientId}:list";

            try
            {
                var json = await _cache.GetStringAsync(listKey);
                var ceps = string.IsNullOrWhiteSpace(json)
                    ? new List<string>()
                    : JsonSerializer.Deserialize<List<string>>(json) ?? new List<string>();

                ceps.Remove(newCep);
                ceps.Insert(0, newCep);

                if (ceps.Count > MaxCachedCepsPerClient)
                    ceps = ceps.Take(MaxCachedCepsPerClient).ToList();

                await _cache.SetStringAsync(
                    listKey,
                    JsonSerializer.Serialize(ceps),
                    new DistributedCacheEntryOptions
                    {
                        AbsoluteExpirationRelativeToNow = _cacheDuration
                    });
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Falha ao atualizar lista de CEPs recentes para o cliente {ClientId}", clientId);
            }
        }
    }
}
