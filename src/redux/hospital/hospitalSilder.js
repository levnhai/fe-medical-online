import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '~/axios';

// get all hospital
export const fetchGetALlHospital = createAsyncThunk('hospital/fetchGetALlHospital', async () => {
  try {
    const response = await axios.get('hospital/get-all-hospital');
    return response.result;
  } catch (error) {
    throw new Error(error.message);
  }
});

// get hospital by type
export const fetchGetHospitalByType = createAsyncThunk('hospital/fetchGetHospitalByType', async ({ type, search }) => {
  try {
    const response = await axios.post('hospital/get-hospital-by-type', { type, search });
    return response.result;
  } catch (error) {
    throw new Error(error.message);
  }
});

// get hospital by type
export const fetchGetCountHospitalByType = createAsyncThunk('hospital/fetchGetCountHospitalByType', async (search) => {
  try {
    const response = await axios.post('hospital/get-count-hospital-by-type', search);
    return response.result;
  } catch (error) {
    throw new Error(error.message);
  }
});

const hospitalSlice = createSlice({
  name: 'hospital',
  initialState: {
    hospitalData: null,
    hospitalDataByType: null,
    countHospitalByType: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    // get hospital data by type
    builder
      .addCase(fetchGetHospitalByType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGetHospitalByType.fulfilled, (state, action) => {
        state.loading = false;
        state.hospitalDataByType = action.payload;
      })
      .addCase(fetchGetHospitalByType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // get count hospital data by type
    builder
      .addCase(fetchGetCountHospitalByType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGetCountHospitalByType.fulfilled, (state, action) => {
        state.loading = false;
        state.countHospitalByType = action.payload;
      })
      .addCase(fetchGetCountHospitalByType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default hospitalSlice.reducer;
