/**
 * ClinicalNavigation - Bottom Tab Bar
 * Medical-grade 3-tab navigation
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ClinicalNavigation() {
  const pathname = usePathname();

  const tabs = [
    { name: 'Today', path: '/today' },
    { name: 'Signals', path: '/signals' },
    { name: 'History', path: '/clinical-history' }
  ];

  return (
    <nav 
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'var(--clinical-card)',
        borderTop: '1px solid var(--clinical-border)',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '12px 0',
        maxWidth: '600px',
        margin: '0 auto',
        zIndex: 100
      }}
    >
      {tabs.map((tab) => {
        const isActive = pathname === tab.path;
        
        return (
          <Link
            key={tab.path}
            href={tab.path}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px',
              minHeight: '44px',
              textDecoration: 'none',
              color: isActive ? 'var(--clinical-blue)' : 'var(--gray-500)',
              transition: 'color 0.2s ease'
            }}
          >
            <div 
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: isActive ? 'var(--clinical-blue)' : 'transparent',
                marginBottom: '6px',
                transition: 'background-color 0.2s ease'
              }}
            />
            <span style={{
              fontSize: '14px',
              fontWeight: isActive ? 500 : 400
            }}>
              {tab.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
