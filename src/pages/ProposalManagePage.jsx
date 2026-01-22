import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import FilterSection from '../components/FilterSection/FilterSection';
import ProposalItem from '../components/ProposalItem/ProposalItem';
import QuickProposalCreation from '../components/QuickProposalCreation/QuickProposalCreation';
import { searchMockProposals } from '../services/mockData';
import './ProposalManagePage.css';

const ProposalManagePage = () => {
  const [searchParams] = useSearchParams();
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreationForm, setShowCreationForm] = useState(false);

  const [filters, setFilters] = useState({
    guestSearch: '',
    hostSearch: '',
    status: '',
    proposalId: '',
    listingSearch: '',
    startDate: null,
    endDate: null,
    sortDirection: 'desc'
  });

  // Load proposals on mount and when filters change
  useEffect(() => {
    loadProposals();
  }, [filters]);

  // Check for proposal ID in URL
  useEffect(() => {
    const proposalId = searchParams.get('proposal');
    if (proposalId) {
      setFilters(prev => ({ ...prev, proposalId }));
      // Scroll to proposals list after data loads
      setTimeout(() => {
        const proposalsList = document.getElementById('proposals-list');
        if (proposalsList) {
          proposalsList.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    }
  }, [searchParams]);

  const loadProposals = async () => {
    setLoading(true);
    try {
      const results = await searchMockProposals(filters);
      setProposals(results);
    } catch (error) {
      toast.error('Failed to load proposals');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleClearAll = () => {
    setFilters({
      guestSearch: '',
      hostSearch: '',
      status: '',
      proposalId: '',
      listingSearch: '',
      startDate: null,
      endDate: null,
      sortDirection: 'desc'
    });
  };

  const handleStatusChange = async (proposalId, newStatus) => {
    try {
      // Update locally
      setProposals(prev =>
        prev.map(p =>
          p.uniqueId === proposalId
            ? { ...p, status: newStatus, modifiedDate: new Date() }
            : p
        )
      );
      toast.success('Proposal status updated');

      // In production, make API call here:
      // await proposalService.updateProposalStatus(proposalId, newStatus);
    } catch (error) {
      toast.error('Failed to update status');
      console.error(error);
    }
  };

  const handleAction = async (action, proposal) => {
    switch (action) {
      case 'viewListing':
        window.open(`/_listing-internal?id=${proposal.listing.uniqueId}`, '_blank');
        break;

      case 'modifyAsHost':
        toast.info('Opening host modification form...');
        // TODO: Open host editing modal
        break;

      case 'modifyAsGuest':
        toast.info('Opening guest modification form...');
        // TODO: Open guest editing modal
        break;

      case 'sendReminderGuest':
        try {
          toast.success(`Reminder sent to ${proposal.guest.firstName} ${proposal.guest.lastName}`);
          // await proposalService.sendReminderToGuest(proposal.uniqueId);
        } catch (error) {
          toast.error('Failed to send reminder');
        }
        break;

      case 'sendReminderHost':
        try {
          toast.success(`Reminder sent to ${proposal.host.firstName} ${proposal.host.lastName}`);
          // await proposalService.sendReminderToHost(proposal.uniqueId);
        } catch (error) {
          toast.error('Failed to send reminder');
        }
        break;

      case 'cancelProposal':
        if (window.confirm(`Are you sure you want to cancel proposal ${proposal.uniqueId}?`)) {
          try {
            // Update locally
            setProposals(prev =>
              prev.map(p =>
                p.uniqueId === proposal.uniqueId
                  ? { ...p, status: 'Proposal Cancelled by Split Lease', modifiedDate: new Date() }
                  : p
              )
            );
            toast.success('Proposal cancelled');
            // await proposalService.cancelProposal(proposal.uniqueId, 'Cancelled by admin');
          } catch (error) {
            toast.error('Failed to cancel proposal');
          }
        }
        break;

      default:
        console.log('Unknown action:', action);
    }
  };

  const handleCreateProposal = async (proposalData) => {
    try {
      toast.success('Proposal created successfully!');
      // Reload proposals
      loadProposals();

      // In production:
      // const newProposal = await proposalService.createProposal(proposalData);
    } catch (error) {
      toast.error('Failed to create proposal');
      console.error(error);
    }
  };

  return (
    <div className="proposal-manage-page">
      {/* Header */}
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">
            Proposals: RG: Proposals's List of Proposals:{proposals.length} results
          </h1>
          <div className="header-actions">
            <button
              className="btn btn-create-suggested"
              onClick={() => setShowCreationForm(!showCreationForm)}
            >
              {showCreationForm ? 'Hide' : 'Create Suggested Proposal'}
            </button>
            <button
              className="btn btn-relationships"
              onClick={() => window.location.href = '/_relationships'}
            >
              Go to relationships
            </button>
            <button className="btn btn-change-prices">
              Change Prices
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Quick Proposal Creation */}
        {showCreationForm && (
          <QuickProposalCreation
            onCreateProposal={handleCreateProposal}
            onClose={() => setShowCreationForm(false)}
          />
        )}

        {/* Filter Section */}
        <FilterSection
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearAll={handleClearAll}
        />

        {/* Proposals List */}
        <div id="proposals-list" className="proposals-section">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading proposals...</p>
            </div>
          ) : proposals.length === 0 ? (
            <div className="empty-state">
              <p>No proposals found matching your filters.</p>
              <button className="btn btn-clear" onClick={handleClearAll}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="proposals-list">
              {proposals.map(proposal => (
                <ProposalItem
                  key={proposal.uniqueId}
                  proposal={proposal}
                  onStatusChange={handleStatusChange}
                  onAction={handleAction}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProposalManagePage;
