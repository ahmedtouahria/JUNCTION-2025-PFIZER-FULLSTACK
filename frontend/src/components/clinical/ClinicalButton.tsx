/**
 * ClinicalButton - Clinical Grade Component
 * Primary and Secondary button variants
 */

'use client';

import React from 'react';

interface ClinicalButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function ClinicalButton({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
  fullWidth = false,
  type = 'button'
}: ClinicalButtonProps) {
  
  const [isHovered, setIsHovered] = React.useState(false);

  const getStyles = () => {
    if (variant === 'primary') {
      return {
        backgroundColor: disabled 
          ? 'var(--gray-300)' 
          : isHovered 
            ? 'var(--clinical-blue-hover)' 
            : 'var(--clinical-blue)',
        color: '#FFFFFF',
        border: 'none'
      };
    } else {
      return {
        backgroundColor: 'transparent',
        color: disabled ? 'var(--gray-500)' : 'var(--clinical-text-primary)',
        border: `1px solid ${disabled ? 'var(--gray-300)' : 'var(--gray-300)'}`
      };
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: fullWidth ? '100%' : 'auto',
        padding: '14px 24px',
        borderRadius: 'var(--radius-button)',
        fontSize: '16px',
        fontWeight: 500,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease',
        minHeight: '44px',
        ...getStyles()
      }}
    >
      {children}
    </button>
  );
}
