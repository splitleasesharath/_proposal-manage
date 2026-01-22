/**
 * Proposal Status Options
 */
export const PROPOSAL_STATUSES = [
  'Proposal Submitted for guest by Split Lease - Awaiting Rental Application',
  'Proposal Submitted by guest - Awaiting Rental Application',
  'Proposal Submitted for guest by Split Lease - Pending Confirmation',
  'Host Review',
  'Host Counteroffer Submitted / Awaiting Guest Review',
  'Proposal or Counteroffer Accepted / Drafting Lease Documents',
  'Lease Documents Sent for Review',
  'Lease Documents Sent for Signatures',
  'Lease Documents Signed / Awaiting Initial payment',
  'Initial Payment Submitted / Lease activated',
  'Proposal Cancelled by Guest',
  'Proposal Rejected by Host',
  'Proposal Cancelled by Split Lease',
  'Guest Ignored Suggestion',
  ''
];

/**
 * Days of the week
 */
export const DAYS_OF_WEEK = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

/**
 * Proposal Data Structure
 */
export class Proposal {
  constructor(data = {}) {
    this.uniqueId = data.uniqueId || '';
    this.status = data.status || '';
    this.createdDate = data.createdDate || new Date();
    this.modifiedDate = data.modifiedDate || new Date();

    // Guest information
    this.guest = {
      firstName: data.guest?.firstName || '',
      lastName: data.guest?.lastName || '',
      email: data.guest?.email || '',
      phoneNumber: data.guest?.phoneNumber || '',
      profilePhoto: data.guest?.profilePhoto || '',
      aboutMe: data.guest?.aboutMe || '',
      needForSpace: data.guest?.needForSpace || '',
      specialNeeds: data.guest?.specialNeeds || '',
      isUsabilityTester: data.guest?.isUsabilityTester || false
    };

    // Host information
    this.host = {
      firstName: data.host?.firstName || '',
      lastName: data.host?.lastName || '',
      email: data.host?.email || '',
      phoneNumber: data.host?.phoneNumber || '',
      profilePhoto: data.host?.profilePhoto || '',
      isUsabilityTester: data.host?.isUsabilityTester || false
    };

    // Listing information
    this.listing = {
      name: data.listing?.name || '',
      uniqueId: data.listing?.uniqueId || '',
      address: data.listing?.address || '',
      rentalType: data.listing?.rentalType || '',
      photos: data.listing?.photos || [],
      damageDeposit: data.listing?.damageDeposit || 0,
      cleaningCost: data.listing?.cleaningCost || 0,
      lastModified: data.listing?.lastModified || new Date(),
      houseRules: data.listing?.houseRules || []
    };

    // Pricing information
    this.pricing = {
      nightlyPrice: data.pricing?.nightlyPrice || 0,
      totalReservationPrice: data.pricing?.totalReservationPrice || 0,
      hostCompensation: data.pricing?.hostCompensation || 0,
      totalCompensation: data.pricing?.totalCompensation || 0,
      pricePerFourWeeks: data.pricing?.pricePerFourWeeks || 0,
      initialPayment: data.pricing?.initialPayment || 0,
      numberOfNights: data.pricing?.numberOfNights || 0,
      numberOfWeeks: data.pricing?.numberOfWeeks || 0,
      securityDeposit: data.pricing?.securityDeposit || 0
    };

    // Reservation details
    this.reservation = {
      moveInDate: data.reservation?.moveInDate || null,
      checkInDate: data.reservation?.checkInDate || null,
      checkOutDate: data.reservation?.checkOutDate || null,
      reservationSpanWeeks: data.reservation?.reservationSpanWeeks || 0,
      weeklySchedule: data.reservation?.weeklySchedule || [false, false, false, false, false, false, false],
      guestDesiredPattern: data.reservation?.guestDesiredPattern || '',
      strictMoveIn: data.reservation?.strictMoveIn || false,
      isFullTime: data.reservation?.isFullTime || false
    };
  }
}

/**
 * User Data Structure
 */
export class User {
  constructor(data = {}) {
    this.uniqueId = data.uniqueId || '';
    this.firstName = data.firstName || '';
    this.lastName = data.lastName || '';
    this.email = data.email || '';
    this.phoneNumber = data.phoneNumber || '';
    this.profilePhoto = data.profilePhoto || '';
    this.aboutMe = data.aboutMe || '';
    this.needForSpace = data.needForSpace || '';
    this.specialNeeds = data.specialNeeds || '';
    this.isUsabilityTester = data.isUsabilityTester || false;
  }
}

/**
 * Listing Data Structure
 */
export class Listing {
  constructor(data = {}) {
    this.uniqueId = data.uniqueId || '';
    this.name = data.name || '';
    this.address = data.address || '';
    this.rentalType = data.rentalType || '';
    this.photos = data.photos || [];
    this.damageDeposit = data.damageDeposit || 0;
    this.cleaningCost = data.cleaningCost || 0;
    this.nightlyPrice = data.nightlyPrice || 0;
    this.lastModified = data.lastModified || new Date();
    this.houseRules = data.houseRules || [];
    this.host = data.host || null;
  }
}
