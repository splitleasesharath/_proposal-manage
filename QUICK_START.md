# Quick Start Guide

Get the Proposal Management System up and running in 5 minutes.

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/splitleasesharath/_proposal-manage.git
cd _proposal-manage/repo
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages (~2-3 minutes).

### 3. Set Up Environment

```bash
cp .env.example .env
```

The default `.env` uses mock data, so you can start developing immediately.

### 4. Start Development Server

```bash
npm run dev
```

The application will open automatically at `http://localhost:3000`

## What You'll See

### Homepage
The main page displays:
- **Header** with proposal count and action buttons
- **Filter Section** with multiple search and filter controls
- **Proposals List** showing 5 sample proposals with full details
- **Quick Proposal Creation** wizard (click "Create Suggested Proposal")

### Try These Features

1. **Search by Guest Name**
   - Type "Emily" in the Guest search box
   - See results filter in real-time

2. **Filter by Status**
   - Click the Status dropdown
   - Select "Host Review"
   - See only matching proposals

3. **Create a Proposal**
   - Click "Create Suggested Proposal"
   - Follow the 3-step wizard
   - See confirmation with new proposal ID

4. **Update Proposal Status**
   - Click any status dropdown in a proposal card
   - Select a new status
   - See toast notification confirming the update

5. **Send Reminders**
   - Click "Send reminder to guest" or "Send reminder to host"
   - See success notification

6. **Sort and Date Filter**
   - Use the up/down arrows to sort by modified date
   - Set date ranges to filter proposals

## Sample Data

The application includes 5 realistic sample proposals:

1. **Emily Rodriguez** - Modern Downtown Apartment (Host Review)
2. **David Kim** - Cozy Studio near University (Awaiting Rental Application)
3. **Olivia Martinez** - Furnished 1BR with Parking (Host Counteroffer)
4. **James Anderson** - Executive Condo with Office (Lease Documents Sent)
5. **Sophia Brown** - Bright Loft Space (Cancelled by Guest)

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Project Structure at a Glance

```
src/
├── components/          # Reusable UI components
│   ├── FilterSection/   # Search and filter controls
│   ├── ProposalItem/    # Individual proposal card
│   └── QuickProposalCreation/  # Creation wizard
├── pages/               # Main pages
│   └── ProposalManagePage.jsx
├── services/            # API and data services
│   ├── api.js          # API client
│   └── mockData.js     # Sample data
└── types/               # Data models
    └── proposal.js
```

## Next Steps

### Connect to Real API

1. Update `.env`:
```env
VITE_API_BASE_URL=https://your-api.com/api
VITE_USE_MOCK_DATA=false
```

2. Ensure your backend implements the API endpoints (see `API_DOCUMENTATION.md`)

3. Restart the dev server

### Customize Styling

Edit CSS variables in `src/index.css`:
```css
--color-primary: #4f46e5;      /* Main blue color */
--color-secondary: #8b5cf6;    /* Purple color */
--color-danger: #ef4444;       /* Red for dangerous actions */
```

### Add Authentication

The API service in `src/services/api.js` already includes auth token handling:

```javascript
// Token is read from localStorage
const token = localStorage.getItem('authToken');
```

Just set the token after login:
```javascript
localStorage.setItem('authToken', yourToken);
```

## Troubleshooting

### Port 3000 already in use?

Edit `vite.config.js`:
```javascript
server: {
  port: 3001,  // Change to any available port
  open: true
}
```

### Dependencies won't install?

Try:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Page is blank?

1. Check browser console for errors
2. Ensure you're on `http://localhost:3000` (not HTTPS)
3. Try a hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Mock data not showing?

Verify `.env` contains:
```env
VITE_USE_MOCK_DATA=true
```

## Key Features Overview

### Filtering System
- **Real-time search** across guests, hosts, and listings
- **Status filtering** with 15 proposal states
- **Date range selection** for modified dates
- **Unique ID search** for direct proposal lookup
- **Clear all** to reset filters instantly

### Proposal Management
- **View proposals** with complete details
- **Update status** via dropdown
- **Send reminders** to guests or hosts
- **Modify terms** as host or guest
- **Cancel proposals** with confirmation
- **View listing** details in new tab

### Quick Creation
- **Step 1:** Select host/listing with search
- **Step 2:** Select guest with search
- **Step 3:** Configure all proposal details
  - Guest information
  - Move-in date and reservation span
  - Weekly schedule selector
  - Automatic pricing calculation
- **Step 4:** Confirmation with IDs

## Support

- **Documentation:** `README.md` - Full documentation
- **API Docs:** `API_DOCUMENTATION.md` - Backend API specification
- **Deployment:** `DEPLOYMENT.md` - Production deployment guide
- **Issues:** https://github.com/splitleasesharath/_proposal-manage/issues

## Tips

1. **Use browser DevTools** to inspect API calls (Network tab)
2. **Check console** for helpful debug messages
3. **Read component props** in JSX files for customization options
4. **Test on mobile** - all components are responsive
5. **Use React DevTools** extension for component debugging

## Common Customizations

### Change page title
Edit `index.html`:
```html
<title>Your Custom Title</title>
```

### Add more filter options
Edit `src/components/FilterSection/FilterSection.jsx`

### Modify proposal card layout
Edit `src/components/ProposalItem/ProposalItem.jsx`

### Change color scheme
Edit CSS variables in `src/index.css`

### Add new proposal statuses
Edit `src/types/proposal.js`:
```javascript
export const PROPOSAL_STATUSES = [
  'Your New Status',
  ...existing statuses
];
```

---

**You're all set!** 🎉

The application is now running with mock data. Explore all features, customize as needed, and connect to your backend when ready.

For production deployment, see `DEPLOYMENT.md`.
