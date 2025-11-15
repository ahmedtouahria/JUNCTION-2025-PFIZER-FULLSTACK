/**
 * WhyTodaySection - Professional Clinical Component
 * Clean, simplified explanation of risk factors
 */

'use client';

import React from 'react';

interface Factor {
  label: string;
  value: string;
  impact: 'protective' | 'risk' | 'neutral';
}

interface WhyTodaySectionProps {
  riskLevel: 'low' | 'moderate' | 'high';
  factors: Factor[];
}

export default function WhyTodaySection({
  riskLevel,
  factors
}: WhyTodaySectionProps) {
  
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'protective': return '#2B9C57';  // Green
      case 'risk': return '#D64545';        // Red
      case 'neutral': return '#90949E';     // Gray
      default: return '#90949E';            // Gray fallback
    }
  };

  const getImpactLabel = (impact: string) => {
    switch (impact) {
      case 'protective': return 'Protective';
      case 'risk': return 'Risk factor';
      case 'neutral': return 'Neutral';
      default: return '';
    }
  };

  return (
    <div 
      style={{
        backgroundColor: 'var(--clinical-card)',
        border: '1px solid var(--clinical-border)',
        borderRadius: 'var(--radius-card)',
        padding: 'var(--spacing-card)',
        marginBottom: 'var(--spacing-section)'
      }}
      className="fade-in"
    >
      {/* Header */}
      <h3 style={{
        fontSize: '16px',
        fontWeight: 500,
        color: 'var(--clinical-text-primary)',
        marginBottom: '16px'
      }}>
        Why today?
      </h3>

      {/* Factors Grid - Clean & Simple */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {factors.map((factor, index) => (
          <div 
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px',
              backgroundColor: 'var(--gray-100)',
              borderRadius: '8px'
            }}
          >
            {/* Left: Label */}
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--clinical-text-primary)',
                marginBottom: '2px'
              }}>
                {factor.label}
              </div>
              <div style={{
                fontSize: '13px',
                color: 'var(--gray-500)'
              }}>
                {getImpactLabel(factor.impact)}
              </div>
            </div>

            {/* Right: Value with color indicator */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{
                fontSize: '15px',
                fontWeight: 500,
                color: 'var(--clinical-text-primary)'
              }}>
                {factor.value}
              </div>
              <div 
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: getImpactColor(factor.impact),
                  flexShrink: 0
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
