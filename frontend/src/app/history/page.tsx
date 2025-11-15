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
    if (level === 'low') return 'bg-green-400';
    if (level === 'moderate') return 'bg-yellow-400';
    return 'bg-red-400';
  };

  const getDotGradient = (level: string) => {
    if (level === 'low') return 'from-green-300 to-green-400';
    if (level === 'moderate') return 'from-yellow-300 to-yellow-400';
    return 'from-red-300 to-red-400';
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-calm flex items-center justify-center">
        <div className="animate-pulse">
          <div className="flex gap-4">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="w-12 h-12 rounded-full bg-white/30"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-calm">
      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl font-extralight text-foreground/90 mb-2">
            Recent Days
          </h1>
          <p className="text-sm text-muted-foreground font-light">
            Your migraine risk over the past week
          </p>
        </div>

        {/* Weekly Dots */}
        <div className="flex justify-center gap-6 mb-12">
          {history.map((day, index) => {
            const date = new Date(day.date);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const isSelected = selectedDay?.date === day.date;

            return (
              <div key={day.date} className="flex flex-col items-center gap-3">
                {/* Day Label */}
                <p className="text-xs text-muted-foreground font-light uppercase tracking-wider">
                  {dayName}
                </p>

                {/* Dot */}
                <button
                  onClick={() => setSelectedDay(day)}
                  className={`relative w-16 h-16 rounded-full transition-all duration-300 ${
                    isSelected ? 'scale-125 shadow-aurora' : 'hover:scale-110'
                  }`}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${getDotGradient(day.risk_level)}`}></div>
                  
                  {/* Glow Effect on Selected */}
                  {isSelected && (
                    <div className={`absolute inset-0 rounded-full ${getDotColor(day.risk_level)} opacity-30 blur-xl scale-150`}></div>
                  )}

                  {/* Inner Circle */}
                  {isSelected && (
                    <div className="absolute inset-2 rounded-full bg-white"></div>
                  )}
                </button>

                {/* Date */}
                <p className="text-xs text-muted-foreground/60 font-light">
                  {date.getDate()}
                </p>
              </div>
            );
          })}
        </div>

        {/* Selected Day Explanation */}
        {selectedDay && (
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl px-8 py-6 shadow-calm transition-all duration-300">
            <div className="text-center">
              <p className="text-sm text-muted-foreground uppercase tracking-widest font-light mb-3">
                {new Date(selectedDay.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <p className="text-base font-light text-foreground/80 leading-relaxed">
                {selectedDay.explanation}
              </p>
              <p className={`text-sm font-light mt-3 capitalize ${
                selectedDay.risk_level === 'low' ? 'text-green-600' :
                selectedDay.risk_level === 'moderate' ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {selectedDay.risk_level} risk
              </p>
            </div>
          </div>
        )}

        {!selectedDay && (
          <div className="text-center">
            <p className="text-sm text-muted-foreground/60 font-light">
              Tap a day to see details
            </p>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-16 text-center">
          <p className="text-xs text-muted-foreground/40 font-light">
            Passively tracked patterns
          </p>
        </div>
      </div>
    </div>
  );
}
