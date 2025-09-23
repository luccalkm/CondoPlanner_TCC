param (
    [string]$solutionName = "MyApp"
)

# Cria a solution
dotnet new sln -n $solutionName
Set-Location $solutionName

# Cria os projetos
dotnet new classlib -n "Domain"
dotnet new classlib -n "Application"
dotnet new classlib -n "Infrastructure"
dotnet new webapi   -n "WebApi" --no-https

# Adiciona os projetos à solution
dotnet sln add "Domain/Domain.csproj"
dotnet sln add "Application/Application.csproj"
dotnet sln add "Infrastructure/Infrastructure.csproj"
dotnet sln add "WebApi/WebApi.csproj"

# Referências entre projetos
dotnet add "Application/Application.csproj" reference "Domain/Domain.csproj"
dotnet add "Infrastructure/Infrastructure.csproj" reference "Application/Application.csproj"
dotnet add "Infrastructure/Infrastructure.csproj" reference "Domain/Domain.csproj"
dotnet add "WebApi/WebApi.csproj" reference "Application/Application.csproj"
dotnet add "WebApi/WebApi.csproj" reference "Infrastructure/Infrastructure.csproj"

Write-Host "✅ Clean Architecture solution criada com sucesso!"

