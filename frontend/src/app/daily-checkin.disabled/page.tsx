'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { logsAPI } from '@/lib/api';

export default function DailyCheckinPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    sleep_hours: '',
    sleep_quality: '3',
    stress_level: '3',
    mood: '3',
    hydration_ml: '',
    exercise_minutes: '',
    caffeine_mg: '',
    alcohol_servings: '',
    notes: '',
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      // Convert string values to appropriate types
      const dataToSend = {
        date: formData.date,
        sleep_hours: parseFloat(formData.sleep_hours) || 0,
        sleep_quality: parseInt(formData.sleep_quality),
        stress_level: parseInt(formData.stress_level),
        mood: parseInt(formData.mood),
        hydration_ml: parseInt(formData.hydration_ml) || 0,
        exercise_minutes: parseInt(formData.exercise_minutes) || 0,
        caffeine_mg: parseInt(formData.caffeine_mg) || 0,
        alcohol_servings: parseInt(formData.alcohol_servings) || 0,
        notes: formData.notes || '',
      };

      await logsAPI.create(dataToSend);
      setSuccess(true);
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to save daily log. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Daily Check-in</h1>
          <p className="text-muted-foreground mt-1">
            Log your daily activities and health metrics
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Log</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {success && (
                <div className="p-3 text-sm text-green-600 bg-green-50 rounded-md border border-green-200">
                  ✓ Daily log saved successfully! Redirecting...
                </div>
              )}

              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-200">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sleep_hours">Sleep Hours</Label>
                  <Input
                    id="sleep_hours"
                    name="sleep_hours"
                    type="number"
                    step="0.5"
                    min="0"
                    max="24"
                    placeholder="7.5"
                    value={formData.sleep_hours}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sleep_quality">Sleep Quality (1-5)</Label>
                  <Select
                    id="sleep_quality"
                    name="sleep_quality"
                    value={formData.sleep_quality}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  >
                    <option value="1">1 - Very Poor</option>
                    <option value="2">2 - Poor</option>
                    <option value="3">3 - Fair</option>
                    <option value="4">4 - Good</option>
                    <option value="5">5 - Excellent</option>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stress_level">Stress Level (1-5)</Label>
                  <Select
                    id="stress_level"
                    name="stress_level"
                    value={formData.stress_level}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  >
                    <option value="1">1 - Very Low</option>
                    <option value="2">2 - Low</option>
                    <option value="3">3 - Moderate</option>
                    <option value="4">4 - High</option>
                    <option value="5">5 - Very High</option>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mood">Mood (1-5)</Label>
                  <Select
                    id="mood"
                    name="mood"
                    value={formData.mood}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  >
                    <option value="1">1 - Very Bad</option>
                    <option value="2">2 - Bad</option>
                    <option value="3">3 - Neutral</option>
                    <option value="4">4 - Good</option>
                    <option value="5">5 - Very Good</option>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hydration_ml">Water Intake (ml)</Label>
                  <Input
                    id="hydration_ml"
                    name="hydration_ml"
                    type="number"
                    min="0"
                    placeholder="2000"
                    value={formData.hydration_ml}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="exercise_minutes">Exercise (minutes)</Label>
                  <Input
                    id="exercise_minutes"
                    name="exercise_minutes"
                    type="number"
                    min="0"
                    placeholder="30"
                    value={formData.exercise_minutes}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="caffeine_mg">Caffeine (mg)</Label>
                  <Input
                    id="caffeine_mg"
                    name="caffeine_mg"
                    type="number"
                    min="0"
                    placeholder="200"
                    value={formData.caffeine_mg}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alcohol_servings">Alcohol (servings)</Label>
                  <Input
                    id="alcohol_servings"
                    name="alcohol_servings"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={formData.alcohol_servings}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Any additional notes about your day..."
                  value={formData.notes}
                  onChange={handleChange}
                  disabled={loading}
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? 'Saving...' : 'Save Daily Log'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/')}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
