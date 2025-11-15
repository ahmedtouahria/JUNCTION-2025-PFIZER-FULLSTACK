'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { User, Bell, Moon, Sun, LogOut, Shield, HelpCircle, ChevronRight, Mail, Smartphone } from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen gradient-calm overflow-hidden">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-10 animate-fade-in">
          <h1 className="text-3xl font-extralight text-foreground/90 mb-2">Settings</h1>
          <p className="text-sm text-muted-foreground font-light">Customize your Aurora experience</p>
        </div>
        <div className="glass-card rounded-3xl p-6 mb-8 shadow-calm animate-scale-in">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <User className="w-8 h-8 text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-lg font-light text-foreground/90">{user?.username || 'User'}</h3>
              <p className="text-sm text-muted-foreground font-light">{user?.email || 'email@example.com'}</p>
            </div>
          </div>
        </div>
        <button onClick={handleLogout} className="w-full glass-card rounded-2xl p-4 shadow-calm hover:shadow-aurora transition-all duration-300 hover:scale-[1.02] border border-red-200/50">
          <div className="flex items-center justify-center gap-3">
            <LogOut className="w-5 h-5 text-red-500" strokeWidth={1.5} />
            <span className="font-light text-red-500">Log Out</span>
          </div>
        </button>
        <div className="text-center mt-12 animate-fade-in">
          <p className="text-xs text-muted-foreground/40 font-light">Aurora v1.0.0</p>
        </div>
      </div>
    </div>
  );
}
