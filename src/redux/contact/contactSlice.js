import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '~/axios';

// Create contact thunk
export const fetchcreateContact = createAsyncThunk(
    'contact/fetchcreateContact',
    async (contactData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`contact/create`, contactData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
const contactSlice = createSlice({
    name: 'contact',
    initialState: {
        loading: false,
        error: null,
        success: false,
        message: '',
    },
    reducers: {
        resetContactState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchcreateContact.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchcreateContact.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(fetchcreateContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Có lỗi xảy ra';
            });
    },
});

export const { resetContactState } = contactSlice.actions;
export default contactSlice.reducer;