/**
 * Aurora Design System - Apple-Grade Medical Theme
 * Based on 2-minute launch film aesthetic
 */

export const auroraTheme = {
  colors: {
    // Base palette - Ultra clean whites and grays
    white: '#FFFFFF',
    background: '#FAFBFC',
    surface: '#FFFFFF',
    
    // Neutral grays - Soft and medical-grade
    neutral: {
      50: '#FAFBFC',
      100: '#F4F6F8', 
      200: '#E8ECEF',
      300: '#D1D9E0',
      400: '#9AA5B1',
      500: '#6B7684',
      600: '#4A5568',
      700: '#2D3748',
      800: '#1A202C',
      900: '#171923',
    },
    
    // Clinical blue accent - Medical grade
    primary: {
      50: '#F0F4FF',
      100: '#E6EDFE', 
      200: '#C3D4FD',
      300: '#A0BBFC',
      400: '#7DA2FA',
      500: '#4A78FF', // Main clinical blue
      600: '#2563EB',
      700: '#1E40AF',
      800: '#1E3A8A',
      900: '#1E3A8A',
    },
    
    // Risk colors - Soft and approachable
    risk: {
      low: {
        50: '#F0FDF4',
        100: '#DCFCE7', 
        500: '#22C55E',
        600: '#16A34A',
      },
      moderate: {
        50: '#FFFBEB',
        100: '#FEF3C7',
        500: '#F59E0B', 
        600: '#D97706',
      },
      high: {
        50: '#FEF2F2',
        100: '#FEE2E2',
        500: '#EF4444',
        600: '#DC2626',
      }
    }
  },
  
  // Typography - Clean system fonts
  typography: {
    fontFamily: {
      sans: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      mono: ['SF Mono', 'Monaco', 'Inconsolata', 'monospace']
    },
    fontSize: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '2rem',     // 32px
      '4xl': '2.5rem',   // 40px
      '5xl': '3rem',     // 48px
      '6xl': '4rem',     // 64px
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    }
  },
  
  // Spacing - Apple-like rhythm
  spacing: {
    xs: '0.5rem',    // 8px
    sm: '0.75rem',   // 12px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
    '4xl': '5rem',   // 80px
    '5xl': '6rem',   // 96px
  },
  
  // Border radius - Soft and modern
  borderRadius: {
    sm: '0.5rem',    // 8px
    md: '0.75rem',   // 12px
    lg: '1rem',      // 16px
    xl: '1.25rem',   // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.75rem', // 28px
    full: '9999px',
  },
  
  // Shadows - Subtle and clean
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  },
  
  // Animations - Calm and natural
  animation: {
    duration: {
      fast: '150ms',
      normal: '250ms', 
      slow: '350ms',
      slowest: '500ms',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    }
  }
};

// Motion variants for Framer Motion
export const motionVariants = {
  // Page transitions
  pageEnter: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.25, ease: 'easeOut' }
  },
  
  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.25 }
  },
  
  // Scale animations
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.25, ease: 'easeOut' }
  },
  
  // Slide animations
  slideUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.25, ease: 'easeOut' }
  },
  
  // Stagger children
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }
};
