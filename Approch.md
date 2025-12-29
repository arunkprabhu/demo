# Development Approach

## 1. Problem approach & timeline
- Goal: ship a minimal working full-stack demo where the frontend fetches data from the backend and displays it.
- Timeline / breakdown:
  1. Scaffold backend with Express and a single `GET /api` endpoint (MVP).
  2. Scaffold frontend with Vite + React and implement fetch on mount to display backend response.
  3. Add developer ergonomics: nodemon for backend, vite dev server for frontend.
  4. Add Dockerfiles and `docker-compose.yml` for easy local dev across both services.
- Priorities: correctness and developer flow (simple endpoint + working fetch), then containerization, then documentation and polish.

## 2. Docker architecture
- Chose a multi-container approach (one container per service) to mirror typical production separation and make each service independently runnable.
- Each service has a small `Dockerfile` based on `node:18-alpine` and installs dependencies. During development we mount the source (`./backend` and `./frontend`) into the container and start the dev servers.
- Reasons: easier debugging, parallel development, and more realistic deployment picture.

## 3. Technical decisions
- Backend: Node.js + Express — small, widely used, and fast to scaffold an API.
- Frontend: React + Vite — lightweight dev server, fast HMR.
- File structure:
  - `backend/` contains `index.js`, package.json, Dockerfile
  - `frontend/` contains Vite app in `src/`, package.json, Dockerfile
- Additional libraries: `cors` middleware to allow cross-origin requests from the dev frontend.

## 4. CI/CD (suggested)
- A CI workflow can: run `npm ci` and lint/tests for each service, build the frontend (`npm run build`) and run linters.
- CD: build and push Docker images to a registry and deploy to your chosen environment (e.g., ECS, Kubernetes, or a simple server).
- Future improvements: automated tests, vulnerability scanning, image promotion steps.

## 5. AI tool usage
- Used an AI assistant to scaffold the initial files (package.json, Express server, Vite scaffold, Dockerfiles, and basic README). All generated code was reviewed and adapted.
- What was AI-generated vs human-written: initial scaffolding was generated; edits, testing, and contextual choices were made by the developer.

## 6. Challenges & decisions
- CORS: needed to explicitly enable CORS in the backend so the local Vite origin can fetch the API during development.
- Trade-offs: opted for simple dev configurations (nodemon & vite dev) with bind mounts for rapid iteration instead of fully production-optimized Docker images.

---

If you'd like me to expand the approach to include an example GitHub Actions CI workflow or a more production-ready Docker config (multi-stage builds and static-serving of frontend), tell me which direction you prefer.