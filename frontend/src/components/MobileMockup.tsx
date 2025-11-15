'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface MobileMockupProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export function MobileMockup({ children, onClose }: MobileMockupProps) {
  const [time] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  });

  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50 p-4">
      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors duration-200"
        >
          <X className="w-8 h-8" />
        </button>
      )}

      {/* Mobile Device Frame */}
      <div className="relative">
        {/* Phone Frame Shadow */}
        <div className="absolute inset-0 bg-black/40 blur-2xl scale-95"></div>

        {/* Phone Frame */}
        <div className="relative bg-gray-800 rounded-[3rem] p-3 shadow-2xl">
          {/* Screen Bezel */}
          <div className="bg-black rounded-[2.5rem] p-2">
            {/* Status Bar Area */}
            <div className="bg-gradient-to-b from-black to-transparent absolute top-2 left-2 right-2 h-12 rounded-t-[2.5rem] z-10 flex items-center justify-between px-8 text-white text-xs font-light">
              <span>{time}</span>
              <div className="flex items-center gap-1">
                {/* Signal Icon */}
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="1" y="14" width="3" height="10" />
                  <rect x="6" y="10" width="3" height="14" />
                  <rect x="11" y="6" width="3" height="18" />
                  <rect x="16" y="2" width="3" height="22" />
                </svg>
                {/* WiFi Icon */}
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
                </svg>
                {/* Battery Icon */}
                <svg className="w-5 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="6" width="18" height="12" rx="2" ry="2" />
                  <rect x="3" y="8" width="14" height="8" fill="currentColor" />
                  <line x1="20" y1="10" x2="20" y2="14" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Screen Content */}
            <div className="relative bg-white rounded-[2rem] overflow-hidden" style={{ width: '375px', height: '812px' }}>
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-20"></div>
              
              {/* App Content */}
              <div className="h-full overflow-auto scrollbar-hide">
                {children}
              </div>
            </div>

            {/* Home Indicator */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full"></div>
          </div>
        </div>

        {/* Volume Buttons */}
        <div className="absolute left-0 top-32 w-1 h-12 bg-gray-700 rounded-l-lg -translate-x-3"></div>
        <div className="absolute left-0 top-48 w-1 h-12 bg-gray-700 rounded-l-lg -translate-x-3"></div>

        {/* Power Button */}
        <div className="absolute right-0 top-40 w-1 h-16 bg-gray-700 rounded-r-lg translate-x-3"></div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-sm font-light text-center">
        <p>Interact with the app as you would on a real phone</p>
        <p className="text-xs mt-1">Press ESC or click X to exit</p>
      </div>
    </div>
  );
}
