#!/bin/bash

# Script para iniciar o ambiente de desenvolvimento completo
echo "🚀 Iniciando TaskFlow - Full Stack"
echo ""

# Verificar se Docker está rodando
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker não está rodando. Por favor, inicie o Docker primeiro."
    exit 1
fi

echo "📦 Iniciando containers Docker..."
docker-compose up --build

echo ""
echo "✅ Aplicação iniciada!"
echo "Frontend: http://localhost"
echo "Backend API: http://localhost:5000"
echo "Swagger: http://localhost:5000/swagger"
