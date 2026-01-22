import React from 'react';
import { format } from 'date-fns';
import Select from 'react-select';
import { PROPOSAL_STATUSES, DAYS_OF_WEEK } from '../../types/proposal';
import './ProposalItem.css';

const ProposalItem = ({ proposal, onStatusChange, onAction }) => {
  const statusOptions = PROPOSAL_STATUSES.map(status => ({
    value: status,
    label: status || '(empty)'
  }));

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (date) => {
    return date ? format(new Date(date), 'M/d/yyyy') : 'N/A';
  };

  return (
    <div className="proposal-item">
      <div className="proposal-grid">
        {/* Guest Section */}
        <div className="section guest-section">
          <h3 className="section-title">Guest Information</h3>
          <div className="user-info">
            {proposal.guest.profilePhoto && (
              <img
                src={proposal.guest.profilePhoto}
                alt={`${proposal.guest.firstName} ${proposal.guest.lastName}`}
                className="profile-photo"
              />
            )}
            <div className="user-details">
              <p className="user-name">
                {proposal.guest.firstName} {proposal.guest.lastName}
                {proposal.guest.isUsabilityTester && (
                  <span className="badge usability-tester">Usability Tester</span>
                )}
              </p>
              <p className="user-contact">{proposal.guest.email}</p>
              <p className="user-contact">{proposal.guest.phoneNumber}</p>
            </div>
          </div>
          {proposal.guest.aboutMe && (
            <div className="guest-bio">
              <p className="bio-label">About:</p>
              <p className="bio-text">{proposal.guest.aboutMe}</p>
            </div>
          )}
        </div>

        {/* Listing Section */}
        <div className="section listing-section">
          <h3 className="section-title">Listing Information</h3>
          <div className="listing-info">
            <p className="listing-name">{proposal.listing.name}</p>
            <p className="listing-address">{proposal.listing.address}</p>
            <p className="listing-id">ID: {proposal.listing.uniqueId}</p>
            {proposal.listing.photos && proposal.listing.photos.length > 0 && (
              <div className="listing-photos">
                <img src={proposal.listing.photos[0]} alt="Listing" className="listing-photo" />
                {proposal.listing.photos.length > 1 && (
                  <img src={proposal.listing.photos[proposal.listing.photos.length - 1]} alt="Listing" className="listing-photo" />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Host Section */}
        <div className="section host-section">
          <h3 className="section-title">Host Information</h3>
          <div className="user-info">
            {proposal.host.profilePhoto && (
              <img
                src={proposal.host.profilePhoto}
                alt={`${proposal.host.firstName} ${proposal.host.lastName}`}
                className="profile-photo"
              />
            )}
            <div className="user-details">
              <p className="user-name">
                {proposal.host.firstName} {proposal.host.lastName}
                {proposal.host.isUsabilityTester && (
                  <span className="badge usability-tester">Usability Tester</span>
                )}
              </p>
              <p className="user-contact">{proposal.host.email}</p>
              <p className="user-contact">{proposal.host.phoneNumber}</p>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="section pricing-section">
          <h3 className="section-title">Pricing</h3>
          <div className="pricing-grid">
            <div className="pricing-item">
              <span className="pricing-label">Nightly Price:</span>
              <span className="pricing-value">{formatCurrency(proposal.pricing.nightlyPrice)}</span>
            </div>
            <div className="pricing-item">
              <span className="pricing-label">Total Reservation:</span>
              <span className="pricing-value">{formatCurrency(proposal.pricing.totalReservationPrice)}</span>
            </div>
            <div className="pricing-item">
              <span className="pricing-label">Damage Deposit:</span>
              <span className="pricing-value">{formatCurrency(proposal.listing.damageDeposit)}</span>
            </div>
            <div className="pricing-item">
              <span className="pricing-label">Cleaning Cost:</span>
              <span className="pricing-value">{formatCurrency(proposal.listing.cleaningCost)}</span>
            </div>
            <div className="pricing-item">
              <span className="pricing-label">Host Compensation:</span>
              <span className="pricing-value">{formatCurrency(proposal.pricing.hostCompensation)}</span>
            </div>
            <div className="pricing-item">
              <span className="pricing-label">Total Compensation:</span>
              <span className="pricing-value">{formatCurrency(proposal.pricing.totalCompensation)}</span>
            </div>
          </div>
        </div>

        {/* Reservation Details */}
        <div className="section reservation-section">
          <h3 className="section-title">Reservation Details</h3>
          <div className="reservation-info">
            <div className="info-item">
              <span className="info-label">Move-in Date:</span>
              <span className="info-value">{formatDate(proposal.reservation.moveInDate)}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Check-in:</span>
              <span className="info-value">{formatDate(proposal.reservation.checkInDate)}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Check-out:</span>
              <span className="info-value">{formatDate(proposal.reservation.checkOutDate)}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Reservation Span:</span>
              <span className="info-value">{proposal.reservation.reservationSpanWeeks} weeks</span>
            </div>
            <div className="weekly-schedule">
              <span className="info-label">Weekly Schedule:</span>
              <div className="days-grid">
                {DAYS_OF_WEEK.map((day, index) => (
                  <div
                    key={index}
                    className={`day-cell ${proposal.reservation.weeklySchedule[index] ? 'active' : ''}`}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Proposal Status */}
        <div className="section status-section">
          <h3 className="section-title">Proposal Status</h3>
          <Select
            options={statusOptions}
            value={{ value: proposal.status, label: proposal.status }}
            onChange={(option) => onStatusChange(proposal.uniqueId, option.value)}
            className="status-select"
            classNamePrefix="select"
          />
          <div className="proposal-meta">
            <p className="meta-item">
              <span className="meta-label">Proposal ID:</span>
              <span className="meta-value">{proposal.uniqueId}</span>
            </p>
            <p className="meta-item">
              <span className="meta-label">Created:</span>
              <span className="meta-value">{formatDate(proposal.createdDate)}</span>
            </p>
            <p className="meta-item">
              <span className="meta-label">Modified:</span>
              <span className="meta-value">{formatDate(proposal.modifiedDate)}</span>
            </p>
          </div>
        </div>

        {/* House Rules */}
        {proposal.listing.houseRules && proposal.listing.houseRules.length > 0 && (
          <div className="section rules-section">
            <h3 className="section-title">House Rules</h3>
            <ul className="rules-list">
              {proposal.listing.houseRules.map((rule, index) => (
                <li key={index} className="rule-item">{rule}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button
          className="btn btn-link"
          onClick={() => onAction('viewListing', proposal)}
        >
          View listing (internal)
        </button>
        <button
          className="btn btn-primary"
          onClick={() => onAction('modifyAsHost', proposal)}
        >
          Modify Terms as Host
        </button>
        <button
          className="btn btn-primary"
          onClick={() => onAction('modifyAsGuest', proposal)}
        >
          Modify Terms as Guest
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => onAction('sendReminderGuest', proposal)}
        >
          Send reminder to guest
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => onAction('sendReminderHost', proposal)}
        >
          Send reminder to host
        </button>
        <button
          className="btn btn-danger"
          onClick={() => onAction('cancelProposal', proposal)}
        >
          Cancel Proposal by SplitLease
        </button>
      </div>
    </div>
  );
};

export default ProposalItem;
