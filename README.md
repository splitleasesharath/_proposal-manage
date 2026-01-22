# Proposal Management System

A comprehensive proposal management interface for the Split Lease platform. This application allows admin users to view, filter, sort, and manage rental proposals between guests and hosts.

## Features

### Core Functionality
- **Advanced Filtering**: Search and filter proposals by guest, host, listing, status, ID, and date range
- **Proposal List View**: Display detailed proposal information including guest/host details, pricing, and reservation specifics
- **Quick Proposal Creation**: Multi-step wizard for creating new suggested proposals
- **Status Management**: Update proposal status with dropdown selections
- **Action Workflows**: Send reminders, modify terms, and cancel proposals
- **Date Range Filtering**: Filter proposals by modified date
- **Sorting**: Sort proposals by modified date (ascending/descending)

### User Interface Components
1. **Header Section**
   - Dynamic proposal count
   - Quick action buttons (Create, Relationships, Change Prices)

2. **Filter Section**
   - Guest search (name, email, phone)
   - Host search (name, email, phone)
   - Listing search (name, ID, rental type)
   - Status dropdown (15 proposal statuses)
   - Proposal ID filter
   - Date range selector
   - Clear all filters button

3. **Proposals List**
   - Guest information with profile
   - Host information with profile
   - Listing details with photos
   - Pricing breakdown
   - Reservation details and weekly schedule
   - House rules
   - Action buttons per proposal

4. **Quick Proposal Creation**
   - Step 1: Select listing/host
   - Step 2: Select guest
   - Step 3: Configure proposal details
   - Step 4: Confirmation with IDs

## Tech Stack

- **React 18.3** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **React Select** - Advanced select components
- **React DatePicker** - Date selection
- **Axios** - HTTP client
- **date-fns** - Date formatting
- **React Hot Toast** - Notifications

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/splitleasesharath/_proposal-manage.git
cd _proposal-manage/repo
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```env
VITE_API_BASE_URL=http://localhost:3001/api
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000/_proposal-manage`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
repo/
├── src/
│   ├── components/
│   │   ├── FilterSection/
│   │   │   ├── FilterSection.jsx
│   │   │   └── FilterSection.css
│   │   ├── ProposalItem/
│   │   │   ├── ProposalItem.jsx
│   │   │   └── ProposalItem.css
│   │   └── QuickProposalCreation/
│   │       ├── QuickProposalCreation.jsx
│   │       └── QuickProposalCreation.css
│   ├── pages/
│   │   ├── ProposalManagePage.jsx
│   │   └── ProposalManagePage.css
│   ├── services/
│   │   ├── api.js
│   │   └── mockData.js
│   ├── types/
│   │   └── proposal.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## Data Models

### Proposal
- **uniqueId**: Unique proposal identifier
- **status**: Current proposal status (15 possible statuses)
- **createdDate**: Proposal creation timestamp
- **modifiedDate**: Last modification timestamp
- **guest**: Guest user information
- **host**: Host user information
- **listing**: Listing details
- **pricing**: Price breakdown
- **reservation**: Reservation details and schedule

### Proposal Statuses
1. Proposal Submitted for guest by Split Lease - Awaiting Rental Application
2. Proposal Submitted by guest - Awaiting Rental Application
3. Proposal Submitted for guest by Split Lease - Pending Confirmation
4. Host Review
5. Host Counteroffer Submitted / Awaiting Guest Review
6. Proposal or Counteroffer Accepted / Drafting Lease Documents
7. Lease Documents Sent for Review
8. Lease Documents Sent for Signatures
9. Lease Documents Signed / Awaiting Initial payment
10. Initial Payment Submitted / Lease activated
11. Proposal Cancelled by Guest
12. Proposal Rejected by Host
13. Proposal Cancelled by Split Lease
14. Guest Ignored Suggestion
15. (empty)

## API Integration

The application is designed to work with a REST API. Currently, it uses mock data for development.

### API Endpoints (to be implemented)

```
GET    /api/proposals/search       - Search proposals with filters
GET    /api/proposals/:id          - Get single proposal
POST   /api/proposals              - Create new proposal
PATCH  /api/proposals/:id/status   - Update proposal status
PATCH  /api/proposals/:id          - Update proposal
POST   /api/proposals/:id/cancel   - Cancel proposal
POST   /api/proposals/:id/remind-guest  - Send reminder to guest
POST   /api/proposals/:id/remind-host   - Send reminder to host
GET    /api/users/search           - Search users/guests
GET    /api/listings/search        - Search listings
```

### Switching to Real API

1. Update `VITE_API_BASE_URL` in your `.env` file
2. Remove mock data imports from `ProposalManagePage.jsx`
3. Uncomment the real API service calls

## Features in Detail

### Filtering System
- **Real-time filtering**: Results update as you type
- **Multi-field search**: Search across multiple fields simultaneously
- **Clear filters**: Reset individual filters or all at once
- **Persistent filters**: Filters remain active while navigating

### Quick Proposal Creation
- **Multi-step wizard**: Guided process for creating proposals
- **Dynamic pricing**: Automatic calculation based on inputs
- **Weekly schedule selector**: Visual day-of-week selection
- **Full-time toggle**: Quick select all days
- **Validation**: Form validation before submission
- **Confirmation**: Display created proposal and thread IDs

### Action Workflows
- **View Listing**: Opens internal listing page in new tab
- **Modify Terms**: Opens modification modal (as host or guest)
- **Send Reminders**: Trigger email reminders to guests or hosts
- **Cancel Proposal**: Cancel with confirmation dialog
- **Status Updates**: Direct status changes from proposal list

## Styling

The application uses CSS custom properties (variables) for theming:

```css
--color-primary: #4f46e5
--color-secondary: #8b5cf6
--color-danger: #ef4444
--color-success: #10b981
```

All components are fully responsive and work on mobile, tablet, and desktop.

## Testing

### Mock Data
The application includes 5 sample proposals with realistic data for testing all features.

### Test Scenarios
1. Filter by guest name
2. Filter by host email
3. Filter by proposal status
4. Sort by date (asc/desc)
5. Create new proposal
6. Update proposal status
7. Send reminders
8. Cancel proposal
9. Clear all filters
10. Navigate via URL parameters

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

ISC License - Split Lease Team

## Support

For issues or questions, please open an issue on GitHub:
https://github.com/splitleasesharath/_proposal-manage/issues

## Roadmap

### Phase 1 (Current)
- ✅ Basic proposal listing
- ✅ Filtering and search
- ✅ Quick proposal creation
- ✅ Mock data for development

### Phase 2 (Planned)
- [ ] Real API integration
- [ ] Host/Guest editing modals
- [ ] Advanced validation
- [ ] Bulk operations
- [ ] Export to CSV/PDF
- [ ] Analytics dashboard

### Phase 3 (Future)
- [ ] Real-time updates (WebSocket)
- [ ] Advanced reporting
- [ ] Email templates editor
- [ ] Automated workflows
- [ ] Mobile app

## Credits

Built with ❤️ by the Split Lease Team

---

**Note**: This is an internal admin tool. Access requires authentication and admin privileges.
