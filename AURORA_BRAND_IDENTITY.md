# Aurora Brand Identity System

## 🎨 Brand Overview

**Aurora** - Silent Migraine Prediction Radar

**Tagline:** "Predict & Prevent, Passively"

**Brand Personality:**
- Trustworthy & Clinical
- Calm & Non-Anxious
- Intelligent & Predictive
- Minimal & Elegant
- Private & Secure

---

## 🎯 Logo Concept

### Primary Logo
```
    ◐ AURORA
```

**Mark:** Circular radar with gradient (represents 24h prediction cycle)
**Wordmark:** Clean, modern sans-serif
**Style:** Medical-grade minimalism with a tech edge

### Logo Variations
1. **Full Logo** - Mark + Wordmark (primary)
2. **Icon Only** - Just the radar mark (app icon)
3. **Wordmark Only** - Text only (legal/footer)

### Logo Colors
- **Primary:** Gradient from Blue (#5B7FFF) to Purple (#8B5FFF)
- **Monochrome:** Deep Navy (#1A2332) on white
- **Reversed:** White on colored backgrounds

---

## 🎨 Color System

### Primary Palette (Clinical & Trustworthy)

```css
/* Brand Colors */
--aurora-blue: 217 91% 68%;        /* #5B7FFF - Primary brand */
--aurora-purple: 255 75% 68%;      /* #8B5FFF - Secondary brand */
--aurora-navy: 220 35% 15%;        /* #1A2332 - Deep, trustworthy */

/* Neutral Palette (Medical Grade) */
--neutral-50: 210 20% 98%;         /* #F7F9FB - Lightest */
--neutral-100: 210 20% 95%;        /* #EEF2F6 */
--neutral-200: 210 20% 90%;        /* #E0E6ED */
--neutral-300: 210 15% 80%;        /* #C5CDD8 */
--neutral-400: 210 12% 60%;        /* #8A95A5 */
--neutral-500: 210 10% 45%;        /* #6B7684 */
--neutral-600: 210 12% 30%;        /* #434C5B */
--neutral-700: 210 15% 20%;        /* #2C333E */
--neutral-800: 210 20% 12%;        /* #1A2028 */
--neutral-900: 210 25% 8%;         /* #0F1419 */
```

### Semantic Colors (Risk System)

```css
/* Low Risk - Calming Green */
--risk-low-50: 140 60% 96%;        /* #EFFBF5 */
--risk-low-100: 140 55% 88%;       /* #D4F4E2 */
--risk-low-500: 140 48% 55%;       /* #52C78F */
--risk-low-600: 140 55% 45%;       /* #3BAF78 */
--risk-low-gradient: linear-gradient(135deg, #52C78F 0%, #3BAF78 100%);

/* Moderate Risk - Attention Yellow */
--risk-moderate-50: 38 100% 96%;   /* #FFF8EB */
--risk-moderate-100: 38 95% 88%;   /* #FFF0CC */
--risk-moderate-500: 38 92% 60%;   /* #FFBA43 */
--risk-moderate-600: 38 95% 50%;   /* #FFA800 */
--risk-moderate-gradient: linear-gradient(135deg, #FFBA43 0%, #FFA800 100%);

/* High Risk - Alert Red */
--risk-high-50: 0 100% 97%;        /* #FFF5F5 */
--risk-high-100: 0 90% 92%;        /* #FFE0E0 */
--risk-high-500: 0 75% 65%;        /* #FF6B6B */
--risk-high-600: 0 80% 55%;        /* #FF4444 */
--risk-high-gradient: linear-gradient(135deg, #FF6B6B 0%, #FF4444 100%);
```

### Utility Colors

```css
/* Success */
--success-500: 140 48% 55%;        /* #52C78F */
--success-600: 140 55% 45%;        /* #3BAF78 */

/* Warning */
--warning-500: 38 92% 60%;         /* #FFBA43 */
--warning-600: 38 95% 50%;         /* #FFA800 */

/* Error */
--error-500: 0 75% 65%;            /* #FF6B6B */
--error-600: 0 80% 55%;            /* #FF4444 */

/* Info */
--info-500: 217 91% 68%;           /* #5B7FFF */
--info-600: 217 95% 58%;           /* #4169FF */
```

---

## 📝 Typography System

### Font Family

**Primary:** SF Pro Display / Inter (fallback)
**Monospace:** SF Mono / JetBrains Mono (for data/metrics)

```css
--font-display: 'SF Pro Display', 'Inter', -apple-system, system-ui, sans-serif;
--font-body: 'SF Pro Text', 'Inter', -apple-system, system-ui, sans-serif;
--font-mono: 'SF Mono', 'JetBrains Mono', monospace;
```

### Type Scale

```css
/* Display (Large numbers, hero text) */
--text-display-xl: 6rem;      /* 96px - Risk percentage */
--text-display-lg: 4.5rem;    /* 72px - Hero titles */
--text-display-md: 3.5rem;    /* 56px */
--text-display-sm: 3rem;      /* 48px */

/* Headings */
--text-h1: 2.25rem;           /* 36px */
--text-h2: 1.875rem;          /* 30px */
--text-h3: 1.5rem;            /* 24px */
--text-h4: 1.25rem;           /* 20px */
--text-h5: 1.125rem;          /* 18px */

/* Body */
--text-body-lg: 1.125rem;     /* 18px */
--text-body: 1rem;            /* 16px */
--text-body-sm: 0.875rem;     /* 14px */
--text-body-xs: 0.75rem;      /* 12px */

/* Caption */
--text-caption: 0.6875rem;    /* 11px */
--text-overline: 0.625rem;    /* 10px */
```

### Font Weights

```css
--weight-thin: 100;           /* Rarely used */
--weight-extralight: 200;     /* Display numbers */
--weight-light: 300;          /* Body text */
--weight-regular: 400;        /* Default */
--weight-medium: 500;         /* Emphasis */
--weight-semibold: 600;       /* Headings */
--weight-bold: 700;           /* Strong emphasis */
```

### Line Heights

```css
--leading-tight: 1.25;        /* Display/numbers */
--leading-snug: 1.375;        /* Headings */
--leading-normal: 1.5;        /* Body text */
--leading-relaxed: 1.625;     /* Long-form */
--leading-loose: 2;           /* Spacious */
```

### Letter Spacing

```css
--tracking-tighter: -0.05em;  /* Display */
--tracking-tight: -0.025em;   /* Headings */
--tracking-normal: 0;         /* Body */
--tracking-wide: 0.025em;     /* UI elements */
--tracking-wider: 0.05em;     /* Overlines */
--tracking-widest: 0.1em;     /* All caps labels */
```

---

## 📏 Spacing System

### Base Unit: 4px

```css
--space-0: 0;
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
--space-32: 8rem;     /* 128px */
```

### Component Spacing

```css
--spacing-section: var(--space-16);    /* Between major sections */
--spacing-card: var(--space-6);        /* Card padding */
--spacing-list: var(--space-4);        /* List item gap */
--spacing-inline: var(--space-2);      /* Inline elements */
```

---

## 🎭 Shadow System

### Elevation Levels

```css
/* Level 1 - Subtle (cards) */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);

/* Level 2 - Card (default) */
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.08),
             0 2px 4px -2px rgb(0 0 0 / 0.05);

/* Level 3 - Raised (hover) */
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.08),
             0 4px 6px -4px rgb(0 0 0 / 0.05);

/* Level 4 - Modal */
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.08),
             0 8px 10px -6px rgb(0 0 0 / 0.05);

/* Level 5 - Popover */
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.15);

/* Colored Shadows (Risk-specific) */
--shadow-low: 0 8px 24px -6px rgba(82, 199, 143, 0.2);
--shadow-moderate: 0 8px 24px -6px rgba(255, 186, 67, 0.2);
--shadow-high: 0 8px 24px -6px rgba(255, 107, 107, 0.2);
```

### Inner Shadows

```css
--shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
--shadow-inner-lg: inset 0 4px 8px 0 rgb(0 0 0 / 0.08);
```

---

## 🔘 Border Radius System

```css
--radius-none: 0;
--radius-sm: 0.375rem;    /* 6px - Small elements */
--radius-md: 0.5rem;      /* 8px - Buttons */
--radius-lg: 0.75rem;     /* 12px - Cards */
--radius-xl: 1rem;        /* 16px - Large cards */
--radius-2xl: 1.5rem;     /* 24px - Hero elements */
--radius-3xl: 2rem;       /* 32px - Special elements */
--radius-full: 9999px;    /* Circular */
```

---

## 🎬 Animation System

### Timing Functions

```css
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);        /* Default smooth */
--ease-in: cubic-bezier(0.4, 0, 1, 1);               /* Accelerate */
--ease-out: cubic-bezier(0, 0, 0.2, 1);              /* Decelerate */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);         /* Smooth both */
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55); /* Bounce */
--ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275); /* Spring */
```

### Duration Scale

```css
--duration-instant: 100ms;    /* Instant feedback */
--duration-fast: 200ms;       /* Quick transitions */
--duration-normal: 300ms;     /* Default */
--duration-slow: 500ms;       /* Deliberate */
--duration-slower: 700ms;     /* Emphasis */
```

### Animation Presets

```css
--transition-default: all var(--duration-normal) var(--ease-default);
--transition-colors: color, background-color, border-color var(--duration-fast) var(--ease-default);
--transition-transform: transform var(--duration-normal) var(--ease-out);
--transition-opacity: opacity var(--duration-fast) var(--ease-default);
```

---

## 🎯 Component Patterns

### Cards

```css
.card-elevated {
  background: white;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  padding: var(--space-6);
  transition: var(--transition-default);
}

.card-elevated:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

### Buttons

```css
.btn-primary {
  background: linear-gradient(135deg, var(--aurora-blue), var(--aurora-purple));
  color: white;
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-6);
  font-weight: var(--weight-medium);
  transition: var(--transition-transform);
}

.btn-primary:hover {
  transform: scale(1.02);
}
```

### Glass Morphism

```css
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
```

---

## 🏥 Medical-Grade Design Principles

### 1. Trust & Authority
- Use clinical, factual language
- Show confidence scores
- Display data sources clearly
- Professional color palette

### 2. Clarity & Hierarchy
- One primary action per screen
- Clear visual hierarchy
- Generous whitespace
- Readable typography (16px minimum)

### 3. Calm & Non-Anxious
- Soft, pastel risk colors
- Gentle animations
- Reassuring microcopy
- Progress over perfection

### 4. Privacy & Security
- Clear data handling statements
- "All data stays on device" messaging
- Permission transparency
- User control emphasis

---

## 📱 App Store Guidelines

### Icon Design
- 1024x1024px
- Rounded corners (iOS applies automatically)
- No text in icon
- Simple, recognizable mark
- Works at small sizes

### Screenshots
- Show 5-6 key screens
- Add descriptive text overlays
- Demonstrate core value
- Professional polish

### App Store Copy
**Subtitle:** "Silent Migraine Prediction"
**Keywords:** migraine, prediction, health, passive, AI, prevention
**Description:** Focus on zero-input, passive prediction, clinical backing

---

## 🎨 Brand Voice

### Tone Attributes
- **Calm** - Never alarming or anxious
- **Intelligent** - Data-driven but accessible
- **Empowering** - You're in control
- **Human** - Warm, not robotic
- **Trustworthy** - Clinical, factual, transparent

### Messaging Examples

**Good:**
- "Your risk is low today. Great conditions ahead."
- "We noticed disrupted sleep. Consider an early night."
- "All predictions run on your device. Your data stays private."

**Avoid:**
- "WARNING: High migraine risk!"
- "You must take action now!"
- "Your data is being analyzed..."

---

*Aurora Brand Identity v1.0 - Clinical-Grade Minimal Design*
