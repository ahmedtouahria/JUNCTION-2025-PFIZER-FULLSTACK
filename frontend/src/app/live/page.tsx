'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Cloud, 
  Coffee, 
  Heart, 
  Moon, 
  Activity, 
  TrendingUp, 
  TrendingDown,
  ArrowRight,
  Info
} from 'lucide-react';

interface Signal {
  id: string;
  name: string;
  value: string;
  impact: 'positive' | 'negative' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

interface RiskData {
  current: number;
  prediction: number;
  trend: 'up' | 'down' | 'stable';
  confidence: number;
}

export default function LivePredictionPage() {
  const [riskData, setRiskData] = useState<RiskData>({
    current: 23,
    prediction: 18,
    trend: 'down',
    confidence: 94
  });

  const [signals, setSignals] = useState<Signal[]>([
    {
      id: 'sleep',
      name: 'Sleep Quality',
      value: '8.2h deep',
      impact: 'positive',
      icon: Moon,
      description: 'Above average sleep duration and quality'
    },
    {
      id: 'weather',
      name: 'Weather',
      value: '72°F sunny',
      impact: 'positive',
      icon: Cloud,
      description: 'Optimal weather conditions'
    },
    {
      id: 'schedule',
      name: 'Schedule',
      value: '3 meetings',
      impact: 'negative',
      icon: Calendar,
      description: 'Heavy meeting schedule detected'
    },
    {
      id: 'caffeine',
      name: 'Caffeine',
      value: '2 cups',
      impact: 'neutral',
      icon: Coffee,
      description: 'Normal caffeine intake for you'
    },
    {
      id: 'heart-rate',
      name: 'Heart Rate',
      value: '68 bpm',
      impact: 'positive',
      icon: Heart,
      description: 'Resting heart rate is optimal'
    }
  ]);

  const [isUpdating, setIsUpdating] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setIsUpdating(true);
      setTimeout(() => {
        setRiskData(prev => ({
          ...prev,
          current: Math.max(5, Math.min(95, prev.current + (Math.random() - 0.5) * 4)),
          prediction: Math.max(5, Math.min(95, prev.prediction + (Math.random() - 0.5) * 3))
        }));
        setIsUpdating(false);
      }, 800);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const getRiskColor = (value: number) => {
    if (value <= 30) return 'from-emerald-400 to-emerald-500';
    if (value <= 60) return 'from-amber-400 to-amber-500';
    return 'from-red-400 to-red-500';
  };

  const getRiskLevel = (value: number) => {
    if (value <= 30) return 'Low Risk';
    if (value <= 60) return 'Moderate Risk';
    return 'High Risk';
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'negative': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-neutral-600 bg-neutral-50 border-neutral-200';
    }
  };

  const meterRadius = 90;
  const strokeWidth = 12;
  const normalizedRadius = meterRadius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const currentOffset = circumference - (riskData.current / 100) * circumference;
  const predictionOffset = circumference - (riskData.prediction / 100) * circumference;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white p-6">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-semibold text-neutral-900 mb-2">
            Live Prediction
          </h1>
          <p className="text-lg text-neutral-600">
            Your risk levels are updating in real-time
          </p>
        </motion.div>

        {/* Risk Meter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
          className="bg-white rounded-3xl p-8 shadow-xl mb-8 border border-neutral-100"
        >
          <div className="text-center mb-6">
            <div className="relative inline-block">
              {/* Outer Ring - Background */}
              <svg
                height={meterRadius * 2}
                width={meterRadius * 2}
                className="transform -rotate-90"
              >
                <circle
                  stroke="#f3f4f6"
                  fill="transparent"
                  strokeWidth={strokeWidth}
                  r={normalizedRadius}
                  cx={meterRadius}
                  cy={meterRadius}
                />
                
                {/* Current Risk */}
                <motion.circle
                  stroke="url(#currentGradient)"
                  fill="transparent"
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${circumference} ${circumference}`}
                  strokeDashoffset={currentOffset}
                  strokeLinecap="round"
                  r={normalizedRadius}
                  cx={meterRadius}
                  cy={meterRadius}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: currentOffset }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
                
                {/* Prediction Ring */}
                <motion.circle
                  stroke="url(#predictionGradient)"
                  fill="transparent"
                  strokeWidth={strokeWidth / 2}
                  strokeDasharray={`${circumference} ${circumference}`}
                  strokeDashoffset={predictionOffset}
                  strokeLinecap="round"
                  r={normalizedRadius + strokeWidth / 4}
                  cx={meterRadius}
                  cy={meterRadius}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: predictionOffset }}
                  transition={{ delay: 0.5, duration: 1.5, ease: 'easeOut' }}
                />

                <defs>
                  <linearGradient id="currentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4A78FF" />
                    <stop offset="100%" stopColor="#6B8FFF" />
                  </linearGradient>
                  <linearGradient id="predictionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#E0E7FF" />
                    <stop offset="100%" stopColor="#C7D2FE" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Center Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={riskData.current}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-center"
                  >
                    <div className="text-5xl font-light text-neutral-900 mb-1">
                      {Math.round(riskData.current)}
                    </div>
                    <div className="text-sm font-medium text-neutral-600">
                      {getRiskLevel(riskData.current)}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Update Pulse */}
              {isUpdating && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary-400"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 1.3, opacity: 0 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              )}
            </div>
          </div>

          {/* Prediction Info */}
          <div className="flex items-center justify-center space-x-6 text-center">
            <div>
              <div className="text-2xl font-medium text-neutral-900 mb-1">
                {Math.round(riskData.prediction)}
              </div>
              <div className="text-sm text-neutral-500">Next Hour</div>
            </div>
            
            <div className="flex items-center space-x-2">
              {riskData.trend === 'down' ? (
                <TrendingDown className="w-6 h-6 text-emerald-500" />
              ) : riskData.trend === 'up' ? (
                <TrendingUp className="w-6 h-6 text-red-500" />
              ) : (
                <ArrowRight className="w-6 h-6 text-neutral-500" />
              )}
            </div>

            <div>
              <div className="text-2xl font-medium text-neutral-900 mb-1">
                {riskData.confidence}%
              </div>
              <div className="text-sm text-neutral-500">Confidence</div>
            </div>
          </div>
        </motion.div>

        {/* Contributing Signals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white rounded-3xl p-6 shadow-lg border border-neutral-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-neutral-900">
              Contributing Signals
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors"
            >
              <Info className="w-5 h-5 text-neutral-600" />
            </motion.button>
          </div>

          <div className="space-y-3">
            {signals.map((signal, index) => {
              const Icon = signal.icon;
              
              return (
                <motion.div
                  key={signal.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index + 0.5, duration: 0.4 }}
                  className="flex items-center justify-between p-4 rounded-2xl bg-neutral-50 hover:bg-neutral-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getImpactColor(signal.impact)}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-neutral-900">
                        {signal.name}
                      </div>
                      <div className="text-sm text-neutral-500">
                        {signal.description}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-medium text-neutral-900">
                      {signal.value}
                    </div>
                    <div className={`text-xs font-medium ${
                      signal.impact === 'positive' 
                        ? 'text-emerald-600' 
                        : signal.impact === 'negative'
                        ? 'text-red-600'
                        : 'text-neutral-600'
                    }`}>
                      {signal.impact === 'positive' ? '+' : signal.impact === 'negative' ? '-' : ''}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Live Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="flex items-center justify-center mt-6 space-x-2"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-emerald-500 rounded-full"
          />
          <span className="text-sm text-neutral-500">Live • Updates every 30 seconds</span>
        </motion.div>
      </div>
    </div>
  );
}
