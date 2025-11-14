# Quick Start Guide

## Prerequisites Check

Before starting, make sure you have:

- [ ] Python 3.10+ installed (`python3 --version`)
- [ ] Node.js 18+ installed (`node --version`)
- [ ] PostgreSQL installed and running
- [ ] Redis installed and running

## One-Command Setup

```bash
./setup.sh
```

This will install all dependencies for both backend and frontend.

## Step-by-Step Setup

### 1. PostgreSQL Setup

```bash
# Install PostgreSQL (Ubuntu/Debian)
sudo apt install postgresql postgresql-contrib

# Start PostgreSQL
sudo service postgresql start

# Create database
sudo -u postgres createdb migraine_db

# Create user (optional)
sudo -u postgres createuser --interactive
```

### 2. Redis Setup

```bash
# Install Redis (Ubuntu/Debian)
sudo apt install redis-server

# Start Redis
sudo service redis-server start

# Test Redis
redis-cli ping  # Should return PONG
```

### 3. Backend Setup

```bash
cd backend

# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Edit .env file with your credentials
nano .env

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create admin user
python manage.py createsuperuser

# Start Django server
python manage.py runserver
```

### 4. Start Celery

Open two new terminals:

```bash
# Terminal 1 - Celery Worker
cd backend
source venv/bin/activate
celery -A migraine_backend worker -l info

# Terminal 2 - Celery Beat
cd backend
source venv/bin/activate
celery -A migraine_backend beat -l info
```

### 5. Frontend Setup

```bash
cd frontend

# Start development server
npm run dev
```

## Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000/api
- **Admin Panel:** http://localhost:8000/admin

## First Time Use

1. Open http://localhost:3000
2. Click "Register" to create an account
3. Login with your credentials
4. Start by doing a "Daily Check-in"
5. The system will generate predictions based on your data

## Troubleshooting

### PostgreSQL Connection Error

```bash
# Check if PostgreSQL is running
sudo service postgresql status

# Check connection
psql -U postgres -d migraine_db
```

### Redis Connection Error

```bash
# Check if Redis is running
redis-cli ping

# Start Redis if not running
sudo service redis-server start
```

### Port Already in Use

```bash
# Backend (port 8000)
python manage.py runserver 8001

# Frontend (port 3000)
PORT=3001 npm run dev
```

### Module Not Found (Backend)

```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
```

### Module Not Found (Frontend)

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## Development Workflow

### Adding Data

1. **Daily Check-in** - Log sleep, stress, mood, water intake
2. **Biometrics** (optional) - Add heart rate, HRV data
3. **Migraine Event** - When you have a migraine, log it with details
4. **View Prediction** - Check your daily risk on the dashboard

### Viewing Analytics

After a few days of data:
- Go to "Health Insights" to see patterns
- Check "7-Day Forecast" for upcoming risk
- Review "Top Triggers" in analytics

## API Testing

### Using cURL

```bash
# Register
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123","password_confirm":"password123"}'

# Login
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'

# Get today's prediction (use token from login)
curl -X GET http://localhost:8000/api/predictions/today/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Using Python

```python
import requests

# Login
response = requests.post('http://localhost:8000/api/auth/login/', json={
    'username': 'testuser',
    'password': 'password123'
})
token = response.json()['access']

# Get prediction
headers = {'Authorization': f'Bearer {token}'}
prediction = requests.get('http://localhost:8000/api/predictions/today/', headers=headers)
print(prediction.json())
```

## Production Deployment

See individual README files:
- Backend: `backend/README.md`
- Frontend: `frontend/README.md`

## Need Help?

1. Check the main README.md
2. Check backend/README.md for API details
3. Check frontend/README.md for UI details
4. Review error logs in terminal
5. Check Django admin panel for data

## Common Commands

```bash
# Backend
python manage.py makemigrations  # Create migrations
python manage.py migrate         # Apply migrations
python manage.py test           # Run tests
python manage.py shell          # Django shell

# Frontend
npm run dev                     # Development
npm run build                   # Production build
npm start                       # Run production build
npm run lint                    # Lint code

# Database
python manage.py dbshell        # Access database
python manage.py flush          # Clear all data (careful!)
python manage.py createsuperuser # Create admin user
```

Good luck! 🚀
