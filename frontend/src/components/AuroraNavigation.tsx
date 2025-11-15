'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Home, 
  Activity, 
  BarChart3, 
  Shield, 
  Settings,
  Sparkles
} from 'lucide-react';

const navigationItems = [
  { href: '/hero', icon: Sparkles, label: 'Aurora' },
  { href: '/setup', icon: Settings, label: 'Setup' },
  { href: '/live', icon: Activity, label: 'Live' },
  { href: '/history', icon: Home, label: 'History' },
  { href: '/progress', icon: BarChart3, label: 'Progress' },
  { href: '/privacy', icon: Shield, label: 'Privacy' },
];

export function AuroraNavigation() {
  const pathname = usePathname();

  return (
    <motion.nav 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-neutral-200 px-4 py-2"
    >
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex flex-col items-center p-3 rounded-2xl transition-all duration-300 ${
                  isActive 
                    ? 'text-primary-600' 
                    : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                {/* Active Background */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary-50 rounded-2xl border border-primary-200"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                <div className="relative z-10 flex flex-col items-center">
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    className="mb-1"
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>
                  <span className="text-xs font-medium">
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
