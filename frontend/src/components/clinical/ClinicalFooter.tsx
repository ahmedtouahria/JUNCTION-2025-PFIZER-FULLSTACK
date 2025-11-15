/**
 * ClinicalFooter - Medical Grade Trust Footer
 * Displays validation note and privacy info
 */

'use client';

import React from 'react';

export default function ClinicalFooter() {
  return (
    <div 
      style={{
        marginTop: 'var(--spacing-page)',
        padding: '24px 16px',
        textAlign: 'center',
        borderTop: '1px solid var(--clinical-border)'
      }}
    >
      <div 
        style={{
          fontSize: '13px',
          color: 'var(--gray-500)',
          lineHeight: 1.6,
          marginBottom: '8px'
        }}
      >
        Based on validated migraine literature
      </div>
      <div 
        style={{
          fontSize: '13px',
          color: 'var(--gray-500)',
          lineHeight: 1.6
        }}
      >
        Your health data is private and secure • 
        <a 
          href="/privacy" 
          style={{ 
            color: 'var(--clinical-blue)', 
            textDecoration: 'none',
            marginLeft: '4px'
          }}
        >
          Privacy Policy
        </a>
      </div>
    </div>
  );
}
