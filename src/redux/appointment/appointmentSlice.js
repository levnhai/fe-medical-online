import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '~/axios';

// Create contact thunk
export const fetchcreateAppointment = createAsyncThunk('contact/fetchcreateAppointment', async ({ formData }) => {
  try {
    console.log('check form data redux', formData);
    const response = await axios.post('/appointment/create-appointment', { formData });
    console.log('check /appointment/create-appointment', response);
    return response;
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
