'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { predictionsAPI, analyticsAPI } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getRiskColor, getRiskBgColor } from '@/lib/utils';
import { 
  Activity, 
  Brain, 
  Calendar, 
  TrendingUp, 
  AlertCircle,
  Plus
} from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    fetchData();
  }, [isAuthenticated]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [predResponse, summaryResponse] = await Promise.all([
        predictionsAPI.getToday(),
        analyticsAPI.getSummary(),
      ]);
      setPrediction(predResponse.data);
      setSummary(summaryResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Aurora</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {user?.first_name || user?.username}!
            </span>
            <Button variant="outline" size="sm" onClick={() => router.push('/settings')}>
              Settings
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Today's Risk Card - Hero Section */}
        <div className="mb-8">
          <Card className="border-2 shadow-lg">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-lg text-muted-foreground">Today's Migraine Risk</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              {prediction ? (
                <>
                  <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${getRiskBgColor(prediction.risk_level)} mb-4`}>
                    <div className="text-white">
                      <div className="text-4xl font-bold">{prediction.risk_score}%</div>
                    </div>
                  </div>
                  <h2 className={`text-3xl font-bold mb-4 ${getRiskColor(prediction.risk_level)}`}>
                    {prediction.risk_level.toUpperCase()}
                  </h2>
                  
                  {/* Top Factors */}
                  <div className="mt-6 space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Top Contributing Factors:</p>
                    {prediction.top_factors?.map((factor: any, index: number) => (
                      <div key={index} className="flex items-center justify-center gap-2">
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                        <span className="text-sm">{factor.factor}</span>
                      </div>
                    ))}
                  </div>

                  {/* Recommendations */}
                  {prediction.recommendations?.length > 0 && (
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm font-medium mb-2">💡 Recommendations:</p>
                      <ul className="text-sm space-y-1 text-left max-w-md mx-auto">
                        {prediction.recommendations.map((rec: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Button className="mt-6" size="lg" onClick={() => router.push('/log-symptoms')}>
                    <Plus className="mr-2 h-5 w-5" />
                    Log Symptoms
                  </Button>
                </>
              ) : (
                <div>
                  <p className="text-muted-foreground mb-4">No prediction available yet</p>
                  <Button onClick={fetchData}>Generate Prediction</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => router.push('/daily-checkin')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Daily Check-in</CardTitle>
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Log your daily health data</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => router.push('/forecast')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">7-Day Forecast</CardTitle>
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">View upcoming risk prediction</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => router.push('/insights')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Health Insights</CardTitle>
              <Activity className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Analyze triggers & patterns</p>
            </CardContent>
          </Card>
        </div>

        {/* Summary Stats */}
        {summary && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Migraines (30d)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summary.migraines?.total || 0}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Avg Sleep</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {summary.daily_logs?.avg_sleep?.toFixed(1) || 0}h
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Avg Stress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {summary.daily_logs?.avg_stress?.toFixed(1) || 0}/10
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Water Intake</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {summary.daily_logs?.avg_water?.toFixed(0) || 0} glasses
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
