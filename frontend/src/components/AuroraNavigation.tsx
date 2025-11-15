'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Activity, 
  BarChart3, 
  History, 
  Settings
} from 'lucide-react';

const navigationItems = [
  { href: '/live', icon: Activity, label: 'Live' },
  { href: '/progress', icon: BarChart3, label: 'Progress' },
  { href: '/history', icon: History, label: 'History' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export function AuroraNavigation() {
  const pathname = usePathname();

  const handleTabPress = () => {
    // Simulate haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  return (
    <motion.nav 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
      className="fixed bottom-0 left-0 right-0 z-navigation"
    >
      {/* Background with blur and shadow */}
      <div 
        className="bg-white border-t border-neutral-100"
        style={{ 
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 -1px 0 0 rgba(0, 0, 0, 0.05), 0 -2px 8px rgba(0, 0, 0, 0.1)',
          paddingBottom: 'max(8px, env(safe-area-inset-bottom))'
        }}
      >
        <div className="flex items-center justify-around px-1 pt-2 pb-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleTabPress}
                className="flex flex-col items-center justify-center py-1 px-2 min-w-0 flex-1 relative"
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={`flex flex-col items-center transition-all duration-150 ease-out ${
                    isActive 
                      ? 'text-primary-600' 
                      : 'text-neutral-500'
                  }`}
                >
                  {/* Icon Container */}
                  <div className="relative mb-1 flex items-center justify-center">
                    <Icon 
                      className={`w-6 h-6 transition-all duration-150 ${
                        isActive ? 'text-primary-600' : 'text-neutral-500'
                      }`} 
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                    
                    {/* Active indicator dot */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-2 w-1 h-1 bg-primary-600 rounded-full"
                        transition={{ 
                          type: 'spring', 
                          stiffness: 500, 
                          damping: 30,
                          duration: 0.3
                        }}
                      />
                    )}
                  </div>
                  
                  {/* Label */}
                  <span 
                    className={`text-[10px] font-medium leading-tight transition-all duration-150 ${
                      isActive 
                        ? 'text-primary-600' 
                        : 'text-neutral-500'
                    }`}
                    style={{ 
                      fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                    }}
                  >
                    {item.label}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
