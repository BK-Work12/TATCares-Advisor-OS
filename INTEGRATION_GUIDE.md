# TATCares Dashboard - React Component Integration Guide

## Overview
The TATCaresDashboard component is a fully-built, production-ready React dashboard with Tailwind CSS styling. It includes:
- **Main Dashboard Screen**: KPI cards, meeting list, alerts, pipeline snapshot, client scores
- **Additional Screens**: Pipeline Board (Kanban), Notifications, Meetings, Billing
- **Navigation**: Sidebar with multi-section layout and user profile
- **Styling**: Tailwind CSS with custom color system

## File Structure

```
src/
├── components/
│   ├── TATCaresDashboard.jsx      # Main dashboard component (exports 8 sub-components + main)
│   ├── DashboardScreens.jsx       # Additional screens (Pipeline, Notifications, Meetings, Billing)
│   └── ... (existing components)
└── App.jsx                         # Updated to use TATCaresDashboard
```

## Quick Start

### 1. Verify Dependencies
Ensure your `package.json` includes:
```json
{
  "dependencies": {
    "react": "^18.x",
    "lucide-react": "latest",
    "tailwindcss": "^3.x"
  }
}
```

If missing, run:
```bash
npm install lucide-react
npm install -D tailwindcss postcss autoprefixer
```

### 2. Update Tailwind Configuration
Make sure your `tailwind.config.js` includes all component files:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 3. Integrate into Routing
The `App.jsx` has been updated to use `TATCaresDashboard` for the dashboard route.

**Option A: Full Screen Dashboard (Current Implementation)**
```jsx
import TATCaresDashboard from './components/TATCaresDashboard'

// In your Routes:
<Route path="/dashboard" element={<TATCaresDashboard />} />
```

**Option B: Content Only (Integrate with Existing App Layout)**
If you want to use TATCaresDashboard content within your existing header/sidebar:

```jsx
// Extract the content area component (create a new export in TATCaresDashboard.jsx)
export const DashboardContent = () => {
  // Render only the dashboard content without the sidebar and top bar
}

// Then in App.jsx:
<Route path="/dashboard" element={<DashboardContent />} />
```

## Component Structure

### Main Component: `TATCaresDashboard`
**Props**: None (uses internal state for screen routing)

**State**:
- `activeScreen`: 'dashboard' | 'pipeline' | 'notifications' | 'meetings' | 'billing'

**Sub-Components**:
1. **Sidebar** - Navigation with logo, sections, nav items, user profile
2. **TopBar** - Header with search, notifications, date, CTA button
3. **GreetingBanner** - Hero section with greeting and stats
4. **KPICard** - Metric card with icon, value, delta
5. **MeetingRow** - Meeting item with time, name, type, status
6. **AlertRow** - Alert notification with priority, name, message
7. **ClientCard** - Client record with avatar, name, tier, score
8. **DashboardScreens** - Additional screens (Pipeline, Notifications, Meetings, Billing)

### Screen Components (from `DashboardScreens.jsx`)
- **PipelineScreen** - Kanban board view of sales pipeline
- **NotificationsScreen** - Notification feed with summary and deadlines
- **MeetingsScreen** - Today's meetings with details panel
- **BillingScreen** - Revenue metrics, subscription table, renewal tracking

## Customization Guide

### Changing Colors
Colors are defined in the components using hex codes. To customize:

```jsx
// In TATCaresDashboard.jsx, find the color definitions:
const COLORS = {
  red: '#C63D2F',
  teal: '#2F7D79',
  navy: '#1B3A5C',
  green: '#1A7A4A',
  gold: '#B8860B',
  gray: '#F7F5F2',
};

// Or in individual components, replace inline colors:
<div style={{ backgroundColor: '#2F7D79' }}>
  // Change #2F7D79 to your desired color
</div>
```

### Adding Real Data
Replace hardcoded sample data with API calls:

```jsx
// In TATCaresDashboard.jsx:
const [kpis, setKpis] = useState(null);

useEffect(() => {
  // Fetch KPI data from API
  fetch('/api/kpis')
    .then(res => res.json())
    .then(data => setKpis(data));
}, []);

// Then use the data:
<KPICard
  label={kpis?.activeClients?.label}
  value={kpis?.activeClients?.value}
  // ... other props
/>
```

### Styling with Tailwind
The dashboard uses Tailwind utility classes. To modify styling:

```jsx
// Before:
<div className="p-6 bg-white border border-gray-200 rounded-2xl">

// After (customize):
<div className="p-8 bg-slate-50 border-2 border-blue-300 rounded-xl">
```

## Font Setup
The design uses **Poppins** (headers) and **Open Sans** (body). Add to your HTML or CSS:

```html
<!-- In index.html <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
```

Then in your CSS:
```css
* {
  font-family: 'Open Sans', sans-serif;
}

.font-bold {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
}
```

## Advanced Features

### Screen Routing
Navigate between screens programmatically:

```jsx
// Inside TATCaresDashboard, clicking a sidebar item calls:
setActiveScreen('pipeline')
setActiveScreen('notifications')
setActiveScreen('meetings')
setActiveScreen('billing')
```

### Icon Library
Icons come from `lucide-react`. To add more icons:

```jsx
import { Bell, Users, TrendingUp, MoreVertical, Plus, Search } from 'lucide-react'

// Use anywhere:
<Bell className="w-5 h-5 text-gray-600" />
```

Browse all icons at: https://lucide.dev

## Troubleshooting

### Styling Issues
- Ensure `tailwindcss` is installed and configured
- Check that content files are included in `tailwind.config.js`
- Verify CSS imports are included in your main app

### Missing Icons
- Install: `npm install lucide-react`
- Import specific icons before using them

### Layout Issues
- TATCaresDashboard uses `h-screen` and `flex-1` - ensure parent has proper height
- For full-screen display, render it directly as a route (not inside another grid/layout)

## Next Steps

1. **Implement Backend Integration**
   - Replace sample data with real API endpoints
   - Add authentication/authorization
   - Set up data caching/state management (Redux, Zustand, etc.)

2. **Add Interactive Features**
   - Client profile modal/page
   - Meeting scheduling
   - Proposal editing
   - Filtering/sorting on data tables

3. **Implement Navigation**
   - Client profile links
   - Deep linking between screens
   - History/back navigation

4. **Performance Optimization**
   - Code splitting
   - Lazy load screens
   - Memoize expensive components

5. **Testing**
   - Add unit tests for components
   - Integration tests for navigation
   - E2E tests for user workflows

## Support

For questions about:
- **Tailwind CSS**: Visit https://tailwindcss.com/docs
- **Lucide Icons**: Visit https://lucide.dev
- **React**: Visit https://react.dev
