﻿# MeowCR

A full-stack web application with a React/Next.js frontend and .NET backend.

## Project Overview

MeowCR is a web application that provides [brief description of the app's purpose]. The project uses a modern tech stack with a clean separation between frontend and backend services.

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- ShadCN UI components

### Backend
- .NET Core
- Entity Framework Core
- SQL Server/SQLite

## Getting Started

### Prerequisites
- Node.js
- npm or pnpm
- .NET SDK
- SQL Server/SQLite

### Installation

1. Clone the repository
   ```
   git clone [repository-url]
   cd meowCR
   ```

2. Set up environment variables
   ```
   cp .env.example .env
   ```
   Update the .env file with your configuration.

3. Backend setup
   ```
   cd backend
   dotnet restore
   dotnet ef database update
   ```

4. Frontend setup
   ```
   cd frontend
   npm install
   # or
   pnpm install
   ```

### Running the application

1. Start the backend
   ```
   cd backend
   dotnet run
   ```

2. Start the frontend
   ```
   cd frontend
   npm run dev
   # or
   pnpm dev
   ```

## Project Structure

```
meowCR/
├── backend/               # .NET Core backend
│   ├── Controllers/       # API endpoints
│   ├── Models/            # Data models
│   ├── Services/          # Business logic
│   ├── Repositories/      # Data access layer
│   ├── Data/              # Database context
│   └── ...
├── frontend/              # Next.js frontend
│   ├── app/               # Next.js app routes
│   ├── components/        # React components
│   ├── styles/            # CSS and styling
│   ├── lib/               # Utility functions
│   ├── hooks/             # React hooks
│   └── ...
└── ...
```

## Environment Variables

The application uses several environment variables for configuration. Copy `.env.example` to `.env` and update as needed:

- `REACT_APP_BASE_API_URL`: The URL for the backend API

## Development

- Make sure to follow the code style and conventions in the project
- Add appropriate tests for new features
- Update documentation as needed

## License

This project is licensed under the MIT License - see the LICENSE file for details.
