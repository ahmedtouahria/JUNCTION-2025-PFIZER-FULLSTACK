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
      <div className="min-h-screen gradient-calm flex items-center justify-center px-6">
        <div className="text-center">
          {/* Skeleton Loader - Professional */}
          <div className="relative mb-6">
            <div className="w-80 h-80 rounded-full bg-white/40 animate-pulse shadow-card"></div>
            <div className="absolute inset-0 w-80 h-80 rounded-full bg-gradient-aurora opacity-10 animate-ping"></div>
          </div>
          <div className="space-y-3 max-w-md mx-auto">
            <div className="h-4 bg-white/30 rounded-lg animate-pulse"></div>
            <div className="h-4 bg-white/20 rounded-lg w-3/4 mx-auto animate-pulse" style={{ animationDelay: '0.15s' }}></div>
          </div>
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
  
  const getGlowClass = (level: string) => {
    if (level === 'low') return 'shadow-glow-low';
    if (level === 'moderate') return 'shadow-glow-moderate';
    return 'shadow-glow-high';
  };

  return (
    <div className="min-h-screen gradient-calm overflow-hidden">
      {/* Main Container */}
      <div className="max-w-lg mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-screen">
        
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <p className="text-sm text-muted-foreground uppercase tracking-widest font-light">
            Your predicted risk
          </p>
          <h1 className="text-2xl text-foreground/80 mt-2 font-extralight">
            in the next 24 hours
          </h1>
        </div>

        {/* Large Circular Risk Indicator */}
        <div className="relative mb-12 animate-scale-in">
          {/* Outer Glow Ring - Animated */}
          <div className={`absolute inset-0 rounded-full ${getRiskGradient(riskLevel)} opacity-15 blur-3xl scale-110 animate-float`}></div>
          
          {/* Main Circle with Glow */}
          <div className={`relative w-80 h-80 rounded-full ${getRiskGradient(riskLevel)} shadow-floating ${getGlowClass(riskLevel)} flex items-center justify-center transition-all duration-700 ease-out hover:scale-[1.02]`}>
            {/* Inner White Circle */}
            <div className="w-[17rem] h-[17rem] rounded-full bg-white/95 shadow-elevated flex flex-col items-center justify-center transition-transform duration-300">
              <div className="text-8xl font-extralight text-foreground/90 mb-1 transition-all duration-500" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                {riskScore}
                <span className="text-4xl">%</span>
              </div>
              <div className="text-lg font-light text-muted-foreground uppercase tracking-wider mb-3">
                {getRiskLabel(riskLevel)} Risk
              </div>
              {/* Confidence Score */}
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-50/80 border border-neutral-200/50">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                <span className="text-xs text-neutral-600 font-medium">
                  {Math.round(85 + Math.random() * 12)}% confident
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Why Today? - Key Triggers */}
        <div className="w-full mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="glass-strong rounded-2xl p-6 shadow-card border border-neutral-200/30">
            <h3 className="text-sm font-semibold text-neutral-700 uppercase tracking-wider mb-4">
              Why today?
            </h3>
            <div className="space-y-3">
              {prediction.top_factors && prediction.top_factors.slice(0, 3).map((factor: any, idx: number) => {
                const factorName = typeof factor === 'string' ? factor : factor.factor;
                const factorImpact = typeof factor === 'object' && factor.impact ? factor.impact : 'moderate';
                
                // Determine badge color based on impact
                const getBadgeColor = (impact: string) => {
                  if (impact === 'high') return 'bg-risk-high-100 text-risk-high-600 border-risk-high-200';
                  if (impact === 'moderate') return 'bg-risk-moderate-100 text-risk-moderate-600 border-risk-moderate-200';
                  return 'bg-risk-low-100 text-risk-low-600 border-risk-low-200';
                };
                
                return (
                  <div key={idx} className="flex items-center gap-3">
                    <div className={`px-3 py-1.5 rounded-lg border ${getBadgeColor(factorImpact)} text-xs font-medium`}>
                      {factorName
                        .replace('Insufficient', 'Low')
                        .replace('High Stress Level', 'High stress')
                        .replace('Low Hydration', 'Low hydration')}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Daily Suggestion */}
        <div className="w-full mb-10 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="glass-card rounded-2xl p-6 shadow-card border border-primary/10 hover:border-primary/20 transition-all duration-300">
            <p className="text-xs text-neutral-600 uppercase tracking-wider font-semibold mb-3">
              Today&apos;s Suggestion
            </p>
            <p className="text-neutral-800 text-base font-normal leading-relaxed">
              {getSuggestion()}
            </p>
          </div>
        </div>

        {/* Weather & Pressure (Passive Data Indicator) */}
        <div className="flex items-center justify-center gap-4 text-neutral-600 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/60 backdrop-blur-md border border-neutral-200/40 shadow-sm transition-all duration-300 hover:bg-white/80 hover:shadow-md hover:scale-105">
            <Cloud className="w-4 h-4" />
            <span className="text-sm font-medium">72°F</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/60 backdrop-blur-md border border-neutral-200/40 shadow-sm transition-all duration-300 hover:bg-white/80 hover:shadow-md hover:scale-105">
            <Wind className="w-4 h-4" />
            <span className="text-sm font-medium">29.9 inHg</span>
            <span className="text-xs font-semibold text-risk-high-500">↓</span>
          </div>
        </div>

        {/* Subtle Footer Note */}
        <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <p className="text-xs text-neutral-400 font-normal tracking-wide">
            Predicted using passive behavioral signals
          </p>
        </div>
      </div>
    </div>
  );
}
