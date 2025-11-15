# Aurora Design System - Migraine Prediction App

## 🎨 Design Philosophy

Aurora is a **silent AI radar** — a calm, passive companion that predicts migraine risk without requiring manual input. The design is inspired by Apple Health and Headspace, focusing on clarity, calmness, and minimal cognitive load.

### Core Principles

1. **Zero-Input Experience** - No forms, no manual tracking
2. **Passive Detection** - All data from behavioral signals
3. **Lightweight Prediction** - Simple 24h risk forecast
4. **High Clarity, Low Load** - One look, one answer
5. **Calm & Soft** - Peaceful, not alarming

---

## 📱 Application Structure

### Three Core Screens

#### 1. **Radar (Home)**
The main screen showing your 24-hour migraine risk prediction.

**Elements:**
- Large circular risk indicator (72x72 grid units)
- Percentage score (e.g., 45%)
- Risk level label (Low/Moderate/High)
- One-sentence explanation
- One daily suggestion
- Weather & pressure indicators
- "Based on passive behavioral signals" footer

**Visual Style:**
- Soft gradients based on risk level
- Large white space
- Rounded cards (1.5rem radius)
- Calm shadows
- Warm white background

**User Flow:**
1. Open app
2. See risk score immediately
3. Read one-sentence explanation
4. Note suggestion
5. Done (5 seconds)

---

#### 2. **Signals (Insights)**
Minimal view of 3-5 key passive factors.

**Elements:**
- List of 5 passive factors max
- Factor name + status
- Small icon (Moon, Calendar, Activity, Brain, Cloud)
- Trend indicator (↑, ↓, →)
- No charts, no graphs

**Passive Factors:**
1. **Sleep Pattern** - From screen-on/off times
2. **Calendar Load** - From app usage clusters
3. **Activity Level** - From step counter
4. **Stress Signals** - From typing speed/patterns
5. **Pressure Change** - From weather API

**Visual Style:**
- Rounded cards with backdrop blur
- Gradient icons
- Trend arrows with color coding:
  - Red = worsening
  - Blue = improving
  - Gray = stable

---

#### 3. **History**
Weekly dots showing past risk levels.

**Elements:**
- 7 colored dots (one per day)
- Green = Low risk
- Yellow = Moderate risk
- Red = High risk
- Tap a dot to see one-line explanation
- Day labels (Mon, Tue, Wed...)

**Interaction:**
- Tap dot → Shows explanation card
- Smooth transitions
- No complex data visualization

**Visual Style:**
- Dots with gradient fills
- Glow effect on selection
- Simple one-sentence explanations
- Minimal text

---

## 🎨 Color Palette

### Base Colors (Warm & Calm)
```css
--background: 40 20% 98%        /* Warm white */
--foreground: 240 10% 25%       /* Soft dark gray */
--muted-foreground: 240 8% 50%  /* Medium gray */
```

### Risk Colors (Pastel & Soft)
```css
--risk-low: 140 50% 75%         /* Soft green */
--risk-moderate: 40 80% 75%     /* Soft yellow */
--risk-high: 0 70% 80%          /* Soft red */
```

### Gradients
```css
.gradient-risk-low {
  background: linear-gradient(135deg, 
    hsl(140 60% 85%) 0%, 
    hsl(140 50% 75%) 100%);
}

.gradient-risk-moderate {
  background: linear-gradient(135deg, 
    hsl(40 85% 85%) 0%, 
    hsl(40 80% 75%) 100%);
}

.gradient-risk-high {
  background: linear-gradient(135deg, 
    hsl(0 75% 88%) 0%, 
    hsl(0 70% 80%) 100%);
}
```

---

## 📐 Typography

### Font Weights
- **Extralight (200)** - Headers, large numbers
- **Light (300)** - Body text, descriptions
- **Normal (400)** - Active elements, emphasis

### Font Sizes
```css
Huge Number: text-7xl (72px) - Risk percentage
Large Title: text-3xl (30px) - Page headers
Medium Title: text-2xl (24px) - Subheaders
Body: text-base (16px) - Main content
Small: text-sm (14px) - Labels
Tiny: text-xs (12px) - Captions, hints
```

### Line Height
- Numbers: 1 (tight)
- Headers: 1.2 (tight)
- Body: 1.6 (relaxed)

---

## 🧩 Components

### 1. Circular Risk Indicator
```tsx
<div className="w-72 h-72 rounded-full gradient-risk-[level] shadow-aurora">
  <div className="w-60 h-60 rounded-full bg-white shadow-calm">
    <span className="text-7xl font-extralight">{score}%</span>
    <span className="text-lg font-light">{level} Risk</span>
  </div>
</div>
```

### 2. Card (Rounded, Soft)
```tsx
<div className="bg-white/60 backdrop-blur-sm rounded-3xl px-8 py-6 shadow-calm">
  {content}
</div>
```

### 3. Factor Card
```tsx
<div className="bg-white/60 backdrop-blur-sm rounded-3xl px-8 py-6 shadow-calm">
  <Icon className="w-6 h-6 text-primary/70" />
  <h3 className="text-base font-light">{name}</h3>
  <p className="text-sm text-muted-foreground">{status}</p>
  <TrendIcon />
</div>
```

### 4. History Dot
```tsx
<button className="w-16 h-16 rounded-full bg-gradient-to-br">
  {/* Gradient based on risk level */}
</button>
```

---

## 🎬 Animations & Interactions

### Transitions
```css
transition-all duration-300 ease-in-out
```

### Hover Effects
- Cards: `hover:shadow-aurora`
- Dots: `hover:scale-110`
- Buttons: `hover:bg-accent`

### Loading States
- Pulse animation
- Skeleton screens (rounded, soft)
- Fade-in on data load

### Micro-interactions
- Dot selection: Scale + glow effect
- Card tap: Subtle bounce
- Navigation: Smooth slide transitions

---

## 📊 Data Display Philosophy

### What We DON'T Show:
- ❌ Complex charts
- ❌ Multiple metrics
- ❌ Detailed statistics
- ❌ Trend lines
- ❌ Comparison graphs
- ❌ Tables

### What We DO Show:
- ✅ One number (risk %)
- ✅ One sentence (explanation)
- ✅ One suggestion (action)
- ✅ Simple dots (history)
- ✅ 3-5 factors (insights)
- ✅ Icons & trends (↑↓→)

---

## 🔕 Passive Data Collection

### No Manual Input Required

**Sleep Detection:**
- Screen lock/unlock times
- App usage patterns at night
- Phone movement (if available)

**Stress Detection:**
- Typing speed variations
- App switching frequency
- Calendar density

**Activity Detection:**
- Step count (from health APIs)
- Movement patterns
- Sitting time

**Work Intensity:**
- App usage clusters
- Calendar events
- Screen time in work apps

**Environmental:**
- Weather from location
- Barometric pressure
- Temperature changes

---

## 🚀 Navigation

### Bottom Tab Bar (Mobile-First)
```
┌─────────────────────────────────┐
│                                 │
│         [Content]               │
│                                 │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│   Radar    Signals    History   │
│   [📡]      [📊]       [🕐]     │
└─────────────────────────────────┘
```

**Position:** Fixed bottom
**Style:** White/80 + backdrop blur
**Icons:** Light stroke, simple
**Labels:** Small, light font
**Active State:** Larger scale, darker color

---

## 🎯 User Experience Goals

### Primary Goal
**"Am I at risk tomorrow?"** — answered in 5 seconds.

### Secondary Goals
1. Understand why (one sentence)
2. Know what to do (one action)
3. See patterns (optional, minimal)

### Success Metrics
- Time to answer: <5 seconds
- Cognitive load: Minimal
- Actions required: Zero
- User anxiety: Reduced
- Daily engagement: High (because it's easy)

---

## 🛠️ Implementation Notes

### Tech Stack
- **Next.js 15** - React framework
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** (optional) - Smooth animations
- **Recharts** (removed) - No complex charts needed
- **Lucide React** - Minimal icon set

### File Structure
```
src/
├── app/
│   ├── page.tsx              # Radar (Home)
│   ├── insights/page.tsx     # Signals
│   ├── history/page.tsx      # History
│   ├── login/page.tsx        # Auth
│   └── layout.tsx            # Root layout
├── components/
│   ├── Navigation.tsx        # Bottom tab bar
│   └── ui/                   # Removed complex components
├── lib/
│   ├── api.ts                # API client
│   ├── mockApi.ts            # Mock data
│   └── utils.ts              # Helpers
└── globals.css               # Aurora theme
```

### Removed Pages
- ❌ Daily Check-in (no manual input)
- ❌ Log Symptoms (no manual input)
- ❌ Forecast (simplified to Radar)
- ❌ Settings (minimal needed)

---

## 📖 Copy Writing Guidelines

### Tone
- **Calm** - Not alarming
- **Confident** - Not uncertain
- **Simple** - Not technical
- **Helpful** - Not demanding

### Examples

**Good:**
- "Late sleep + pressure drop + high calendar load"
- "Aim for stable sleep tonight"
- "Conditions are favorable"
- "Based on passive behavioral signals"

**Bad:**
- "Your sleep quality was 42% below baseline"
- "You must log your symptoms"
- "Complex meteorological analysis indicates..."
- "Please enter your daily data"

---

## 🎨 Visual Examples

### Radar Screen Layout
```
     ┌─────────────────────┐
     │  Your predicted     │
     │  risk in the next   │
     │  24 hours           │
     ├─────────────────────┤
     │                     │
     │     ┌───────┐       │
     │     │  45%  │       │
     │     │  Low  │       │
     │     └───────┘       │
     │                     │
     ├─────────────────────┤
     │ Late sleep +        │
     │ pressure drop       │
     ├─────────────────────┤
     │ Aim for stable      │
     │ sleep tonight       │
     ├─────────────────────┤
     │ ☁️ 72°F  💨 29.9↓   │
     └─────────────────────┘
```

### Signals Screen Layout
```
     ┌─────────────────────┐
     │  Passive Signals    │
     ├─────────────────────┤
     │ 🌙 Sleep Pattern    │
     │    Disrupted     ↓  │
     ├─────────────────────┤
     │ 📅 Calendar Load    │
     │    High          ↑  │
     ├─────────────────────┤
     │ 🏃 Activity Level   │
     │    Low           ↓  │
     ├─────────────────────┤
     │ 🧠 Stress Signals   │
     │    Elevated      ↑  │
     └─────────────────────┘
```

### History Screen Layout
```
     ┌─────────────────────┐
     │  Recent Days        │
     ├─────────────────────┤
     │ Mon Tue Wed Thu Fri │
     │  🟢  🟡  🔴  🟡  🟢 │
     │  15  16  17  18  19 │
     ├─────────────────────┤
     │ Wednesday, Nov 17   │
     │ High stress +       │
     │ poor sleep          │
     │ (High risk)         │
     └─────────────────────┘
```

---

## ✅ Aurora Checklist

### Design ✅
- [x] Warm white background
- [x] Soft gradients
- [x] Pastel risk colors
- [x] Large spacing
- [x] Rounded cards (1.5rem)
- [x] Calm typography
- [x] Light font weights

### Functionality ✅
- [x] Zero manual input
- [x] 24h prediction
- [x] One-sentence explanation
- [x] One daily suggestion
- [x] 3-5 passive factors
- [x] Weekly history dots
- [x] Minimal navigation (3 screens)

### User Experience ✅
- [x] <5 second answer time
- [x] No complexity
- [x] No anxiety
- [x] High clarity
- [x] Low cognitive load
- [x] Calm feeling

---

## 🚀 Future Enhancements (Keep It Simple!)

### Phase 1 (Current) ✅
- Basic prediction
- Mock passive data
- Clean UI

### Phase 2
- Real passive data integration
- Weather API
- Health API (iOS/Android)

### Phase 3
- Improved ML predictions
- Pattern recognition
- Personalization

### Phase 4
- Watch app (ultra-minimal)
- Silent notifications
- Emergency contact integration

---

## 📝 Summary

Aurora transforms migraine prediction from a **data entry chore** to a **silent companion**. By removing all manual input and focusing on passive detection, we create an experience that is:

1. **Effortless** - No actions required
2. **Clear** - One answer, visible immediately
3. **Calm** - Not anxiety-inducing
4. **Helpful** - Actionable suggestions
5. **Minimal** - Only what matters

**Design Mantra:**
> "A calm radar, not a complex dashboard"

---

**Version:** 1.0 - Aurora Initial Release
**Last Updated:** November 15, 2025
**Design System:** Migraine Tracker - Silent AI Radar
