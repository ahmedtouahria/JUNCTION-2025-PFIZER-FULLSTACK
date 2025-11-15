'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Bell, 
  Shield, 
  Moon, 
  Smartphone, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Check,
  X
} from 'lucide-react';

interface SettingToggle {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

interface SettingAction {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  action: string;
  danger?: boolean;
}

export default function SettingsPage() {
  const [notifications, setNotifications] = useState<SettingToggle[]>([
    {
      id: 'risk-alerts',
      title: 'Risk Alerts',
      description: 'Get notified when your risk levels increase',
      enabled: true
    },
    {
      id: 'daily-summary',
      title: 'Daily Summary',
      description: 'Receive end-of-day health insights',
      enabled: true
    },
    {
      id: 'wellness-tips',
      title: 'Wellness Tips',
      description: 'Personalized health recommendations',
      enabled: false
    }
  ]);

  const [privacy, setPrivacy] = useState<SettingToggle[]>([
    {
      id: 'local-processing',
      title: 'Local Processing Only',
      description: 'All analysis happens on your device',
      enabled: true
    },
    {
      id: 'anonymous-insights',
      title: 'Anonymous Research',
      description: 'Help improve Aurora with anonymous data',
      enabled: false
    }
  ]);

  const settingsActions: SettingAction[] = [
    {
      id: 'profile',
      title: 'Profile & Account',
      description: 'Manage your personal information',
      icon: User,
      action: 'View Profile'
    },
    {
      id: 'privacy-policy',
      title: 'Privacy Policy',
      description: 'Review our privacy practices',
      icon: Shield,
      action: 'View Policy'
    },
    {
      id: 'help',
      title: 'Help & Support',
      description: 'Get help or contact support',
      icon: HelpCircle,
      action: 'Get Help'
    },
    {
      id: 'logout',
      title: 'Sign Out',
      description: 'Sign out of your Aurora account',
      icon: LogOut,
      action: 'Sign Out',
      danger: true
    }
  ];

  const toggleNotification = (id: string) => {
    setNotifications(prev => 
      prev.map(item => 
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  const togglePrivacy = (id: string) => {
    setPrivacy(prev => 
      prev.map(item => 
        item.id === id && item.id !== 'local-processing' 
          ? { ...item, enabled: !item.enabled } 
          : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white px-6 py-8">
      <div className="max-w-sm mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-semibold text-neutral-900 mb-2">
            Settings
          </h1>
          <p className="text-lg text-neutral-600">
            Customize your Aurora experience
          </p>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-3xl p-6 shadow-lg mb-6 border border-neutral-100"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
              <Bell className="w-5 h-5 text-primary-600" />
            </div>
            <h2 className="text-xl font-semibold text-neutral-900">
              Notifications
            </h2>
          </div>
          
          <div className="space-y-4">
            {notifications.map((setting, index) => (
              <motion.div
                key={setting.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index + 0.3, duration: 0.4 }}
                className="flex items-center justify-between p-4 rounded-2xl bg-neutral-50"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-neutral-900 mb-1">
                    {setting.title}
                  </h3>
                  <p className="text-sm text-neutral-600">
                    {setting.description}
                  </p>
                </div>
                
                <motion.button
                  onClick={() => toggleNotification(setting.id)}
                  whileTap={{ scale: 0.95 }}
                  className={`w-12 h-6 rounded-full p-1 transition-all duration-300 ${
                    setting.enabled
                      ? 'bg-primary-500'
                      : 'bg-neutral-300'
                  }`}
                >
                  <motion.div
                    className="w-4 h-4 rounded-full bg-white shadow-sm"
                    animate={{
                      x: setting.enabled ? 24 : 0
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Privacy Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white rounded-3xl p-6 shadow-lg mb-6 border border-neutral-100"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-emerald-600" />
            </div>
            <h2 className="text-xl font-semibold text-neutral-900">
              Privacy & Security
            </h2>
          </div>
          
          <div className="space-y-4">
            {privacy.map((setting, index) => (
              <motion.div
                key={setting.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index + 0.5, duration: 0.4 }}
                className={`flex items-center justify-between p-4 rounded-2xl ${
                  setting.id === 'local-processing' 
                    ? 'bg-emerald-50 border border-emerald-200' 
                    : 'bg-neutral-50'
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium text-neutral-900">
                      {setting.title}
                    </h3>
                    {setting.id === 'local-processing' && (
                      <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium">
                        Required
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-neutral-600">
                    {setting.description}
                  </p>
                </div>
                
                <motion.button
                  onClick={() => togglePrivacy(setting.id)}
                  disabled={setting.id === 'local-processing'}
                  whileTap={{ scale: 0.95 }}
                  className={`w-12 h-6 rounded-full p-1 transition-all duration-300 ${
                    setting.enabled
                      ? 'bg-primary-500'
                      : 'bg-neutral-300'
                  } ${setting.id === 'local-processing' ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  <motion.div
                    className="w-4 h-4 rounded-full bg-white shadow-sm"
                    animate={{
                      x: setting.enabled ? 24 : 0
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Account & Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-white rounded-3xl p-6 shadow-lg border border-neutral-100"
        >
          <h2 className="text-xl font-semibold text-neutral-900 mb-6">
            Account & Support
          </h2>
          
          <div className="space-y-3">
            {settingsActions.map((action, index) => {
              const Icon = action.icon;
              
              return (
                <motion.button
                  key={action.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index + 0.7, duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-4 rounded-2xl border transition-all duration-300 text-left ${
                    action.danger
                      ? 'bg-red-50 border-red-200 hover:bg-red-100'
                      : 'bg-neutral-50 border-neutral-200 hover:bg-neutral-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        action.danger 
                          ? 'bg-red-200 text-red-700'
                          : 'bg-neutral-200 text-neutral-700'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-neutral-900 mb-1">
                          {action.title}
                        </h3>
                        <p className="text-sm text-neutral-600">
                          {action.description}
                        </p>
                      </div>
                    </div>
                    
                    <ChevronRight className={`w-5 h-5 ${
                      action.danger ? 'text-red-600' : 'text-neutral-400'
                    }`} />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* App Information */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="text-center mt-8"
        >
          <div className="text-sm text-neutral-500 space-y-2">
            <p>Aurora Health v1.0.0</p>
            <p>Clinical-grade wellness prediction</p>
            <p className="text-xs">Built for JUNCTION 2025</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
