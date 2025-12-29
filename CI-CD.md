# CI / CD for this repo

## CI ( `.github/workflows/ci.yml` ) ✅
- Runs on push and pull requests.
- Steps:
  - Checkout repository
  - Setup Node.js (caches npm)
  - Backend: `npm ci` and runs `npm test` (no-op if no tests exist)
  - Frontend: `npm ci` and `npm run build` (artifact uploaded)
- Purpose: ensure PRs build cleanly and catch regressions early.

## CD ( `.github/workflows/cd.yml` ) ✅
- Runs on `push` to `main` branch.
- Steps:
  - Checkout repository
  - Login to GitHub Container Registry (GHCR)
  - Build and push **backend** and **frontend** Docker images (tagged with commit SHA)
- Purpose: produce Docker images that can be deployed by downstream systems.

## Secrets & Permissions
- The CD workflow uses `secrets.GITHUB_TOKEN` to authenticate to GHCR; ensure your repo has permissions to write packages.
- If you prefer Docker Hub, replace the `docker/login-action` step with Docker Hub login and store `DOCKER_HUB_USERNAME` and `DOCKER_HUB_TOKEN` in repo secrets.

## Deployment
- These workflows build artifacts and images but do not perform an environment deployment (to k8s, cloud provider, or remote server).
- To deploy automatically, add a deployment job that:
  - pushes images to a registry (already done), then
  - uses SSH/Kube contexts / cloud provider actions to update services.

## Notes / Next improvements
- Add unit & integration tests and have CI run them
- Add vulnerability scanning (e.g., `trivy` or `npm audit`) in CI
- Add multi-stage production Dockerfiles to reduce image size
- Add branch protections to require CI passing before merging
