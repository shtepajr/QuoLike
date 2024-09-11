FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["QuoLike.Client/nuget.config", "QuoLike.Client/"]
COPY ["QuoLike.Server/QuoLike.Server.csproj", "QuoLike.Server/"]
COPY ["QuoLike.Client/quolike.client.esproj", "Quolike.Client/"]
RUN dotnet restore "./QuoLike.Server/QuoLike.Server.csproj"
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs
COPY . .
WORKDIR "/src/QuoLike.Server"
RUN dotnet build "./QuoLike.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./QuoLike.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "QuoLike.Server.dll"]