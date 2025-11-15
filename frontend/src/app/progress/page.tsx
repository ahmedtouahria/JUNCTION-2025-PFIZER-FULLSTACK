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
  Zap,
  Target,
  Award,
  Clock,
  Brain,
  CheckCircle,
  Lock
} from 'lucide-react';

interface DataPoint {
  date: string;
  stress: number;
  risk: number;
  sleep: number;
  energy: number;
  steps: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  unlocked: boolean;
  date?: string;
  progress?: number;
  target?: number;
}

interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export default function ProgressPage() {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('month');
  const [selectedMetric, setSelectedMetric] = useState<'stress' | 'risk' | 'sleep' | 'energy'>('stress');
  const [activeTab, setActiveTab] = useState<'overview' | 'goals' | 'achievements'>('overview');
  
  // Enhanced mock data with realistic progression
  const progressData: DataPoint[] = [
    { date: '2024-10-15', stress: 85, risk: 78, sleep: 5.5, energy: 35, steps: 3200 },
    { date: '2024-10-22', stress: 82, risk: 75, sleep: 6.0, energy: 42, steps: 4100 },
    { date: '2024-10-29', stress: 78, risk: 71, sleep: 6.5, energy: 48, steps: 4800 },
    { date: '2024-11-05', stress: 72, risk: 65, sleep: 7.1, energy: 58, steps: 5600 },
    { date: '2024-11-12', stress: 65, risk: 58, sleep: 7.6, energy: 68, steps: 6400 },
    { date: '2024-11-15', stress: 28, risk: 22, sleep: 8.4, energy: 88, steps: 8200 }
  ];

  const goals: Goal[] = [
    {
      id: 'stress-reduction',
      title: 'Reduce Stress',
      description: 'Lower stress levels to under 30%',
      progress: 28,
      target: 30,
      icon: Brain,
      color: 'emerald'
    },
    {
      id: 'sleep-quality',
      title: 'Improve Sleep',
      description: 'Achieve 8+ hours nightly',
      progress: 8.4,
      target: 8.0,
      icon: Moon,
      color: 'blue'
    },
    {
      id: 'daily-steps',
      title: 'Stay Active',
      description: 'Walk 10,000 steps daily',
      progress: 8200,
      target: 10000,
      icon: Activity,
      color: 'purple'
    }
  ];

  const achievements: Achievement[] = [
    {
      id: 'first-week',
      title: 'Getting Started',
      description: 'Complete your first week with Aurora',
      icon: Calendar,
      unlocked: true,
      date: '2024-10-22'
    },
    {
      id: 'stress-warrior',
      title: 'Stress Warrior',
      description: 'Reduce stress by 50% from baseline',
      icon: Brain,
      unlocked: true,
      date: '2024-11-12',
      progress: 67,
      target: 50
    },
    {
      id: 'sleep-master',
      title: 'Sleep Champion',
      description: 'Maintain 8+ hours sleep for 7 days',
      icon: Moon,
      unlocked: true,
      date: '2024-11-15'
    },
    {
      id: 'consistency-king',
      title: 'Consistency Master',
      description: 'Log symptoms for 30 consecutive days',
      icon: Target,
      unlocked: false,
      progress: 23,
      target: 30
    },
    {
      id: 'risk-free',
      title: 'Risk-Free Zone',
      description: 'Maintain low risk for 14 days straight',
      icon: Heart,
      unlocked: false,
      progress: 8,
      target: 14
    }
  ];

  const metrics = {
    stress: { color: 'from-red-400 to-red-600', label: 'Stress Level', unit: '%', icon: Brain, bgColor: 'red' },
    risk: { color: 'from-amber-400 to-amber-600', label: 'Migraine Risk', unit: '%', icon: Heart, bgColor: 'amber' },
    sleep: { color: 'from-blue-400 to-blue-600', label: 'Sleep Quality', unit: 'h', icon: Moon, bgColor: 'blue' },
    energy: { color: 'from-emerald-400 to-emerald-600', label: 'Energy Level', unit: '%', icon: Zap, bgColor: 'emerald' }
  };

  // Calculate improvements
  const latestData = progressData[progressData.length - 1];
  const firstData = progressData[0];
  
  const stressImprovement = ((firstData.stress - latestData.stress) / firstData.stress) * 100;
  const riskReduction = ((firstData.risk - latestData.risk) / firstData.risk) * 100;
  const sleepImprovement = ((latestData.sleep - firstData.sleep) / firstData.sleep) * 100;
  const energyBoost = ((latestData.energy - firstData.energy) / firstData.energy) * 100;

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
            Your wellness journey over time
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex rounded-2xl p-1 shadow-sm border bg-white mb-6"
        >
          {(['overview', 'goals', 'achievements'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 capitalize ${
                activeTab === tab
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Key Improvements */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-3xl p-5 text-white shadow-lg">
                  <TrendingDown className="w-7 h-7 mb-3" />
                  <div className="text-2xl font-bold mb-1">
                    {Math.round(stressImprovement)}%
                  </div>
                  <div className="text-emerald-100 text-sm">
                    Stress Reduced
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl p-5 text-white shadow-lg">
                  <Moon className="w-7 h-7 mb-3" />
                  <div className="text-2xl font-bold mb-1">
                    {latestData.sleep.toFixed(1)}h
                  </div>
                  <div className="text-blue-100 text-sm">
                    Sleep Quality
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-3xl p-5 text-white shadow-lg">
                  <Heart className="w-7 h-7 mb-3" />
                  <div className="text-2xl font-bold mb-1">
                    {Math.round(riskReduction)}%
                  </div>
                  <div className="text-purple-100 text-sm">
                    Risk Reduced
                  </div>
                </div>

                <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-3xl p-5 text-white shadow-lg">
                  <Zap className="w-7 h-7 mb-3" />
                  <div className="text-2xl font-bold mb-1">
                    {Math.round(energyBoost)}%
                  </div>
                  <div className="text-amber-100 text-sm">
                    Energy Boost
                  </div>
                </div>
              </div>

              {/* Progress Chart */}
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-neutral-100">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                    Weekly Trends
                  </h2>
                  <p className="text-sm text-neutral-600">
                    Your improvements over the last 6 weeks
                  </p>
                </div>

                {/* Chart */}
                <div className="flex items-end justify-center gap-3 h-32 mb-4">
                  {progressData.map((point, index) => {
                    const value = point.stress;
                    const height = Math.max(16, (value / 100) * 96);
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}px` }}
                        transition={{ delay: index * 0.1, duration: 0.6, ease: 'easeOut' }}
                        className="flex-1 bg-gradient-to-t from-red-400 to-red-600 rounded-t-lg relative group"
                        style={{ maxWidth: '32px' }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-900 text-white text-xs px-2 py-1 rounded">
                          {value}%
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                
                {/* Week Labels */}
                <div className="flex justify-center gap-3 text-xs text-neutral-500">
                  {['W1', 'W2', 'W3', 'W4', 'W5', 'W6'].map((week) => (
                    <div key={week} className="flex-1 text-center" style={{ maxWidth: '32px' }}>
                      {week}
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Summary */}
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-neutral-100">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">This Week</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">Average Stress</span>
                    <span className="font-semibold text-emerald-600">{latestData.stress}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">Sleep Quality</span>
                    <span className="font-semibold text-blue-600">{latestData.sleep}h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">Energy Level</span>
                    <span className="font-semibold text-purple-600">{latestData.energy}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">Daily Steps</span>
                    <span className="font-semibold text-amber-600">{latestData.steps.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Goals Tab */}
          {activeTab === 'goals' && (
            <motion.div
              key="goals"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-neutral-900 mb-2">Your Goals</h2>
                <p className="text-neutral-600 text-sm">Track your wellness targets</p>
              </div>

              {goals.map((goal, index) => {
                const Icon = goal.icon;
                const progressPercent = Math.min((goal.progress / goal.target) * 100, 100);
                const isCompleted = goal.progress >= goal.target;
                
                return (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className={`bg-white rounded-3xl p-6 shadow-lg border transition-all duration-300 ${
                      isCompleted ? 'border-emerald-200 bg-emerald-50/50' : 'border-neutral-100'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        isCompleted 
                          ? 'bg-emerald-100 text-emerald-600' 
                          : `bg-${goal.color}-100 text-${goal.color}-600`
                      }`}>
                        {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-neutral-900">{goal.title}</h3>
                          {isCompleted && (
                            <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                              Completed!
                            </span>
                          )}
                        </div>
                        
                        <p className="text-sm text-neutral-600 mb-3">{goal.description}</p>
                        
                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-neutral-600">Progress</span>
                            <span className="font-medium">
                              {goal.id === 'daily-steps' 
                                ? `${goal.progress.toLocaleString()}/${goal.target.toLocaleString()}`
                                : `${goal.progress}${goal.id === 'sleep-quality' ? 'h' : '%'}/${goal.target}${goal.id === 'sleep-quality' ? 'h' : '%'}`
                              }
                            </span>
                          </div>
                          <div className="w-full bg-neutral-200 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${progressPercent}%` }}
                              transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: 'easeOut' }}
                              className={`h-2 rounded-full ${
                                isCompleted ? 'bg-emerald-500' : `bg-${goal.color}-500`
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-neutral-900 mb-2">Achievements</h2>
                <p className="text-neutral-600 text-sm">
                  {achievements.filter(a => a.unlocked).length} of {achievements.length} unlocked
                </p>
              </div>

              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                
                return (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className={`rounded-3xl p-6 shadow-lg border transition-all duration-300 ${
                      achievement.unlocked
                        ? 'bg-gradient-to-r from-primary-50 to-blue-50 border-primary-200'
                        : 'bg-white border-neutral-200 opacity-75'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        achievement.unlocked
                          ? 'bg-primary-500 text-white shadow-lg'
                          : 'bg-neutral-200 text-neutral-500'
                      }`}>
                        {achievement.unlocked ? <Icon className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className={`font-semibold ${
                            achievement.unlocked ? 'text-primary-900' : 'text-neutral-600'
                          }`}>
                            {achievement.title}
                          </h3>
                          {achievement.unlocked && (
                            <Award className="w-4 h-4 text-yellow-500" />
                          )}
                        </div>
                        
                        <p className={`text-sm mb-3 ${
                          achievement.unlocked ? 'text-primary-700' : 'text-neutral-500'
                        }`}>
                          {achievement.description}
                        </p>
                        
                        {achievement.date && (
                          <p className="text-xs text-neutral-500 flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>Unlocked {new Date(achievement.date).toLocaleDateString()}</span>
                          </p>
                        )}
                        
                        {/* Progress for locked achievements */}
                        {!achievement.unlocked && achievement.progress && achievement.target && (
                          <div className="mt-3">
                            <div className="flex justify-between text-xs text-neutral-600 mb-1">
                              <span>Progress</span>
                              <span>{achievement.progress}/{achievement.target}</span>
                            </div>
                            <div className="w-full bg-neutral-200 rounded-full h-1">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                                transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                                className="h-1 bg-neutral-400 rounded-full"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Motivational Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="text-center mt-8"
        >
          <p className="text-neutral-600 mb-2">
            {stressImprovement > 50 ? (
              <>Amazing progress! You&apos;ve reduced stress by <span className="font-semibold text-emerald-600">{Math.round(stressImprovement)}%</span></>
            ) : stressImprovement > 25 ? (
              <>Great work! <span className="font-semibold text-blue-600">{Math.round(stressImprovement)}%</span> stress reduction</>
            ) : (
              <>Keep going! Every step counts in your wellness journey</>
            )}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
