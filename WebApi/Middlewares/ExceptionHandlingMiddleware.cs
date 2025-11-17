using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Shared.Exceptions;

namespace WebApi.Middlewares
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;

        public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleAsync(context, ex);
            }
        }

        private async Task HandleAsync(HttpContext context, Exception ex)
        {
            var correlationId = Guid.NewGuid().ToString("N");
            HttpStatusCode status;
            string message;
            string? detail = null;

            switch (ex)
            {
                case UserFriendlyException ufe:
                    status = HttpStatusCode.BadRequest;
                    message = ufe.Message;
                    break;
                default:
                    status = HttpStatusCode.InternalServerError;
                    message = "Erro interno inesperado.";
                    detail = ex.Message;
                    _logger.LogError(ex, "Unhandled exception (CorrelationId={CorrelationId})", correlationId);
                    break;
            }

            var problem = new
            {
                type = $"https://httpstatuses.com/{(int)status}",
                title = message,
                status = (int)status,
                correlationId,
                detail
            };

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)status;
            var json = JsonSerializer.Serialize(problem);
            await context.Response.WriteAsync(json);
        }
    }
}