import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '~/axios';

export const fetchScheduleByDoctor = createAsyncThunk('scheduleSlice/fetchScheduleByDoctor', async ({ doctorId }) => {
  try {
    const response = await axios.post('schedule/get-schedule-by-doctor', { doctorId });

    return response.result;
  } catch (error) {
    throw new Error(error.message);
  }
});

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
});

export default scheduleSlice.reducer;
