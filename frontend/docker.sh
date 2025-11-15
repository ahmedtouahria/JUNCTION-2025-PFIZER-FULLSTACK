#!/bin/bash

# Aurora Frontend Docker Management Script
# Usage: ./docker.sh [command]

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
IMAGE_NAME="aurora-frontend"
CONTAINER_NAME="aurora-frontend"
PORT="3000"

# Functions
print_help() {
    echo -e "${GREEN}Aurora Frontend Docker Manager${NC}"
    echo ""
    echo "Usage: ./docker.sh [command]"
    echo ""
    echo "Commands:"
    echo "  build       - Build Docker image"
    echo "  run         - Run container"
    echo "  stop        - Stop container"
    echo "  restart     - Restart container"
    echo "  logs        - View container logs"
    echo "  shell       - Open shell in container"
    echo "  clean       - Remove container and image"
    echo "  dev         - Run in development mode"
    echo "  prod        - Run in production mode with docker-compose"
    echo "  help        - Show this help message"
}

build() {
    echo -e "${YELLOW}Building Docker image...${NC}"
    docker build -t $IMAGE_NAME .
    echo -e "${GREEN}✓ Build complete${NC}"
}

run() {
    echo -e "${YELLOW}Starting container...${NC}"
    docker run -d \
        --name $CONTAINER_NAME \
        -p $PORT:3000 \
        -e NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL:-http://localhost:8000} \
        -e NEXT_PUBLIC_USE_MOCK_DATA=${NEXT_PUBLIC_USE_MOCK_DATA:-true} \
        $IMAGE_NAME
    echo -e "${GREEN}✓ Container started at http://localhost:$PORT${NC}"
}

stop() {
    echo -e "${YELLOW}Stopping container...${NC}"
    docker stop $CONTAINER_NAME 2>/dev/null || echo "Container not running"
    docker rm $CONTAINER_NAME 2>/dev/null || echo "Container not found"
    echo -e "${GREEN}✓ Container stopped${NC}"
}

restart() {
    stop
    run
}

logs() {
    echo -e "${YELLOW}Showing logs (Ctrl+C to exit)...${NC}"
    docker logs -f $CONTAINER_NAME
}

shell() {
    echo -e "${YELLOW}Opening shell in container...${NC}"
    docker exec -it $CONTAINER_NAME sh
}

clean() {
    echo -e "${YELLOW}Cleaning up...${NC}"
    docker stop $CONTAINER_NAME 2>/dev/null || true
    docker rm $CONTAINER_NAME 2>/dev/null || true
    docker rmi $IMAGE_NAME 2>/dev/null || true
    echo -e "${GREEN}✓ Cleanup complete${NC}"
}

dev() {
    echo -e "${YELLOW}Starting development mode with docker-compose...${NC}"
    docker-compose --profile dev up frontend-dev
}

prod() {
    echo -e "${YELLOW}Starting production mode with docker-compose...${NC}"
    docker-compose up --build -d
    echo -e "${GREEN}✓ Production container started${NC}"
    docker-compose logs -f
}

# Main
case "${1:-help}" in
    build)
        build
        ;;
    run)
        run
        ;;
    stop)
        stop
        ;;
    restart)
        restart
        ;;
    logs)
        logs
        ;;
    shell)
        shell
        ;;
    clean)
        clean
        ;;
    dev)
        dev
        ;;
    prod)
        prod
        ;;
    help|*)
        print_help
        ;;
esac
