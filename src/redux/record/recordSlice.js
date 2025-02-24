// const BASE_URL = process.env.REACT_APP_BACKEND_URL;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '~/axios';

export const fetchCreateRecord = createAsyncThunk('record/fetchCreateRecord', async (formData) => {
  try {
    const response = await axios.post('/record/create-record', { formData });

    console.log('check response docter', response);
    return response.result;
  } catch (error) {
    throw new Error(error.message);
  }
});

const recordSlice = createSlice({
  name: 'record',
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {},
});

export default recordSlice.reducer;

