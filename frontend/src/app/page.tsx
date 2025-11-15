'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isOnboardingCompleted } from '@/lib/onboarding';
import { motion } from 'framer-motion';

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkOnboardingStatus = () => {
      if (isOnboardingCompleted()) {
        router.replace('/live');
      } else {
        router.replace('/onboarding');
      }
      setIsLoading(false);
    };

    checkOnboardingStatus();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full"
        />
      </div>
    );
  }

  return null;
}
