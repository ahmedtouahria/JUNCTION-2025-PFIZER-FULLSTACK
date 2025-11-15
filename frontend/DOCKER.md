# Aurora Frontend - Docker Setup Guide

## 📦 Quick Start

### Production Build & Run

```bash
# Build the Docker image
docker build -t aurora-frontend .

# Run the container
docker run -p 3000:3000 aurora-frontend
```

Access the app at: http://localhost:3000

---

## 🐳 Using Docker Compose

### Production Mode (Recommended)

```bash
# Build and start
docker-compose up --build

# Run in background
docker-compose up -d

# Stop containers
docker-compose down

# View logs
docker-compose logs -f frontend
```

### Development Mode (with hot reload)

```bash
# Start development container
docker-compose --profile dev up frontend-dev

# Or run in background
docker-compose --profile dev up -d frontend-dev
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_USE_MOCK_DATA=true
```

### Docker Compose Environment

The docker-compose.yml uses these environment variables:

- `NEXT_PUBLIC_API_URL` - Backend API endpoint (default: http://localhost:8000)
- `NEXT_PUBLIC_USE_MOCK_DATA` - Use mock data instead of real API (default: true)

---

## 📋 Docker Commands Reference

### Building

```bash
# Build production image
docker build -t aurora-frontend .

# Build with no cache
docker build --no-cache -t aurora-frontend .

# Build with specific tag
docker build -t aurora-frontend:v1.0.0 .
```

### Running

```bash
# Run on port 3000
docker run -p 3000:3000 aurora-frontend

# Run with custom environment variables
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://api.example.com \
  -e NEXT_PUBLIC_USE_MOCK_DATA=false \
  aurora-frontend

# Run in background (detached)
docker run -d -p 3000:3000 --name aurora-frontend aurora-frontend

# Run with volume mount (for logs)
docker run -p 3000:3000 -v $(pwd)/logs:/app/logs aurora-frontend
```

### Managing Containers

```bash
# List running containers
docker ps

# List all containers
docker ps -a

# Stop container
docker stop aurora-frontend

# Start stopped container
docker start aurora-frontend

# Remove container
docker rm aurora-frontend

# View logs
docker logs aurora-frontend

# Follow logs in real-time
docker logs -f aurora-frontend

# Execute command in running container
docker exec -it aurora-frontend sh
```

### Cleaning Up

```bash
# Remove all stopped containers
docker container prune

# Remove all unused images
docker image prune

# Remove all unused volumes
docker volume prune

# Remove everything (careful!)
docker system prune -a
```

---

## 🏗️ Multi-Stage Build Explanation

Our Dockerfile uses a 3-stage build process:

### Stage 1: Dependencies (deps)
- Based on `node:20-alpine` (minimal image)
- Installs production dependencies only
- Creates optimized node_modules

### Stage 2: Builder
- Copies dependencies from stage 1
- Copies source code
- Builds the Next.js application
- Creates optimized production build

### Stage 3: Runner (Production)
- Minimal runtime image
- Copies only necessary files (standalone build)
- Runs as non-root user (security)
- ~200MB final image size

**Benefits:**
- ✅ Smaller image size (3-5x reduction)
- ✅ Faster deployment
- ✅ Better security (no source code, no dev dependencies)
- ✅ Layer caching for faster rebuilds

---

## 🔒 Security Features

1. **Non-root User**: Runs as `nextjs` user (UID 1001)
2. **Minimal Base**: Alpine Linux reduces attack surface
3. **Production Dependencies Only**: No dev tools in final image
4. **Standalone Output**: Self-contained with minimal Node.js

---

## 🚀 Deployment

### Docker Hub

```bash
# Tag for Docker Hub
docker tag aurora-frontend username/aurora-frontend:latest

# Push to Docker Hub
docker push username/aurora-frontend:latest

# Pull and run from Docker Hub
docker run -p 3000:3000 username/aurora-frontend:latest
```

### Cloud Platforms

#### AWS ECS / Fargate
```bash
# Authenticate to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# Tag for ECR
docker tag aurora-frontend <account-id>.dkr.ecr.us-east-1.amazonaws.com/aurora-frontend:latest

# Push to ECR
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/aurora-frontend:latest
```

#### Google Cloud Run
```bash
# Tag for GCR
docker tag aurora-frontend gcr.io/<project-id>/aurora-frontend

# Push to GCR
docker push gcr.io/<project-id>/aurora-frontend

# Deploy to Cloud Run
gcloud run deploy aurora-frontend \
  --image gcr.io/<project-id>/aurora-frontend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

#### Azure Container Instances
```bash
# Tag for ACR
docker tag aurora-frontend <registry-name>.azurecr.io/aurora-frontend

# Push to ACR
docker push <registry-name>.azurecr.io/aurora-frontend

# Deploy to ACI
az container create \
  --resource-group myResourceGroup \
  --name aurora-frontend \
  --image <registry-name>.azurecr.io/aurora-frontend \
  --dns-name-label aurora-frontend \
  --ports 3000
```

---

## 🔍 Troubleshooting

### Build Fails

```bash
# Check build logs
docker build -t aurora-frontend . --progress=plain

# Build with no cache
docker build --no-cache -t aurora-frontend .
```

### Container Won't Start

```bash
# Check logs
docker logs aurora-frontend

# Run interactively to debug
docker run -it aurora-frontend sh

# Check if port is already in use
lsof -i :3000
```

### Connection Issues

```bash
# Test from inside container
docker exec -it aurora-frontend sh
wget http://localhost:3000

# Check container network
docker inspect aurora-frontend | grep IPAddress
```

### Performance Issues

```bash
# Check resource usage
docker stats aurora-frontend

# Limit resources
docker run -p 3000:3000 \
  --memory="512m" \
  --cpus="1.0" \
  aurora-frontend
```

---

## 📊 Image Size Optimization

Our current setup achieves:

- **Before optimization**: ~1.2GB
- **After multi-stage build**: ~200MB
- **Reduction**: ~83%

Additional optimizations:
- Using Alpine Linux (5MB base)
- Standalone Next.js output
- Production-only dependencies
- Layer caching

---

## 🧪 Testing the Docker Build

```bash
# Build the image
docker build -t aurora-frontend .

# Run the container
docker run -p 3000:3000 aurora-frontend

# Test the endpoint
curl http://localhost:3000

# Check health
docker exec aurora-frontend sh -c "ps aux | grep node"
```

---

## 📝 Best Practices

1. **Use .dockerignore**: Exclude unnecessary files (node_modules, .git, etc.)
2. **Multi-stage builds**: Separate build and runtime stages
3. **Layer caching**: Order commands from least to most frequently changed
4. **Non-root user**: Always run as non-privileged user
5. **Health checks**: Add health check endpoints
6. **Environment variables**: Never hardcode secrets
7. **Logging**: Use stdout/stderr for container logs
8. **Version tagging**: Always tag images with version numbers

---

## 🔄 CI/CD Integration

### GitHub Actions Example

```yaml
name: Build and Push Docker Image

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Docker image
        run: docker build -t aurora-frontend .
      
      - name: Run tests
        run: docker run aurora-frontend npm test
      
      - name: Push to registry
        run: |
          echo "${{ secrets.DOCKER_PASSWORD }}" | docker login -u "${{ secrets.DOCKER_USERNAME }}" --password-stdin
          docker tag aurora-frontend username/aurora-frontend:latest
          docker push username/aurora-frontend:latest
```

---

## 📚 Additional Resources

- [Next.js Docker Documentation](https://nextjs.org/docs/deployment#docker-image)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Multi-stage Builds](https://docs.docker.com/build/building/multi-stage/)

---

**Last Updated**: Production transformation session  
**Docker Version**: 20.10+  
**Node Version**: 20 LTS (Alpine)
