import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import portfolioReducer from '../features/portfolio/portfolioSlice';
import projectReducer from '../features/projects/projectSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    portfolio: portfolioReducer,
    projects: projectReducer,
  },
}); 