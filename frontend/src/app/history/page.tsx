'use client';

import { useEffect, useState } from 'react';
import { predictionsAPI } from '@/lib/api';

interface HistoryDay {
  date: string;
  risk_level: string;
  explanation: string;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState<HistoryDay | null>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await predictionsAPI.getForecast();
      const forecastData = Array.isArray(response.data)
        ? response.data
        : response.data.forecast || [];

      // Create history from forecast data (last 7 days)
      const historyData: HistoryDay[] = forecastData.map((day: any) => ({
        date: day.date,
        risk_level: day.risk_level || 'low',
        explanation: day.top_factors && day.top_factors.length > 0
          ? `${day.top_factors.slice(0, 2).map((f: any) => typeof f === 'string' ? f : f.factor).join(' + ')}`
          : 'Stable conditions'
      }));

      setHistory(historyData);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDotColor = (level: string) => {
    if (level === 'low') return 'bg-risk-low-500';
    if (level === 'moderate') return 'bg-risk-moderate-500';
    return 'bg-risk-high-500';
  };

  const getDotGradient = (level: string) => {
    if (level === 'low') return 'gradient-risk-low';
    if (level === 'moderate') return 'gradient-risk-moderate';
    return 'gradient-risk-high';
  };
  
  const getRiskTextColor = (level: string) => {
    if (level === 'low') return 'text-risk-low-600';
    if (level === 'moderate') return 'text-risk-moderate-600';
    return 'text-risk-high-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-calm flex items-center justify-center px-6">
        <div className="flex gap-5">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div 
              key={i} 
              className="w-14 h-14 rounded-full bg-white/40 animate-pulse shadow-card" 
              style={{ animationDelay: `${i * 0.08}s` }}
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-calm overflow-hidden">
      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-3xl font-semibold text-neutral-900 mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            History
          </h1>
          <p className="text-sm text-neutral-600 font-normal">
            Your risk pattern over the past 7 days
          </p>
        </div>

        {/* Weekly Timeline */}
        <div className="flex justify-center gap-5 mb-14">
          {history.map((day, index) => {
            const date = new Date(day.date);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const isSelected = selectedDay?.date === day.date;

            return (
              <div 
                key={day.date} 
                className="flex flex-col items-center gap-3 animate-scale-in"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                {/* Day Label */}
                <p className={`text-xs uppercase tracking-wider font-medium transition-colors duration-300 ${
                  isSelected ? 'text-neutral-800' : 'text-neutral-500'
                }`}>
                  {dayName}
                </p>

                {/* Professional Dot */}
                <button
                  onClick={() => setSelectedDay(day)}
                  className={`relative transition-all duration-400 ease-out ${
                    isSelected ? 'scale-125' : 'hover:scale-110'
                  }`}
                >
                  {/* Outer Ring */}
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isSelected ? 'ring-4 ring-offset-2 ring-offset-neutral-50 ' + (
                      day.risk_level === 'low' ? 'ring-risk-low-200' :
                      day.risk_level === 'moderate' ? 'ring-risk-moderate-200' :
                      'ring-risk-high-200'
                    ) : ''
                  }`}>
                    {/* Color Indicator */}
                    <div className={`w-12 h-12 rounded-full ${getDotGradient(day.risk_level)} shadow-card hover:shadow-card-hover transition-all duration-300 flex items-center justify-center`}>
                      {/* White center for selected */}
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-white shadow-sm"></div>
                      )}
                    </div>
                  </div>
                </button>

                {/* Date */}
                <p className={`text-xs font-medium transition-colors duration-300 ${
                  isSelected ? 'text-neutral-700' : 'text-neutral-400'
                }`}>
                  {date.getDate()}
                </p>
              </div>
            );
          })}
        </div>

        {/* Selected Day Details Card */}
        {selectedDay && (
          <div className="glass-strong rounded-2xl p-6 border border-neutral-200/50 shadow-elevated transition-all duration-500 animate-slide-up max-w-md mx-auto">
            <div className="text-center">
              <p className="text-xs text-neutral-500 uppercase tracking-wider font-semibold mb-4">
                {new Date(selectedDay.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl mb-4 ${
                selectedDay.risk_level === 'low' ? 'bg-risk-low-100 border border-risk-low-200' :
                selectedDay.risk_level === 'moderate' ? 'bg-risk-moderate-100 border border-risk-moderate-200' :
                'bg-risk-high-100 border border-risk-high-200'
              }`}>
                <div className={`w-2 h-2 rounded-full ${getDotColor(selectedDay.risk_level)}`}></div>
                <span className={`text-sm font-semibold capitalize ${getRiskTextColor(selectedDay.risk_level)}`}>
                  {selectedDay.risk_level} Risk
                </span>
              </div>
              <p className="text-base font-normal text-neutral-700 leading-relaxed">
                {selectedDay.explanation}
              </p>
            </div>
          </div>
        )}

        {!selectedDay && (
          <div className="text-center animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <p className="text-sm text-neutral-500 font-normal">
              Tap any day to view details
            </p>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-16 text-center">
          <p className="text-xs text-neutral-400 font-normal tracking-wide">
            Pattern tracked passively over time
          </p>
        </div>
      </div>
    </div>
  );
}
