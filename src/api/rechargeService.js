import API from '../config/api.js';

export const rechargeService = {
  // Create new recharge (Protected)
  createRecharge: async (rechargeData) => {
    try {
      const response = await API.post('/recharges', rechargeData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create recharge' };
    }
  },

  // Get user recharges (Protected)
  getUserRecharges: async () => {
    try {
      const response = await API.get('/recharges/user');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch recharges' };
    }
  },

  // Get all recharges (Admin only)
  getAllRecharges: async () => {
    try {
      const response = await API.get('/recharges');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch all recharges' };
    }
  },

  // Update recharge status (Admin only)
  updateRechargeStatus: async (rechargeId, status) => {
    try {
      const response = await API.put(`/recharges/${rechargeId}/status`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update recharge status' };
    }
  }
};