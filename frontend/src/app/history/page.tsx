'use client';

import { useState } from 'react';
import { Calendar, TrendingDown, BarChart3 } from 'lucide-react';

export default function HistoryPage() {
  const [viewMode, setViewMode] = useState<'timeline' | 'chart' | 'insights'>('timeline');

  const historyData = [
    { date: '2024-11-15', risk: 25, level: 'low', sleep: 8.2, stress: 2 },
    { date: '2024-11-14', risk: 65, level: 'moderate', sleep: 6.1, stress: 7 },
    { date: '2024-11-13', risk: 20, level: 'low', sleep: 7.8, stress: 3 },
    { date: '2024-11-12', risk: 85, level: 'high', sleep: 4.5, stress: 9 },
    { date: '2024-11-11', risk: 45, level: 'moderate', sleep: 6.8, stress: 5 },
  ];

  const getRiskColor = (level: string) => {
    if (level === 'low') return 'bg-green-100 text-green-800';
    if (level === 'moderate') return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white px-6 py-8">
      <div className="max-w-sm mx-auto">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-neutral-900 mb-2">
            History
          </h1>
          <p className="text-neutral-600">
            Track your wellness patterns
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100 text-center">
            <div className="text-2xl font-bold text-neutral-900">48%</div>
            <div className="text-xs text-neutral-600">Avg Risk</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100 text-center">
            <div className="text-2xl font-bold text-green-600">↓</div>
            <div className="text-xs text-neutral-600">Trending</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100 text-center">
            <div className="text-2xl font-bold text-green-600">2</div>
            <div className="text-xs text-neutral-600">Good Days</div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex rounded-2xl p-1 shadow-sm border bg-white mb-6">
          {(['timeline', 'chart', 'insights'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`flex-1 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 capitalize ${
                viewMode === mode
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Content */}
        {viewMode === 'timeline' && (
          <div className="space-y-3">
            {historyData.map((day) => (
              <div key={day.date} className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium text-neutral-900">
                      {new Date(day.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(day.level)}`}>
                    {day.risk}% {day.level}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>Sleep: {day.sleep}h</div>
                  <div>Stress: {day.stress}/10</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {viewMode === 'chart' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Risk Trend</h3>
            <div className="flex items-end justify-center gap-2 h-32 mb-4">
              {historyData.map((day, index) => (
                <div
                  key={index}
                  className="flex-1 bg-primary-200 rounded-t-lg max-w-12"
                  style={{ height: `${day.risk}%` }}
                  title={`${day.risk}%`}
                />
              ))}
            </div>
            <div className="text-center text-sm text-neutral-600">
              Last 5 days
            </div>
          </div>
        )}

        {viewMode === 'insights' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Key Insights</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <TrendingDown className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-neutral-700">Risk levels improving</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-neutral-700">Sleep affects risk levels</span>
                </div>
                <div className="flex items-center space-x-3">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  <span className="text-sm text-neutral-700">Stress is a key trigger</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
