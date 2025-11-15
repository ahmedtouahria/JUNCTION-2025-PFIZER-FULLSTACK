'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Check, Camera, Mic, Heart, Bell, ArrowRight } from 'lucide-react';
import { markOnboardingCompleted } from '@/lib/onboarding';

interface Permission {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  granted: boolean;
  required: boolean;
}

export default function SetupPage() {
  const router = useRouter();
  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: 'camera',
      title: 'Camera Access',
      description: 'For facial analysis and health monitoring',
      icon: Camera,
      granted: false,
      required: true
    },
    {
      id: 'microphone',
      title: 'Microphone Access', 
      description: 'Voice pattern analysis for stress detection',
      icon: Mic,
      granted: false,
      required: true
    },
    {
      id: 'health',
      title: 'Health Data Access',
      description: 'Connect with your health apps and devices',
      icon: Heart,
      granted: false,
      required: true
    },
    {
      id: 'notifications',
      title: 'Push Notifications',
      description: 'Receive important health alerts and reminders',
      icon: Bell,
      granted: false,
      required: false
    }
  ]);

  const grantPermission = (id: string) => {
    setPermissions(prev => 
      prev.map(p => p.id === id ? { ...p, granted: true } : p)
    );
  };

  const allRequiredGranted = permissions.filter(p => p.required).every(p => p.granted);

  const handleContinue = () => {
    markOnboardingCompleted();
    router.push('/live');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 px-6 py-8">
      <div className="max-w-sm mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl font-semibold text-neutral-900 mb-3">
            Setup Permissions
          </h1>
          <p className="text-neutral-600 leading-relaxed">
            Aurora needs these permissions to provide accurate health monitoring and alerts.
          </p>
        </motion.div>

        {/* Permission Cards */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-4 mb-8"
        >
          {permissions.map((permission, index) => {
            const Icon = permission.icon;
            
            return (
              <motion.div
                key={permission.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
                className={`bg-white rounded-2xl p-5 border shadow-sm transition-all duration-300 ${
                  permission.granted 
                    ? 'border-primary-200 bg-primary-50/30' 
                    : 'border-neutral-200 hover:border-primary-200'
                }`}
              >
                <div className="flex items-start space-x-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    permission.granted 
                      ? 'bg-primary-500 shadow-lg' 
                      : 'bg-neutral-100'
                  }`}>
                    {permission.granted ? (
                      <Check className="w-6 h-6 text-white" />
                    ) : (
                      <Icon className="w-6 h-6 text-neutral-600" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-neutral-900">
                        {permission.title}
                      </h3>
                      {permission.required && (
                        <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full font-medium">
                          Required
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
                      {permission.description}
                    </p>
                    
                    {/* Grant Button */}
                    {!permission.granted && (
                      <motion.button
                        onClick={() => grantPermission(permission.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2.5 px-4 rounded-xl font-medium text-sm transition-all duration-300 shadow-md"
                      >
                        Grant Access
                      </motion.button>
                    )}

                    {/* Granted State */}
                    {permission.granted && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center text-primary-600 text-sm font-medium"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Access Granted
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: allRequiredGranted ? 1 : 0.5, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.button
            onClick={handleContinue}
            disabled={!allRequiredGranted}
            whileHover={allRequiredGranted ? { scale: 1.02 } : {}}
            whileTap={allRequiredGranted ? { scale: 0.98 } : {}}
            className={`w-full py-4 px-8 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-3 ${
              allRequiredGranted
                ? 'bg-gradient-to-r from-[#4A78FF] to-[#3B82F6] text-white shadow-xl hover:shadow-blue-500/25'
                : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
            }`}
            style={allRequiredGranted ? {
              background: 'linear-gradient(135deg, #4A78FF 0%, #3B82F6 100%)'
            } : undefined}
          >
            <span>Continue to Aurora</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mt-6"
        >
          <p className="text-xs text-neutral-400 leading-relaxed">
            All permissions can be changed later in your device settings
          </p>
        </motion.div>
      </div>
    </div>
  );
}
