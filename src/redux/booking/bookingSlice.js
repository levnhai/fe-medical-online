import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hospital: { fullName: null, id: null, address: null },
  doctor: { fullName: null, id: null, specialty: null },
  date: null,
  price: null,
  time: { start: null, end: null },
  patientProfile: null,
  confirmed: false,
  paymentStatus: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    updateBooking: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    clearBooking: () => initialState,
  },
  extraReducers: (builder) => {},
});

export const { updateBooking, clearBooking } = bookingSlice.actions;

export default bookingSlice.reducer;
