import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import portfolioService from './portfolioService';

const initialState = {
  portfolio: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get portfolio
export const getPortfolio = createAsyncThunk(
  'portfolio/get',
  async (_, thunkAPI) => {
    try {
      return await portfolioService.getPortfolio();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create portfolio
export const createPortfolio = createAsyncThunk(
  'portfolio/create',
  async (portfolioData, thunkAPI) => {
    try {
      return await portfolioService.createPortfolio(portfolioData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update portfolio
export const updatePortfolio = createAsyncThunk(
  'portfolio/update',
  async (portfolioData, thunkAPI) => {
    try {
      return await portfolioService.updatePortfolio(portfolioData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPortfolio.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPortfolio.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.portfolio = action.payload;
      })
      .addCase(getPortfolio.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.portfolio = null;
      })
      .addCase(createPortfolio.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPortfolio.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.portfolio = action.payload;
      })
      .addCase(createPortfolio.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updatePortfolio.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePortfolio.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.portfolio = action.payload;
      })
      .addCase(updatePortfolio.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = portfolioSlice.actions;
export default portfolioSlice.reducer; 