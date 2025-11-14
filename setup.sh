#!/bin/bash

# Migraine Prediction System - Complete Setup Script
# This script sets up both backend and frontend

set -e

echo "🧠 Migraine Prediction System - Complete Setup"
echo "=============================================="
echo ""

# Setup Backend
echo "📦 Setting up Backend..."
cd backend

echo "Creating Python virtual environment..."
python3 -m venv venv
source venv/bin/activate

echo "Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please update backend/.env with your configuration"
fi

echo "✅ Backend setup complete!"
echo ""

# Setup Frontend
echo "🎨 Setting up Frontend..."
cd ../frontend

echo "Installing Node.js dependencies..."
npm install

if [ ! -f .env.local ]; then
    echo "Creating .env.local file..."
    cp .env.local.example .env.local
fi

echo "✅ Frontend setup complete!"
echo ""

# Final Instructions
echo "=============================================="
echo "✅ Setup Complete!"
echo "=============================================="
echo ""
echo "📝 Next Steps:"
echo ""
echo "1. Configure Backend:"
echo "   - Edit backend/.env with your PostgreSQL credentials"
echo "   - Make sure PostgreSQL is running"
echo "   - Make sure Redis is running"
echo ""
echo "2. Initialize Database:"
echo "   cd backend"
echo "   source venv/bin/activate"
echo "   createdb migraine_db  # Create PostgreSQL database"
echo "   python manage.py makemigrations"
echo "   python manage.py migrate"
echo "   python manage.py createsuperuser"
echo ""
echo "3. Run Backend (3 terminals needed):"
echo "   Terminal 1: python manage.py runserver"
echo "   Terminal 2: celery -A migraine_backend worker -l info"
echo "   Terminal 3: celery -A migraine_backend beat -l info"
echo ""
echo "4. Run Frontend:"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "5. Access Application:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:8000/api"
echo "   Admin Panel: http://localhost:8000/admin"
echo ""
echo "📚 Documentation:"
echo "   - Main README: ./README.md"
echo "   - Backend: ./backend/README.md"
echo "   - Frontend: ./frontend/README.md"
echo ""
echo "Happy Health Tracking! 🎉"
