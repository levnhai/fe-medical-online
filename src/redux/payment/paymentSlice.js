// const BASE_URL = process.env.REACT_APP_BACKEND_URL;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '~/axios';

// vn pay
export const fetchPayment = createAsyncThunk('paymentSlice/fetchPayment', async ({ formData }) => {
  try {
    const response = await axios.post('/payment/payment-vnpay', {
      amount: formData.price,
      orderId: 123,
    });
    return response.url;
  } catch (error) {
    throw new Error(error.message);
  }
});

// momo
export const fetchCreateUrlMomo = createAsyncThunk('paymentSlice/fetchCreateUrlMomo', async ({ formData }) => {
  try {
    const response = await axios.post('/payment/payment-momo', {
      // amount: formData.price,
      formData,
    });
    return response;
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
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
});

// lịch hẹn của bệnh nhân
export const fetchGetAppointment = createAsyncThunk('paymentSlice/fetchClinicPayment', async (patientId) => {
  try {
    const response = await axios.post('/payment/get-appointment-by-userId', {
      patientId,
    });
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
