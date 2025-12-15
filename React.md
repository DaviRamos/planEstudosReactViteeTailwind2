Plano de Estudos React + Vite + Tailwind - 7 Dias
Dia 1: Fundamentos e Setup
 Criar documentação do plano de estudos
 Configurar estrutura do projeto com Vite
 Implementar componentes básicos (App, Header)
 Aplicar conceitos básicos do React (JSX, componentes)
Dia 2: Tailwind CSS e Estilização
 Implementar sistema de design com Tailwind
 Criar componente Card estilizado
 Criar componente Button com variantes
 Adicionar tema dark mode
Dia 3: Gerenciamento de Estado e Listas
 Implementar componente Board
 Implementar componente Column
 Criar sistema de estado com useState
 Adicionar funcionalidade de criar tarefas
Dia 4: Interatividade e Drag & Drop
 Implementar Task component com edição
 Adicionar drag and drop entre colunas
 Criar modal para adicionar tarefas
 Implementar funcionalidade de deletar
Backend .NET WebAPI
 Criar projeto .NET WebAPI
 Configurar Entity Framework Core
 Criar models (Task, Column)
 Criar DbContext com PostgreSQL
 Criar Controllers (TasksController)
 Configurar CORS
Criar migrations
Docker & Deployment
 Criar Dockerfile para backend
 Criar Dockerfile para frontend
 Criar docker-compose.yml
 Configurar network entre containers
Testar integração completa
Dia 5: Context API e Estado Global
 Criar AppContext para estado global
 Refatorar componentes para usar Context
 Implementar persistência em localStorage
 Criar hooks customizados
Dia 6: Integração com Backend
 Criar serviços de API
 Implementar chamadas HTTP
 Adicionar loading states
 Tratamento de erros
Dia 7: Polimento e Features Avançadas
 Adicionar animações com Tailwind
 Implementar filtros e busca
 Criar componentes de notificação
 Otimização e code splitting
 
 
 # TaskFlow - Aplicativo de Gerenciamento de Tarefas

Aplicativo Full Stack de gerenciamento de tarefas estilo Trello, construído com React, Vite, Tailwind CSS, .NET WebAPI e PostgreSQL.

## 🚀 Tecnologias

### Frontend

- **React 18** - Biblioteca UI
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utility-first

### Backend

- **.NET 8 WebAPI** - API REST
- **Entity Framework Core** - ORM
- **PostgreSQL 15** - Banco de dados

### DevOps

- **Docker & Docker Compose** - Containerização
- **Nginx** - Servidor web e proxy reverso

## 📦 Instalação e Execução

### Opção 1: Desenvolvimento Local (Frontend apenas)

```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev

# Build para produção
npm run build
```

### Opção 2: Full Stack com Docker Compose (Recomendado)

```bash
# Iniciar todos os serviços (PostgreSQL + Backend + Frontend)
docker-compose up --build

# Acessar aplicação
# Frontend: http://localhost
# Backend API: http://localhost:5000
# Swagger: http://localhost:5000/swagger

# Parar serviços
docker-compose down

# Parar e limpar volumes
docker-compose down -v
```

### Opção 3: Backend .NET Standalone

```bash
# Navegar para o backend
cd backend/TaskFlow.API

# Restaurar dependências
dotnet restore

# Criar migrations (primeira vez)
dotnet ef migrations add InitialCreate

# Aplicar migrations
dotnet ef database update

# Rodar backend
dotnet run
```

## 🏗️ Estrutura do Projeto

```
planEstudosReactViteeTailwind/
├── backend/
│   └── TaskFlow.API/
│       ├── Controllers/        # API Controllers
│       ├── Data/              # DbContext
│       ├── Models/            # Entidades
│       ├── DTOs/              # Data Transfer Objects
│       ├── Dockerfile         # Docker do backend
│       └── appsettings.json   # Configurações
├── src/
│   ├── components/            # Componentes React
│   ├── context/               # Context API
│   ├── hooks/                 # Hooks customizados
│   ├── api/                   # Serviços de API
│   └── utils/                 # Utilitários
├── docker-compose.yml         # Orquestração Docker
├── Dockerfile                 # Docker do frontend
├── nginx.conf                 # Config Nginx
└── README.md
```

## ✨ Features

### Funcionalidades

- ✅ Quadro Kanban com 3 colunas (A Fazer, Em Progresso, Concluído)
- ✅ Criar, editar e deletar tarefas
- ✅ Mover tarefas entre colunas (drag & drop + botões rápidos)
- ✅ Sistema de prioridades (Alta, Média, Baixa) com cores
- ✅ Busca de tarefas por título/descrição
- ✅ Filtros por prioridade
- ✅ Dark mode completo
- ✅ **Persistência em PostgreSQL**
- ✅ **API REST .NET WebAPI**
- ✅ Interface responsiva (mobile, tablet, desktop)
- ✅ Loading states e error handling

### Design

- ✅ Glass morphism effects
- ✅ Gradientes modernos
- ✅ Sombras elegantes
- ✅ Animações suaves (fade, slide)
- ✅ Ícones SVG inline
- ✅ Fonte Google (Inter)
- ✅ Esquema de cores customizado
- ✅ Scrollbar customizada

## 🔌 API Endpoints

### Tasks

```
GET    /api/tasks          # Listar todas as tarefas
GET    /api/tasks/:id      # Buscar tarefa por ID
POST   /api/tasks          # Criar nova tarefa
PUT    /api/tasks/:id      # Atualizar tarefa
DELETE /api/tasks/:id      # Deletar tarefa
PATCH  /api/tasks/:id/move # Mover tarefa para outra coluna
```

## 🐳 Docker Services

- **postgres**: PostgreSQL 15 (porta 5432)
- **backend**: .NET 8 WebAPI (porta 5000)
- **frontend**: React + Nginx (porta 80)

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:5000/api
```

## 📝 Licença

MIT
MIT


Implementação: Backend .NET WebAPI + PostgreSQL + Docker
Visão Geral
Adicionar backend completo usando .NET WebAPI com PostgreSQL e containerizar toda a solução (frontend + backend + banco) usando Docker Compose.

Estrutura do Backend
Diretório Backend
backend/
├── TaskFlow.API/
│   ├── Controllers/
│   │   └── TasksController.cs
│   ├── Data/
│   │   └── AppDbContext.cs
│   ├── Models/
│   │   └── TaskItem.cs
│   ├── DTOs/
│   │   ├── TaskDto.cs
│   │   └── CreateTaskDto.cs
│   ├── Program.cs
│   ├── appsettings.json
│   ├── TaskFlow.API.csproj
│   └── Dockerfile
└── docker-compose.yml
Componentes do Backend
1. Models
TaskItem.cs - Entidade principal

Id (int, PK)
Title (string)
Description (string, nullable)
Column (string: "todo", "doing", "done")
Priority (string: "low", "medium", "high")
CreatedAt (DateTime)
2. DbContext
AppDbContext.cs - Entity Framework Core

DbSet
Configuração PostgreSQL
Fluent API configurations
3. Controllers
TasksController.cs - API REST

GET /api/tasks - Listar todas
GET /api/tasks/{id} - Buscar por ID
POST /api/tasks - Criar nova
PUT /api/tasks/{id} - Atualizar
DELETE /api/tasks/{id} - Deletar
PATCH /api/tasks/{id}/move - Mover coluna
4. DTOs (Data Transfer Objects)
TaskDto - Response
CreateTaskDto - Create/Update request
MoveTaskDto - Move request
Configuração do Docker
Frontend Dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
Backend Dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5000
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["TaskFlow.API.csproj", "./"]
RUN dotnet restore
COPY . .
RUN dotnet build -c Release -o /app/build
FROM build AS publish
RUN dotnet publish -c Release -o /app/publish
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TaskFlow.API.dll"]
docker-compose.yml
version: '3.8'
services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: taskflow
      POSTGRES_USER: taskflow_user
      POSTGRES_PASSWORD: taskflow_pass
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
  backend:
    build:
      context: ./backend/TaskFlow.API
    environment:
      - ConnectionStrings__DefaultConnection=Host=postgres;Database=taskflow;Username=taskflow_user;Password=taskflow_pass
      - ASPNETCORE_URLS=http://+:5000
    ports:
      - "5000:5000"
    depends_on:
      - postgres
  frontend:
    build:
      context: .
    ports:
      - "80:80"
    depends_on:
      - backend
volumes:
  postgres_data:
Mudanças no Frontend
1. Atualizar Context para usar API
Remover dados mock
Integrar com taskService
Adicionar loading states
Tratar erros da API
2. Configurar variável de ambiente
VITE_API_URL=http://localhost:5000/api
3. Criar nginx.conf
server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    location /api {
        proxy_pass http://backend:5000;
    }
}
Packages NuGet Necessários
Microsoft.EntityFrameworkCore (8.0.0)
Microsoft.EntityFrameworkCore.Design (8.0.0)
Npgsql.EntityFrameworkCore.PostgreSQL (8.0.0)
Microsoft.AspNetCore.OpenApi (8.0.0)
Comandos para Execução
Desenvolvimento Local (sem Docker)
# Backend
cd backend/TaskFlow.API
dotnet restore
dotnet ef database update
dotnet run
# Frontend
npm run dev
Produção com Docker
# Build e iniciar todos os serviços
docker-compose up --build
# Parar
docker-compose down
# Limpar volumes
docker-compose down -v
Migrations
# Criar migration inicial
dotnet ef migrations add InitialCreate
# Aplicar migrations
dotnet ef database update
CORS Configuration
Permitir requisições do frontend:

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:3001", "http://localhost:80")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});
Verificação
✅ PostgreSQL rodando na porta 5432
✅ Backend .NET rodando na porta 5000
✅ Frontend rodando na porta 80
✅ CORS configurado corretamente
✅ Migrations aplicadas
✅ Comunicação entre containers funcionando
Próximos Passos (Opcional)
Adicionar autenticação JWT
Implementar paginação
Adicionar validação com FluentValidation
Logging com Serilog
Health checks
Testes unitários e de integração