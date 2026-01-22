import React from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PROPOSAL_STATUSES } from '../../types/proposal';
import './FilterSection.css';

const FilterSection = ({ filters, onFilterChange, onClearAll }) => {
  const statusOptions = PROPOSAL_STATUSES.map(status => ({
    value: status,
    label: status || '(empty)'
  }));

  return (
    <div className="filter-section">
      <div className="filter-row filter-row-1">
        {/* Filter by Guest */}
        <div className="filter-item">
          <input
            type="text"
            className="searchbox"
            placeholder="Search Guest Name, email, phone number"
            value={filters.guestSearch || ''}
            onChange={(e) => onFilterChange('guestSearch', e.target.value)}
          />
          {filters.guestSearch && (
            <button
              className="clear-btn"
              onClick={() => onFilterChange('guestSearch', '')}
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter by Host */}
        <div className="filter-item">
          <input
            type="text"
            className="searchbox"
            placeholder="Search Host Name, email, phone number"
            value={filters.hostSearch || ''}
            onChange={(e) => onFilterChange('hostSearch', e.target.value)}
          />
          {filters.hostSearch && (
            <button
              className="clear-btn"
              onClick={() => onFilterChange('hostSearch', '')}
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter by Proposal Status */}
        <div className="filter-item">
          <Select
            options={statusOptions}
            placeholder="Filter by proposal status"
            value={filters.status ? { value: filters.status, label: filters.status } : null}
            onChange={(option) => onFilterChange('status', option?.value || '')}
            isClearable
            className="select-filter"
            classNamePrefix="select"
          />
        </div>

        {/* Sort by Modified Date */}
        <div className="filter-item sort-section">
          <label className="filter-label">Sort by Proposal Modified Date</label>
          <div className="sort-controls">
            <button
              className={`sort-btn ${filters.sortDirection === 'asc' ? 'active' : ''}`}
              onClick={() => onFilterChange('sortDirection', 'asc')}
              title="Ascending"
            >
              ↑
            </button>
            <button
              className={`sort-btn ${filters.sortDirection === 'desc' ? 'active' : ''}`}
              onClick={() => onFilterChange('sortDirection', 'desc')}
              title="Descending"
            >
              ↓
            </button>
          </div>
        </div>
      </div>

      <div className="filter-row filter-row-2">
        {/* Filter by Proposal ID */}
        <div className="filter-item">
          <label className="filter-label">Filter by Proposal unique ID</label>
          <input
            type="text"
            className="textbox"
            placeholder="search by ID"
            value={filters.proposalId || ''}
            onChange={(e) => onFilterChange('proposalId', e.target.value)}
          />
        </div>

        {/* Filter by Listing */}
        <div className="filter-item">
          <label className="filter-label">Filter by listing (name, rental type, unique id)</label>
          <input
            type="text"
            className="searchbox"
            placeholder="Search Listing by name, unique id, rental type"
            value={filters.listingSearch || ''}
            onChange={(e) => onFilterChange('listingSearch', e.target.value)}
          />
          {filters.listingSearch && (
            <button
              className="clear-btn"
              onClick={() => onFilterChange('listingSearch', '')}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="filter-row filter-row-3">
        {/* Date Range Filter */}
        <div className="filter-item date-range">
          <label className="filter-label">Display Proposal Modified Between Dates:</label>
          <div className="date-range-inputs">
            <DatePicker
              selected={filters.startDate}
              onChange={(date) => onFilterChange('startDate', date)}
              dateFormat="M/d/yyyy"
              className="date-picker"
              placeholderText="Start date"
            />
            <span className="date-separator">-</span>
            <DatePicker
              selected={filters.endDate}
              onChange={(date) => onFilterChange('endDate', date)}
              dateFormat="M/d/yyyy"
              className="date-picker"
              placeholderText="End date"
            />
          </div>
        </div>

        {/* Clear All Button */}
        <div className="filter-item">
          <button className="clear-all-btn" onClick={onClearAll}>
            Clear all
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
