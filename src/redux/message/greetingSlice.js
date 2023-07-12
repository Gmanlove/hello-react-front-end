import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = 'http://localhost:3000/api/messages';

const initialState = {
  greeting: '',
  isLoading: false,
  hasError: false,
  isFetched: false,
  error: null, // Add an error field to the initial state
};

export const fetchGreeting = createAsyncThunk('greeting/fetchGreetings', async () => {
  try {
    const response = await fetch(baseUrl);
    const data = await response.json();
    return data[0].message;
  } catch (error) {
    throw new Error('Failed to fetch greeting'); // Throw the error to be caught in the extraReducers
  }
});

const greetingSlice = createSlice({
  name: 'greeting',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGreeting.pending, (state) => {
      const isLoading = true;
      return { ...state, isLoading };
    });
    builder.addCase(fetchGreeting.fulfilled, (state, action) => {
      const isLoading = false;
      const isFetched = true;
      const greeting = action.payload;
      return {
        ...state, greeting, isFetched, isLoading, error: null,
      };
    });
    builder.addCase(fetchGreeting.rejected, (state, action) => {
      const isLoading = false;
      const hasError = true;
      const error = action.error.message; // Extract the error message from the action
      return {
        ...state,
        isLoading,
        hasError,
        error,
      };
    });
  },
});

export default greetingSlice.reducer;
