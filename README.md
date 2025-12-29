# Task Manager - Technical Assessment

## Overview
A minimal demo application consisting of a backend (Express) and a frontend (Vite + React). The frontend fetches a message from the backend at startup and displays it.

## What's included
- `backend/` — Express app (GET `/api` returns `{ message: 'hello' }`) and Nodemon for development
- `frontend/` — Vite + React app that fetches `/api` on mount and shows the message in an `h1`
- `docker-compose.yml` — development compose setup with `backend` and `frontend` services

## Tech Stack
- Frontend: React 18, Vite
- Backend: Node.js, Express
- Containerization: Docker & Docker Compose

## Prerequisites
- Node.js (16+)
- npm
- Docker Desktop (optional, for running via Docker Compose)

## Local development (recommended)
### Backend
```bash
cd backend
npm install
npm run dev
# server listens on http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# Vite dev server typically available at http://localhost:5173
# (If using docker-compose mapping, access via http://localhost:5174)
```

### Docker (both services)
```bash
docker compose up --build
```
- Backend: http://localhost:5000/api
- Frontend: http://localhost:5174 (mapped to container port 5173)

## API
- GET `/api` — returns `{ "message": "hello" }`

## Notes
- CORS: the backend uses the `cors` middleware to allow frontend requests from the dev host.
- To build a production frontend, run `npm run build` in `frontend/` and serve the generated `dist` directory.

## Troubleshooting
- If the frontend cannot fetch `/api`, ensure the backend is running on port 5000 and CORS is enabled.

---

If you'd like, I can also add a small CI workflow (GitHub Actions) that runs linting and builds both projects. Confirm if you want that included.