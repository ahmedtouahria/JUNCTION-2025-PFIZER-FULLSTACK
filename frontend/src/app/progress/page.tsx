'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingDown, 
  TrendingUp, 
  Calendar, 
  BarChart3, 
  Activity,
  Heart,
  Moon,
  Coffee,
  Zap
} from 'lucide-react';

interface DataPoint {
  date: string;
  stress: number;
  risk: number;
  sleep: number;
  energy: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  unlocked: boolean;
  date?: string;
}

export default function ProgressCurvePage() {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('month');
  const [selectedMetric, setSelectedMetric] = useState<'stress' | 'risk' | 'sleep' | 'energy'>('stress');
  
  // Mock data - in real app would come from API
  const progressData: DataPoint[] = [
    { date: '2024-01-01', stress: 75, risk: 68, sleep: 6.2, energy: 45 },
    { date: '2024-01-07', stress: 72, risk: 65, sleep: 6.5, energy: 52 },
    { date: '2024-01-14', stress: 68, risk: 61, sleep: 7.1, energy: 58 },
    { date: '2024-01-21', stress: 65, risk: 58, sleep: 7.3, energy: 62 },
    { date: '2024-01-28', stress: 58, risk: 52, sleep: 7.8, energy: 68 },
    { date: '2024-02-04', stress: 52, risk: 46, sleep: 8.1, energy: 72 },
    { date: '2024-02-11', stress: 48, risk: 42, sleep: 8.2, energy: 75 },
    { date: '2024-02-18', stress: 42, risk: 38, sleep: 8.4, energy: 78 },
    { date: '2024-02-25', stress: 38, risk: 32, sleep: 8.6, energy: 82 },
    { date: '2024-03-04', stress: 35, risk: 28, sleep: 8.8, energy: 85 },
    { date: '2024-03-11', stress: 32, risk: 25, sleep: 8.9, energy: 88 },
    { date: '2024-03-18', stress: 28, risk: 22, sleep: 9.1, energy: 90 }
  ];

  const achievements: Achievement[] = [
    {
      id: 'first-week',
      title: 'First Week Complete',
      description: 'Used Aurora for 7 consecutive days',
      icon: Calendar,
      unlocked: true,
      date: '2024-01-07'
    },
    {
      id: 'stress-down-25',
      title: 'Stress Reduced 25%',
      description: 'Lowered your stress levels significantly',
      icon: TrendingDown,
      unlocked: true,
      date: '2024-02-11'
    },
    {
      id: 'sleep-master',
      title: 'Sleep Master',
      description: 'Achieved 8+ hours for 2 weeks straight',
      icon: Moon,
      unlocked: true,
      date: '2024-02-25'
    },
    {
      id: 'low-risk-zone',
      title: 'Low Risk Zone',
      description: 'Maintained low risk for 30 days',
      icon: Heart,
      unlocked: false
    }
  ];

  const metrics = {
    stress: { color: 'from-red-400 to-red-600', label: 'Stress Level', unit: '%', icon: Activity },
    risk: { color: 'from-amber-400 to-amber-600', label: 'Risk Level', unit: '%', icon: Heart },
    sleep: { color: 'from-blue-400 to-blue-600', label: 'Sleep Quality', unit: 'h', icon: Moon },
    energy: { color: 'from-emerald-400 to-emerald-600', label: 'Energy Level', unit: '%', icon: Zap }
  };

  const currentMetric = metrics[selectedMetric];
  const latestData = progressData[progressData.length - 1];
  const previousData = progressData[progressData.length - 2];
  const currentValue = latestData[selectedMetric];
  const previousValue = previousData[selectedMetric];
  const change = ((currentValue - previousValue) / previousValue) * 100;
  const isImproving = selectedMetric === 'stress' || selectedMetric === 'risk' ? change < 0 : change > 0;

  // Calculate improvement percentage for stress (lower is better)
  const firstValue = progressData[0].stress;
  const currentStress = latestData.stress;
  const stressImprovement = ((firstValue - currentStress) / firstValue) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-semibold text-neutral-900 mb-3">
            Your Progress Curve
          </h1>
          <p className="text-lg text-neutral-600">
            Watch your wellness journey unfold over time
          </p>
        </motion.div>

        {/* Key Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-3xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <TrendingDown className="w-8 h-8" />
              <div className="text-right">
                <div className="text-3xl font-bold">
                  {Math.round(stressImprovement)}%
                </div>
                <div className="text-emerald-100 text-sm font-medium">
                  Stress Reduction
                </div>
              </div>
            </div>
            <p className="text-emerald-100 text-sm">
              Since you started using Aurora
            </p>
          </div>

          <div className="bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <Moon className="w-8 h-8" />
              <div className="text-right">
                <div className="text-3xl font-bold">
                  {latestData.sleep}h
                </div>
                <div className="text-primary-100 text-sm font-medium">
                  Avg Sleep
                </div>
              </div>
            </div>
            <p className="text-primary-100 text-sm">
              Quality sleep this month
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-400 to-amber-600 rounded-3xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="w-8 h-8" />
              <div className="text-right">
                <div className="text-3xl font-bold">
                  {progressData.length}
                </div>
                <div className="text-amber-100 text-sm font-medium">
                  Weeks Tracked
                </div>
              </div>
            </div>
            <p className="text-amber-100 text-sm">
              Consistent monitoring
            </p>
          </div>
        </motion.div>

        {/* Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white rounded-3xl p-8 shadow-xl mb-8 border border-neutral-100"
        >
          {/* Chart Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
                Progress Trends
              </h2>
              <p className="text-neutral-600">
                Track your wellness metrics over time
              </p>
            </div>

            <div className="flex space-x-2">
              {Object.entries(metrics).map(([key, metric]) => {
                const Icon = metric.icon;
                return (
                  <motion.button
                    key={key}
                    onClick={() => setSelectedMetric(key as any)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 rounded-xl border transition-all duration-300 ${
                      selectedMetric === key
                        ? 'bg-primary-100 border-primary-300 text-primary-700'
                        : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Current Value Display */}
          <div className="flex items-center justify-between mb-8 p-6 bg-neutral-50 rounded-2xl">
            <div>
              <div className="text-sm text-neutral-600 mb-2">
                Current {currentMetric.label}
              </div>
              <div className="text-4xl font-bold text-neutral-900">
                {currentValue}{currentMetric.unit}
              </div>
            </div>
            
            <div className="text-right">
              <div className={`flex items-center space-x-2 mb-2 ${
                isImproving ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {isImproving ? (
                  <TrendingDown className="w-5 h-5" />
                ) : (
                  <TrendingUp className="w-5 h-5" />
                )}
                <span className="font-semibold">
                  {Math.abs(change).toFixed(1)}%
                </span>
              </div>
              <div className="text-sm text-neutral-500">
                {isImproving ? 'Improving' : 'Needs attention'}
              </div>
            </div>
          </div>

          {/* Simplified Chart Visualization */}
          <div className="relative h-64 bg-neutral-50 rounded-2xl p-6">
            <div className="h-full flex items-end justify-between space-x-2">
              {progressData.slice(-8).map((point, index) => {
                const value = point[selectedMetric];
                const maxValue = selectedMetric === 'sleep' ? 10 : 100;
                const height = (value / maxValue) * 100;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: index * 0.1, duration: 0.6, ease: 'easeOut' }}
                    className={`flex-1 bg-gradient-to-t ${currentMetric.color} rounded-t-lg min-h-[8px] relative group cursor-pointer`}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-neutral-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      {value}{currentMetric.unit}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-white rounded-3xl p-8 shadow-xl border border-neutral-100"
        >
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
            Achievements
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index + 0.7, duration: 0.4 }}
                  className={`p-6 rounded-2xl border transition-all duration-300 ${
                    achievement.unlocked
                      ? 'bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200'
                      : 'bg-neutral-50 border-neutral-200 opacity-60'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      achievement.unlocked
                        ? 'bg-primary-200 text-primary-700'
                        : 'bg-neutral-200 text-neutral-500'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className={`font-semibold ${
                          achievement.unlocked ? 'text-primary-900' : 'text-neutral-600'
                        }`}>
                          {achievement.title}
                        </h3>
                        {achievement.unlocked && (
                          <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                            <TrendingUp className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <p className={`text-sm mb-2 ${
                        achievement.unlocked ? 'text-primary-700' : 'text-neutral-500'
                      }`}>
                        {achievement.description}
                      </p>
                      
                      {achievement.date && (
                        <p className="text-xs text-neutral-500">
                          Unlocked {new Date(achievement.date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Insights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="text-center mt-8"
        >
          <p className="text-neutral-600 mb-2">
            Your progress shows <span className="font-semibold text-emerald-600">consistent improvement</span> in stress management.
          </p>
          <p className="text-sm text-neutral-500">
            Keep up the great work! Small daily changes create lasting wellness.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
