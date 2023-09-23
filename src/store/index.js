// store.js
import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './authSlice';

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    // Add other reducers for your application here
  },
});

export default store;
