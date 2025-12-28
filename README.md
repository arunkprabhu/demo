# Demo Vite + React frontend and Express backend

Minimal project showing a Vite + React frontend and a minimal Express backend.

Getting started

1. Install root dev deps (concurrently):

```bash
cd demo
npm install
# then install frontend and backend deps
cd frontend && npm install
cd ../backend && npm install
```

2. Run both dev servers from root:

```bash
npm run dev
```

- Frontend (Vite) runs on port 5173 by default.
- Backend (Express) runs on port 3000 by default and exposes `/api/hello`.

Build & serve

```bash
npm run build:frontend
npm run start:backend
```

This serves the built frontend from `frontend/dist`.

## Docker (quickstart)

Build and run both services with Docker Compose:

```bash
# from project root (demo)
docker compose up --build
```

- Frontend will be available at: http://localhost:5173 (served by nginx)
- Backend API will be available at: http://localhost:3000/api/hello
- The frontend nginx proxy will forward `/api/` requests to the backend service.

Stop and remove containers:

```bash
docker compose down
```

## CI / CD

Two example GitHub Actions workflows are included to get you started:

- `.github/workflows/ci.yml` — runs on push and PRs: installs dependencies, builds the frontend, and runs a backend smoke test.
- `.github/workflows/docker-publish.yml` — runs on pushes to `main`: builds and pushes Docker images for frontend and backend to GitHub Container Registry (GHCR).

Notes:
- The Docker publish workflow pushes images to `ghcr.io/<owner>/demo-frontend:latest` and `ghcr.io/<owner>/demo-backend:latest` using `GITHUB_TOKEN` so no extra secrets are required for public repos; for private repo/package settings you may need to grant package write permissions or configure an additional secret.

