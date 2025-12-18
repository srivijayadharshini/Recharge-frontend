import API from '../config/api.js';

export const userService = {
  // Get user profile (Protected)
  getUserProfile: async () => {
    try {
      const response = await API.get('/users/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch profile' };
    }
  },

  // Update user profile (Protected)
  updateProfile: async (profileData) => {
    try {
      const response = await API.put('/users/profile', profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update profile' };
    }
  },

  // Get all users (Admin only)
  getUsers: async () => {
    try {
      const response = await API.get('/users');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch users' };
    }
  },

  // Update user (Admin only)
  updateUser: async (userId, userData) => {
    try {
      const response = await API.put(`/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update user' };
    }
  },

  // Delete user (Admin only)
  deleteUser: async (userId) => {
    try {
      const response = await API.delete(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete user' };
    }
  }
};