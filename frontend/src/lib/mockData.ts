// Mock data for development without backend

export const mockUser = {
  id: 1,
  username: "demo_user",
  email: "demo@migrainetracker.com",
  first_name: "Ahmed",
  last_name: "Demo",
  dark_mode: false,
  created_at: "2025-11-01T00:00:00Z",
};

export const mockPrediction = {
  id: 1,
  user: 1,
  date: new Date().toISOString().split('T')[0],
  risk_score: 45,
  risk_level: "moderate",
  top_factors: [
    { factor: "Insufficient Sleep", impact: 40 },
    { factor: "High Stress Level", impact: 35 },
    { factor: "Low Water Intake", impact: 20 }
  ],
  confidence: 75.5,
  model_version: "1.0-simple",
  recommendations: [
    "Try to get 7-8 hours of quality sleep tonight",
    "Practice stress-reduction techniques (meditation, deep breathing)",
    "Drink at least 8 glasses of water today",
    "Aim for 30 minutes of light exercise"
  ],
  created_at: new Date().toISOString()
};

export const mockSummary = {
  period: {
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  },
  migraines: {
    total: 8,
    avg_severity: 6.5
  },
  daily_logs: {
    avg_sleep: 7.2,
    avg_stress: 6.8,
    avg_water: 7.5,
    log_count: 28
  }
};

export const mockForecast = {
  forecast: [
    {
      date: new Date().toISOString().split('T')[0],
      risk_score: 45,
      risk_level: "moderate",
      top_factors: [
        { factor: "Insufficient Sleep", impact: 40 },
        { factor: "High Stress Level", impact: 35 }
      ],
      confidence: 75.5,
      recommendations: ["Get more sleep", "Reduce stress"]
    },
    {
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      risk_score: 30,
      risk_level: "low",
      top_factors: [
        { factor: "Good Sleep Pattern", impact: 10 }
      ],
      confidence: 80.0,
      recommendations: ["Continue healthy habits"]
    },
    {
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      risk_score: 55,
      risk_level: "moderate",
      top_factors: [
        { factor: "Weather Changes", impact: 45 }
      ],
      confidence: 70.0,
      recommendations: ["Monitor weather", "Stay hydrated"]
    },
    {
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      risk_score: 65,
      risk_level: "high",
      top_factors: [
        { factor: "High Stress", impact: 50 },
        { factor: "Poor Sleep", impact: 40 }
      ],
      confidence: 82.0,
      recommendations: ["Avoid triggers", "Keep medication handy"]
    },
    {
      date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      risk_score: 40,
      risk_level: "moderate",
      top_factors: [
        { factor: "Stress Recovery", impact: 30 }
      ],
      confidence: 75.0,
      recommendations: ["Maintain good habits"]
    },
    {
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      risk_score: 25,
      risk_level: "low",
      top_factors: [],
      confidence: 85.0,
      recommendations: ["Great job! Keep it up"]
    },
    {
      date: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      risk_score: 20,
      risk_level: "low",
      top_factors: [],
      confidence: 88.0,
      recommendations: ["Excellent health patterns"]
    }
  ],
  user: "demo_user"
};

export const mockDailyLogs = [
  {
    id: 1,
    date: new Date().toISOString().split('T')[0],
    sleep_hours: 7.5,
    sleep_quality: 4,
    stress_level: 6,
    mood: "good",
    water_intake: 8,
    caffeine_intake: 2,
    alcohol_intake: 0,
    exercise_duration: 30,
    exercise_intensity: "moderate",
    notes: "Felt good today"
  },
  {
    id: 2,
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    sleep_hours: 6.5,
    sleep_quality: 3,
    stress_level: 7,
    mood: "okay",
    water_intake: 6,
    caffeine_intake: 3,
    alcohol_intake: 0,
    exercise_duration: 0,
    exercise_intensity: "none",
    notes: "Stressful day at work"
  }
];

export const mockMigraineEvents = [
  {
    id: 1,
    start_time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    end_time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000).toISOString(),
    severity: 7,
    symptoms: ["nausea", "light_sensitivity", "sound_sensitivity"],
    pain_location: "left",
    triggers: ["stress", "lack_of_sleep"],
    medications_taken: [
      { name: "Ibuprofen", dosage: "400mg" }
    ],
    relief_methods: ["dark_room", "rest"],
    effectiveness_rating: 4,
    duration_hours: 4,
    notes: "Started after stressful meeting"
  }
];

export const mockTriggers = {
  top_triggers: [
    { trigger: "stress", count: 12 },
    { trigger: "lack_of_sleep", count: 8 },
    { trigger: "weather_change", count: 6 },
    { trigger: "skipped_meal", count: 4 },
    { trigger: "bright_lights", count: 3 },
    { trigger: "loud_noises", count: 2 },
    { trigger: "alcohol", count: 2 },
    { trigger: "caffeine", count: 1 }
  ]
};

export const mockPatterns = {
  day_of_week: {
    "Monday": 5,
    "Tuesday": 2,
    "Wednesday": 3,
    "Thursday": 4,
    "Friday": 1,
    "Saturday": 0,
    "Sunday": 1
  },
  time_of_day: {
    "morning": 3,
    "afternoon": 8,
    "evening": 4,
    "night": 1
  },
  total_migraines: 16
};

export const mockCorrelations = {
  migraine_days: {
    avg_sleep: 6.2,
    avg_stress: 7.8,
    avg_water: 5.5
  },
  non_migraine_days: {
    avg_sleep: 7.8,
    avg_stress: 5.2,
    avg_water: 8.2
  }
};

export const mockBiometrics = [
  {
    id: 1,
    timestamp: new Date().toISOString(),
    heart_rate: 72,
    hrv: 45.5,
    resting_heart_rate: 65,
    systolic_bp: 120,
    diastolic_bp: 80,
    steps: 8500,
    calories_burned: 350,
    data_source: "apple_watch"
  }
];
