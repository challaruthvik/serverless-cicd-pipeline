// API endpoints configuration
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

// API service functions
export const api = {
  // Authentication
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      return await response.json();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Deployments
  getDeployments: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/deployments`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching deployments:', error);
      throw error;
    }
  },

  // Monitoring
  getMetrics: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/metrics`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching metrics:', error);
      throw error;
    }
  },
};