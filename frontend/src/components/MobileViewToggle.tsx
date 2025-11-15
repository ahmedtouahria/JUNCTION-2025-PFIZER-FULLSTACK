'use client';

import { useState, useEffect } from 'react';
import { Smartphone } from 'lucide-react';

export function MobileViewToggle() {
  const [isMobileView, setIsMobileView] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Handle ESC key to exit mobile view
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileView) {
        setIsMobileView(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileView]);

  // Don't render on server
  if (!isClient) return null;

  return (
    <>
      {/* Floating Toggle Button */}
      {!isMobileView && (
        <button
          onClick={() => setIsMobileView(true)}
          className="fixed bottom-28 right-6 bg-primary text-white rounded-full p-4 shadow-aurora hover:shadow-glow-moderate transition-all duration-300 hover:scale-110 z-40 group"
          title="View as Mobile Device"
        >
          <Smartphone className="w-6 h-6" />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            View as Phone
          </span>
        </button>
      )}

      {/* Mobile Mockup Overlay */}
      {isMobileView && (
        <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-[100] p-4">
          {/* Close Button */}
          <button
            onClick={() => setIsMobileView(false)}
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors duration-200 flex items-center gap-2 text-sm"
          >
            <span className="font-light">Press ESC or click to exit</span>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              ✕
            </div>
          </button>

          {/* Mobile Device Frame */}
          <div className="relative animate-scale-in">
            {/* Phone Frame Shadow */}
            <div className="absolute inset-0 bg-black/40 blur-2xl scale-95"></div>

            {/* Phone Frame */}
            <div className="relative bg-gray-800 rounded-[3rem] p-3 shadow-2xl">
              {/* Screen Bezel */}
              <div className="bg-black rounded-[2.5rem] p-2 relative">
                {/* Status Bar */}
                <div className="absolute top-2 left-2 right-2 h-12 z-10 flex items-center justify-between px-8 text-white text-xs font-light">
                  <span>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
                  <div className="flex items-center gap-1.5">
                    {/* Signal */}
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="1" y="14" width="3" height="10" />
                      <rect x="6" y="10" width="3" height="14" />
                      <rect x="11" y="6" width="3" height="18" />
                      <rect x="16" y="2" width="3" height="22" />
                    </svg>
                    {/* WiFi */}
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
                    </svg>
                    {/* Battery */}
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
                  
                  {/* App Content - Rendered in iframe */}
                  <iframe
                    src={window.location.pathname}
                    className="w-full h-full border-0"
                    title="Mobile View"
                  />
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
            <p>✨ Interactive mobile experience - Tap and navigate as on a real phone</p>
          </div>
        </div>
      )}
    </>
  );
}
