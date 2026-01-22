import axios from 'axios';
import { Proposal } from '../types/proposal';

// Configure base URL - replace with your actual API endpoint
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Proposal API Service
 */
export const proposalService = {
  /**
   * Search for proposals with filters
   */
  async searchProposals(filters = {}) {
    try {
      const response = await api.get('/proposals/search', { params: filters });
      return response.data.map(p => new Proposal(p));
    } catch (error) {
      console.error('Error searching proposals:', error);
      throw error;
    }
  },

  /**
   * Get a single proposal by ID
   */
  async getProposal(proposalId) {
    try {
      const response = await api.get(`/proposals/${proposalId}`);
      return new Proposal(response.data);
    } catch (error) {
      console.error('Error fetching proposal:', error);
      throw error;
    }
  },

  /**
   * Create a new proposal
   */
  async createProposal(proposalData) {
    try {
      const response = await api.post('/proposals', proposalData);
      return new Proposal(response.data);
    } catch (error) {
      console.error('Error creating proposal:', error);
      throw error;
    }
  },

  /**
   * Update proposal status
   */
  async updateProposalStatus(proposalId, status) {
    try {
      const response = await api.patch(`/proposals/${proposalId}/status`, { status });
      return new Proposal(response.data);
    } catch (error) {
      console.error('Error updating proposal status:', error);
      throw error;
    }
  },

  /**
   * Update proposal (modify terms)
   */
  async updateProposal(proposalId, updates) {
    try {
      const response = await api.patch(`/proposals/${proposalId}`, updates);
      return new Proposal(response.data);
    } catch (error) {
      console.error('Error updating proposal:', error);
      throw error;
    }
  },

  /**
   * Cancel proposal
   */
  async cancelProposal(proposalId, reason) {
    try {
      const response = await api.post(`/proposals/${proposalId}/cancel`, { reason });
      return response.data;
    } catch (error) {
      console.error('Error cancelling proposal:', error);
      throw error;
    }
  },

  /**
   * Send reminder to guest
   */
  async sendReminderToGuest(proposalId) {
    try {
      const response = await api.post(`/proposals/${proposalId}/remind-guest`);
      return response.data;
    } catch (error) {
      console.error('Error sending reminder to guest:', error);
      throw error;
    }
  },

  /**
   * Send reminder to host
   */
  async sendReminderToHost(proposalId) {
    try {
      const response = await api.post(`/proposals/${proposalId}/remind-host`);
      return response.data;
    } catch (error) {
      console.error('Error sending reminder to host:', error);
      throw error;
    }
  }
};

/**
 * User/Guest Search API
 */
export const userService = {
  async searchUsers(query) {
    try {
      const response = await api.get('/users/search', { params: { q: query } });
      return response.data;
    } catch (error) {
      console.error('Error searching users:', error);
      throw error;
    }
  }
};

/**
 * Listing/Host Search API
 */
export const listingService = {
  async searchListings(query) {
    try {
      const response = await api.get('/listings/search', { params: { q: query } });
      return response.data;
    } catch (error) {
      console.error('Error searching listings:', error);
      throw error;
    }
  }
};

export default api;
