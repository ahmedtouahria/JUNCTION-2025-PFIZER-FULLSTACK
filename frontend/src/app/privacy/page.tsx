'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Eye, 
  Server, 
  Smartphone, 
  Check, 
  X, 
  ArrowRight,
  Download,
  Trash2
} from 'lucide-react';

interface PrivacySetting {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  enabled: boolean;
  required: boolean;
}

interface DataControl {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  action: string;
}

export default function PrivacyDataPage() {
  const [privacySettings, setPrivacySettings] = useState<PrivacySetting[]>([
    {
      id: 'local-processing',
      title: 'Local Processing Only',
      description: 'All analysis happens on your device. No data sent to servers.',
      icon: Smartphone,
      enabled: true,
      required: true
    },
    {
      id: 'encrypted-storage',
      title: 'Encrypted Storage',
      description: 'All health data encrypted with your device keys.',
      icon: Lock,
      enabled: true,
      required: true
    },
    {
      id: 'anonymous-insights',
      title: 'Anonymous Research Insights',
      description: 'Help improve Aurora with anonymous, aggregated data.',
      icon: Eye,
      enabled: false,
      required: false
    },
    {
      id: 'cloud-backup',
      title: 'Secure Cloud Backup',
      description: 'Encrypted backup to your private iCloud for device sync.',
      icon: Server,
      enabled: false,
      required: false
    }
  ]);

  const dataControls: DataControl[] = [
    {
      id: 'export',
      title: 'Export Your Data',
      description: 'Download all your health data in standard formats',
      icon: Download,
      action: 'Export'
    },
    {
      id: 'delete',
      title: 'Delete All Data',
      description: 'Permanently remove all Aurora data from this device',
      icon: Trash2,
      action: 'Delete'
    }
  ];

  const toggleSetting = (id: string) => {
    setPrivacySettings(prev => 
      prev.map(setting => 
        setting.id === id && !setting.required 
          ? { ...setting, enabled: !setting.enabled }
          : setting
      )
    );
  };

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
          <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg">
            <Shield className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl font-semibold text-neutral-900 mb-3">
            Privacy & Data
          </h1>
          <p className="text-lg text-neutral-600 leading-relaxed">
            Your health data belongs to you. Aurora is designed with clinical-grade privacy from the ground up.
          </p>
        </motion.div>

        {/* Core Privacy Principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl p-8 mb-8 border border-primary-200"
        >
          <h2 className="text-2xl font-semibold text-primary-900 mb-6 text-center">
            Clinical-Safe by Design
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-primary-200 rounded-xl flex items-center justify-center flex-shrink-0">
                <Smartphone className="w-5 h-5 text-primary-700" />
              </div>
              <div>
                <h3 className="font-semibold text-primary-900 mb-2">
                  Device-Only Processing
                </h3>
                <p className="text-sm text-primary-700 leading-relaxed">
                  All machine learning and analysis happens locally. Your patterns never leave your device.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-primary-200 rounded-xl flex items-center justify-center flex-shrink-0">
                <Lock className="w-5 h-5 text-primary-700" />
              </div>
              <div>
                <h3 className="font-semibold text-primary-900 mb-2">
                  End-to-End Encryption
                </h3>
                <p className="text-sm text-primary-700 leading-relaxed">
                  Data is encrypted with keys only you control. Even Aurora can't access your information.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-primary-200 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-primary-700" />
              </div>
              <div>
                <h3 className="font-semibold text-primary-900 mb-2">
                  HIPAA Compliant
                </h3>
                <p className="text-sm text-primary-700 leading-relaxed">
                  Built to meet healthcare privacy standards. Your data is protected like medical records.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-primary-200 rounded-xl flex items-center justify-center flex-shrink-0">
                <Eye className="w-5 h-5 text-primary-700" />
              </div>
              <div>
                <h3 className="font-semibold text-primary-900 mb-2">
                  Zero Tracking
                </h3>
                <p className="text-sm text-primary-700 leading-relaxed">
                  No analytics, no tracking, no behavioral profiling. Aurora learns about you, not from you.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Privacy Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white rounded-3xl p-6 shadow-lg mb-8 border border-neutral-100"
        >
          <h2 className="text-xl font-semibold text-neutral-900 mb-6">
            Privacy Settings
          </h2>
          
          <div className="space-y-4">
            {privacySettings.map((setting, index) => {
              const Icon = setting.icon;
              
              return (
                <motion.div
                  key={setting.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index + 0.5, duration: 0.4 }}
                  className={`p-5 rounded-2xl border transition-all duration-300 ${
                    setting.enabled 
                      ? 'bg-primary-50 border-primary-200' 
                      : 'bg-neutral-50 border-neutral-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        setting.enabled 
                          ? 'bg-primary-200 text-primary-700'
                          : 'bg-neutral-200 text-neutral-600'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-medium text-neutral-900">
                            {setting.title}
                          </h3>
                          {setting.required && (
                            <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full font-medium">
                              Required
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-neutral-600 leading-relaxed">
                          {setting.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Toggle */}
                    <motion.button
                      onClick={() => toggleSetting(setting.id)}
                      disabled={setting.required}
                      whileTap={{ scale: 0.95 }}
                      className={`w-12 h-6 rounded-full p-1 transition-all duration-300 ${
                        setting.enabled
                          ? 'bg-primary-500'
                          : 'bg-neutral-300'
                      } ${setting.required ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <motion.div
                        className="w-4 h-4 rounded-full bg-white shadow-sm"
                        animate={{
                          x: setting.enabled ? 24 : 0
                        }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Data Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-white rounded-3xl p-6 shadow-lg mb-8 border border-neutral-100"
        >
          <h2 className="text-xl font-semibold text-neutral-900 mb-6">
            Your Data Controls
          </h2>
          
          <div className="space-y-4">
            {dataControls.map((control, index) => {
              const Icon = control.icon;
              const isDelete = control.id === 'delete';
              
              return (
                <motion.button
                  key={control.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index + 0.7, duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-5 rounded-2xl border transition-all duration-300 text-left ${
                    isDelete
                      ? 'bg-red-50 border-red-200 hover:bg-red-100'
                      : 'bg-neutral-50 border-neutral-200 hover:bg-neutral-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isDelete 
                          ? 'bg-red-200 text-red-700'
                          : 'bg-neutral-200 text-neutral-700'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-neutral-900 mb-1">
                          {control.title}
                        </h3>
                        <p className="text-sm text-neutral-600">
                          {control.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${
                        isDelete ? 'text-red-700' : 'text-primary-600'
                      }`}>
                        {control.action}
                      </span>
                      <ArrowRight className={`w-4 h-4 ${
                        isDelete ? 'text-red-600' : 'text-primary-500'
                      }`} />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="text-center"
        >
          <p className="text-sm text-neutral-500 leading-relaxed mb-4">
            Questions about privacy? Read our <span className="text-primary-600 font-medium">Privacy Policy</span> or contact our <span className="text-primary-600 font-medium">Privacy Team</span>.
          </p>
          
          <div className="flex items-center justify-center space-x-2 text-xs text-neutral-400">
            <Shield className="w-4 h-4" />
            <span>Audited by independent security firms • Last review: December 2024</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
