'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { migraineAPI } from '@/lib/api';

const COMMON_SYMPTOMS = [
  'Throbbing pain',
  'Nausea',
  'Vomiting',
  'Sensitivity to light',
  'Sensitivity to sound',
  'Aura',
  'Dizziness',
  'Blurred vision',
];

const COMMON_TRIGGERS = [
  'Stress',
  'Lack of sleep',
  'Weather changes',
  'Bright lights',
  'Loud noises',
  'Strong smells',
  'Caffeine',
  'Alcohol',
  'Dehydration',
  'Missed meals',
  'Chocolate',
  'Cheese',
  'Processed foods',
  'Hormonal changes',
];

export default function LogSymptomsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    start_time: new Date().toISOString().slice(0, 16),
    end_time: '',
    severity: '5',
    location: 'both',
    notes: '',
  });
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
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

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const toggleTrigger = (trigger: string) => {
    setSelectedTriggers(prev =>
      prev.includes(trigger)
        ? prev.filter(t => t !== trigger)
        : [...prev, trigger]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      const dataToSend = {
        start_time: formData.start_time,
        end_time: formData.end_time || null,
        severity: parseInt(formData.severity),
        location: formData.location,
        symptoms: selectedSymptoms,
        triggers: selectedTriggers,
        notes: formData.notes || '',
      };

      await migraineAPI.create(dataToSend);
      setSuccess(true);
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to save migraine event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Log Migraine Event</h1>
          <p className="text-muted-foreground mt-1">
            Record details about your migraine
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Migraine Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {success && (
                <div className="p-3 text-sm text-green-600 bg-green-50 rounded-md border border-green-200">
                  ✓ Migraine event saved successfully! Redirecting...
                </div>
              )}

              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-200">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start_time">Start Time</Label>
                  <Input
                    id="start_time"
                    name="start_time"
                    type="datetime-local"
                    value={formData.start_time}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end_time">End Time (optional)</Label>
                  <Input
                    id="end_time"
                    name="end_time"
                    type="datetime-local"
                    value={formData.end_time}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="severity">Severity (1-10)</Label>
                  <Select
                    id="severity"
                    name="severity"
                    value={formData.severity}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>
                        {num} {num <= 3 ? '- Mild' : num <= 6 ? '- Moderate' : '- Severe'}
                      </option>
                    ))}
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Pain Location</Label>
                  <Select
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  >
                    <option value="left">Left side</option>
                    <option value="right">Right side</option>
                    <option value="both">Both sides</option>
                    <option value="front">Front</option>
                    <option value="back">Back</option>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Symptoms</Label>
                <div className="grid grid-cols-2 gap-2">
                  {COMMON_SYMPTOMS.map(symptom => (
                    <button
                      key={symptom}
                      type="button"
                      onClick={() => toggleSymptom(symptom)}
                      disabled={loading}
                      className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                        selectedSymptoms.includes(symptom)
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background hover:bg-accent border-input'
                      }`}
                    >
                      {symptom}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Possible Triggers</Label>
                <div className="grid grid-cols-2 gap-2">
                  {COMMON_TRIGGERS.map(trigger => (
                    <button
                      key={trigger}
                      type="button"
                      onClick={() => toggleTrigger(trigger)}
                      disabled={loading}
                      className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                        selectedTriggers.includes(trigger)
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background hover:bg-accent border-input'
                      }`}
                    >
                      {trigger}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes (optional)</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Any additional details about this migraine..."
                  value={formData.notes}
                  onChange={handleChange}
                  disabled={loading}
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? 'Saving...' : 'Save Migraine Event'}
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
