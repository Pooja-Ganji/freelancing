import axios from 'axios';
import authService from '../auth/authService';

const API_URL = 'http://localhost:5000/api/portfolios/';

// Get portfolio
const getPortfolio = async () => {
  try {
    const response = await axios.get(API_URL, authService.createAuthHeader());
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return null; // Return null if portfolio not found
    }
    console.error('Get portfolio error:', error.response?.data || error.message);
    throw error;
  }
};

// Create portfolio
const createPortfolio = async (portfolioData) => {
  try {
    const response = await axios.post(API_URL, portfolioData, authService.createAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Create portfolio error:', error.response?.data || error.message);
    throw error;
  }
};

// Update portfolio
const updatePortfolio = async (portfolioData) => {
  try {
    // First get the current portfolio to get its ID
    const currentPortfolio = await getPortfolio();
    
    // If no portfolio exists, create one first
    if (!currentPortfolio) {
      console.log('No portfolio found, creating new one...');
      return await createPortfolio(portfolioData);
    }

    // Remove unnecessary fields from the request data
    const { _id, user, createdAt, updatedAt, __v, ...updateData } = portfolioData;
    
    // Make the update request with the correct ID
    const response = await axios.put(
      `${API_URL}${currentPortfolio._id}`, 
      updateData, 
      authService.createAuthHeader()
    );
    
    return response.data;
  } catch (error) {
    // Log the full error for debugging
    console.error('Portfolio update error:', {
      error,
      response: error.response?.data,
      status: error.response?.status,
      portfolioData
    });
    
    // Throw a more descriptive error
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      'Failed to update portfolio. Please try again.'
    );
  }
};

const portfolioService = {
  getPortfolio,
  createPortfolio,
  updatePortfolio,
};

export default portfolioService; 