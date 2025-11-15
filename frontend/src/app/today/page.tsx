/**
 * Today's Risk - Clinical Main Screen
 * Medical-grade UI following strict design spec
 */

'use client';

import React, { useEffect, useState } from 'react';
import RiskSummaryCard from '@/components/clinical/RiskSummaryCard';
import WhyTodaySection from '@/components/clinical/WhyTodaySection';
import ClinicalFooter from '@/components/clinical/ClinicalFooter';

export default function TodayPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => setLoading(false), 500);
  }, []);

  // Sample data - would come from API
  const todayFactors = [
    {
      label: 'Sleep quality',
      value: '7.2 hrs',
      impact: 'protective' as const
    },
    {
      label: 'Barometric pressure',
      value: '29.8 inHg',
      impact: 'risk' as const
    },
    {
      label: 'Stress level',
      value: 'Normal',
      impact: 'neutral' as const
    },
    {
      label: 'Hydration',
      value: 'Good',
      impact: 'protective' as const
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
        <div style={{
          height: '200px',
          backgroundColor: 'var(--gray-100)',
          borderRadius: 'var(--radius-card)',
          animation: 'pulse 1.5s ease-in-out infinite'
        }} />
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
          Today
        </h1>
        <p style={{
          fontSize: '15px',
          color: 'var(--clinical-text-secondary)'
        }}>
          Your 24-hour migraine risk forecast
        </p>
      </div>

      {/* Risk Summary Card - Positioned in top 1/3 */}
      <div style={{ marginBottom: 'var(--spacing-page)' }}>
        <RiskSummaryCard
          riskPercentage={24}
          riskLevel="low"
          keyFactor="Low barometric pressure"
          updatedMinutesAgo={5}
        />
      </div>

      {/* Why Today Section - Simplified & Professional */}
      <WhyTodaySection
        riskLevel="low"
        factors={todayFactors}
      />

      {/* Clinical Footer */}
      <ClinicalFooter />
    </div>
  );
}
