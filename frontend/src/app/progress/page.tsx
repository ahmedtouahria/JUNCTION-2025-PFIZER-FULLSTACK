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
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white px-6 py-8">
      <div className="max-w-sm mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl font-semibold text-neutral-900 mb-2">
            Progress
          </h1>
          <p className="text-neutral-600">
            Your wellness journey
          </p>
        </motion.div>

        {/* Key Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-4 mb-6"
        >
          {/* Stress Reduction Card */}
          <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-3xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <TrendingDown className="w-8 h-8" />
              <div className="text-right">
                <div className="text-2xl font-bold">
                  {Math.round(stressImprovement)}%
                </div>
                <div className="text-emerald-100 text-sm">
                  Stress Reduction
                </div>
              </div>
            </div>
          </div>

          {/* Sleep Quality Card */}
          <div className="bg-gradient-to-r from-primary-400 to-primary-500 rounded-3xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <Moon className="w-8 h-8" />
              <div className="text-right">
                <div className="text-2xl font-bold">
                  {latestData.sleep.toFixed(1)}h
                </div>
                <div className="text-primary-100 text-sm">
                  Average Sleep
                </div>
              </div>
            </div>
          </div>

          {/* Progress Stats Card */}
          <div className="bg-gradient-to-r from-amber-400 to-amber-500 rounded-3xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <BarChart3 className="w-8 h-8" />
              <div className="text-right">
                <div className="text-2xl font-bold">
                  {progressData.length}
                </div>
                <div className="text-amber-100 text-sm">
                  Weeks Tracked
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white rounded-3xl p-6 shadow-lg mb-6 border border-neutral-100"
        >
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-neutral-900 mb-1">
              Weekly Progress
            </h2>
            <p className="text-sm text-neutral-600">
              Your stress levels over time
            </p>
          </div>

          {/* Simplified Chart */}
          <div className="flex items-end justify-center gap-2 h-32 mb-4">
            {progressData.slice(-7).map((point, index) => {
              const value = point[selectedMetric];
              const maxValue = selectedMetric === 'sleep' ? 10 : 100;
              const height = Math.max(16, (value / maxValue) * 80);
              const colors = metrics[selectedMetric];
              
              return (
                <motion.div
                  key={index}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}px` }}
                  transition={{ delay: index * 0.1, duration: 0.6, ease: 'easeOut' }}
                  className={`flex-1 bg-gradient-to-t ${colors.color} rounded-t-lg min-h-[16px] relative`}
                  style={{ maxWidth: '32px' }}
                >
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-neutral-600">
                    {value}{colors.unit}
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Days Labels */}
          <div className="flex justify-center gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
              <div key={day} className="flex-1 text-center text-xs text-neutral-500" style={{ maxWidth: '32px' }}>
                {day}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-white rounded-3xl p-6 shadow-lg border border-neutral-100 mb-6"
        >
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            Achievements
          </h2>
          
          <div className="space-y-3">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index + 0.7, duration: 0.4 }}
                  className={`p-4 rounded-2xl border transition-all duration-300 ${
                    achievement.unlocked
                      ? 'bg-primary-50 border-primary-200'
                      : 'bg-neutral-50 border-neutral-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      achievement.unlocked
                        ? 'bg-primary-200 text-primary-700'
                        : 'bg-neutral-200 text-neutral-500'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className={`font-medium ${
                          achievement.unlocked ? 'text-primary-900' : 'text-neutral-600'
                        }`}>
                          {achievement.title}
                        </h3>
                        {achievement.unlocked && (
                          <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                            <TrendingUp className="w-2 h-2 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <p className={`text-sm ${
                        achievement.unlocked ? 'text-primary-700' : 'text-neutral-500'
                      }`}>
                        {achievement.description}
                      </p>
                      
                      {achievement.date && (
                        <p className="text-xs text-neutral-500 mt-1">
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
          className="text-center"
        >
          <p className="text-neutral-600 mb-2">
            Your progress shows <span className="font-semibold text-emerald-600">consistent improvement</span>
          </p>
          <p className="text-sm text-neutral-500">
            Keep up the great work!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
