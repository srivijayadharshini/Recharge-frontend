import API from '../config/api.js';

export const authService = {
  register: async (userData) => {
    try {
      console.log('🚀 Sending registration request:', userData);
      const response = await API.post('/users/register', userData);
      console.log('✅ Registration success:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Registration error:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'Registration failed'
      );
    }
  },

  login: async (credentials) => {
    try {
      const response = await API.post('/users/login', credentials);
      const { token, role } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('userRole', role);

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Login failed'
      );
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  getUserRole: () => {
    return localStorage.getItem('userRole');
  }
};
