import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '~/axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

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

// google login
export const googleLogin = createAsyncThunk('authSlice/googleLogin', async (token) => {
  try {
    const response = await axios.post(`${API_URL}/google-login`, { token });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'An error occurred');
  }
});

//fb login
export const facebookLogin = createAsyncThunk('authSlice/facebookLogin', async (accessToken) => {
  try {
    const response = await axios.post(`${API_URL}/facebook-login`, { accessToken });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'An error occurred');
  }
});

// get record user
export const fetchRecordUser = createAsyncThunk('authSlice/fetchRecordUser', async (recordId) => {
  try {
    const response = await axios.post('record/get-record-by-id', recordId);
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
    redirectPath: null,
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
      state.phoneNumber = null;
    },
    phoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setRedirectPath: (state, action) => {
      state.redirectPath = action.payload;
    },

    clearRedirectPath: (state) => {
      state.redirectPath = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload.data;
        // Lưu token vào localStorage hoặc nơi khác nếu cần
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(facebookLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(facebookLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload.data;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(facebookLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { loginUser, logoutUser, phoneNumber, setRedirectPath, clearRedirectPath } = authSlice.actions;

export default authSlice.reducer;
