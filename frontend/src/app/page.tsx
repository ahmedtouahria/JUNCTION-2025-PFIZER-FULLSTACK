'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { predictionsAPI } from '@/lib/api';
import { Cloud, Wind } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    fetchPrediction();
  }, [isAuthenticated]);

  const fetchPrediction = async () => {
    try {
      const response = await predictionsAPI.getToday();
      setPrediction(response.data);
    } catch (error) {
      console.error('Error fetching prediction:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-calm flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-64 h-64 rounded-full bg-white/30"></div>
        </div>
      </div>
    );
  }

  if (!prediction) {
    return null;
  }

  const getRiskGradient = (level: string) => {
    if (level === 'low') return 'gradient-risk-low';
    if (level === 'moderate') return 'gradient-risk-moderate';
    return 'gradient-risk-high';
  };

  const getRiskLabel = (level: string) => {
    if (level === 'low') return 'Low';
    if (level === 'moderate') return 'Moderate';
    return 'High';
  };

  // Build explanation from top factors
  const buildExplanation = () => {
    if (!prediction.top_factors || prediction.top_factors.length === 0) {
      return "Conditions are favorable";
    }
    const factors = prediction.top_factors
      .slice(0, 3)
      .map((f: any) => {
        const factor = typeof f === 'string' ? f : f.factor;
        // Simplify factor names
        return factor
          .replace('Insufficient', 'Late')
          .replace('High Stress Level', 'High stress')
          .replace('Low Hydration', 'Low water')
          .toLowerCase();
      });
    return factors.join(' + ');
  };

  // Get one suggestion
  const getSuggestion = () => {
    if (!prediction.recommendations || prediction.recommendations.length === 0) {
      return "Continue your healthy habits";
    }
    // Return the first recommendation, simplified
    return prediction.recommendations[0]
      .replace('Try to', '')
      .replace('Consider', '')
      .replace('Make sure to', '')
      .trim();
  };

  const riskScore = prediction.risk_score || 0;
  const riskLevel = prediction.risk_level || 'low';

  return (
    <div className="min-h-screen gradient-calm">
      {/* Main Container */}
      <div className="max-w-lg mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-screen">
        
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm text-muted-foreground uppercase tracking-widest font-light">
            Your predicted risk
          </p>
          <h1 className="text-2xl text-foreground/80 mt-2 font-extralight">
            in the next 24 hours
          </h1>
        </div>

        {/* Large Circular Risk Indicator */}
        <div className="relative mb-16">
          {/* Outer Glow Ring */}
          <div className={`absolute inset-0 rounded-full ${getRiskGradient(riskLevel)} opacity-20 blur-3xl scale-110`}></div>
          
          {/* Main Circle */}
          <div className={`relative w-72 h-72 rounded-full ${getRiskGradient(riskLevel)} shadow-aurora flex items-center justify-center`}>
            {/* Inner White Circle */}
            <div className="w-60 h-60 rounded-full bg-white shadow-calm flex flex-col items-center justify-center">
              <div className="text-7xl font-extralight text-foreground/90 mb-2">
                {riskScore}
                <span className="text-3xl">%</span>
              </div>
              <div className="text-lg font-light text-muted-foreground uppercase tracking-wide">
                {getRiskLabel(riskLevel)} Risk
              </div>
            </div>
          </div>
        </div>

        {/* Explanation */}
        <div className="w-full mb-8">
          <div className="bg-white/50 backdrop-blur-sm rounded-3xl px-8 py-6 shadow-calm">
            <p className="text-center text-foreground/70 text-base font-light leading-relaxed">
              {buildExplanation()}
            </p>
          </div>
        </div>

        {/* Daily Suggestion */}
        <div className="w-full mb-12">
          <div className="bg-white backdrop-blur-sm rounded-3xl px-8 py-6 shadow-calm border border-primary/10">
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-light mb-2 text-center">
              Today&apos;s Suggestion
            </p>
            <p className="text-center text-foreground text-base font-light leading-relaxed">
              {getSuggestion()}
            </p>
          </div>
        </div>

        {/* Weather & Pressure (Passive Data Indicator) */}
        <div className="flex items-center justify-center gap-6 text-muted-foreground/60">
          <div className="flex items-center gap-2">
            <Cloud className="w-5 h-5" />
            <span className="text-sm font-light">72°F</span>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="w-5 h-5" />
            <span className="text-sm font-light">29.9 inHg</span>
            <span className="text-xs">↓</span>
          </div>
        </div>

        {/* Subtle Footer Note */}
        <div className="mt-16 text-center">
          <p className="text-xs text-muted-foreground/40 font-light">
            Based on passive behavioral signals
          </p>
        </div>
      </div>
    </div>
  );
}
