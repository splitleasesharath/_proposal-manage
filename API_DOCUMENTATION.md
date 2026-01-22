# API Documentation

## Overview

This document describes the backend API endpoints required for the Proposal Management System.

## Base URL

```
Production: https://api.split.lease/api
Development: http://localhost:3001/api
```

## Authentication

All API requests require authentication via Bearer token:

```
Authorization: Bearer <token>
```

## Endpoints

### Proposals

#### Search Proposals

Search and filter proposals with various criteria.

**Endpoint:** `GET /proposals/search`

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| guestSearch | string | Search by guest name, email, or phone |
| hostSearch | string | Search by host name, email, or phone |
| status | string | Filter by proposal status |
| proposalId | string | Filter by proposal unique ID |
| listingSearch | string | Search by listing name, ID, or rental type |
| startDate | date | Filter by modified date (start) |
| endDate | date | Filter by modified date (end) |
| sortDirection | string | Sort direction: 'asc' or 'desc' |
| page | number | Page number for pagination (default: 1) |
| limit | number | Results per page (default: 50) |

**Response:**
```json
{
  "data": [
    {
      "uniqueId": "PROP-2026-001",
      "status": "Host Review",
      "createdDate": "2026-01-15T00:00:00Z",
      "modifiedDate": "2026-01-20T00:00:00Z",
      "guest": {
        "firstName": "Emily",
        "lastName": "Rodriguez",
        "email": "emily.rodriguez@example.com",
        "phoneNumber": "+1 (555) 123-4567",
        "profilePhoto": "https://...",
        "aboutMe": "...",
        "needForSpace": "...",
        "specialNeeds": "...",
        "isUsabilityTester": true
      },
      "host": { ... },
      "listing": { ... },
      "pricing": { ... },
      "reservation": { ... }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 100,
    "pages": 2
  }
}
```

#### Get Single Proposal

Get detailed information about a specific proposal.

**Endpoint:** `GET /proposals/:id`

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Unique proposal ID |

**Response:**
```json
{
  "uniqueId": "PROP-2026-001",
  "status": "Host Review",
  "createdDate": "2026-01-15T00:00:00Z",
  "modifiedDate": "2026-01-20T00:00:00Z",
  "guest": { ... },
  "host": { ... },
  "listing": { ... },
  "pricing": { ... },
  "reservation": { ... }
}
```

#### Create Proposal

Create a new proposal.

**Endpoint:** `POST /proposals`

**Request Body:**
```json
{
  "guestId": "USER-123",
  "listingId": "LIST-456",
  "status": "Proposal Submitted for guest by Split Lease - Awaiting Rental Application",
  "guestAbout": "Software engineer...",
  "guestNeedForSpace": "Need workspace...",
  "guestSpecialNeeds": "High-speed internet...",
  "reservation": {
    "moveInDate": "2026-02-01",
    "reservationSpanWeeks": 4,
    "weeklySchedule": [true, true, true, true, true, true, true],
    "strictMoveIn": false,
    "isFullTime": true
  }
}
```

**Response:**
```json
{
  "uniqueId": "PROP-2026-NEW",
  "status": "Proposal Submitted for guest by Split Lease - Awaiting Rental Application",
  "createdDate": "2026-01-22T10:30:00Z",
  "modifiedDate": "2026-01-22T10:30:00Z",
  "threadId": "THREAD-789",
  ...
}
```

#### Update Proposal Status

Update the status of a proposal.

**Endpoint:** `PATCH /proposals/:id/status`

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Unique proposal ID |

**Request Body:**
```json
{
  "status": "Host Review"
}
```

**Response:**
```json
{
  "uniqueId": "PROP-2026-001",
  "status": "Host Review",
  "modifiedDate": "2026-01-22T11:00:00Z",
  ...
}
```

#### Update Proposal

Update proposal details (modify terms).

**Endpoint:** `PATCH /proposals/:id`

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Unique proposal ID |

**Request Body:**
```json
{
  "pricing": {
    "nightlyPrice": 90
  },
  "reservation": {
    "moveInDate": "2026-02-05",
    "reservationSpanWeeks": 6
  }
}
```

**Response:**
```json
{
  "uniqueId": "PROP-2026-001",
  "modifiedDate": "2026-01-22T11:15:00Z",
  "pricing": {
    "nightlyPrice": 90,
    ...
  },
  ...
}
```

#### Cancel Proposal

Cancel a proposal.

**Endpoint:** `POST /proposals/:id/cancel`

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Unique proposal ID |

**Request Body:**
```json
{
  "reason": "Cancelled by admin - duplicate proposal"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Proposal cancelled successfully",
  "proposalId": "PROP-2026-001",
  "status": "Proposal Cancelled by Split Lease"
}
```

#### Send Reminder to Guest

Send a reminder email to the guest.

**Endpoint:** `POST /proposals/:id/remind-guest`

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Unique proposal ID |

**Response:**
```json
{
  "success": true,
  "message": "Reminder sent to guest",
  "emailSentTo": "emily.rodriguez@example.com",
  "sentAt": "2026-01-22T11:30:00Z"
}
```

#### Send Reminder to Host

Send a reminder email to the host.

**Endpoint:** `POST /proposals/:id/remind-host`

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Unique proposal ID |

**Response:**
```json
{
  "success": true,
  "message": "Reminder sent to host",
  "emailSentTo": "michael.chen@example.com",
  "sentAt": "2026-01-22T11:30:00Z"
}
```

### Users

#### Search Users

Search for users/guests.

**Endpoint:** `GET /users/search`

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| q | string | Search query (name, email, phone) |
| limit | number | Max results (default: 20) |

**Response:**
```json
{
  "data": [
    {
      "uniqueId": "USER-123",
      "firstName": "Emily",
      "lastName": "Rodriguez",
      "email": "emily.rodriguez@example.com",
      "phoneNumber": "+1 (555) 123-4567",
      "profilePhoto": "https://...",
      "aboutMe": "...",
      "needForSpace": "...",
      "specialNeeds": "...",
      "isUsabilityTester": true
    }
  ]
}
```

### Listings

#### Search Listings

Search for listings.

**Endpoint:** `GET /listings/search`

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| q | string | Search query (name, ID, rental type) |
| limit | number | Max results (default: 20) |

**Response:**
```json
{
  "data": [
    {
      "uniqueId": "LIST-2026-A101",
      "name": "Modern Downtown Apartment",
      "address": "123 Main Street, Unit 4B, San Francisco, CA 94102",
      "rentalType": "Apartment",
      "photos": ["https://...", "https://..."],
      "damageDeposit": 1500,
      "cleaningCost": 150,
      "nightlyPrice": 85,
      "lastModified": "2026-01-10T00:00:00Z",
      "houseRules": ["No smoking", "No pets", ...],
      "host": {
        "uniqueId": "USER-456",
        "firstName": "Michael",
        "lastName": "Chen",
        "email": "michael.chen@example.com",
        "phoneNumber": "+1 (555) 987-6543",
        "profilePhoto": "https://...",
        "isUsabilityTester": false
      }
    }
  ]
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Bad Request",
  "message": "Invalid request parameters",
  "details": {
    "field": "status",
    "issue": "Invalid status value"
  }
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Proposal not found",
  "proposalId": "PROP-INVALID"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred",
  "requestId": "req-12345"
}
```

## Rate Limiting

API requests are rate-limited to:
- 100 requests per minute per user
- 1000 requests per hour per user

Rate limit headers are included in all responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1674567890
```

## Proposal Status Values

The following status values are valid:

1. `Proposal Submitted for guest by Split Lease - Awaiting Rental Application`
2. `Proposal Submitted by guest - Awaiting Rental Application`
3. `Proposal Submitted for guest by Split Lease - Pending Confirmation`
4. `Host Review`
5. `Host Counteroffer Submitted / Awaiting Guest Review`
6. `Proposal or Counteroffer Accepted / Drafting Lease Documents`
7. `Lease Documents Sent for Review`
8. `Lease Documents Sent for Signatures`
9. `Lease Documents Signed / Awaiting Initial payment`
10. `Initial Payment Submitted / Lease activated`
11. `Proposal Cancelled by Guest`
12. `Proposal Rejected by Host`
13. `Proposal Cancelled by Split Lease`
14. `Guest Ignored Suggestion`
15. `` (empty string)

## Webhooks (Future)

Future versions may support webhooks for real-time updates:

### Proposal Status Changed
```json
{
  "event": "proposal.status_changed",
  "timestamp": "2026-01-22T12:00:00Z",
  "data": {
    "proposalId": "PROP-2026-001",
    "oldStatus": "Host Review",
    "newStatus": "Proposal or Counteroffer Accepted / Drafting Lease Documents",
    "changedBy": "USER-789"
  }
}
```

### Proposal Created
```json
{
  "event": "proposal.created",
  "timestamp": "2026-01-22T12:00:00Z",
  "data": {
    "proposalId": "PROP-2026-NEW",
    "guestId": "USER-123",
    "listingId": "LIST-456",
    "createdBy": "ADMIN-789"
  }
}
```

## Notes

- All dates are in ISO 8601 format (UTC)
- All monetary values are in USD (cents can be represented as decimals)
- Phone numbers should be in E.164 format or US format with country code
- File uploads (photos) should use multipart/form-data
- Large responses are paginated (default: 50 items per page)
- Soft deletes are used (proposals are never permanently deleted)

## Support

For API issues or questions:
- Email: api-support@split.lease
- Slack: #api-support
- Documentation: https://docs.split.lease/api
