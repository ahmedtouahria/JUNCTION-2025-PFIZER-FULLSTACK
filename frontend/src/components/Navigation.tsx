'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { RadioTower, Activity, Clock } from 'lucide-react';

export function Navigation() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();

  // Don't show navigation on login/register pages
  if (pathname === '/login' || pathname === '/register') {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  const navItems = [
    { href: '/', label: 'Radar', icon: RadioTower },
    { href: '/insights', label: 'Signals', icon: Activity },
    { href: '/history', label: 'History', icon: Clock },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-border z-50">
      <div className="max-w-lg mx-auto px-6">
        <div className="flex justify-around items-center h-20">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 transition-all duration-200 ${
                  isActive
                    ? 'text-primary scale-110'
                    : 'text-muted-foreground/60 hover:text-muted-foreground'
                }`}
              >
                <Icon className={`h-6 w-6 ${isActive ? 'stroke-[1.5]' : 'stroke-[1]'}`} />
                <span className={`text-xs font-light tracking-wide ${
                  isActive ? 'font-normal' : ''
                }`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
