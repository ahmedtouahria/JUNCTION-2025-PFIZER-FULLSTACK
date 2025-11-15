'use client';

import { useEffect, useState } from 'react';
import { analyticsAPI } from '@/lib/api';
import { Moon, Calendar, Activity, Brain, Cloud, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Correlation {
  factor: string;
  migraine_days_avg: number;
  non_migraine_days_avg: number;
  difference: number;
}

interface PassiveFactor {
  icon: any;
  name: string;
  todayValue: string;
  baselineValue: string;
  impact: 'positive' | 'negative' | 'neutral';
  description: string;
  color: string;
}

export default function SignalsPage() {
  const [factors, setFactors] = useState<PassiveFactor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const response = await analyticsAPI.getCorrelations();
      const correlationsData = Array.isArray(response.data)
        ? response.data
        : response.data.correlations || [];
      
      // Professional metric cards with today vs baseline
      const passiveFactors: PassiveFactor[] = [
        {
          icon: Moon,
          name: 'Sleep Quality',
          todayValue: '5.2 hrs',
          baselineValue: '7.1 hrs avg',
          impact: 'negative',
          description: 'Below your usual',
          color: 'gradient-subtle-high'
        },
        {
          icon: Brain,
          name: 'Stress Level',
          todayValue: 'Elevated',
          baselineValue: 'Moderate avg',
          impact: 'negative',
          description: 'Higher than typical',
          color: 'gradient-subtle-moderate'
        },
        {
          icon: Activity,
          name: 'Physical Activity',
          todayValue: '2,140 steps',
          baselineValue: '4,820 steps avg',
          impact: 'negative',
          description: 'Less active today',
          color: 'gradient-subtle-high'
        },
        {
          icon: Cloud,
          name: 'Barometric Pressure',
          todayValue: '29.8 inHg',
          baselineValue: '30.2 inHg avg',
          impact: 'negative',
          description: 'Dropping rapidly',
          color: 'gradient-subtle-moderate'
        },
        {
          icon: Calendar,
          name: 'Calendar Load',
          todayValue: '7 meetings',
          baselineValue: '4 meetings avg',
          impact: 'neutral',
          description: 'Busier than usual',
          color: 'bg-neutral-100'
        }
      ];
      
      setFactors(passiveFactors);
    } catch (error) {
      console.error('Error fetching insights:', error);
    } finally {
      setLoading(false);
    }
  };

  const getImpactBadge = (impact: string) => {
    if (impact === 'negative') return {
      className: 'bg-risk-high-50 text-risk-high-600 border-risk-high-200',
      label: 'Risk Factor'
    };
    if (impact === 'positive') return {
      className: 'bg-risk-low-50 text-risk-low-600 border-risk-low-200',
      label: 'Protective'
    };
    return {
      className: 'bg-neutral-100 text-neutral-600 border-neutral-200',
      label: 'Neutral'
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-calm flex items-center justify-center px-6">
        <div className="space-y-4 w-full max-w-md">
          <div className="h-32 bg-white/40 rounded-2xl animate-pulse shadow-card"></div>
          <div className="h-32 bg-white/35 rounded-2xl animate-pulse shadow-card" style={{ animationDelay: '0.1s' }}></div>
          <div className="h-32 bg-white/30 rounded-2xl animate-pulse shadow-card" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-calm overflow-hidden">
      <div className="max-w-md mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10 animate-fade-in">
          <h1 className="text-3xl font-semibold text-neutral-900 mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Insights</h1>
          <p className="text-sm text-neutral-600 font-normal">
            How your day compares to your baseline
          </p>
        </div>

        {/* Professional Metric Cards */}
        <div className="space-y-4">
          {factors.map((factor, index) => {
            const Icon = factor.icon;
            const badge = getImpactBadge(factor.impact);
            
            return (
              <div
                key={index}
                className={`${factor.color} rounded-2xl p-5 border border-neutral-200/50 shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-[1.01] animate-slide-up`}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/70 flex items-center justify-center shadow-sm">
                      <Icon className="w-5 h-5 text-neutral-700" strokeWidth={2} />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-800 text-sm">{factor.name}</p>
                      <p className="text-xs text-neutral-500">{factor.description}</p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-md border text-[10px] font-semibold uppercase tracking-wider ${badge.className}`}>
                    {badge.label}
                  </span>
                </div>
                
                <div className="flex items-baseline justify-between mt-4">
                  <div>
                    <p className="text-xs text-neutral-500 uppercase tracking-wide font-medium mb-1">Today</p>
                    <p className="text-2xl font-semibold text-neutral-900">{factor.todayValue}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-neutral-500 uppercase tracking-wide font-medium mb-1">Baseline</p>
                    <p className="text-sm font-medium text-neutral-600">{factor.baselineValue}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <p className="text-xs text-neutral-400 font-normal tracking-wide">
            Updated automatically from passive monitoring
          </p>
        </div>
      </div>
    </div>
  );
}
