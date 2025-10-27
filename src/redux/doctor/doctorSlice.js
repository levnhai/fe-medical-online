import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '~/axios';

export const fetchTopDoctors = createAsyncThunk('doctor/fetchTopDoctors', async (limit) => {
  try {
    const response = await axios.get(`/doctor/get-top-doctor?limit=${limit}`);
    return response?.result?.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const fetchAllDoctors = createAsyncThunk('doctor/fetchAllDoctors', async () => {
  try {
    const response = await axios.get('/doctor/get-all-doctor');
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const fetchALlDataRangeTime = createAsyncThunk('doctor/fetchALlDataRangeTime', async () => {
  try {
    const response = await axios.get('/api/get-all-code-services?type=TIME');
    return response.allCodeData.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const fetchALlDataPrice = createAsyncThunk('doctor/fetchALlDataPrice', async () => {
  try {
    const response = await axios.get('/api/get-all-code-services?type=PRICE');
    return response.allCodeData.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const fetchALlDataPayment = createAsyncThunk('doctor/fetchALlDataPayment', async () => {
  try {
    const response = await axios.get('/api/get-all-code-services?type=PAYMENT');
    return response.allCodeData.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const fetchSaveDocterInfor = createAsyncThunk('doctor/fetchSaveDocterInfor', async (data) => {
  try {
    const response = await axios.post('/api/save-infor-docter', data);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});
export const fetchDoctorbyHospitalAndDoctor = createAsyncThunk(
  'docter/fetchDoctorbyHospitalAndDoctor',
  async (data) => {
    try {
      const response = await axios.post('/doctor/get-doctor-by-hospital-doctor', data);
      return response.result;
    } catch (error) {
      throw new Error(error.message);
    }
  },
);

export const fetchDoctorbyHospital = createAsyncThunk('docter/fetchDoctorbyHospital', async ({ hospitalId }) => {
  try {
    const response = await axios.post('/doctor/get-doctor-by-hospital', { hospitalId });
    return response.result;
  } catch (error) {
    throw new Error(error.message);
  }
});

const doctorSlice = createSlice({
  name: 'doctor',
  initialState: {
    docterData: null,
    topDoctors: [],
    doctor: [],
    RangeTimeData: null,
    priceData: null,
    paymentData: null,
    docterInforData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // get top docter
    builder
      .addCase(fetchTopDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.topDoctors = action.payload;
      })
      .addCase(fetchTopDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // get all docter
    builder
      .addCase(fetchAllDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.docterData = action.payload;
      })
      .addCase(fetchAllDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // get all data rangeTime
    builder
      .addCase(fetchALlDataRangeTime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchALlDataRangeTime.fulfilled, (state, action) => {
        state.loading = false;
        state.RangeTimeData = action.payload;
      })
      .addCase(fetchALlDataRangeTime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // get all data price
    builder
      .addCase(fetchALlDataPrice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchALlDataPrice.fulfilled, (state, action) => {
        state.loading = false;
        state.priceData = action.payload;
      })
      .addCase(fetchALlDataPrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // get all data payment
    builder
      .addCase(fetchALlDataPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchALlDataPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentData = action.payload;
      })
      .addCase(fetchALlDataPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // save docter infor
    builder
      .addCase(fetchSaveDocterInfor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSaveDocterInfor.fulfilled, (state, action) => {
        state.loading = false;
        state.docterInforData = action.payload;
      })
      .addCase(fetchSaveDocterInfor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // get docter by hospital and docter
    builder
      .addCase(fetchDoctorbyHospitalAndDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorbyHospitalAndDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.doctor = action.payload;
      })
      .addCase(fetchDoctorbyHospitalAndDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default doctorSlice.reducer;
