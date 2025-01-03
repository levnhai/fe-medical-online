// const BASE_URL = process.env.REACT_APP_BACKEND_URL;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '~/axios';

// vn pay
export const fetchPayment = createAsyncThunk('paymentSlice/fetchPayment', async ({ formData }) => {
  try {
    const response = await axios.post('/payment/clinic-create', {
      formData,
    });
    console.log('check response', response);
    return response.result;
  } catch (error) {
    throw new Error(error.message);
  }
});

// thanh toan tại phòng khám
export const fetchClinicPayment = createAsyncThunk('paymentSlice/fetchClinicPayment', async ({ formData }) => {
  try {
    const response = await axios.post('/payment/clinic-create', {
      formData,
    });
    console.log('check response', response);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
});

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {},
});

export default paymentSlice.reducer;
