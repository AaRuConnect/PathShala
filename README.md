# PathShala

## Description

PathShala is a web application built with React and TypeScript, using Vite as the build tool and Tailwind CSS for styling. It features a modern and responsive user interface, with Shadcn UI components for a consistent and accessible design. The application uses React Query for data fetching and Axios for API communication, with Prisma as the ORM for database interactions. It also includes a PostgreSQL database for data storage and Docker for containerization.

## Setup

### Starting the database

```bash
docker compose -f docker-compose.dev.yml up -d
```

You need to install docker and docker compose to run the database. You can download it from [here](https://www.docker.com/products/docker-desktop). This will start the database and it will run in the background. You can check the logs by running `docker compose -f docker-compose.dev.yml logs -f`.

### Starting the backend

```bash
cd apps/backend
npm install
npm run dev

```

### Starting the frontend

```bash
cd apps/frontend
npm install
npm run dev
```

## Tech Stack

- TypeScript
- React
- Vite
- Tailwind CSS
- Shadcn UI
- React Query
- Axios
- Express
- Prisma
- PostgreSQL
- Docker

## Git flow

- Use feature branch for development.
- Use main branch for production.
- Use release branch for release.
- Never commit directly to main branch.
- Never force push to main branch.
- When you want to merge code, create a pull request from feature branch to development branch.
- Never merge PR before review.
- Always self review your code.

## Rules for Development

- Use TypeScript for all code.
- Use React for frontend development.
- Use Vite for building the frontend.
- Use Tailwind CSS for styling.
- Use Shadcn UI for UI components.
- Use React Query for data fetching.
- Use Axios for API communication.
- Use Express for backend development.
- Use Prisma for database interactions.
- Use PostgreSQL for database.
- Use Docker for containerization.


## Best Practices

- Always right proper commit message with verb like "Add", "Fix", "Update", "Remove", "Refactor", "Test", "Style", "Chore".
- Create small and atomic commits.
- Create small Pull Request.
- Code should be self-explanatory.
- Use proper naming for variables, functions, and classes.

Note: For app specific rules, check the app's README.md file.

## Project Structure

```
pathShala/
├── apps/
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   └── ui/           # shadcn/ui components
│   │   │   ├── features/
│   │   │   │   ├── auth/
│   │   │   │   ├── dashboard/
│   │   │   │   └── profile/
│   │   │   ├── lib/
│   │   │   │   ├── api.ts        # axios setup
│   │   │   │   ├── utils.ts      # cn utility
│   │   │   │   └── queryClient.ts # react-query setup
│   │   │   ├── hooks/
│   │   │   ├── types/
│   │   │   ├── App.tsx
│   │   │   └── main.tsx
│   │   ├── public/
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   ├── tailwind.config.js
│   │   ├── components.json       # shadcn config
│   │   └── tsconfig.json
│   └── backend/
│       ├── src/
│       │   ├── features/
│       │   │   ├── auth/
│       │   │   │   ├── router.ts
│       │   │   │   ├── service.ts
│       │   │   │   ├── types.ts
│       │   │   │   └── constants.ts
│       │   │   └── users/
│       │   │       ├── router.ts
│       │   │       ├── service.ts
│       │   │       ├── types.ts
│       │   │       └── constants.ts
│       │   ├── shared/
│       │   │   ├── middleware/
│       │   │   │   ├── auth.ts
│       │   │   │   ├── cors.ts
│       │   │   │   └── errorHandler.ts
│       │   │   ├── utils/
│       │   │   │   ├── jwt.ts
│       │   │   │   └── password.ts
│       │   │   └── database/
│       │   │       └── client.ts
│       │   ├── app.ts
│       │   └── server.ts
│       ├── prisma/
│       │   ├── schema.prisma
│       │   └── migrations/
│       ├── package.json
│       └── tsconfig.json
├── docs/
│   ├── API.md
│   └── DEPLOYMENT.md
├── .gitignore
├── .env.example
├── docker-compose.dev.yml
└── README.md
```
