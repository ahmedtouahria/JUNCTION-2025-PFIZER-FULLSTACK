# 🚀 Aurora Docker - Quick Reference Card

## Essential Commands

```bash
# Navigate to frontend
cd frontend

# Build image
docker compose build

# Start container (detached)
docker compose up -d

# Start container (with logs)
docker compose up

# Stop container
docker compose down

# View logs
docker compose logs -f

# Restart after code changes
docker compose up -d --build

# Check if running
docker ps | grep aurora

# Access shell inside container
docker exec -it aurora-frontend sh

# Remove everything
docker compose down -v --rmi all
```

## Helper Script Commands

```bash
./docker.sh build    # Build image
./docker.sh dev      # Start dev mode
./docker.sh prod     # Start prod mode
./docker.sh logs     # View logs
./docker.sh stop     # Stop containers
./docker.sh clean    # Remove everything
```

## URLs

- **Application:** http://localhost:3003
- **Dev Server:** http://localhost:3000 (if running npm dev)
- **Backend API:** http://localhost:8000

## Environment Variables

```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_USE_MOCK_DATA=true
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 3003 in use | `lsof -ti:3003 \| xargs kill -9` |
| Build fails | Check DOCKER_BUILD_LOG.md |
| Container won't start | `docker compose logs` |
| Changes not showing | `docker compose up -d --build` |
| Permission denied | Add sudo or check Docker group |

## File Structure

```
frontend/
├── Dockerfile              # Build instructions
├── docker-compose.yml      # Service config
├── .dockerignore          # Exclusions
├── docker.sh              # Helper script
└── public/                # Static assets
```

## Production Checklist

- [x] Port 3003 configured
- [x] Environment variables set
- [x] .dockerignore optimized
- [x] Multi-stage build working
- [x] Non-root user configured
- [x] Documentation complete

## Quick Health Check

```bash
# Check if container is running
docker ps | grep aurora-frontend

# Test the endpoint
curl http://localhost:3003

# Check logs for errors
docker compose logs --tail=50
```

---

**Need help?** See [DOCKER.md](DOCKER.md) for comprehensive guide.
