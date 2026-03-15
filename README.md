# ecommerce-fullstack-design

Full-stack e-commerce monorepo using npm workspaces.

## Structure

```
ecommerce-fullstack-design/
├── package.json          # Root — npm workspaces
├── frontend/             # @ecommerce/frontend (React + Vite + TailwindCSS)
└── backend/              # @ecommerce/backend (Express.js)
```

## Install all dependencies

```bash
npm install
```

## Run both apps concurrently

```bash
# Frontend only → http://localhost:5173
npm run dev:frontend

# Backend only → http://localhost:5000
npm run dev:backend
```

## Build

```bash
npm run build
```
