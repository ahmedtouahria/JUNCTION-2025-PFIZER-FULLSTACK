'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { predictionsAPI } from '@/lib/api';
import { getRiskColor } from '@/lib/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ForecastDay {
  date: string;
  risk_score: number;
  risk_level: string;
  top_factors?: string[];
}

export default function ForecastPage() {
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await predictionsAPI.getForecast();
        setForecast(response.data);
      } catch (err) {
        setError('Failed to load forecast');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="p-4 text-red-600 bg-red-50 rounded-md border border-red-200">
            {error}
          </div>
        </div>
      </div>
    );
  }

  // Prepare data for chart
  const chartData = forecast.map(day => ({
    date: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    risk: day.risk_score,
    fullDate: day.date,
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">7-Day Forecast</h1>
          <p className="text-muted-foreground mt-1">
            Predicted migraine risk for the next week
          </p>
        </div>

        {/* Chart Card */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    domain={[0, 100]}
                    tick={{ fontSize: 12 }}
                    label={{ value: 'Risk Score', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      padding: '8px'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="risk" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    name="Risk Score"
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Daily Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {forecast.map((day, index) => {
            const date = new Date(day.date);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
            const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            const isToday = index === 0;

            return (
              <Card key={day.date} className={isToday ? 'border-primary' : ''}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        {dayName}
                        {isToday && (
                          <span className="ml-2 text-xs font-normal bg-primary text-primary-foreground px-2 py-1 rounded">
                            Today
                          </span>
                        )}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{dateStr}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-3xl font-bold">{day.risk_score}%</span>
                        <span className={`text-sm font-medium capitalize ${getRiskColor(day.risk_level)}`}>
                          {day.risk_level}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getRiskColor(day.risk_level).replace('text-', 'bg-')}`}
                          style={{ width: `${day.risk_score}%` }}
                        />
                      </div>
                    </div>

                    {day.top_factors && day.top_factors.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">
                          Top Factors:
                        </p>
                        <ul className="text-xs space-y-1">
                          {day.top_factors.slice(0, 3).map((factor, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-muted-foreground mr-1">•</span>
                              <span>{factor}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Risk Level Guide */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Level Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full bg-green-500 mt-1" />
                <div>
                  <p className="font-medium text-green-700">Low Risk (0-30%)</p>
                  <p className="text-sm text-muted-foreground">
                    Conditions are favorable. Continue healthy habits.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full bg-yellow-500 mt-1" />
                <div>
                  <p className="font-medium text-yellow-700">Moderate Risk (31-60%)</p>
                  <p className="text-sm text-muted-foreground">
                    Be mindful of triggers and take preventive measures.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full bg-red-500 mt-1" />
                <div>
                  <p className="font-medium text-red-700">High Risk (61-100%)</p>
                  <p className="text-sm text-muted-foreground">
                    Avoid known triggers and have medication ready.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
