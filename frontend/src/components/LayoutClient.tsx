'use client';

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { isOnboardingCompleted } from "@/lib/onboarding";
import { AuroraNavigation } from "@/components/AuroraNavigation";

export function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showNavigation, setShowNavigation] = useState(false);

  useEffect(() => {
    // Show navigation on main app pages
    const appPages = ['/live', '/progress', '/history', '/settings'];
    const shouldShowNav = appPages.includes(pathname);
    setShowNavigation(shouldShowNav);
  }, [pathname]);

  return (
    <>
      <div 
        className={showNavigation ? "pb-20" : ""}
        style={{ 
          paddingBottom: showNavigation 
            ? `calc(5rem + env(safe-area-inset-bottom))` 
            : '0'
        }}
      >
        {children}
      </div>
      {showNavigation && <AuroraNavigation />}
    </>
  );
}
