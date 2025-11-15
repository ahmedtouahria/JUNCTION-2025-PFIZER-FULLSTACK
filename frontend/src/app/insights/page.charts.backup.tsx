'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { analyticsAPI } from '@/lib/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';

interface Trigger {
  trigger: string;
  count: number;
}

interface Pattern {
  day_of_week?: string;
  time_of_day?: string;
  count: number;
}

interface Summary {
  total_migraines?: number;
  avg_severity?: number;
  avg_sleep?: number;
  avg_stress?: number;
  avg_hydration?: number;
  migraines?: {
    total: number;
    avg_severity: number;
  };
  daily_logs?: {
    avg_sleep: number;
    avg_stress: number;
    avg_water: number;
    log_count: number;
  };
}

interface Correlation {
  factor: string;
  migraine_days_avg: number;
  non_migraine_days_avg: number;
  difference: number;
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe', '#00C49F', '#FFBB28', '#FF8042'];

export default function InsightsPage() {
  const [triggers, setTriggers] = useState<Trigger[]>([]);
  const [patterns, setPatterns] = useState<{ day_of_week: Pattern[]; time_of_day: Pattern[] }>({
    day_of_week: [],
    time_of_day: [],
  });
  const [summary, setSummary] = useState<Summary | null>(null);
  const [correlations, setCorrelations] = useState<Correlation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [triggersRes, patternsRes, summaryRes, correlationsRes] = await Promise.all([
          analyticsAPI.getTriggers(),
          analyticsAPI.getPatterns(),
          analyticsAPI.getSummary(),
          analyticsAPI.getCorrelations(),
        ]);

        // Handle both array and object responses for triggers
        const triggersData = Array.isArray(triggersRes.data) 
          ? triggersRes.data 
          : triggersRes.data.top_triggers || [];
        setTriggers(triggersData.slice(0, 8)); // Top 8 triggers
        
        // Handle patterns data structure
        const patternsData = patternsRes.data;
        if (patternsData.day_of_week && !Array.isArray(patternsData.day_of_week)) {
          // Convert object to array format
          setPatterns({
            day_of_week: Object.entries(patternsData.day_of_week).map(([day, count]) => ({
              day_of_week: day,
              count: count as number
            })),
            time_of_day: Object.entries(patternsData.time_of_day).map(([time, count]) => ({
              time_of_day: time,
              count: count as number
            }))
          });
        } else {
          setPatterns(patternsData);
        }
        
        setSummary(summaryRes.data);
        
        // Handle correlations data
        const correlationsData = Array.isArray(correlationsRes.data)
          ? correlationsRes.data
          : correlationsRes.data.correlations || [];
        setCorrelations(correlationsData);
      } catch (err) {
        setError('Failed to load analytics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Insights & Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Understand your migraine patterns and triggers
          </p>
        </div>

        {/* Summary Stats */}
        {summary && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Migraines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{summary.total_migraines || summary.migraines?.total || 0}</p>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Avg Severity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {(summary.avg_severity || summary.migraines?.avg_severity || 0).toFixed(1)}
                </p>
                <p className="text-xs text-muted-foreground">Out of 10</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Avg Sleep
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {(summary.avg_sleep || summary.daily_logs?.avg_sleep || 0).toFixed(1)}h
                </p>
                <p className="text-xs text-muted-foreground">Per night</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Avg Stress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {(summary.avg_stress || summary.daily_logs?.avg_stress || 0).toFixed(1)}/5
                </p>
                <p className="text-xs text-muted-foreground">Stress level</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Avg Water
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {Math.round(summary.avg_hydration || summary.daily_logs?.avg_water || 0)}ml
                </p>
                <p className="text-xs text-muted-foreground">Per day</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Triggers */}
          <Card>
            <CardHeader>
              <CardTitle>Top Triggers</CardTitle>
              <p className="text-sm text-muted-foreground">
                Most common migraine triggers
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={triggers} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="trigger" type="category" width={100} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Day of Week Pattern */}
          <Card>
            <CardHeader>
              <CardTitle>Migraines by Day</CardTitle>
              <p className="text-sm text-muted-foreground">
                Which days you get migraines most
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={patterns.day_of_week}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day_of_week" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Time Pattern and Correlations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Time of Day Pattern */}
          <Card>
            <CardHeader>
              <CardTitle>Migraines by Time of Day</CardTitle>
              <p className="text-sm text-muted-foreground">
                When migraines typically occur
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={patterns.time_of_day}
                      dataKey="count"
                      nameKey="time_of_day"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {patterns.time_of_day.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Correlations */}
          <Card>
            <CardHeader>
              <CardTitle>Key Correlations</CardTitle>
              <p className="text-sm text-muted-foreground">
                Health factors on migraine vs non-migraine days
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {correlations.map((corr, index) => (
                  <div key={index} className="border-b pb-3 last:border-0">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium capitalize">{corr.factor.replace('_', ' ')}</span>
                      <span className={`text-sm font-medium ${
                        corr.difference < 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {corr.difference > 0 ? '+' : ''}{corr.difference.toFixed(1)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Migraine days</p>
                        <p className="font-medium">{corr.migraine_days_avg.toFixed(1)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Non-migraine days</p>
                        <p className="font-medium">{corr.non_migraine_days_avg.toFixed(1)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {triggers.length > 0 && (
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <p className="text-sm">
                    Your most common trigger is <strong>{triggers[0].trigger}</strong>, appearing in {triggers[0].count} migraine events.
                  </p>
                </div>
              )}
              
              {patterns.day_of_week.length > 0 && (
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <p className="text-sm">
                    You experience migraines most often on <strong>{patterns.day_of_week[0].day_of_week}s</strong>.
                  </p>
                </div>
              )}
              
              {correlations.length > 0 && (
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <p className="text-sm">
                    On migraine days, your average {correlations[0].factor.replace('_', ' ')} is{' '}
                    <strong>{Math.abs(correlations[0].difference).toFixed(1)}</strong>{' '}
                    {correlations[0].difference < 0 ? 'lower' : 'higher'} than non-migraine days.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
