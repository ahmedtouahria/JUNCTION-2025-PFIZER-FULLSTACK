# Migraine Prediction System - Backend

Django REST API for migraine prediction and health tracking.

## Features

- 🔐 **JWT Authentication** - Secure user authentication
- 📊 **Daily Health Logs** - Track sleep, stress, mood, hydration
- 💓 **Biometrics** - Heart rate, HRV, blood pressure tracking
- 🤕 **Migraine Events** - Detailed symptom and trigger logging
- 🔮 **AI Predictions** - ML-powered risk prediction
- 📈 **Analytics** - Insights on triggers and patterns
- ⚙️ **Background Tasks** - Automated predictions with Celery

## Tech Stack

- Django 5.0
- Django REST Framework
- PostgreSQL
- Redis & Celery
- JWT Authentication
- Simple ML prediction engine

## Project Structure

```
backend/
├── migraine_backend/       # Main project settings
├── accounts/               # User authentication & profiles
├── logs/                   # Daily health tracking
├── biometrics/             # Biometric data
├── migraine/               # Migraine event tracking
├── predictions/            # ML prediction engine
├── analytics/              # Data analytics & insights
├── requirements.txt
└── manage.py
```

## API Endpoints

### Authentication
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - Login (get JWT tokens)
- `POST /api/auth/logout/` - Logout
- `POST /api/auth/token/refresh/` - Refresh access token
- `GET /api/auth/user/me/` - Get current user profile
- `PUT /api/auth/user/me/` - Update user profile

### Daily Logs
- `GET /api/logs/daily/` - List daily logs
- `POST /api/logs/daily/` - Create daily log
- `GET /api/logs/daily/{id}/` - Get specific log
- `PUT /api/logs/daily/{id}/` - Update log
- `DELETE /api/logs/daily/{id}/` - Delete log

### Biometrics
- `GET /api/biometrics/` - List biometric entries
- `POST /api/biometrics/` - Add biometric data
- `GET /api/biometrics/{id}/` - Get specific entry
- `PUT /api/biometrics/{id}/` - Update entry
- `DELETE /api/biometrics/{id}/` - Delete entry

### Migraine Events
- `GET /api/migraine-events/` - List migraine events
- `POST /api/migraine-events/` - Log new migraine
- `GET /api/migraine-events/{id}/` - Get event details
- `PUT /api/migraine-events/{id}/` - Update event
- `DELETE /api/migraine-events/{id}/` - Delete event

### Predictions
- `GET /api/predictions/` - List all predictions
- `GET /api/predictions/today/` - Get today's prediction
- `GET /api/predictions/forecast/` - Get 7-day forecast
- `POST /api/predictions/generate/` - Generate prediction

### Analytics
- `GET /api/analytics/triggers/` - Get top triggers
- `GET /api/analytics/patterns/` - Get weekly patterns
- `GET /api/analytics/summary/` - Get health summary
- `GET /api/analytics/correlations/` - Get factor correlations

## Setup Instructions

### Prerequisites

- Python 3.10+
- PostgreSQL
- Redis (for Celery)

### Installation

1. **Clone and navigate to backend:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

5. **Setup database:**
   ```bash
   # Create PostgreSQL database
   createdb migraine_db
   
   # Run migrations
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Create superuser:**
   ```bash
   python manage.py createsuperuser
   ```

7. **Run development server:**
   ```bash
   python manage.py runserver
   ```

8. **Run Celery (in separate terminals):**
   ```bash
   # Worker
   celery -A migraine_backend worker -l info
   
   # Beat scheduler
   celery -A migraine_backend beat -l info
   ```

## ML Prediction Engine

The prediction engine (`predictions/ml_engine.py`) uses a simple rule-based approach:

### Input Factors:
- Sleep hours and quality
- Stress levels
- Hydration
- Heart Rate Variability (HRV)
- Physical activity
- Pattern regularity

### Output:
- Risk score (0-100)
- Risk level (low/moderate/high)
- Top 3 contributing factors
- Confidence score
- Personalized recommendations

### Future Enhancements:
- Train actual ML models (Random Forest, XGBoost)
- Weather API integration
- Hormonal cycle tracking
- Advanced pattern recognition

## Background Tasks

Celery tasks run automatically:

1. **Daily Predictions** - 6 AM daily
2. **Model Retraining** - Every Monday at 2 AM
3. **Analytics Aggregation** - 1 AM daily

## Development

### Running Tests
```bash
python manage.py test
```

### Create New Migration
```bash
python manage.py makemigrations
python manage.py migrate
```

### Access Admin Panel
```
http://localhost:8000/admin
```

## Production Deployment

1. Set `DEBUG=False` in .env
2. Configure proper SECRET_KEY
3. Setup PostgreSQL with proper credentials
4. Configure Redis for Celery
5. Use gunicorn/uwsgi for WSGI
6. Setup nginx for reverse proxy
7. Use supervisor for Celery processes

## License

MIT License
