# Frontend Pages Documentation

## Overview
This document describes all the pages built for the Aurora application.

## Pages

### 1. **Dashboard** (`/`)
**Purpose:** Main overview page showing today's migraine risk prediction and quick stats.

**Features:**
- Today's risk prediction with color-coded risk level (Low/Moderate/High)
- Top 3 contributing factors to risk
- Personalized recommendations
- Quick action cards for navigation
- 30-day summary statistics (migraines, sleep, stress, hydration)

**Navigation:**
- "Daily Check-in" → `/daily-checkin`
- "7-Day Forecast" → `/forecast`
- "Health Insights" → `/insights`
- "Log Symptoms" button

---

### 2. **Login** (`/login`)
**Purpose:** User authentication page.

**Features:**
- Username and password fields
- Error handling for invalid credentials
- Link to registration page
- Automatic redirect to dashboard on success

**Form Fields:**
- Username (required)
- Password (required)

---

### 3. **Register** (`/register`)
**Purpose:** New user account creation.

**Features:**
- Multi-field registration form
- Password confirmation
- Validation (password length, matching passwords)
- Redirect to login after successful registration

**Form Fields:**
- First Name (required)
- Last Name (required)
- Username (required)
- Email (required)
- Age (optional)
- Gender (optional)
- Password (required, min 8 characters)
- Confirm Password (required)

---

### 4. **Daily Check-in** (`/daily-checkin`)
**Purpose:** Log daily health metrics and lifestyle factors.

**Features:**
- Comprehensive health tracking form
- Date selector
- Success notification with auto-redirect
- Cancel button to return to dashboard

**Form Fields:**
- **Date:** Current date (editable)
- **Sleep Hours:** Number input (0-24, 0.5 increments)
- **Sleep Quality:** Scale 1-5
- **Stress Level:** Scale 1-5
- **Mood:** Scale 1-5
- **Water Intake:** ml (integer)
- **Exercise:** minutes (integer)
- **Caffeine:** mg (integer)
- **Alcohol:** servings (integer)
- **Notes:** Text area (optional)

---

### 5. **Log Symptoms** (`/log-symptoms`)
**Purpose:** Record migraine events with detailed information.

**Features:**
- Start/end time tracking
- Severity scale
- Pain location selector
- Multi-select symptom buttons
- Multi-select trigger buttons
- Notes field

**Form Fields:**
- **Start Time:** datetime-local (required)
- **End Time:** datetime-local (optional)
- **Severity:** Scale 1-10
- **Location:** Dropdown (left/right/both/front/back)
- **Symptoms:** Multi-select buttons (8 common symptoms)
- **Triggers:** Multi-select buttons (14 common triggers)
- **Notes:** Text area (optional)

**Pre-defined Options:**
- Symptoms: Throbbing pain, Nausea, Vomiting, Light sensitivity, Sound sensitivity, Aura, Dizziness, Blurred vision
- Triggers: Stress, Lack of sleep, Weather changes, Bright lights, Loud noises, Strong smells, Caffeine, Alcohol, Dehydration, Missed meals, Chocolate, Cheese, Processed foods, Hormonal changes

---

### 6. **Forecast** (`/forecast`)
**Purpose:** View 7-day migraine risk prediction with visualizations.

**Features:**
- **Line chart** showing risk trend over 7 days
- **Daily cards** with detailed risk breakdown
- Top factors for each day
- Risk level guide
- Progress bars for visual risk indication

**Visualizations:**
- Recharts line chart with risk score (0-100)
- Color-coded risk levels
- Daily breakdown cards with:
  - Day name and date
  - Risk score percentage
  - Risk level (low/moderate/high)
  - Top contributing factors
  - Visual progress bar

**Risk Levels:**
- **Low (0-30%):** Green - Conditions favorable
- **Moderate (31-60%):** Yellow - Be mindful of triggers
- **High (61-100%):** Red - Avoid triggers, have medication ready

---

### 7. **Insights** (`/insights`)
**Purpose:** Analytics dashboard showing patterns, triggers, and correlations.

**Features:**
- **Summary Statistics:** Total migraines, avg severity, avg sleep, avg stress, avg water
- **Top Triggers Bar Chart:** Horizontal bar chart of most common triggers
- **Day of Week Pattern:** Bar chart showing which days migraines occur
- **Time of Day Pattern:** Pie chart showing when migraines typically start
- **Correlations Table:** Compare health metrics on migraine vs non-migraine days
- **Key Insights Summary:** Text-based insights derived from data

**Charts:**
1. **Top Triggers** (Horizontal Bar Chart)
   - Shows up to 8 most common triggers
   - Count of occurrences

2. **Migraines by Day** (Bar Chart)
   - Monday through Sunday
   - Count per day

3. **Migraines by Time** (Pie Chart)
   - Morning, Afternoon, Evening, Night
   - Color-coded segments

4. **Correlations Table**
   - Factor name (sleep, stress, hydration)
   - Average on migraine days
   - Average on non-migraine days
   - Difference calculation

---

### 8. **Settings** (`/settings`)
**Purpose:** User profile management and account settings.

**Features:**
- Profile information editing
- Password change
- Logout functionality
- App information display

**Sections:**

**Profile Information:**
- First Name
- Last Name
- Email
- Age
- Gender

**Change Password:**
- Current Password
- New Password (min 8 characters)
- Confirm New Password

**Account Actions:**
- Sign Out button

**About Section:**
- App version
- User ID
- Username

---

## Navigation Component

**Location:** Visible on all pages except login/register

**Desktop Navigation:**
- Logo (clickable, goes to dashboard)
- Navigation links: Dashboard, Daily Check-in, Log Symptoms, Forecast, Insights, Settings
- User name display
- Sign Out button

**Mobile Navigation:**
- Horizontal scrollable navigation
- Icon + label for each page
- Responsive design

**Features:**
- Active page highlighting
- Sticky positioning at top
- Conditional rendering (hidden on login/register)
- Auth-protected (only shown when logged in)

---

## Form Components

### Custom UI Components Created:
1. **Button** - Various variants (default, outline)
2. **Card** - Container with header/content
3. **Input** - Text, number, date, datetime-local, email, password
4. **Label** - Form field labels
5. **Select** - Dropdown selector
6. **Textarea** - Multi-line text input

All components follow shadcn/ui design system with Tailwind CSS styling.

---

## Data Flow

### Mock Data Mode (Current Setup)
- `USE_MOCK_DATA = true` in `mockApi.ts`
- All API calls return mock data from `mockData.ts`
- No backend required for development

### Real API Mode (Production)
- Set `USE_MOCK_DATA = false`
- API calls go to Django backend at `http://localhost:8000/api`
- JWT authentication with token refresh

---

## State Management

**Zustand Store** (`src/lib/store.ts`):
- User authentication state
- Access token and refresh token
- User profile data
- Persisted to localStorage

---

## Styling

**Design System:**
- Tailwind CSS for utility-first styling
- shadcn/ui components for consistency
- Apple Health-inspired clean design
- Responsive breakpoints (mobile, tablet, desktop)

**Color Coding:**
- **Green:** Low risk, positive indicators
- **Yellow:** Moderate risk, caution
- **Red:** High risk, alert
- **Blue:** Information, recommendations

---

## Error Handling

All pages include:
- Loading states with skeleton screens
- Error messages with user-friendly text
- Form validation with inline errors
- Success notifications
- Automatic redirects after actions

---

## Accessibility

- Semantic HTML elements
- Form labels for all inputs
- Keyboard navigation support
- Focus states on interactive elements
- Screen reader friendly

---

## Future Enhancements

1. **Dark Mode:** Toggle in settings
2. **Notifications:** Browser/email alerts for high risk days
3. **Export Data:** Download reports as PDF/CSV
4. **Weather Integration:** Automatic weather trigger detection
5. **Medication Tracking:** Log medication usage
6. **Calendar View:** Monthly calendar showing migraine days
7. **Social Features:** Share insights with healthcare providers
8. **Advanced ML:** More sophisticated prediction models

---

## Testing Checklist

- [ ] Login with mock credentials
- [ ] Register new user
- [ ] View dashboard with risk prediction
- [ ] Submit daily check-in form
- [ ] Log migraine symptoms
- [ ] View 7-day forecast chart
- [ ] Explore analytics/insights
- [ ] Edit profile in settings
- [ ] Change password
- [ ] Navigate between all pages
- [ ] Test mobile responsive design
- [ ] Logout functionality

---

## Quick Start

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (if not done)
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3000

# Login with mock credentials:
# Username: demo_user
# Password: (any password, since using mock data)
```

---

## File Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Dashboard
│   │   ├── login/page.tsx           # Login
│   │   ├── register/page.tsx        # Register
│   │   ├── daily-checkin/page.tsx   # Daily Check-in
│   │   ├── log-symptoms/page.tsx    # Log Symptoms
│   │   ├── forecast/page.tsx        # Forecast
│   │   ├── insights/page.tsx        # Insights
│   │   ├── settings/page.tsx        # Settings
│   │   └── layout.tsx               # Root layout
│   ├── components/
│   │   ├── Navigation.tsx           # Navigation bar
│   │   └── ui/                      # Reusable UI components
│   ├── lib/
│   │   ├── api.ts                   # API client
│   │   ├── mockApi.ts               # Mock API
│   │   ├── mockData.ts              # Mock data
│   │   ├── store.ts                 # Zustand store
│   │   └── utils.ts                 # Utility functions
│   └── globals.css                  # Global styles
└── package.json
```

---

## Summary

✅ **8 Complete Pages**
✅ **Full CRUD Operations**
✅ **Mock Data System**
✅ **Responsive Navigation**
✅ **Form Validation**
✅ **Data Visualizations**
✅ **User Authentication Flow**
✅ **Error Handling**
✅ **Loading States**
✅ **Professional UI/UX**

The application is ready for frontend development and testing without requiring the backend to be running!
