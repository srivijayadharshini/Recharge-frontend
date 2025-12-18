import API from '../config/api.js';

export const planService = {
  // Get all plans
  getPlans: async () => {
    try {
      const response = await API.get('/plans');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch plans' };
    }
  },

  // Create new plan (Admin only)
  createPlan: async (planData) => {
    try {
      const response = await API.post('/plans', planData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create plan' };
    }
  },

  // Update plan (Admin only)
  updatePlan: async (planId, planData) => {
    try {
      const response = await API.put(`/plans/${planId}`, planData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update plan' };
    }
  },

  // Delete plan (Admin only)
  deletePlan: async (planId) => {
    try {
      const response = await API.delete(`/plans/${planId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete plan' };
    }
  }
};