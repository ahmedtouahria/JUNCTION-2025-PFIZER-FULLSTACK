'use client';

import { useState, useEffect } from 'react';
import { X, AlertCircle, CheckCircle, Info, TrendingUp } from 'lucide-react';

export type NotificationType = 'info' | 'success' | 'warning' | 'risk';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
}

interface NotificationProps {
  notification: Notification;
  onClose: (id: string) => void;
}

function NotificationItem({ notification, onClose }: NotificationProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (notification.duration) {
      const timer = setTimeout(() => {
        handleClose();
      }, notification.duration);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(notification.id);
    }, 300);
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'risk':
        return <TrendingUp className="w-5 h-5 text-red-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getGradient = () => {
    switch (notification.type) {
      case 'success':
        return 'from-green-400/10 to-green-500/5';
      case 'warning':
        return 'from-yellow-400/10 to-yellow-500/5';
      case 'risk':
        return 'from-red-400/10 to-red-500/5';
      default:
        return 'from-blue-400/10 to-blue-500/5';
    }
  };

  return (
    <div
      className={`glass-card rounded-2xl p-4 shadow-aurora max-w-sm w-full transition-all duration-300 ${
        isExiting ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'
      } ${!isExiting && 'animate-slide-up'}`}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getGradient()} flex items-center justify-center flex-shrink-0`}>
          {getIcon()}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="font-light text-foreground/90 text-sm mb-1">
            {notification.title}
          </h4>
          <p className="text-xs text-muted-foreground font-light leading-relaxed">
            {notification.message}
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="text-muted-foreground/60 hover:text-foreground transition-colors duration-200 flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Notification Manager Hook
export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { ...notification, id }]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return {
    notifications,
    addNotification,
    removeNotification
  };
}

// Notification Container Component
interface NotificationContainerProps {
  notifications: Notification[];
  onClose: (id: string) => void;
}

export function NotificationContainer({ notifications, onClose }: NotificationContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-[150] space-y-3 pointer-events-none">
      <div className="pointer-events-auto space-y-3">
        {notifications.map(notification => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onClose={onClose}
          />
        ))}
      </div>
    </div>
  );
}
