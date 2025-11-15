/**
 * RiskSummaryCard - Clinical Grade Component
 * Main risk indicator for Today's Risk screen
 */

'use client';

import React from 'react';
import Link from 'next/link';

interface RiskSummaryCardProps {
  riskPercentage: number;
  riskLevel: 'low' | 'moderate' | 'high';
  keyFactor?: string;
  updatedMinutesAgo?: number;
}

export default function RiskSummaryCard({
  riskPercentage,
  riskLevel,
  keyFactor,
  updatedMinutesAgo = 5
}: RiskSummaryCardProps) {
  
  const getRiskColor = () => {
    switch (riskLevel) {
      case 'low': return 'var(--risk-low)';
      case 'moderate': return 'var(--risk-moderate)';
      case 'high': return 'var(--risk-high)';
    }
  };

  return (
    <div 
      style={{
        backgroundColor: 'var(--clinical-card)',
        border: '1px solid var(--clinical-border)',
        borderRadius: 'var(--radius-card)',
        padding: 'var(--spacing-card)',
        boxShadow: 'var(--shadow-card)',
      }}
      className="fade-in"
    >
      {/* Risk Percentage - Large Display */}
      <div style={{ textAlign: 'center', marginBottom: '12px' }}>
        <div 
          style={{
            fontSize: '56px',
            fontWeight: 600,
            lineHeight: 1,
            color: getRiskColor(),
            letterSpacing: '-0.02em'
          }}
        >
          {riskPercentage}%
        </div>
        <div 
          style={{
            fontSize: '16px',
            fontWeight: 400,
            color: 'var(--clinical-text-secondary)',
            marginTop: '8px'
          }}
        >
          Migraine risk today
        </div>
      </div>

      {/* Key Factor */}
      {keyFactor && (
        <div 
          style={{
            fontSize: '14px',
            color: 'var(--clinical-text-secondary)',
            textAlign: 'center',
            marginBottom: '16px',
            lineHeight: 1.5,
            padding: '12px',
            backgroundColor: 'var(--gray-100)',
            borderRadius: '8px'
          }}
        >
          <div style={{ 
            fontSize: '12px', 
            fontWeight: 500,
            color: 'var(--gray-500)',
            marginBottom: '4px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Primary Factor
          </div>
          <span style={{ color: 'var(--clinical-text-primary)', fontWeight: 500 }}>{keyFactor}</span>
        </div>
      )}

      {/* View All Factors Link */}
      <div style={{ textAlign: 'center', marginBottom: '12px' }}>
        <Link 
          href="/signals"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '15px',
            fontWeight: 500,
            color: 'var(--clinical-blue)',
            textDecoration: 'none',
            padding: '8px 16px',
            borderRadius: '8px',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--gray-100)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          View all factors
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none" 
            style={{ marginTop: '1px' }}
          >
            <path 
              d="M6 12L10 8L6 4" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>

      {/* Updated Timestamp */}
      <div 
        style={{
          fontSize: '13px',
          color: 'var(--gray-500)',
          textAlign: 'center',
          marginTop: '12px',
          paddingTop: '12px',
          borderTop: '1px solid var(--clinical-border)'
        }}
      >
        Updated {updatedMinutesAgo} minutes ago
      </div>
    </div>
  );
}
