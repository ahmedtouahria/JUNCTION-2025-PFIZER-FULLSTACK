/**
 * WhyTodaySection - Enhanced Clinical Component
 * Detailed explanation of today's risk factors
 */

'use client';

import React from 'react';

interface Factor {
  title: string;
  description: string;
  impact: 'protective' | 'elevated' | 'neutral';
}

interface WhyTodaySectionProps {
  riskLevel: 'low' | 'moderate' | 'high';
  riskPercentage: number;
  mainExplanation?: string;
  factors: Factor[];
  recommendation?: string;
}

export default function WhyTodaySection({
  riskLevel,
  riskPercentage,
  mainExplanation,
  factors,
  recommendation
}: WhyTodaySectionProps) {
  
  const getRiskDescription = () => {
    if (riskLevel === 'low') {
      return { text: 'lower than usual', color: 'var(--risk-low)' };
    } else if (riskLevel === 'moderate') {
      return { text: 'moderately elevated', color: 'var(--risk-moderate)' };
    } else {
      return { text: 'higher than usual', color: 'var(--risk-high)' };
    }
  };

  const getFactorDotColor = (impact: string) => {
    switch (impact) {
      case 'protective': return 'var(--risk-low)';
      case 'elevated': return 'var(--risk-moderate)';
      case 'neutral': return 'var(--gray-300)';
      default: return 'var(--gray-300)';
    }
  };

  const riskDesc = getRiskDescription();
  const defaultExplanation = `Your risk is ${riskDesc.text}. Based on your patterns and current conditions, ${
    riskLevel === 'low' 
      ? 'today is favorable for migraine prevention' 
      : riskLevel === 'moderate'
        ? 'take preventive measures and monitor symptoms'
        : 'be prepared and avoid known triggers'
  }.`;

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
      <h3 style={{
        fontSize: '18px',
        fontWeight: 500,
        color: 'var(--clinical-text-primary)',
        marginBottom: '16px'
      }}>
        Why today?
      </h3>

      {/* Main Explanation */}
      <p style={{
        fontSize: '15px',
        color: 'var(--clinical-text-secondary)',
        lineHeight: 1.6,
        marginBottom: '16px'
      }}>
        Your risk is{' '}
        <strong style={{ color: riskDesc.color, fontWeight: 500 }}>
          {riskDesc.text}
        </strong>
        . {mainExplanation || defaultExplanation.split('. ')[1]}
      </p>

      {/* Key Factors List */}
      {factors.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <div style={{
            fontSize: '13px',
            fontWeight: 500,
            color: 'var(--gray-500)',
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Key Factors
          </div>

          {factors.map((factor, index) => (
            <div 
              key={index}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                marginBottom: index < factors.length - 1 ? '12px' : '0'
              }}
            >
              <div 
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: getFactorDotColor(factor.impact),
                  marginTop: '6px',
                  flexShrink: 0
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '15px',
                  fontWeight: 500,
                  color: 'var(--clinical-text-primary)',
                  marginBottom: '2px'
                }}>
                  {factor.title}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: 'var(--clinical-text-secondary)',
                  lineHeight: 1.5
                }}>
                  {factor.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recommendation */}
      {recommendation && (
        <div 
          style={{
            backgroundColor: 'var(--gray-100)',
            borderRadius: '8px',
            padding: '12px',
            marginTop: '16px'
          }}
        >
          <div style={{
            fontSize: '13px',
            fontWeight: 500,
            color: 'var(--clinical-text-primary)',
            marginBottom: '4px'
          }}>
            Recommendation
          </div>
          <div style={{
            fontSize: '14px',
            color: 'var(--clinical-text-secondary)',
            lineHeight: 1.5
          }}>
            {recommendation}
          </div>
        </div>
      )}
    </div>
  );
}
