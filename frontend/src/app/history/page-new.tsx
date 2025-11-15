'use client';

import { useState } from 'react';

export default function HistoryPage() {
  const [viewMode, setViewMode] = useState<'timeline' | 'chart' | 'insights'>('timeline');

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-semibold text-neutral-900 mb-4">
          History
        </h1>
        <p className="text-neutral-600 mb-8">
          Track your wellness patterns over time
        </p>

        {/* View Mode Toggle */}
        <div className="flex rounded-xl p-1 shadow-sm border bg-white max-w-sm mx-auto mb-8">
          {(['timeline', 'chart', 'insights'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize ${
                viewMode === mode
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Content based on view mode */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-neutral-200">
          {viewMode === 'timeline' && (
            <div className="text-center">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Timeline View</h2>
              <p className="text-neutral-600">Your daily risk timeline will appear here.</p>
            </div>
          )}

          {viewMode === 'chart' && (
            <div className="text-center">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Chart View</h2>
              <p className="text-neutral-600">Risk trend charts will appear here.</p>
            </div>
          )}

          {viewMode === 'insights' && (
            <div className="text-center">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Insights</h2>
              <p className="text-neutral-600">Pattern insights will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
