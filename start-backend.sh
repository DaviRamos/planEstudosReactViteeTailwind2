#!/bin/bash

# Script para iniciar apenas o backend .NET

echo "🔧 Iniciando Backend .NET WebAPI"
echo ""

cd backend/TaskFlow.API

# Verificar se as dependências foram restauradas
if [ ! -d "obj" ]; then
    echo "📦 Restaurando dependências..."
    dotnet restore
fi

# Verificar se já existem migrations
if ! dotnet ef migrations list > /dev/null 2>&1; then
    echo "📝 Criando migrations..."
    dotnet ef migrations add InitialCreate
fi

echo "🗄️ Aplicando migrations..."
dotnet ef database update

echo "▶️ Iniciando servidor..."
dotnet run

echo ""
echo "✅ Backend rodando em http://localhost:5000"
echo "📚 Swagger disponível em http://localhost:5000/swagger"
