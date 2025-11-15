# 🐳 Aurora Frontend - Docker Quick Start

## One-Command Setup

```bash
# Build and run with docker-compose (recommended)
docker-compose up --build
```

Access at: **http://localhost:3000**

---

## Using the Management Script

```bash
# Build the image
./docker.sh build

# Run the container
./docker.sh run

# View logs
./docker.sh logs

# Stop the container
./docker.sh stop

# Clean everything
./docker.sh clean
```

---

## Available Commands

### Production Mode
```bash
# Build and run production container
./docker.sh prod
```

### Development Mode
```bash
# Run with hot reload
./docker.sh dev
```

### Management
```bash
./docker.sh build       # Build image
./docker.sh run         # Start container
./docker.sh stop        # Stop container
./docker.sh restart     # Restart container
./docker.sh logs        # View logs
./docker.sh shell       # Open shell
./docker.sh clean       # Remove all
./docker.sh help        # Show help
```

---

## Environment Variables

Create `.env` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_USE_MOCK_DATA=true
```

---

## Manual Docker Commands

### Build
```bash
docker build -t aurora-frontend .
```

### Run
```bash
docker run -p 3000:3000 aurora-frontend
```

### Stop
```bash
docker stop aurora-frontend
docker rm aurora-frontend
```

---

## Docker Compose Commands

```bash
# Start (foreground)
docker-compose up

# Start (background)
docker-compose up -d

# Stop
docker-compose down

# View logs
docker-compose logs -f

# Rebuild
docker-compose up --build
```

---

## Troubleshooting

### Port already in use
```bash
# Find process using port 3000
lsof -i :3000

# Kill it or use different port
docker run -p 3001:3000 aurora-frontend
```

### Clean rebuild
```bash
# Remove everything and rebuild
./docker.sh clean
./docker.sh build
./docker.sh run
```

### Check logs
```bash
# Real-time logs
./docker.sh logs

# Or with docker-compose
docker-compose logs -f frontend
```

---

## 📚 Full Documentation

See [DOCKER.md](./DOCKER.md) for complete documentation including:
- Multi-stage build explanation
- Security features
- Cloud deployment guides
- CI/CD integration
- Advanced troubleshooting

---

**Need Help?** Run `./docker.sh help`
