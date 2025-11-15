'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle,
  Check,
  X,
  Heart,
  Activity,
  Droplet,
  Zap,
  Pill,
  Wind,
  Coffee,
  Moon
} from 'lucide-react';

interface HealthAction {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  completed: boolean;
}

export default function LivePage() {
  const [healthScore, setHealthScore] = useState(88);
  const [isHealthy, setIsHealthy] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [actions, setActions] = useState<HealthAction[]>([
    {
      id: 'breathing',
      title: 'Deep Breathing',
      description: 'Take 5 deep breaths to reduce stress',
      icon: Wind,
      completed: false
    },
    {
      id: 'hydration',
      title: 'Drink Water',
      description: 'Have a glass of water to stay hydrated',
      icon: Droplet,
      completed: false
    },
    {
      id: 'break',
      title: 'Take a Break',
      description: 'Step away from screens for 2 minutes',
      icon: Coffee,
      completed: false
    },
    {
      id: 'medication',
      title: 'Check Medication',
      description: 'Review if any medications are due',
      icon: Pill,
      completed: false
    }
  ]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-red-400 to-red-600';
    if (score >= 60) return 'from-amber-400 to-amber-600';
    if (score >= 40) return 'from-yellow-400 to-yellow-500';
    return 'from-emerald-400 to-emerald-600';
  };

  const getStatusColor = (score: number) => {
    if (score >= 80) return '#dc2626';
    if (score >= 60) return '#d97706';
    if (score >= 40) return '#eab308';
    return '#16a34a';
  };

  const getStatusText = (score: number) => {
    if (score >= 80) return 'High Risk';
    if (score >= 60) return 'Moderate Risk';
    if (score >= 40) return 'Caution';
    return 'Healthy';
  };

  const toggleAction = (id: string) => {
    setActions(prev => 
      prev.map(action => 
        action.id === id ? { ...action, completed: !action.completed } : action
      )
    );
  };

  const allActionsCompleted = actions.every(action => action.completed);

  const handleSolve = () => {
    setShowModal(true);
  };

  const handleDone = () => {
    setShowModal(false);
    // Animate the health improvement
    setHealthScore(7);
    setIsHealthy(true);
    // Reset actions
    setActions(prev => prev.map(action => ({ ...action, completed: false })));
  };

  // Calculate progress percentage for the circular meter
  const radius = 70;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (healthScore / 100) * circumference;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white px-6 py-8">
      <div className="max-w-sm mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl font-semibold text-neutral-900 mb-2">
            Live Health Monitor
          </h1>
          <p className="text-neutral-600">
            Real-time analysis of your wellness
          </p>
        </motion.div>

        {/* Health Score Meter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="bg-white rounded-3xl p-8 shadow-lg mb-8 border border-neutral-100"
        >
          <div className="flex flex-col items-center">
            
            {/* Circular Progress */}
            <div className="relative mb-6">
              <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
                {/* Background Circle */}
                <circle
                  stroke="#f3f4f6"
                  fill="transparent"
                  strokeWidth={strokeWidth}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />
                {/* Progress Circle */}
                <motion.circle
                  stroke={`url(#gradient-${healthScore})`}
                  fill="transparent"
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${circumference} ${circumference}`}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
                
                <defs>
                  <linearGradient id={`gradient-${healthScore}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={getStatusColor(healthScore)} />
                    <stop offset="100%" stopColor={getStatusColor(healthScore)} />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Center Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div
                  key={healthScore}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div 
                    className="text-4xl font-light mb-1"
                    style={{ color: getStatusColor(healthScore) }}
                  >
                    {healthScore}%
                  </div>
                  <div 
                    className="text-sm font-medium"
                    style={{ color: getStatusColor(healthScore) }}
                  >
                    {getStatusText(healthScore)}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Status Message */}
            <AnimatePresence mode="wait">
              {healthScore >= 80 ? (
                <motion.div
                  key="warning"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6 w-full"
                >
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-semibold text-red-800">
                        Health Alert
                      </h3>
                      <p className="text-xs text-red-600 leading-relaxed">
                        Multiple risk factors detected. Take immediate action to improve your wellness.
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="healthy"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-6 w-full"
                >
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-semibold text-emerald-800">
                        Excellent Health
                      </h3>
                      <p className="text-xs text-emerald-600 leading-relaxed">
                        All systems optimal. Keep up the great work!
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Button */}
            {healthScore >= 80 && (
              <motion.button
                onClick={handleSolve}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 rounded-2xl font-semibold shadow-lg transition-all duration-300"
              >
                Solve Now
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Health Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100">
            <div className="flex items-center space-x-3">
              <Heart className="w-5 h-5 text-primary-500" />
              <div>
                <div className="text-lg font-semibold text-neutral-900">72</div>
                <div className="text-xs text-neutral-500">Heart Rate</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100">
            <div className="flex items-center space-x-3">
              <Activity className="w-5 h-5 text-primary-500" />
              <div>
                <div className="text-lg font-semibold text-neutral-900">6.8k</div>
                <div className="text-xs text-neutral-500">Steps</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100">
            <div className="flex items-center space-x-3">
              <Moon className="w-5 h-5 text-primary-500" />
              <div>
                <div className="text-lg font-semibold text-neutral-900">6.2h</div>
                <div className="text-xs text-neutral-500">Sleep</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100">
            <div className="flex items-center space-x-3">
              <Zap className="w-5 h-5 text-primary-500" />
              <div>
                <div className="text-lg font-semibold text-neutral-900">
                  {healthScore >= 80 ? 'Low' : 'High'}
                </div>
                <div className="text-xs text-neutral-500">Energy</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Live Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="flex items-center justify-center space-x-2"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-emerald-500 rounded-full"
          />
          <span className="text-xs text-neutral-500">Live monitoring active</span>
        </motion.div>
      </div>

      {/* Solve Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-end z-modal modal-bottom-safe"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-full max-w-sm mx-auto bg-white rounded-t-3xl p-6 mb-6"
            >
              {/* Modal Header */}
              <div className="text-center mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-neutral-900">
                    Recommended Actions
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-8 h-8 bg-neutral-100 rounded-full flex items-center justify-center"
                  >
                    <X className="w-4 h-4 text-neutral-600" />
                  </button>
                </div>
                <p className="text-neutral-600 text-sm">
                  Complete these actions to improve your health score
                </p>
              </div>

              {/* Action Checklist */}
              <div className="space-y-4 mb-8">
                {actions.map((action) => {
                  const Icon = action.icon;
                  
                  return (
                    <motion.button
                      key={action.id}
                      onClick={() => toggleAction(action.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full p-4 rounded-2xl border transition-all duration-300 text-left ${
                        action.completed
                          ? 'bg-emerald-50 border-emerald-200'
                          : 'bg-neutral-50 border-neutral-200 hover:border-primary-200'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          action.completed
                            ? 'bg-emerald-500'
                            : 'bg-white border border-neutral-200'
                        }`}>
                          {action.completed ? (
                            <Check className="w-5 h-5 text-white" />
                          ) : (
                            <Icon className="w-5 h-5 text-neutral-600" />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <h4 className={`font-medium ${
                            action.completed ? 'text-emerald-800' : 'text-neutral-900'
                          }`}>
                            {action.title}
                          </h4>
                          <p className={`text-xs ${
                            action.completed ? 'text-emerald-600' : 'text-neutral-600'
                          }`}>
                            {action.description}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Done Button */}
              <motion.button
                onClick={handleDone}
                disabled={!allActionsCompleted}
                whileHover={allActionsCompleted ? { scale: 1.02 } : {}}
                whileTap={allActionsCompleted ? { scale: 0.98 } : {}}
                className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                  allActionsCompleted
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg'
                    : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                }`}
              >
                Done
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
