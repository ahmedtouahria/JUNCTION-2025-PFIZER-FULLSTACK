# Migraine Prediction System - Frontend

Beautiful Next.js 14 frontend for migraine prediction and health tracking.

## Features

- 🎨 **Clean & Minimal Design** - Inspired by Apple Health
- 🌓 **Dark Mode** - Full dark mode support
- 📱 **Responsive** - Works on all devices
- ⚡ **Fast** - Built with Next.js 14 App Router
- 🎯 **Simple Navigation** - One purpose per page
- 📊 **Beautiful Charts** - Recharts for data visualization
- 🔐 **Secure Auth** - JWT token management

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful component library
- **Zustand** - Simple state management
- **Axios** - API client
- **React Hook Form + Zod** - Form handling & validation
- **Recharts** - Data visualization
- **Lucide React** - Beautiful icons

## Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Home / Dashboard
│   │   ├── layout.tsx         # Root layout
│   │   ├── login/             # Login page
│   │   ├── register/          # Registration page
│   │   ├── daily-checkin/     # Daily health log
│   │   ├── log-symptoms/      # Migraine event logging
│   │   ├── forecast/          # 7-day forecast
│   │   ├── insights/          # Analytics & insights
│   │   └── settings/          # User settings
│   ├── components/
│   │   ├── ui/                # Base UI components
│   │   └── ...                # Feature components
│   └── lib/
│       ├── api.ts             # API client & services
│       ├── store.ts           # Zustand state management
│       └── utils.ts           # Utility functions
├── public/                     # Static assets
├── package.json
└── tailwind.config.ts
```

## Core Pages

### 1️⃣ Home Dashboard (`/`)
- **Hero Card**: Today's migraine risk with percentage
- **Top 3 factors** contributing to risk
- **Personalized recommendations**
- **Quick action buttons**
- **30-day summary stats**

### 2️⃣ Daily Check-in (`/daily-checkin`)
Simple form with:
- Sleep hours slider (0-12)
- Sleep quality (1-5 stars)
- Stress slider (1-10)
- Mood selector (emoji)
- Water intake counter
- Caffeine/alcohol tracking
- Exercise logging

### 3️⃣ Log Symptoms (`/log-symptoms`)
Migraine event tracking:
- Severity slider (1-10)
- Start/End time pickers
- Pain location selector
- Symptoms checklist
- Trigger selection
- Medications taken
- Relief methods
- Notes

### 4️⃣ Forecast (`/forecast`)
- **7-day risk chart** (line/bar chart)
- Color-coded risk levels:
  - 🟢 Green: Low risk
  - 🟡 Yellow: Moderate risk
  - 🔴 Red: High risk
- Daily breakdown with factors

### 5️⃣ Health Insights (`/insights`)
Analytics cards:
- **Top Triggers** (bar chart)
- **Weekly Patterns** (day of week analysis)
- **Time of Day** patterns
- **Best/Worst Days**
- **Sleep vs Migraine** correlation
- **Stress Impact** analysis

### 6️⃣ Settings (`/settings`)
- Profile information
- Notification preferences
- Dark mode toggle
- Connected apps
- Account management

## Design Principles

### ✨ Visual Style
- **White + Soft Pastels** - Clean base with gentle colors
- **Large Spacing** - Generous padding/margins
- **Rounded Components** - Soft, friendly corners
- **Minimal Charts** - Clean, easy-to-read data visualization
- **Smooth Transitions** - Subtle animations
- **No Clutter** - Focus on essential information

### 🎯 UX Philosophy
> **"One screen = One purpose"**

Each page has a single, clear purpose. No overwhelming information.

### 🎨 Color System
```
Low Risk:      Green (#22c55e)
Moderate Risk: Yellow (#eab308)
High Risk:     Red (#ef4444)
Primary:       Blue (#3b82f6)
Background:    White/Gray-50
Text:          Gray-900/Gray-100 (dark mode)
```

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- Backend API running on `http://localhost:8000`

### Installation

1. **Navigate to frontend:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local if needed
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Open browser:**
   ```
   http://localhost:3000
   ```

## Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Lint code
npm run lint
```

## Component Usage Examples

### Using the Card Component
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>My Card</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content here</p>
  </CardContent>
</Card>
```

### Using the Button Component
```tsx
import { Button } from '@/components/ui/button';

<Button variant="default" size="lg">
  Click Me
</Button>

<Button variant="outline">Secondary Action</Button>
```

### API Call Example
```tsx
import { predictionsAPI } from '@/lib/api';

const fetchPrediction = async () => {
  try {
    const response = await predictionsAPI.getToday();
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Using Zustand Store
```tsx
import { useAuthStore } from '@/lib/store';

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuthStore();
  
  if (!isAuthenticated) {
    return <div>Please login</div>;
  }
  
  return <div>Hello, {user?.username}!</div>;
}
```

## Adding shadcn/ui Components

The project uses shadcn/ui for components. To add more:

```bash
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add select
# etc...
```

## Routing

Next.js 14 uses the App Router:

- `/` - Home dashboard
- `/login` - Login page
- `/register` - Registration
- `/daily-checkin` - Daily health log
- `/log-symptoms` - Log migraine event
- `/forecast` - 7-day forecast
- `/insights` - Analytics & insights
- `/settings` - User settings

## State Management

Using **Zustand** for global state:

```typescript
// lib/store.ts
- User authentication state
- JWT tokens
- User profile data
```

For local component state, use React's `useState` and `useEffect`.

## API Integration

All API calls go through `lib/api.ts`:

- Automatic JWT token injection
- Token refresh on 401
- Centralized error handling
- Type-safe API methods

## Styling

**Tailwind CSS** for all styling:

```tsx
// Utility classes
<div className="flex items-center gap-4 p-6 rounded-lg bg-white shadow-sm">

// Responsive design
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

// Dark mode support
<div className="bg-white dark:bg-gray-900">
```

## Production Build

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Test production build locally:**
   ```bash
   npm start
   ```

3. **Deploy to Vercel (recommended):**
   ```bash
   npm i -g vercel
   vercel
   ```

## Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

For production, update with your actual backend URL.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- **First Load**: < 100kb JS
- **Route Changes**: Instant
- **API Calls**: Cached where appropriate
- **Images**: Optimized with Next.js Image

## Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Screen reader friendly
- Color contrast compliant

## License

MIT License
