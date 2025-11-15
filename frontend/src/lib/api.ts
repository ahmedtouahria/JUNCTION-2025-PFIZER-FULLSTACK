import axios from 'axios';
import {
  USE_MOCK_DATA,
  mockAuthAPI,
  mockLogsAPI,
  mockBiometricsAPI,
  mockMigraineAPI,
  mockPredictionsAPI,
  mockAnalyticsAPI,
} from './mockApi';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(`${API_URL}/auth/token/refresh/`, {
            refresh: refreshToken,
          });

          const { access } = response.data;
          localStorage.setItem('accessToken', access);

          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh token failed, logout user
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

// API Services - Use mock data if enabled

// Auth
export const authAPI = USE_MOCK_DATA ? mockAuthAPI : {
  register: (data: any) => api.post('/auth/register/', data),
  login: (data: any) => api.post('/auth/login/', data),
  logout: () => api.post('/auth/logout/'),
  getUserProfile: () => api.get('/auth/user/me/'),
  updateUserProfile: (data: any) => api.put('/auth/user/me/', data),
};

// Daily Logs
export const logsAPI = USE_MOCK_DATA ? mockLogsAPI : {
  getAll: (params?: any) => api.get('/logs/daily/', { params }),
  create: (data: any) => api.post('/logs/daily/', data),
  get: (id: number) => api.get(`/logs/daily/${id}/`),
  update: (id: number, data: any) => api.put(`/logs/daily/${id}/`, data),
  delete: (id: number) => api.delete(`/logs/daily/${id}/`),
};

// Biometrics
export const biometricsAPI = USE_MOCK_DATA ? mockBiometricsAPI : {
  getAll: (params?: any) => api.get('/biometrics/', { params }),
  create: (data: any) => api.post('/biometrics/', data),
  get: (id: number) => api.get(`/biometrics/${id}/`),
  update: (id: number, data: any) => api.put(`/biometrics/${id}/`, data),
  delete: (id: number) => api.delete(`/biometrics/${id}/`),
};

// Migraine Events
export const migraineAPI = USE_MOCK_DATA ? mockMigraineAPI : {
  getAll: (params?: any) => api.get('/migraine-events/', { params }),
  create: (data: any) => api.post('/migraine-events/', data),
  get: (id: number) => api.get(`/migraine-events/${id}/`),
  update: (id: number, data: any) => api.put(`/migraine-events/${id}/`, data),
  delete: (id: number) => api.delete(`/migraine-events/{id}/`),
};

// Predictions
export const predictionsAPI = USE_MOCK_DATA ? mockPredictionsAPI : {
  getAll: () => api.get('/predictions/'),
  getToday: () => api.get('/predictions/today/'),
  getForecast: () => api.get('/predictions/forecast/'),
  generate: (data?: any) => api.post('/predictions/generate/', data),
};

// Analytics
export const analyticsAPI = USE_MOCK_DATA ? mockAnalyticsAPI : {
  getTriggers: () => api.get('/analytics/triggers/'),
  getPatterns: () => api.get('/analytics/patterns/'),
  getSummary: () => api.get('/analytics/summary/'),
  getCorrelations: () => api.get('/analytics/correlations/'),
};
