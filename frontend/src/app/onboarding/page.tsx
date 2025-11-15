'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Sparkles, Heart, Shield, Activity, ArrowRight } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();

  const features = [
    {
      icon: Heart,
      title: 'Health Monitoring',
      description: 'Real-time health insights powered by clinical AI'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data stays private with hospital-grade security'
    },
    {
      icon: Activity,
      title: 'Predictive Alerts',
      description: 'Early warning system for health changes'
    }
  ];

  const handleGetStarted = () => {
    router.push('/setup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 flex flex-col">
      {/* Header */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        
        {/* Aurora Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-12"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center shadow-2xl mb-6"
            >
              <Sparkles className="w-12 h-12 text-white" />
            </motion.div>
            
            {/* Glow effect */}
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 w-24 h-24 bg-primary-400 rounded-full blur-xl opacity-30"
            />
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center max-w-sm mx-auto mb-12"
        >
          <h1 className="text-4xl font-light text-neutral-900 mb-4 tracking-tight">
            Aurora
          </h1>
          <p className="text-xl font-light text-neutral-600 mb-8">
            Your personal health guardian
          </p>
          <p className="text-neutral-500 leading-relaxed">
            Advanced AI monitoring that learns your patterns and alerts you to health changes before they become serious.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="w-full max-w-sm space-y-4 mb-12"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.15, duration: 0.6 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-neutral-900 text-sm">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="px-6 pb-8"
      >
        <motion.button
          onClick={handleGetStarted}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-primary-500/25 transition-all duration-300 flex items-center justify-center space-x-3"
        >
          <span>Get Started</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
        
        <p className="text-center text-xs text-neutral-400 mt-4 leading-relaxed">
          Clinically validated • Privacy protected • FDA compliant
        </p>
      </motion.div>
    </div>
  );
}
