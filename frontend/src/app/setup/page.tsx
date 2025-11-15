'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Calendar, MapPin, Activity } from 'lucide-react';

interface Permission {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  granted: boolean;
}

export default function PermissionSetupPage() {
  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: 'calendar',
      title: 'Allow Calendar',
      description: 'To understand your schedule patterns',
      icon: Calendar,
      granted: false
    },
    {
      id: 'location', 
      title: 'Allow Location',
      description: 'For weather and environmental data',
      icon: MapPin,
      granted: false
    },
    {
      id: 'background',
      title: 'Allow Background Activity',
      description: 'For continuous health monitoring',
      icon: Activity,
      granted: false
    }
  ]);

  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const grantPermission = (id: string) => {
    setPermissions(prev => 
      prev.map(p => p.id === id ? { ...p, granted: true } : p)
    );

    if (currentStep < permissions.length - 1) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setIsCompleted(true);
      }, 300);
    }
  };

  const allGranted = permissions.every(p => p.granted);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-neutral-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg">
            <div className="w-8 h-8 bg-white rounded-full"></div>
          </div>
          
          <h1 className="text-4xl font-semibold text-neutral-900 mb-3 leading-tight">
            Three permissions.
          </h1>
          <h2 className="text-4xl font-light text-neutral-600 mb-4">
            Zero input. Ever.
          </h2>
          
          <p className="text-lg text-neutral-500 leading-relaxed">
            Aurora learns your patterns automatically, requiring only these essential permissions to begin.
          </p>
        </motion.div>

        {/* Permission List */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="space-y-4 mb-8"
        >
          {permissions.map((permission, index) => {
            const Icon = permission.icon;
            const isActive = index <= currentStep;
            const isCompleted = permission.granted;
            
            return (
              <motion.div
                key={permission.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.4, duration: 0.4 }}
                className={`relative overflow-hidden transition-all duration-300 ${
                  isActive ? 'opacity-100' : 'opacity-40'
                }`}
              >
                <button
                  onClick={() => !isCompleted && isActive && grantPermission(permission.id)}
                  disabled={!isActive || isCompleted}
                  className={`w-full p-6 rounded-2xl border transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-primary-50 border-primary-200 shadow-lg' 
                      : isActive
                      ? 'bg-white border-neutral-200 shadow-md hover:shadow-lg hover:border-primary-200'
                      : 'bg-neutral-50 border-neutral-100'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    {/* Icon Container */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isCompleted 
                        ? 'bg-primary-500 shadow-lg' 
                        : 'bg-neutral-100'
                    }`}>
                      <AnimatePresence mode="wait">
                        {isCompleted ? (
                          <motion.div
                            key="check"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Check className="w-6 h-6 text-white" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="icon"
                            initial={{ scale: 1 }}
                            animate={{ scale: isActive ? 1 : 0.8 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Icon className={`w-6 h-6 ${
                              isActive ? 'text-primary-600' : 'text-neutral-400'
                            }`} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-left">
                      <h3 className={`text-lg font-medium transition-colors duration-300 ${
                        isCompleted ? 'text-primary-700' : 'text-neutral-900'
                      }`}>
                        {permission.title}
                      </h3>
                      <p className="text-sm text-neutral-500 mt-1">
                        {permission.description}
                      </p>
                    </div>

                    {/* Success Glow Effect */}
                    {isCompleted && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                        className="absolute inset-0 bg-gradient-to-r from-primary-100/50 to-primary-200/50 rounded-2xl pointer-events-none"
                      />
                    )}
                  </div>
                </button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Completion State */}
        <AnimatePresence>
          {isCompleted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4, type: 'spring' }}
                className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl"
              >
                <Check className="w-8 h-8 text-white" />
              </motion.div>

              <h3 className="text-2xl font-semibold text-neutral-900 mb-3">
                All set!
              </h3>
              <p className="text-lg text-neutral-600 mb-8">
                Aurora is now learning your patterns. Predictions will improve over the next 24 hours.
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white py-4 px-8 rounded-2xl font-medium text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Continue to Aurora
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Indicator */}
        {!isCompleted && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="flex justify-center space-x-2 mt-8"
          >
            {permissions.map((_, index) => (
              <motion.div
                key={index}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index <= currentStep ? 'bg-primary-500 w-8' : 'bg-neutral-200 w-4'
                }`}
                layout
              />
            ))}
          </motion.div>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="text-center mt-8"
        >
          <p className="text-xs text-neutral-400 leading-relaxed">
            Your data stays on your device. Aurora processes patterns locally for your privacy.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
