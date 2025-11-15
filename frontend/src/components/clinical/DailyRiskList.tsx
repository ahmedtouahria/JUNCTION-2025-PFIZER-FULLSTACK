/**
 * DailyRiskList - Clinical Grade Component
 * History view with daily risk indicators
 */

'use client';

import React, { useState } from 'react';

interface DailyRisk {
  date: string;
  dayLabel: string;
  riskLevel: 'low' | 'moderate' | 'high';
  riskPercentage: number;
  mainFactor?: string;
  secondaryFactor?: string;
}

interface DailyRiskListProps {
  data: DailyRisk[];
}

export default function DailyRiskList({ data }: DailyRiskListProps) {
  const [selectedDay, setSelectedDay] = useState<DailyRisk | null>(null);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'var(--risk-low)';
      case 'moderate': return 'var(--risk-moderate)';
      case 'high': return 'var(--risk-high)';
    }
  };

  return (
    <>
      {/* Daily Risk List */}
      <div style={{ marginTop: 'var(--spacing-page)' }}>
        {data.map((day, index) => (
          <button
            key={index}
            onClick={() => setSelectedDay(day)}
            style={{
              width: '100%',
              backgroundColor: 'var(--clinical-card)',
              border: '1px solid var(--clinical-border)',
              borderRadius: 'var(--radius-card)',
              padding: 'var(--spacing-card)',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'var(--shadow-card)';
            }}
            className="fade-in"
          >
            {/* Date Info */}
            <div>
              <div style={{
                fontSize: '16px',
                fontWeight: 500,
                color: 'var(--clinical-text-primary)',
                marginBottom: '4px'
              }}>
                {day.dayLabel}
              </div>
              <div style={{
                fontSize: '14px',
                color: 'var(--gray-500)'
              }}>
                {day.date}
              </div>
            </div>

            {/* Risk Indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                fontSize: '20px',
                fontWeight: 600,
                color: getRiskColor(day.riskLevel)
              }}>
                {day.riskPercentage}%
              </div>
              <div 
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: getRiskColor(day.riskLevel)
                }}
              />
            </div>
          </button>
        ))}
      </div>

      {/* Bottom Sheet Modal */}
      {selectedDay && (
        <>
          {/* Backdrop */}
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              zIndex: 999
            }}
            onClick={() => setSelectedDay(null)}
            className="fade-in"
          />
          
          {/* Bottom Sheet */}
          <div 
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'var(--clinical-card)',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
              padding: '24px',
              zIndex: 1000,
              maxWidth: '600px',
              margin: '0 auto',
              boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)'
            }}
            className="slide-up"
          >
            {/* Handle */}
            <div 
              style={{
                width: '40px',
                height: '4px',
                backgroundColor: 'var(--gray-300)',
                borderRadius: '2px',
                margin: '0 auto 24px'
              }}
            />

            {/* Content */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '48px',
                fontWeight: 600,
                color: getRiskColor(selectedDay.riskLevel),
                marginBottom: '8px'
              }}>
                {selectedDay.riskPercentage}%
              </div>
              
              <div style={{
                fontSize: '16px',
                color: 'var(--clinical-text-secondary)',
                marginBottom: '24px'
              }}>
                {selectedDay.dayLabel} • {selectedDay.date}
              </div>

              {selectedDay.mainFactor && (
                <div style={{
                  backgroundColor: 'var(--gray-100)',
                  borderRadius: 'var(--radius-card)',
                  padding: '16px',
                  marginBottom: '12px',
                  textAlign: 'left'
                }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'var(--gray-500)',
                    marginBottom: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Main Factor
                  </div>
                  <div style={{
                    fontSize: '15px',
                    color: 'var(--clinical-text-primary)'
                  }}>
                    {selectedDay.mainFactor}
                  </div>
                </div>
              )}

              {selectedDay.secondaryFactor && (
                <div style={{
                  backgroundColor: 'var(--gray-100)',
                  borderRadius: 'var(--radius-card)',
                  padding: '16px',
                  textAlign: 'left'
                }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'var(--gray-500)',
                    marginBottom: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Secondary Factor
                  </div>
                  <div style={{
                    fontSize: '15px',
                    color: 'var(--clinical-text-primary)'
                  }}>
                    {selectedDay.secondaryFactor}
                  </div>
                </div>
              )}

              {/* Close Button */}
              <button
                onClick={() => setSelectedDay(null)}
                style={{
                  marginTop: '24px',
                  width: '100%',
                  padding: '14px',
                  backgroundColor: 'var(--clinical-blue)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: 'var(--radius-button)',
                  fontSize: '16px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--clinical-blue-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--clinical-blue)';
                }}
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
