/**
 * History - Clinical Screen
 * 7-day risk history with bottom sheet
 */

'use client';

import React, { useEffect, useState } from 'react';
import DailyRiskList from '@/components/clinical/DailyRiskList';
import ClinicalFooter from '@/components/clinical/ClinicalFooter';

export default function HistoryPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  const historyData = [
    {
      date: 'Nov 15, 2025',
      dayLabel: 'Today',
      riskLevel: 'low' as const,
      riskPercentage: 24,
      mainFactor: 'Low barometric pressure',
      secondaryFactor: 'Good sleep quality (7.2 hrs)'
    },
    {
      date: 'Nov 14, 2025',
      dayLabel: 'Yesterday',
      riskLevel: 'moderate' as const,
      riskPercentage: 52,
      mainFactor: 'High stress levels (7 meetings)',
      secondaryFactor: 'Low physical activity'
    },
    {
      date: 'Nov 13, 2025',
      dayLabel: 'Wednesday',
      riskLevel: 'low' as const,
      riskPercentage: 18,
      mainFactor: 'Stable weather conditions'
    },
    {
      date: 'Nov 12, 2025',
      dayLabel: 'Tuesday',
      riskLevel: 'high' as const,
      riskPercentage: 78,
      mainFactor: 'Poor sleep (4.5 hrs)',
      secondaryFactor: 'Rapid pressure change'
    },
    {
      date: 'Nov 11, 2025',
      dayLabel: 'Monday',
      riskLevel: 'moderate' as const,
      riskPercentage: 45,
      mainFactor: 'Moderate stress levels'
    },
    {
      date: 'Nov 10, 2025',
      dayLabel: 'Sunday',
      riskLevel: 'low' as const,
      riskPercentage: 15,
      mainFactor: 'Restful day, low activity'
    },
    {
      date: 'Nov 9, 2025',
      dayLabel: 'Saturday',
      riskLevel: 'low' as const,
      riskPercentage: 22,
      mainFactor: 'Weekend recovery period'
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
        {[1, 2, 3, 4, 5].map((i) => (
          <div 
            key={i}
            style={{
              height: '80px',
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
        margin: '0 auto',
        paddingBottom: '100px'
      }}
    >
      {/* Page Header */}
      <div style={{ marginBottom: 'var(--spacing-section)' }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 600,
          color: 'var(--clinical-text-primary)',
          marginBottom: '8px'
        }}>
          History
        </h1>
        <p style={{
          fontSize: '15px',
          color: 'var(--clinical-text-secondary)'
        }}>
          Your 7-day risk pattern
        </p>
      </div>

      {/* Daily Risk List */}
      <DailyRiskList data={historyData} />

      {/* Clinical Footer */}
      <ClinicalFooter />
    </div>
  );
}
