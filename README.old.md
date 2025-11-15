# 🧠 Migraine Prediction System

**AI-Powered Migraine Prediction & Health Tracking Platform**

A full-stack application combining Django REST API backend with Next.js frontend to predict migraine risk, track health data, and provide personalized insights.

---

## 🌟 Features

### 🔮 Smart Prediction
- **Daily Risk Assessment** - ML-powered migraine risk prediction (0-100%)
- **7-Day Forecast** - Weekly risk outlook
- **Confidence Scores** - Prediction reliability metrics
- **Top Contributing Factors** - Identify key risk drivers

### 📊 Health Tracking
- **Daily Logs** - Sleep, stress, mood, hydration, exercise
- **Biometrics** - Heart rate, HRV, blood pressure
- **Migraine Events** - Detailed symptom and trigger logging
- **Medications** - Track treatments and effectiveness

### 📈 Analytics & Insights
- **Trigger Analysis** - Discover your migraine triggers
- **Pattern Recognition** - Weekly and daily patterns
- **Correlations** - Sleep, stress, and migraine relationships
- **Personalized Recommendations** - AI-generated preventive advice

### 🎨 Beautiful UI
- Clean, minimal design inspired by Apple Health
- Responsive across all devices
- Dark mode support
- Smooth animations and transitions

---

## 🚀 Quick Start

### Prerequisites

- **Python 3.10+**
- **Node.js 18+**
- **PostgreSQL**
- **Redis**

### 1. Clone Repository

```bash
git clone <repository-url>
cd JUNCTION-2025-PFIZER-FULLSTACK
```

### 2. Setup Backend

```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your database credentials

# Create database
createdb migraine_db

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

**Backend runs on:** `http://localhost:8000`

### 3. Setup Celery (Separate Terminals)

```bash
# Terminal 1 - Celery Worker
celery -A migraine_backend worker -l info

# Terminal 2 - Celery Beat (Scheduler)
celery -A migraine_backend beat -l info
```

### 4. Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.local.example .env.local

# Start development server
npm run dev
```

**Frontend runs on:** `http://localhost:3000`

---

## 📚 Project Structure

```
JUNCTION-2025-PFIZER-FULLSTACK/
├── backend/                    # Django Backend
│   ├── migraine_backend/       # Project settings
│   ├── accounts/               # User authentication
│   ├── logs/                   # Daily health logs
│   ├── biometrics/             # Biometric data
│   ├── migraine/               # Migraine events
│   ├── predictions/            # ML prediction engine
│   ├── analytics/              # Data analytics
│   └── README.md
│
├── frontend/                   # Next.js Frontend
│   ├── src/app/               # Pages (App Router)
│   ├── src/components/        # React components
│   ├── src/lib/               # API, store, utils
│   └── README.md
│
└── README.md                   # This file
```

---

## 📖 Documentation

- **Backend API:** See `backend/README.md`
- **Frontend:** See `frontend/README.md`

---

## 🛠️ Tech Stack

### Backend
- Django 5.0 + Django REST Framework
- PostgreSQL + Redis
- Celery for background tasks
- JWT Authentication
- Python ML Libraries

### Frontend
- Next.js 14 (App Router)
- TypeScript + Tailwind CSS
- shadcn/ui components
- Zustand state management
- Axios + Recharts

---

## 📝 License

MIT License

---

**Built for JUNCTION 2025 - Pfizer Challenge** 🎯