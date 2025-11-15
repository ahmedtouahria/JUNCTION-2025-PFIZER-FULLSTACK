# 🏥 Aurora Clinical UI - Medical Product Design System

## Overview

This implementation follows strict **medical-grade product design** specifications to create a calm, trustworthy, and minimal interface similar to Apple Health, One Medical, Kaiser Permanente, and NHS digital products.

---

## 🎨 Design System

### Color Palette (STRICT)

#### Base Colors
```css
--clinical-background: #F8F9FB
--clinical-card: #FFFFFF
--clinical-border: #E1E4EA
--clinical-text-primary: #1A1A1A
--clinical-text-secondary: #4A4E57
```

#### Accent Colors
```css
--clinical-blue: #3566E0
--clinical-blue-hover: #5B82EB
```

#### Risk Colors (3-State System)
```css
--risk-low: #2B9C57       /* Green */
--risk-moderate: #E4A620   /* Amber */
--risk-high: #D64545       /* Red */
```

#### Supporting Grays
```css
--gray-100: #F0F2F5
--gray-300: #D7DCE3
--gray-500: #90949E
```

---

## 🔤 Typography System

**Font Family:** Inter (Google Fonts)

### Type Scale
- **H1 Title:** 28px, 600 weight
- **H2 Section:** 20px, 600 weight
- **Card Title:** 18px, 500 weight
- **Body Text:** 15px, 400 weight
- **Labels:** 13-14px, 500 weight

### Rules
- ✅ Use Inter everywhere
- ❌ No decorative fonts
- ❌ No ultra-bold weights (max 600)

---

## 📐 Spacing System

```css
--spacing-card: 16px       /* Card internal padding */
--spacing-section: 24px    /* Between sections */
--spacing-page: 40px       /* Page top margin */
```

### Border Radius
```css
--radius-card: 12px
--radius-button: 12px
```

### Clinical Shadows (Minimal)
```css
--shadow-card: 0 1px 3px 0 rgba(0, 0, 0, 0.06)
--shadow-card-hover: 0 2px 6px 0 rgba(0, 0, 0, 0.08)
```

---

## 🧩 Component Library

### 1. RiskSummaryCard
**Location:** `/components/clinical/RiskSummaryCard.tsx`

Main risk indicator for Today's Risk screen.

**Features:**
- Large risk percentage (56px, 600 weight)
- Risk color based on level
- Key factor display
- "View all factors" link
- Updated timestamp

**Props:**
```typescript
{
  riskPercentage: number;
  riskLevel: 'low' | 'moderate' | 'high';
  keyFactor?: string;
  updatedMinutesAgo?: number;
}
```

---

### 2. FactorCard
**Location:** `/components/clinical/FactorCard.tsx`

Display individual health factors with status and intensity.

**Features:**
- Title (18px, 500 weight)
- Status pill (green/yellow/red)
- Explanation text (15px)
- Intensity bar with risk color
- NO icons unless necessary
- NO multiple borders

**Props:**
```typescript
{
  title: string;
  status: 'low' | 'moderate' | 'high';
  explanation: string;
  intensity?: number; // 0-100
}
```

---

### 3. DailyRiskList
**Location:** `/components/clinical/DailyRiskList.tsx`

7-day history with clickable days and bottom sheet modal.

**Features:**
- List of daily risk cards
- Color dots (3-state risk colors)
- Click opens bottom sheet
- Bottom sheet shows: Risk %, main factor, secondary factor
- Fade/slide animations only

**Props:**
```typescript
{
  data: DailyRisk[];
}

interface DailyRisk {
  date: string;
  dayLabel: string;
  riskLevel: 'low' | 'moderate' | 'high';
  riskPercentage: number;
  mainFactor?: string;
  secondaryFactor?: string;
}
```

---

### 4. ClinicalButton
**Location:** `/components/clinical/ClinicalButton.tsx`

Primary and secondary button variants.

**Variants:**
- **Primary:** Blue background (#3566E0), white text
- **Secondary:** White background, gray border, dark text

**Features:**
- 12px border radius
- 14px vertical padding
- 44px minimum touch target
- Hover states
- Full-width option

**Props:**
```typescript
{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
}
```

---

### 5. ClinicalFooter
**Location:** `/components/clinical/ClinicalFooter.tsx`

Medical-grade trust footer with validation note and privacy link.

**Features:**
- "Based on validated migraine literature" micro text
- Privacy policy link
- 13px font size, gray-500 color

---

### 6. ClinicalNavigation
**Location:** `/components/clinical/ClinicalNavigation.tsx`

Bottom tab bar with 3 tabs: Today, Signals, History.

**Features:**
- Fixed bottom position
- Active state: blue color with dot indicator
- Inactive state: gray color
- 44px minimum touch target
- Smooth transitions

---

## 📱 Page Implementations

### 1. Today (Main Screen)
**Location:** `/app/today/page.tsx`

**Layout:**
- Page header (H1 + description)
- RiskSummaryCard positioned in top 1/3
- "What this means" info card
- Clinical footer

**Max Width:** 550px (centered on desktop)

---

### 2. Signals (Factors Screen)
**Location:** `/app/signals/page.tsx`

**Layout:**
- Page header
- Stack of FactorCards (5 factors)
- Clinical footer

**Example Factors:**
1. Sleep Quality
2. Barometric Pressure
3. Stress Level
4. Hydration
5. Physical Activity

---

### 3. History Screen
**Location:** `/app/clinical-history/page.tsx`

**Layout:**
- Page header
- DailyRiskList (7 days)
- Clinical footer

**Interaction:**
- Click day → opens bottom sheet
- Bottom sheet shows detailed info
- Click "Close" or backdrop → closes sheet

---

## 🚀 How to Use

### Install Dependencies
```bash
cd frontend
npm install
```

### Run Development Server
```bash
npm run dev
```

### Visit Clinical Pages
- **Today:** http://localhost:3000/today
- **Signals:** http://localhost:3000/signals
- **History:** http://localhost:3000/clinical-history

---

## 📱 Mobile-First Design

### Single-Column Layout
- All cards are full-width
- Max container width: 550px (centered on desktop)
- Minimum text size: 15px

### Bottom Navigation
- 3 tabs: Today, Signals, History
- Fixed position at bottom
- 44px touch targets
- Active state with dot indicator

### Desktop Behavior
- Center the mobile layout
- NO sidebars
- NO multi-column dashboards
- NO font size reduction

---

## 🛑 What Was Removed

Following medical-grade principles, these elements were **removed**:

- ❌ Radar animations
- ❌ Pulse/glow effects
- ❌ Gradients (except risk colors)
- ❌ Decorative shapes
- ❌ Floating chat bubbles
- ❌ Excess icons
- ❌ Ultra-bold fonts
- ❌ Colorful charts

---

## 🏥 Medical-Grade Touches

### Trust Elements (Implemented)

1. **Timestamps everywhere**
   - "Updated 5 minutes ago" under risk cards
   - Shows recency of data

2. **Validation note**
   - "Based on validated migraine literature"
   - Appears in footer

3. **Privacy footer**
   - "Your health data is private and secure"
   - Link to Privacy Policy

---

## 🎯 Design Principles

### 1. Calm
- Minimal animations (fade/slide only)
- Soft shadows
- Generous white space

### 2. Clinical
- Strict color palette
- No decorative elements
- Medical-grade typography

### 3. Trustworthy
- Timestamps on all data
- Validation notes
- Privacy messaging

### 4. Minimal
- Single-column layout
- 3 main screens only
- Essential information only

---

## 📊 Component Examples

### RiskSummaryCard Usage
```tsx
<RiskSummaryCard
  riskPercentage={24}
  riskLevel="low"
  keyFactor="Low barometric pressure"
  updatedMinutesAgo={5}
/>
```

### FactorCard Usage
```tsx
<FactorCard
  title="Sleep Quality"
  status="low"
  explanation="You got 7.2 hours of sleep last night, within your optimal range."
  intensity={25}
/>
```

### DailyRiskList Usage
```tsx
<DailyRiskList
  data={[
    {
      date: 'Nov 15, 2025',
      dayLabel: 'Today',
      riskLevel: 'low',
      riskPercentage: 24,
      mainFactor: 'Low barometric pressure',
      secondaryFactor: 'Good sleep quality'
    }
    // ... more days
  ]}
/>
```

### Button Usage
```tsx
<ClinicalButton variant="primary" onClick={handleClick}>
  Save Changes
</ClinicalButton>

<ClinicalButton variant="secondary" fullWidth>
  Cancel
</ClinicalButton>
```

---

## 🔍 Testing Checklist

### Visual Quality
- [ ] Text is readable (min 15px)
- [ ] Touch targets are 44px minimum
- [ ] Colors match strict palette
- [ ] Borders are consistent (#E1E4EA)
- [ ] Cards have subtle shadows
- [ ] White space feels generous

### Interaction
- [ ] Buttons have hover states
- [ ] Bottom sheet opens/closes smoothly
- [ ] Navigation highlights active tab
- [ ] Links are clearly styled (#3566E0)
- [ ] Animations are subtle (fade/slide only)

### Mobile
- [ ] Layout is single-column
- [ ] Bottom nav is accessible
- [ ] Cards are full-width
- [ ] Text doesn't shrink on small screens

### Medical-Grade
- [ ] Timestamps are present
- [ ] Validation note appears in footer
- [ ] Privacy message is visible
- [ ] Risk colors are used correctly
- [ ] UI feels calm and trustworthy

---

## 📂 File Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── today/
│   │   │   └── page.tsx              # Today's Risk screen
│   │   ├── signals/
│   │   │   └── page.tsx              # Signals (Factors) screen
│   │   ├── clinical-history/
│   │   │   └── page.tsx              # History screen
│   │   ├── layout.tsx                # Root layout
│   │   └── globals.css               # Clinical design system
│   │
│   └── components/
│       └── clinical/
│           ├── RiskSummaryCard.tsx   # Main risk indicator
│           ├── FactorCard.tsx        # Factor display
│           ├── DailyRiskList.tsx     # History list + bottom sheet
│           ├── ClinicalButton.tsx    # Button component
│           ├── ClinicalFooter.tsx    # Trust footer
│           └── ClinicalNavigation.tsx # Bottom tab bar
```

---

## 🎨 Color Usage Guide

### When to Use Each Color

**Clinical Blue (#3566E0)**
- Primary buttons
- Active navigation states
- Links
- Important actions

**Risk Colors**
- Low (#2B9C57): Risk 0-30%
- Moderate (#E4A620): Risk 31-65%
- High (#D64545): Risk 66-100%

**Text Colors**
- Primary (#1A1A1A): Headings, titles
- Secondary (#4A4E57): Body text, descriptions
- Gray-500 (#90949E): Timestamps, meta info

**Backgrounds**
- Page: #F8F9FB
- Cards: #FFFFFF
- Subtle: #F0F2F5

---

## 🚀 Next Steps

### To Enable Clinical UI Site-Wide

1. **Update Root Layout** (`/app/layout.tsx`):
   - Replace old navigation with `<ClinicalNavigation />`
   - Update padding for bottom nav

2. **Set Today as Default**:
   - Update `/app/page.tsx` to redirect to `/today`

3. **Test All Routes**:
   - Verify `/today`, `/signals`, `/clinical-history`
   - Check navigation between screens
   - Test bottom sheet interactions

### Optional Enhancements

1. **Loading States**
   - Skeleton loaders for each screen
   - Pulse animation (subtle)

2. **Empty States**
   - Message when no data
   - Suggestions for first-time users

3. **Error States**
   - Retry buttons
   - Error messages in clinical style

---

## 📞 Support

For questions about this implementation:
- Review design spec in project root
- Check component source code for inline documentation
- Test in browser at http://localhost:3000/today

---

**Built with medical-grade precision for JUNCTION 2025 Hackathon**

*"Calm, clinical, and trustworthy — just like real medical software."*
