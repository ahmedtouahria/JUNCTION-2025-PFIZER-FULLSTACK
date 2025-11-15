// Mock API service for development without backend
// Toggle USE_MOCK_DATA to switch between mock and real API

import {
  mockUser,
  mockPrediction,
  mockSummary,
  mockForecast,
  mockDailyLogs,
  mockMigraineEvents,
  mockTriggers,
  mockPatterns,
  mockCorrelations,
  mockBiometrics
} from './mockData';

// Set to true to use mock data, false to use real API
export const USE_MOCK_DATA = true;

// Simulate API delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock response wrapper
const mockResponse = async <T,>(data: T) => {
  await delay();
  return { data };
};

// Mock Auth API
export const mockAuthAPI = {
  register: async (data: any) => {
    await delay();
    return {
      data: {
        ...mockUser,
        username: data.username,
        email: data.email,
        first_name: data.first_name || '',
        last_name: data.last_name || '',
      }
    };
  },

  login: async (data: any) => {
    await delay();
    // Store mock tokens in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', 'mock-access-token');
      localStorage.setItem('refreshToken', 'mock-refresh-token');
    }
    return {
      data: {
        access: 'mock-access-token',
        refresh: 'mock-refresh-token',
        user: mockUser
      }
    };
  },

  logout: async () => {
    await delay();
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
    return { data: { detail: "Successfully logged out." } };
  },

  getUserProfile: async () => mockResponse(mockUser),

  updateUserProfile: async (data: any) => mockResponse({ ...mockUser, ...data }),
};

// Mock Daily Logs API
export const mockLogsAPI = {
  getAll: async (params?: any) => mockResponse({ results: mockDailyLogs, count: mockDailyLogs.length }),

  create: async (data: any) => {
    await delay();
    const newLog = {
      id: mockDailyLogs.length + 1,
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    return { data: newLog };
  },

  get: async (id: number) => {
    await delay();
    const log = mockDailyLogs.find(l => l.id === id) || mockDailyLogs[0];
    return { data: log };
  },

  update: async (id: number, data: any) => {
    await delay();
    const log = mockDailyLogs.find(l => l.id === id) || mockDailyLogs[0];
    return { data: { ...log, ...data } };
  },

  delete: async (id: number) => {
    await delay();
    return { data: {} };
  },
};

// Mock Biometrics API
export const mockBiometricsAPI = {
  getAll: async (params?: any) => mockResponse({ results: mockBiometrics, count: mockBiometrics.length }),

  create: async (data: any) => {
    await delay();
    const newBio = {
      id: mockBiometrics.length + 1,
      ...data,
      created_at: new Date().toISOString()
    };
    return { data: newBio };
  },

  get: async (id: number) => mockResponse(mockBiometrics[0]),

  update: async (id: number, data: any) => {
    await delay();
    return { data: { ...mockBiometrics[0], ...data } };
  },

  delete: async (id: number) => {
    await delay();
    return { data: {} };
  },
};

// Mock Migraine API
export const mockMigraineAPI = {
  getAll: async (params?: any) => mockResponse({ results: mockMigraineEvents, count: mockMigraineEvents.length }),

  create: async (data: any) => {
    await delay();
    const newEvent = {
      id: mockMigraineEvents.length + 1,
      ...data,
      duration_hours: data.end_time ? 
        (new Date(data.end_time).getTime() - new Date(data.start_time).getTime()) / (1000 * 60 * 60) : null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    return { data: newEvent };
  },

  get: async (id: number) => mockResponse(mockMigraineEvents[0]),

  update: async (id: number, data: any) => {
    await delay();
    return { data: { ...mockMigraineEvents[0], ...data } };
  },

  delete: async (id: number) => {
    await delay();
    return { data: {} };
  },
};

// Mock Predictions API
export const mockPredictionsAPI = {
  getAll: async () => mockResponse({ results: [mockPrediction], count: 1 }),

  getToday: async () => mockResponse(mockPrediction),

  getForecast: async () => mockResponse(mockForecast),

  generate: async (data?: any) => mockResponse(mockPrediction),
};

// Mock Analytics API
export const mockAnalyticsAPI = {
  getTriggers: async () => mockResponse(mockTriggers),

  getPatterns: async () => mockResponse(mockPatterns),

  getSummary: async () => mockResponse(mockSummary),

  getCorrelations: async () => mockResponse(mockCorrelations),
};
