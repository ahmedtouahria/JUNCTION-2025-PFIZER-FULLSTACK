#!/bin/bash

# Migraine Prediction System - Backend Setup Script
# This script sets up the Django backend

set -e

echo "🚀 Setting up Migraine Prediction System Backend..."

# Create virtual environment
echo "📦 Creating virtual environment..."
python3 -m venv venv

# Activate virtual environment
echo "✅ Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please update .env file with your configuration"
fi

# Run migrations
echo "🗃️  Running database migrations..."
python manage.py makemigrations
python manage.py migrate

# Create superuser (optional)
echo "👤 Create superuser? (y/n)"
read -r response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    python manage.py createsuperuser
fi

echo ""
echo "✅ Backend setup complete!"
echo ""
echo "📚 Next steps:"
echo "1. Update your .env file with proper configuration"
echo "2. Make sure PostgreSQL is running"
echo "3. Make sure Redis is running (for Celery)"
echo "4. Run the development server: python manage.py runserver"
echo "5. Run Celery worker: celery -A migraine_backend worker -l info"
echo "6. Run Celery beat: celery -A migraine_backend beat -l info"
echo ""
