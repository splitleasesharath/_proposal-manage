import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { PROPOSAL_STATUSES, DAYS_OF_WEEK } from '../../types/proposal';
import './QuickProposalCreation.css';

const QuickProposalCreation = ({ onCreateProposal, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Listing/Host selection
    selectedListing: null,
    listingSearch: '',

    // Step 2: Guest selection
    selectedGuest: null,
    guestSearch: '',

    // Step 3: Proposal details
    guestAbout: '',
    guestNeedForSpace: '',
    guestSpecialNeeds: '',
    proposalStatus: '',
    moveInDate: null,
    reservationSpanWeeks: 0,
    weeklySchedule: [false, false, false, false, false, false, false],
    strictMoveIn: false,
    isFullTime: false,

    // Recently created
    recentlyCreatedProposalId: null,
    recentlyCreatedThreadId: null
  });

  const statusOptions = PROPOSAL_STATUSES.map(status => ({
    value: status,
    label: status || '(empty)'
  }));

  const handleListingSelect = (listing) => {
    setFormData({ ...formData, selectedListing: listing });
    setStep(2);
  };

  const handleGuestSelect = (guest) => {
    setFormData({
      ...formData,
      selectedGuest: guest,
      guestAbout: guest.aboutMe || '',
      guestNeedForSpace: guest.needForSpace || '',
      guestSpecialNeeds: guest.specialNeeds || ''
    });
    setStep(3);
  };

  const handleScheduleToggle = (dayIndex) => {
    const newSchedule = [...formData.weeklySchedule];
    newSchedule[dayIndex] = !newSchedule[dayIndex];
    setFormData({ ...formData, weeklySchedule: newSchedule });
  };

  const handleSelectFullTime = () => {
    setFormData({
      ...formData,
      weeklySchedule: [true, true, true, true, true, true, true],
      isFullTime: true
    });
  };

  const calculatePricing = () => {
    if (!formData.selectedListing) return {};

    const nightlyPrice = formData.selectedListing.nightlyPrice || 0;
    const reservationSpanWeeks = formData.reservationSpanWeeks || 0;
    const activeDays = formData.weeklySchedule.filter(Boolean).length;
    const totalNights = activeDays * reservationSpanWeeks;
    const totalReservationPrice = nightlyPrice * totalNights;
    const pricePerFourWeeks = (totalReservationPrice / reservationSpanWeeks) * 4;
    const securityDeposit = formData.selectedListing.damageDeposit || 0;
    const cleaningCost = formData.selectedListing.cleaningCost || 0;
    const initialPayment = pricePerFourWeeks + securityDeposit + cleaningCost;

    return {
      nightlyPrice,
      totalNights,
      totalReservationPrice,
      pricePerFourWeeks,
      securityDeposit,
      cleaningCost,
      initialPayment,
      numberOfWeeks: reservationSpanWeeks
    };
  };

  const pricing = calculatePricing();

  const handleCreateProposal = () => {
    const proposalData = {
      listing: formData.selectedListing,
      guest: formData.selectedGuest,
      guestAbout: formData.guestAbout,
      guestNeedForSpace: formData.guestNeedForSpace,
      guestSpecialNeeds: formData.guestSpecialNeeds,
      status: formData.proposalStatus,
      moveInDate: formData.moveInDate,
      reservationSpanWeeks: formData.reservationSpanWeeks,
      weeklySchedule: formData.weeklySchedule,
      strictMoveIn: formData.strictMoveIn,
      isFullTime: formData.isFullTime,
      pricing
    };

    onCreateProposal(proposalData);

    // Simulate creation success
    setFormData({
      ...formData,
      recentlyCreatedProposalId: 'PROP-' + Date.now(),
      recentlyCreatedThreadId: 'THREAD-' + Date.now()
    });
    setStep(4);
  };

  const handleCreateAnother = () => {
    setFormData({
      selectedListing: null,
      listingSearch: '',
      selectedGuest: null,
      guestSearch: '',
      guestAbout: '',
      guestNeedForSpace: '',
      guestSpecialNeeds: '',
      proposalStatus: '',
      moveInDate: null,
      reservationSpanWeeks: 0,
      weeklySchedule: [false, false, false, false, false, false, false],
      strictMoveIn: false,
      isFullTime: false,
      recentlyCreatedProposalId: null,
      recentlyCreatedThreadId: null
    });
    setStep(1);
  };

  return (
    <div className="quick-proposal-creation">
      <div className="creation-header">
        <h2 className="creation-title">Quick Proposal Creation</h2>
        {onClose && (
          <button className="close-btn" onClick={onClose}>✕</button>
        )}
      </div>

      {/* Step 1: Listing Selection */}
      {step >= 1 && (
        <div className={`creation-step ${step === 1 ? 'active' : 'completed'}`}>
          <div className="step-header">
            <div className="step-badge">{step > 1 ? '✓' : '1'}</div>
            <div className="step-content">
              <label className="step-label">
                Filter by host name, email, listing name, unique id of listing, etc
              </label>
              {step === 1 && (
                <input
                  type="text"
                  className="searchbox"
                  placeholder="Search Host Name, email, listing name, unique id, rental type"
                  value={formData.listingSearch}
                  onChange={(e) => setFormData({ ...formData, listingSearch: e.target.value })}
                />
              )}
              {formData.selectedListing && (
                <div className="selected-item">
                  <p className="selected-name">{formData.selectedListing.name}</p>
                  {formData.selectedListing.photos && formData.selectedListing.photos.length > 0 && (
                    <div className="selected-photos">
                      <img src={formData.selectedListing.photos[0]} alt="Listing" className="selected-photo" />
                      {formData.selectedListing.photos.length > 1 && (
                        <img src={formData.selectedListing.photos[formData.selectedListing.photos.length - 1]} alt="Listing" className="selected-photo" />
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Guest Selection */}
      {step >= 2 && (
        <div className={`creation-step ${step === 2 ? 'active' : step > 2 ? 'completed' : ''}`}>
          <div className="step-header">
            <div className="step-badge">{step > 2 ? '✓' : '2'}</div>
            <div className="step-content">
              <label className="step-label">Filter by Guest</label>
              {step === 2 && (
                <>
                  <input
                    type="text"
                    className="searchbox"
                    placeholder="Search Guest Name, email, phone number"
                    value={formData.guestSearch}
                    onChange={(e) => setFormData({ ...formData, guestSearch: e.target.value })}
                  />
                  <button className="btn btn-select-user" onClick={() => handleGuestSelect({ firstName: 'Sample', lastName: 'Guest', email: 'guest@example.com' })}>
                    Select User
                  </button>
                </>
              )}
              {formData.selectedGuest && (
                <div className="selected-item">
                  <div className="selected-user">
                    {formData.selectedGuest.profilePhoto && (
                      <img src={formData.selectedGuest.profilePhoto} alt="Guest" className="selected-user-photo" />
                    )}
                    <p className="selected-name">
                      {formData.selectedGuest.firstName} {formData.selectedGuest.lastName}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Proposal Details */}
      {step === 3 && formData.selectedGuest && (
        <div className="creation-step active proposal-details">
          <div className="proposal-form">
            <div className="form-group">
              <label className="form-label">
                Tell us about {formData.selectedGuest.firstName}:
              </label>
              <textarea
                className="form-textarea"
                placeholder="About Me / Bio"
                value={formData.guestAbout}
                onChange={(e) => setFormData({ ...formData, guestAbout: e.target.value })}
                rows={3}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Why does {formData.selectedGuest.firstName} want this space?
              </label>
              <textarea
                className="form-textarea"
                placeholder="Need for Space"
                value={formData.guestNeedForSpace}
                onChange={(e) => setFormData({ ...formData, guestNeedForSpace: e.target.value })}
                rows={3}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Write {formData.selectedGuest.firstName}'s unique requirements
              </label>
              <textarea
                className="form-textarea"
                placeholder="Special needs"
                value={formData.guestSpecialNeeds}
                onChange={(e) => setFormData({ ...formData, guestSpecialNeeds: e.target.value })}
                rows={3}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Proposal status</label>
              <Select
                options={statusOptions}
                value={formData.proposalStatus ? { value: formData.proposalStatus, label: formData.proposalStatus } : null}
                onChange={(option) => setFormData({ ...formData, proposalStatus: option?.value || '' })}
                placeholder="Select proposal status"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Move-in From</label>
              <DatePicker
                selected={formData.moveInDate}
                onChange={(date) => setFormData({ ...formData, moveInDate: date })}
                dateFormat="M/d/yyyy"
                className="date-picker"
                placeholderText="Select move-in date"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Reservation Span (# of Weeks)</label>
              <input
                type="number"
                className="form-input"
                min="1"
                value={formData.reservationSpanWeeks}
                onChange={(e) => setFormData({ ...formData, reservationSpanWeeks: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Weekly Schedule</label>
              <div className="days-selector">
                {DAYS_OF_WEEK.map((day, index) => (
                  <button
                    key={index}
                    className={`day-btn ${formData.weeklySchedule[index] ? 'active' : ''}`}
                    onClick={() => handleScheduleToggle(index)}
                  >
                    {day}
                  </button>
                ))}
              </div>
              <button className="btn btn-full-time" onClick={handleSelectFullTime}>
                Select Full Time
              </button>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.strictMoveIn}
                  onChange={(e) => setFormData({ ...formData, strictMoveIn: e.target.checked })}
                />
                Strict (no negotiation on exact move in)
              </label>
            </div>

            {/* Pricing Display */}
            {formData.reservationSpanWeeks > 0 && (
              <div className="pricing-summary">
                <h3 className="pricing-title">Pricing Summary</h3>
                <div className="pricing-details">
                  <div className="pricing-row">
                    <span>Price per night:</span>
                    <span className="price-value">${pricing.nightlyPrice?.toFixed(2)}</span>
                  </div>
                  <div className="pricing-row">
                    <span>Number of nights:</span>
                    <span className="price-value">{pricing.totalNights}</span>
                  </div>
                  <div className="pricing-row">
                    <span>Number of weeks:</span>
                    <span className="price-value">{pricing.numberOfWeeks}</span>
                  </div>
                  <div className="pricing-row">
                    <span>Total Reservation Price:</span>
                    <span className="price-value">${pricing.totalReservationPrice?.toFixed(2)}</span>
                  </div>
                  <div className="pricing-row">
                    <span>Price per 4 weeks:</span>
                    <span className="price-value">${pricing.pricePerFourWeeks?.toFixed(2)}</span>
                  </div>
                  <div className="pricing-row">
                    <span>Security Deposit:</span>
                    <span className="price-value">${pricing.securityDeposit?.toFixed(2)}</span>
                  </div>
                  <div className="pricing-row">
                    <span>Cleaning Cost:</span>
                    <span className="price-value">${pricing.cleaningCost?.toFixed(2)}</span>
                  </div>
                  <div className="pricing-row total">
                    <span>Initial Payment:</span>
                    <span className="price-value">${pricing.initialPayment?.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="form-actions">
              <button className="btn btn-create" onClick={handleCreateProposal}>
                Create Proposal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Confirmation */}
      {step === 4 && (
        <div className="creation-step active confirmation">
          <div className="confirmation-content">
            <div className="success-icon">✓</div>
            <h3 className="confirmation-title">Proposal Created Successfully!</h3>
            <div className="confirmation-details">
              <p>
                <strong>Recently Created Proposal ID:</strong> {formData.recentlyCreatedProposalId}
              </p>
              <p>
                <strong>Recently Created Thread ID:</strong> {formData.recentlyCreatedThreadId}
              </p>
            </div>
            <button className="btn btn-create-another" onClick={handleCreateAnother}>
              Go To Create Another Proposal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickProposalCreation;
