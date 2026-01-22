import { Proposal } from '../types/proposal';

/**
 * Mock Proposals Data for Development/Testing
 */
export const mockProposals = [
  new Proposal({
    uniqueId: 'PROP-2026-001',
    status: 'Host Review',
    createdDate: new Date('2026-01-15'),
    modifiedDate: new Date('2026-01-20'),
    guest: {
      firstName: 'Emily',
      lastName: 'Rodriguez',
      email: 'emily.rodriguez@example.com',
      phoneNumber: '+1 (555) 123-4567',
      profilePhoto: 'https://i.pravatar.cc/150?img=1',
      aboutMe: 'Software engineer looking for a quiet place to work remotely. I enjoy reading, hiking, and cooking.',
      needForSpace: 'Need a peaceful workspace with good internet connectivity for remote work.',
      specialNeeds: 'Require high-speed internet (100+ Mbps) and a dedicated workspace.',
      isUsabilityTester: true
    },
    host: {
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael.chen@example.com',
      phoneNumber: '+1 (555) 987-6543',
      profilePhoto: 'https://i.pravatar.cc/150?img=12',
      isUsabilityTester: false
    },
    listing: {
      name: 'Modern Downtown Apartment',
      uniqueId: 'LIST-2026-A101',
      address: '123 Main Street, Unit 4B, San Francisco, CA 94102',
      rentalType: 'Apartment',
      photos: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400'
      ],
      damageDeposit: 1500,
      cleaningCost: 150,
      lastModified: new Date('2026-01-10'),
      houseRules: ['No smoking', 'No pets', 'Quiet hours after 10 PM', 'Keep common areas clean']
    },
    pricing: {
      nightlyPrice: 85,
      totalReservationPrice: 2380,
      hostCompensation: 2000,
      totalCompensation: 2150,
      pricePerFourWeeks: 2380,
      initialPayment: 4030,
      numberOfNights: 28,
      numberOfWeeks: 4,
      securityDeposit: 1500
    },
    reservation: {
      moveInDate: new Date('2026-02-01'),
      checkInDate: new Date('2026-02-01'),
      checkOutDate: new Date('2026-02-28'),
      reservationSpanWeeks: 4,
      weeklySchedule: [true, true, true, true, true, true, true],
      guestDesiredPattern: 'Full Time',
      strictMoveIn: false,
      isFullTime: true
    }
  }),

  new Proposal({
    uniqueId: 'PROP-2026-002',
    status: 'Proposal Submitted by guest - Awaiting Rental Application',
    createdDate: new Date('2026-01-18'),
    modifiedDate: new Date('2026-01-21'),
    guest: {
      firstName: 'David',
      lastName: 'Kim',
      email: 'david.kim@example.com',
      phoneNumber: '+1 (555) 234-5678',
      profilePhoto: 'https://i.pravatar.cc/150?img=33',
      aboutMe: 'Graduate student studying architecture. Clean, organized, and respectful.',
      needForSpace: 'Looking for affordable housing near campus for the semester.',
      specialNeeds: 'Need access to public transportation.',
      isUsabilityTester: false
    },
    host: {
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@example.com',
      phoneNumber: '+1 (555) 345-6789',
      profilePhoto: 'https://i.pravatar.cc/150?img=5',
      isUsabilityTester: true
    },
    listing: {
      name: 'Cozy Studio near University',
      uniqueId: 'LIST-2026-B205',
      address: '456 College Avenue, Berkeley, CA 94704',
      rentalType: 'Studio',
      photos: [
        'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=400',
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400'
      ],
      damageDeposit: 800,
      cleaningCost: 100,
      lastModified: new Date('2026-01-12'),
      houseRules: ['No smoking', 'Pets allowed with deposit', 'Respect neighbors']
    },
    pricing: {
      nightlyPrice: 60,
      totalReservationPrice: 2520,
      hostCompensation: 2100,
      totalCompensation: 2200,
      pricePerFourWeeks: 1680,
      initialPayment: 2580,
      numberOfNights: 42,
      numberOfWeeks: 6,
      securityDeposit: 800
    },
    reservation: {
      moveInDate: new Date('2026-02-15'),
      checkInDate: new Date('2026-02-15'),
      checkOutDate: new Date('2026-03-28'),
      reservationSpanWeeks: 6,
      weeklySchedule: [true, true, true, true, true, true, true],
      guestDesiredPattern: 'Full Time',
      strictMoveIn: true,
      isFullTime: true
    }
  }),

  new Proposal({
    uniqueId: 'PROP-2026-003',
    status: 'Host Counteroffer Submitted / Awaiting Guest Review',
    createdDate: new Date('2026-01-12'),
    modifiedDate: new Date('2026-01-22'),
    guest: {
      firstName: 'Olivia',
      lastName: 'Martinez',
      email: 'olivia.martinez@example.com',
      phoneNumber: '+1 (555) 456-7890',
      profilePhoto: 'https://i.pravatar.cc/150?img=9',
      aboutMe: 'Healthcare professional on temporary assignment. Non-smoker, no pets.',
      needForSpace: 'Need temporary housing for 3-month medical rotation.',
      specialNeeds: 'Furnished space preferred. Parking space required.',
      isUsabilityTester: false
    },
    host: {
      firstName: 'Robert',
      lastName: 'Taylor',
      email: 'robert.taylor@example.com',
      phoneNumber: '+1 (555) 567-8901',
      profilePhoto: 'https://i.pravatar.cc/150?img=15',
      isUsabilityTester: false
    },
    listing: {
      name: 'Furnished 1BR with Parking',
      uniqueId: 'LIST-2026-C310',
      address: '789 Hospital Drive, Unit 12, Los Angeles, CA 90024',
      rentalType: '1 Bedroom',
      photos: [
        'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=400',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400'
      ],
      damageDeposit: 1200,
      cleaningCost: 200,
      lastModified: new Date('2026-01-08'),
      houseRules: ['No smoking', 'No pets', 'No parties', 'Maintain cleanliness']
    },
    pricing: {
      nightlyPrice: 95,
      totalReservationPrice: 7980,
      hostCompensation: 6800,
      totalCompensation: 7100,
      pricePerFourWeeks: 2660,
      initialPayment: 4060,
      numberOfNights: 84,
      numberOfWeeks: 12,
      securityDeposit: 1200
    },
    reservation: {
      moveInDate: new Date('2026-03-01'),
      checkInDate: new Date('2026-03-01'),
      checkOutDate: new Date('2026-05-23'),
      reservationSpanWeeks: 12,
      weeklySchedule: [true, true, true, true, true, false, false],
      guestDesiredPattern: 'Weekdays Only',
      strictMoveIn: false,
      isFullTime: false
    }
  }),

  new Proposal({
    uniqueId: 'PROP-2026-004',
    status: 'Lease Documents Sent for Signatures',
    createdDate: new Date('2026-01-05'),
    modifiedDate: new Date('2026-01-22'),
    guest: {
      firstName: 'James',
      lastName: 'Anderson',
      email: 'james.anderson@example.com',
      phoneNumber: '+1 (555) 678-9012',
      profilePhoto: 'https://i.pravatar.cc/150?img=52',
      aboutMe: 'Business consultant traveling for work. Professional and quiet.',
      needForSpace: 'Need executive housing during project assignment.',
      specialNeeds: 'Must have home office setup and strong WiFi.',
      isUsabilityTester: true
    },
    host: {
      firstName: 'Jennifer',
      lastName: 'Williams',
      email: 'jennifer.williams@example.com',
      phoneNumber: '+1 (555) 789-0123',
      profilePhoto: 'https://i.pravatar.cc/150?img=20',
      isUsabilityTester: false
    },
    listing: {
      name: 'Executive Condo with Office',
      uniqueId: 'LIST-2026-D405',
      address: '321 Business Plaza, Unit 8A, Seattle, WA 98101',
      rentalType: '2 Bedroom',
      photos: [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400'
      ],
      damageDeposit: 2000,
      cleaningCost: 250,
      lastModified: new Date('2026-01-03'),
      houseRules: ['No smoking', 'No pets', 'Professional environment', 'Visitor policy']
    },
    pricing: {
      nightlyPrice: 120,
      totalReservationPrice: 10080,
      hostCompensation: 8500,
      totalCompensation: 8900,
      pricePerFourWeeks: 3360,
      initialPayment: 5610,
      numberOfNights: 84,
      numberOfWeeks: 12,
      securityDeposit: 2000
    },
    reservation: {
      moveInDate: new Date('2026-02-10'),
      checkInDate: new Date('2026-02-10'),
      checkOutDate: new Date('2026-05-04'),
      reservationSpanWeeks: 12,
      weeklySchedule: [true, true, true, true, true, true, true],
      guestDesiredPattern: 'Full Time',
      strictMoveIn: true,
      isFullTime: true
    }
  }),

  new Proposal({
    uniqueId: 'PROP-2026-005',
    status: 'Proposal Cancelled by Guest',
    createdDate: new Date('2026-01-08'),
    modifiedDate: new Date('2026-01-19'),
    guest: {
      firstName: 'Sophia',
      lastName: 'Brown',
      email: 'sophia.brown@example.com',
      phoneNumber: '+1 (555) 890-1234',
      profilePhoto: 'https://i.pravatar.cc/150?img=44',
      aboutMe: 'Artist seeking creative space. Vegetarian, non-smoker.',
      needForSpace: 'Looking for inspiring space to work on art projects.',
      specialNeeds: 'Natural lighting and space for art supplies.',
      isUsabilityTester: false
    },
    host: {
      firstName: 'Daniel',
      lastName: 'Lee',
      email: 'daniel.lee@example.com',
      phoneNumber: '+1 (555) 901-2345',
      profilePhoto: 'https://i.pravatar.cc/150?img=60',
      isUsabilityTester: false
    },
    listing: {
      name: 'Bright Loft Space',
      uniqueId: 'LIST-2026-E501',
      address: '654 Art District, Loft 3, Portland, OR 97201',
      rentalType: 'Loft',
      photos: [
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400',
        'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=400'
      ],
      damageDeposit: 1000,
      cleaningCost: 120,
      lastModified: new Date('2026-01-06'),
      houseRules: ['No smoking', 'Pets negotiable', 'Respect community', 'Clean up after projects']
    },
    pricing: {
      nightlyPrice: 70,
      totalReservationPrice: 1960,
      hostCompensation: 1650,
      totalCompensation: 1730,
      pricePerFourWeeks: 1960,
      initialPayment: 3080,
      numberOfNights: 28,
      numberOfWeeks: 4,
      securityDeposit: 1000
    },
    reservation: {
      moveInDate: new Date('2026-03-15'),
      checkInDate: new Date('2026-03-15'),
      checkOutDate: new Date('2026-04-11'),
      reservationSpanWeeks: 4,
      weeklySchedule: [true, true, true, true, true, true, true],
      guestDesiredPattern: 'Full Time',
      strictMoveIn: false,
      isFullTime: true
    }
  })
];

/**
 * Mock function to simulate API search with filters
 */
export const searchMockProposals = (filters = {}) => {
  let results = [...mockProposals];

  // Filter by guest
  if (filters.guestSearch) {
    const query = filters.guestSearch.toLowerCase();
    results = results.filter(p =>
      p.guest.firstName.toLowerCase().includes(query) ||
      p.guest.lastName.toLowerCase().includes(query) ||
      p.guest.email.toLowerCase().includes(query) ||
      p.guest.phoneNumber.includes(query)
    );
  }

  // Filter by host
  if (filters.hostSearch) {
    const query = filters.hostSearch.toLowerCase();
    results = results.filter(p =>
      p.host.firstName.toLowerCase().includes(query) ||
      p.host.lastName.toLowerCase().includes(query) ||
      p.host.email.toLowerCase().includes(query) ||
      p.host.phoneNumber.includes(query)
    );
  }

  // Filter by status
  if (filters.status) {
    results = results.filter(p => p.status === filters.status);
  }

  // Filter by proposal ID
  if (filters.proposalId) {
    results = results.filter(p => p.uniqueId.includes(filters.proposalId));
  }

  // Filter by listing
  if (filters.listingSearch) {
    const query = filters.listingSearch.toLowerCase();
    results = results.filter(p =>
      p.listing.name.toLowerCase().includes(query) ||
      p.listing.uniqueId.toLowerCase().includes(query) ||
      p.listing.rentalType.toLowerCase().includes(query)
    );
  }

  // Filter by date range
  if (filters.startDate) {
    results = results.filter(p => new Date(p.modifiedDate) >= new Date(filters.startDate));
  }
  if (filters.endDate) {
    results = results.filter(p => new Date(p.modifiedDate) <= new Date(filters.endDate));
  }

  // Sort by modified date
  if (filters.sortDirection) {
    results.sort((a, b) => {
      const dateA = new Date(a.modifiedDate);
      const dateB = new Date(b.modifiedDate);
      return filters.sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }

  return new Promise((resolve) => {
    setTimeout(() => resolve(results), 300); // Simulate network delay
  });
};
