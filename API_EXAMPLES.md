# API Usage Examples

This document provides practical examples for using the Migraine Prediction System API.

## Base URL

```
http://localhost:8000/api
```

## Authentication

### Register New User

```bash
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "ahmed",
    "email": "ahmed@example.com",
    "password": "SecurePass123!",
    "password_confirm": "SecurePass123!",
    "first_name": "Ahmed",
    "last_name": "Smith"
  }'
```

### Login

```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "ahmed",
    "password": "SecurePass123!"
  }'
```

**Response:**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "username": "ahmed",
    "email": "ahmed@example.com",
    "first_name": "Ahmed",
    "last_name": "Smith"
  }
}
```

### Get User Profile

```bash
curl -X GET http://localhost:8000/api/auth/user/me/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Daily Logs

### Create Daily Log

```bash
curl -X POST http://localhost:8000/api/logs/daily/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2025-11-15",
    "sleep_hours": 7.5,
    "sleep_quality": 4,
    "stress_level": 6,
    "mood": "good",
    "water_intake": 8,
    "caffeine_intake": 2,
    "alcohol_intake": 0,
    "exercise_duration": 30,
    "exercise_intensity": "moderate",
    "notes": "Felt good today, moderate workout"
  }'
```

### Get All Daily Logs

```bash
curl -X GET http://localhost:8000/api/logs/daily/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Get Specific Log

```bash
curl -X GET http://localhost:8000/api/logs/daily/1/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Update Daily Log

```bash
curl -X PUT http://localhost:8000/api/logs/daily/1/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2025-11-15",
    "sleep_hours": 8.0,
    "sleep_quality": 5,
    "stress_level": 5,
    "mood": "great",
    "water_intake": 10,
    "caffeine_intake": 1,
    "alcohol_intake": 0,
    "exercise_duration": 45,
    "exercise_intensity": "moderate"
  }'
```

## Biometrics

### Add Biometric Data

```bash
curl -X POST http://localhost:8000/api/biometrics/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "timestamp": "2025-11-15T08:30:00Z",
    "heart_rate": 72,
    "hrv": 45.5,
    "resting_heart_rate": 65,
    "systolic_bp": 120,
    "diastolic_bp": 80,
    "steps": 8500,
    "calories_burned": 350,
    "data_source": "apple_watch"
  }'
```

### Get Biometric History

```bash
curl -X GET "http://localhost:8000/api/biometrics/?timestamp__gte=2025-11-01" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Migraine Events

### Log Migraine Event

```bash
curl -X POST http://localhost:8000/api/migraine-events/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "start_time": "2025-11-15T14:30:00Z",
    "end_time": "2025-11-15T18:45:00Z",
    "severity": 7,
    "symptoms": ["nausea", "light_sensitivity", "sound_sensitivity"],
    "pain_location": "left",
    "triggers": ["stress", "lack_of_sleep", "weather_change"],
    "medications_taken": [
      {"name": "Ibuprofen", "dosage": "400mg", "time": "14:35"}
    ],
    "relief_methods": ["dark_room", "cold_compress", "rest"],
    "effectiveness_rating": 4,
    "notes": "Started after stressful meeting, lasted about 4 hours"
  }'
```

### Get All Migraine Events

```bash
curl -X GET http://localhost:8000/api/migraine-events/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Filter by Severity

```bash
curl -X GET "http://localhost:8000/api/migraine-events/?severity__gte=7" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Predictions

### Get Today's Prediction

```bash
curl -X GET http://localhost:8000/api/predictions/today/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Response:**
```json
{
  "id": 1,
  "user": 1,
  "date": "2025-11-15",
  "risk_score": 45,
  "risk_level": "moderate",
  "top_factors": [
    {"factor": "Insufficient Sleep", "impact": 40},
    {"factor": "High Stress Level", "impact": 35},
    {"factor": "Low Water Intake", "impact": 20}
  ],
  "confidence": 75.5,
  "model_version": "1.0-simple",
  "recommendations": [
    "Try to get 7-8 hours of quality sleep tonight",
    "Practice stress-reduction techniques",
    "Drink at least 8 glasses of water today"
  ],
  "created_at": "2025-11-15T06:00:00Z"
}
```

### Get 7-Day Forecast

```bash
curl -X GET http://localhost:8000/api/predictions/forecast/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Response:**
```json
{
  "forecast": [
    {
      "date": "2025-11-15",
      "risk_score": 45,
      "risk_level": "moderate",
      "top_factors": [...],
      "confidence": 75.5,
      "recommendations": [...]
    },
    {
      "date": "2025-11-16",
      "risk_score": 35,
      "risk_level": "low",
      ...
    }
    // ... 5 more days
  ],
  "user": "ahmed"
}
```

### Generate Manual Prediction

```bash
curl -X POST http://localhost:8000/api/predictions/generate/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2025-11-16"
  }'
```

## Analytics

### Get Top Triggers

```bash
curl -X GET http://localhost:8000/api/analytics/triggers/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Response:**
```json
{
  "top_triggers": [
    {"trigger": "stress", "count": 12},
    {"trigger": "lack_of_sleep", "count": 8},
    {"trigger": "weather_change", "count": 6},
    {"trigger": "skipped_meal", "count": 4},
    {"trigger": "bright_lights", "count": 3}
  ]
}
```

### Get Weekly Patterns

```bash
curl -X GET http://localhost:8000/api/analytics/patterns/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Response:**
```json
{
  "day_of_week": {
    "Monday": 5,
    "Tuesday": 2,
    "Wednesday": 3,
    "Thursday": 4,
    "Friday": 1,
    "Saturday": 0,
    "Sunday": 1
  },
  "time_of_day": {
    "morning": 3,
    "afternoon": 8,
    "evening": 4,
    "night": 1
  },
  "total_migraines": 16
}
```

### Get Health Summary

```bash
curl -X GET http://localhost:8000/api/analytics/summary/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Response:**
```json
{
  "period": {
    "start": "2025-10-16",
    "end": "2025-11-15"
  },
  "migraines": {
    "total": 16,
    "avg_severity": 6.5
  },
  "daily_logs": {
    "avg_sleep": 7.2,
    "avg_stress": 6.8,
    "avg_water": 7.5,
    "log_count": 28
  }
}
```

### Get Correlations

```bash
curl -X GET http://localhost:8000/api/analytics/correlations/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Response:**
```json
{
  "migraine_days": {
    "avg_sleep": 6.2,
    "avg_stress": 7.8,
    "avg_water": 5.5
  },
  "non_migraine_days": {
    "avg_sleep": 7.8,
    "avg_stress": 5.2,
    "avg_water": 8.2
  }
}
```

## Python Client Example

```python
import requests
from datetime import datetime, timedelta

class MigraineTrackerClient:
    def __init__(self, base_url="http://localhost:8000/api"):
        self.base_url = base_url
        self.token = None
    
    def login(self, username, password):
        response = requests.post(f"{self.base_url}/auth/login/", json={
            "username": username,
            "password": password
        })
        data = response.json()
        self.token = data['access']
        return data
    
    def headers(self):
        return {"Authorization": f"Bearer {self.token}"}
    
    def create_daily_log(self, **kwargs):
        return requests.post(
            f"{self.base_url}/logs/daily/",
            headers=self.headers(),
            json=kwargs
        ).json()
    
    def log_migraine(self, **kwargs):
        return requests.post(
            f"{self.base_url}/migraine-events/",
            headers=self.headers(),
            json=kwargs
        ).json()
    
    def get_today_prediction(self):
        return requests.get(
            f"{self.base_url}/predictions/today/",
            headers=self.headers()
        ).json()
    
    def get_forecast(self):
        return requests.get(
            f"{self.base_url}/predictions/forecast/",
            headers=self.headers()
        ).json()

# Usage
client = MigraineTrackerClient()
client.login("ahmed", "SecurePass123!")

# Create daily log
client.create_daily_log(
    date=datetime.now().date().isoformat(),
    sleep_hours=7.5,
    sleep_quality=4,
    stress_level=6,
    mood="good",
    water_intake=8,
    exercise_duration=30,
    exercise_intensity="moderate"
)

# Get prediction
prediction = client.get_today_prediction()
print(f"Risk: {prediction['risk_score']}% - {prediction['risk_level']}")
print(f"Recommendations: {prediction['recommendations']}")

# Get forecast
forecast = client.get_forecast()
for day in forecast['forecast']:
    print(f"{day['date']}: {day['risk_score']}% ({day['risk_level']})")
```

## JavaScript/TypeScript Example

```typescript
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

class MigraineTrackerAPI {
  private token: string | null = null;

  async login(username: string, password: string) {
    const response = await axios.post(`${API_URL}/auth/login/`, {
      username,
      password,
    });
    this.token = response.data.access;
    return response.data;
  }

  private headers() {
    return {
      Authorization: `Bearer ${this.token}`,
    };
  }

  async createDailyLog(data: any) {
    return axios.post(`${API_URL}/logs/daily/`, data, {
      headers: this.headers(),
    });
  }

  async getTodayPrediction() {
    return axios.get(`${API_URL}/predictions/today/`, {
      headers: this.headers(),
    });
  }

  async getForecast() {
    return axios.get(`${API_URL}/predictions/forecast/`, {
      headers: this.headers(),
    });
  }
}

// Usage
const api = new MigraineTrackerAPI();
await api.login('ahmed', 'SecurePass123!');

const prediction = await api.getTodayPrediction();
console.log(`Risk: ${prediction.data.risk_score}%`);
```

## Error Handling

All API endpoints return standard HTTP status codes:

- `200 OK` - Success
- `201 Created` - Resource created
- `400 Bad Request` - Validation error
- `401 Unauthorized` - Invalid/missing token
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

**Error Response Format:**
```json
{
  "detail": "Error message here",
  "field_errors": {
    "email": ["This field is required."],
    "password": ["Password too short."]
  }
}
```

## Rate Limiting

Currently no rate limiting in development. For production, consider implementing rate limiting with Django REST framework throttling.

## Pagination

List endpoints support pagination:

```bash
curl -X GET "http://localhost:8000/api/logs/daily/?page=2&page_size=10" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Response:**
```json
{
  "count": 100,
  "next": "http://localhost:8000/api/logs/daily/?page=3",
  "previous": "http://localhost:8000/api/logs/daily/?page=1",
  "results": [...]
}
```

## Filtering & Sorting

```bash
# Filter by date range
curl -X GET "http://localhost:8000/api/logs/daily/?date__gte=2025-11-01&date__lte=2025-11-15"

# Sort by date (descending)
curl -X GET "http://localhost:8000/api/logs/daily/?ordering=-date"

# Combine filters
curl -X GET "http://localhost:8000/api/migraine-events/?severity__gte=7&ordering=-start_time"
```

---

For more details, see the main README files in `backend/` and `frontend/` directories.
