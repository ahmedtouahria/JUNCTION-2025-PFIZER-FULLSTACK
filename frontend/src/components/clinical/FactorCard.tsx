/**
 * FactorCard - Clinical Grade Component
 * Display individual health factors with status and intensity
 */

'use client';

import React from 'react';

interface FactorCardProps {
  title: string;
  status: 'low' | 'moderate' | 'high';
  explanation: string;
  intensity?: number; // 0-100
}

export default function FactorCard({
  title,
  status,
  explanation,
  intensity = 0
}: FactorCardProps) {
  
  const getStatusColor = () => {
    switch (status) {
      case 'low': return 'var(--risk-low)';
      case 'moderate': return 'var(--risk-moderate)';
      case 'high': return 'var(--risk-high)';
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'low': return 'Normal';
      case 'moderate': return 'Elevated';
      case 'high': return 'High Risk';
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
        marginBottom: 'var(--spacing-section)'
      }}
      className="fade-in"
    >
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '12px'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: 500,
          color: 'var(--clinical-text-primary)',
          margin: 0
        }}>
          {title}
        </h3>
        
        {/* Status Pill */}
        <div 
          style={{
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: 500,
            color: '#FFFFFF',
            backgroundColor: getStatusColor()
          }}
        >
          {getStatusLabel()}
        </div>
      </div>

      {/* Explanation */}
      <p style={{
        fontSize: '15px',
        fontWeight: 400,
        color: 'var(--clinical-text-secondary)',
        lineHeight: 1.6,
        marginBottom: '12px'
      }}>
        {explanation}
      </p>

      {/* Intensity Bar */}
      {intensity > 0 && (
        <div>
          <div style={{
            fontSize: '13px',
            fontWeight: 500,
            color: 'var(--clinical-text-secondary)',
            marginBottom: '6px'
          }}>
            Intensity
          </div>
          <div 
            style={{
              width: '100%',
              height: '8px',
              backgroundColor: 'var(--gray-100)',
              borderRadius: '4px',
              overflow: 'hidden'
            }}
          >
            <div 
              style={{
                width: `${intensity}%`,
                height: '100%',
                backgroundColor: getStatusColor(),
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
