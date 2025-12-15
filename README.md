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
