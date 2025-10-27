import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '~/axios';

// Create contact thunk
export const fetchcreateAppointment = createAsyncThunk('appointment/fetchcreateAppointment', async ({ formData }) => {
  try {
    const response = await axios.post('/appointment/create-appointment', { formData });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
});

// Create contact thunk
export const fetchUpdateStatus = createAsyncThunk('appointment/fetchUpdateStatus', async ({ status, id }) => {
  try {
    const response = await axios.put(`/appointment/update-status/${id}`, { status });
    return response.result;
  } catch (error) {
    throw new Error(error.message);
  }
});

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState: {
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {},
});

export default appointmentSlice.reducer;
