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
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('7d');

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  const historyData = [
    {
      date: 'Nov 15, 2025',
      dayLabel: 'Today',
      riskLevel: 'low' as const,
      riskPercentage: 24,
      mainFactor: 'Low barometric pressure (29.8 inHg)',
      secondaryFactor: 'Good sleep quality (7.2 hrs, REM: 22%)'
    },
    {
      date: 'Nov 14, 2025',
      dayLabel: 'Yesterday',
      riskLevel: 'moderate' as const,
      riskPercentage: 52,
      mainFactor: 'High stress levels (7 meetings, cortisol peak)',
      secondaryFactor: 'Low physical activity (2,100 steps)'
    },
    {
      date: 'Nov 13, 2025',
      dayLabel: 'Wednesday',
      riskLevel: 'low' as const,
      riskPercentage: 18,
      mainFactor: 'Stable weather conditions (30.1 inHg)',
      secondaryFactor: 'Active day (8,500 steps)'
    },
    {
      date: 'Nov 12, 2025',
      dayLabel: 'Tuesday',
      riskLevel: 'high' as const,
      riskPercentage: 78,
      mainFactor: 'Poor sleep (4.5 hrs, deep sleep: 8%)',
      secondaryFactor: 'Rapid pressure change (-0.15 inHg/hr)'
    },
    {
      date: 'Nov 11, 2025',
      dayLabel: 'Monday',
      riskLevel: 'moderate' as const,
      riskPercentage: 45,
      mainFactor: 'Moderate stress levels (work deadline)',
      secondaryFactor: 'Weather front approaching'
    },
    {
      date: 'Nov 10, 2025',
      dayLabel: 'Sunday',
      riskLevel: 'low' as const,
      riskPercentage: 15,
      mainFactor: 'Restful day, low activity (meditation: 20 min)',
      secondaryFactor: 'Optimal hydration (2.1L water)'
    },
    {
      date: 'Nov 9, 2025',
      dayLabel: 'Saturday',
      riskLevel: 'low' as const,
      riskPercentage: 22,
      mainFactor: 'Weekend recovery period (9 hrs sleep)',
      secondaryFactor: 'Social activities (stress relief)'
    }
  ];

  // Calculate insights
  const averageRisk = Math.round(historyData.reduce((sum, day) => sum + day.riskPercentage, 0) / historyData.length);
  const lowRiskDays = historyData.filter(day => day.riskLevel === 'low').length;
  const highRiskDays = historyData.filter(day => day.riskLevel === 'high').length;

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#F8F9FB',
        padding: '24px 16px',
        maxWidth: '550px',
        margin: '0 auto'
      }}>
        {/* Header Skeleton */}
        <div style={{
          height: '60px',
          backgroundColor: '#E1E4EA',
          borderRadius: '8px',
          marginBottom: '20px'
        }} />
        
        {/* Summary Cards Skeleton */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '12px', 
          marginBottom: '24px' 
        }}>
          <div style={{
            height: '80px',
            backgroundColor: '#E1E4EA',
            borderRadius: '12px'
          }} />
          <div style={{
            height: '80px',
            backgroundColor: '#E1E4EA',
            borderRadius: '12px'
          }} />
        </div>

        {/* List Skeleton */}
        {[1, 2, 3, 4, 5].map((i) => (
          <div 
            key={i}
            style={{
              height: '80px',
              backgroundColor: '#E1E4EA',
              borderRadius: '12px',
              marginBottom: '12px',
              opacity: 1 - (i * 0.1)
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
        backgroundColor: '#F8F9FB',
        padding: '24px 16px',
        maxWidth: '550px',
        margin: '0 auto',
        paddingBottom: '100px'
      }}
    >
      {/* Enhanced Page Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 600,
            color: '#1A1A1A',
            margin: 0,
            flex: 1
          }}>
            Risk History
          </h1>
          
          {/* Timeframe Selector */}
          <div style={{
            display: 'flex',
            backgroundColor: '#E1E4EA',
            borderRadius: '8px',
            padding: '2px'
          }}>
            {(['7d', '30d', '90d'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period)}
                style={{
                  padding: '6px 12px',
                  backgroundColor: timeframe === period ? '#FFFFFF' : 'transparent',
                  color: timeframe === period ? '#1A1A1A' : '#90949E',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: timeframe === period ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none'
                }}
              >
                {period.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        
        <p style={{
          fontSize: '15px',
          color: '#4A4E57',
          margin: 0,
          marginBottom: '16px'
        }}>
          Track your migraine patterns and identify triggers
        </p>

        {/* Quick Stats */}
        <div style={{
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            color: '#4A4E57'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#2B9C57'
            }} />
            {lowRiskDays} low risk days
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            color: '#4A4E57'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#D64545'
            }} />
            {highRiskDays} high risk days
          </div>
        </div>
      </div>

      {/* Daily Risk List with Enhanced Features */}
      <DailyRiskList data={historyData} />

      {/* Clinical Insights Section */}
      <div style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E1E4EA',
        borderRadius: '12px',
        padding: '20px',
        marginTop: '24px'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: 600,
          color: '#1A1A1A',
          marginBottom: '12px',
          margin: 0
        }}>
          Clinical Insights
        </h3>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div style={{
            padding: '12px',
            backgroundColor: '#F0F8F4',
            border: '1px solid #2B9C5730',
            borderRadius: '8px'
          }}>
            <div style={{
              fontSize: '13px',
              fontWeight: 500,
              color: '#2B9C57',
              marginBottom: '4px'
            }}>
              ✓ Pattern Recognition
            </div>
            <div style={{
              fontSize: '14px',
              color: '#1A1A1A',
              lineHeight: '1.4'
            }}>
              Weekends show {Math.round(((historyData.filter((day, i) => i >= 5).reduce((sum, day) => sum + day.riskPercentage, 0) / 2) - averageRisk))}% lower risk than weekdays
            </div>
          </div>
          
          <div style={{
            padding: '12px',
            backgroundColor: '#FFF8F0',
            border: '1px solid #E4A62030',
            borderRadius: '8px'
          }}>
            <div style={{
              fontSize: '13px',
              fontWeight: 500,
              color: '#E4A620',
              marginBottom: '4px'
            }}>
            ⚠ Risk Correlation
            </div>
            <div style={{
              fontSize: '14px',
              color: '#1A1A1A',
              lineHeight: '1.4'
            }}>
              Sleep quality below 6 hrs correlates with 65%+ risk levels
            </div>
          </div>
        </div>
      </div>

      {/* Clinical Footer */}
      <ClinicalFooter />
    </div>
  );
}
