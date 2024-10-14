import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '~/axios';

// check phone number
export const fetchCheckPhone = createAsyncThunk('authSlice/fetchCheckPhone', async (phoneNumber) => {
  try {
    const response = await axios.post('auth/check-phone', { phoneNumber });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
});

// send otp
export const fetchOtpInput = createAsyncThunk('authSlice/fetchOtpInput', async (phoneNumber) => {
  try {
    const response = await axios.post('auth/otp-input', { phoneNumber });
    return response.result;
  } catch (error) {
    throw new Error(error.message);
  }
});

// verify otp
export const fetchVerifyOtp = createAsyncThunk('authSlice/verifyOtp', async ({ phoneNumber, otpInput }) => {
  try {
    const response = await axios.post('auth/verify-otp', { phoneNumber, otp: otpInput });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
});

// create account user
export const fetchCreateUser = createAsyncThunk('authSlice/fetchCreateUser', async (formData) => {
  try {
    const response = await axios.post('auth/create-account', {
      formData,
    });
    return response.result;
  } catch (error) {
    throw new Error(error.message);
  }
});

// login user
export const fetchLoginUser = createAsyncThunk('authSlice/fetchLoginUser', async ({ phoneNumber, password }) => {
  try {
    const response = await axios.post('auth/login', {
      phoneNumber,
      password,
    });
    return response.result;
  } catch (error) {
    throw new Error(error.message);
  }
});

// forgot password
export const fetchForgotPassword = createAsyncThunk('authSlice/fetchForgotPassword', async (formData) => {
  try {
    const { phoneNumber, password, reEnterPassword } = formData;
    const response = await axios.post('auth/forgot-password', {
      phoneNumber,
      password,
      reEnterPassword,
    });
    return response.result;
  } catch (error) {
    throw new Error(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: null,
    phoneNumber: null,
    loading: false,
    error: null,
  },
  reducers: {
    loginUser: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    phoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { loginUser, logoutUser, phoneNumber } = authSlice.actions;

export default authSlice.reducer;
