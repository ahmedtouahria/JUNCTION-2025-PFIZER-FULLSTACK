/**
 * Signals (Factors) - Clinical Screen
 * Medical-grade factor display
 */

'use client';

import React, { useEffect, useState } from 'react';
import FactorCard from '@/components/clinical/FactorCard';
import ClinicalFooter from '@/components/clinical/ClinicalFooter';

export default function SignalsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  const factors = [
    {
      title: 'Sleep Quality',
      status: 'low' as const,
      explanation: 'You got 7.2 hours of sleep last night, within your optimal range.',
      intensity: 25
    },
    {
      title: 'Barometric Pressure',
      status: 'moderate' as const,
      explanation: 'Pressure dropping from 30.2 to 29.8 inHg. This change may increase risk.',
      intensity: 60
    },
    {
      title: 'Stress Level',
      status: 'moderate' as const,
      explanation: 'Calendar shows 7 meetings today, above your average of 4.',
      intensity: 55
    },
    {
      title: 'Hydration',
      status: 'low' as const,
      explanation: 'Water intake is consistent with your daily target.',
      intensity: 20
    },
    {
      title: 'Physical Activity',
      status: 'high' as const,
      explanation: 'Only 2,140 steps yesterday, significantly below your 5,000 step baseline.',
      intensity: 75
    }
  ];

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: 'var(--clinical-background)',
        padding: '24px 16px',
        maxWidth: '550px',
        margin: '0 auto'
      }}>
        {[1, 2, 3].map((i) => (
          <div 
            key={i}
            style={{
              height: '120px',
              backgroundColor: 'var(--gray-100)',
              borderRadius: 'var(--radius-card)',
              marginBottom: '12px',
              animation: 'pulse 1.5s ease-in-out infinite'
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div 
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--clinical-background)',
        padding: '24px 16px',
        maxWidth: '550px',
        margin: '0 auto'
      }}
    >
      {/* Page Header */}
      <div style={{ marginBottom: 'var(--spacing-page)' }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 600,
          color: 'var(--clinical-text-primary)',
          marginBottom: '8px'
        }}>
          Signals
        </h1>
        <p style={{
          fontSize: '15px',
          color: 'var(--clinical-text-secondary)'
        }}>
          Factors affecting your migraine risk
        </p>
      </div>

      {/* Factor Cards */}
      <div>
        {factors.map((factor, index) => (
          <FactorCard
            key={index}
            title={factor.title}
            status={factor.status}
            explanation={factor.explanation}
            intensity={factor.intensity}
          />
        ))}
      </div>

      {/* Clinical Footer */}
      <ClinicalFooter />
    </div>
  );
}
