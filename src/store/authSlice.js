// authenticationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Import axios

const API_BASE_URL = 'http://localhost:5000/api';

const initialState = {
  user: {
    role:null
  },
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Async thunk for logging in
export const loginUser = createAsyncThunk('auth/loginUser', async (userCredentials, thunkAPI) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, userCredentials);

    if (response.status === 200) {
      const user = response.data;
      return user;
    } else {
      throw new Error('Authentication failed');
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Async thunk for logging out
export const logoutUser = createAsyncThunk('authentication/logoutUser', async (_, thunkAPI) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/logout`);
    
    if (response.status === 200) {
      return null;
    } else {
      throw new Error('Logout failed');
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const authenticationSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default authenticationSlice.reducer;
export const { selectUser, selectIsAuthenticated } = authenticationSlice.actions;
