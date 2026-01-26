import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '~/axios';

export const fetchNewsById = createAsyncThunk('newsSlice/fetchNewsById', async (postId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`news/get-news-by-id/${postId}`);
    return response.result.news;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchRelatedNews = createAsyncThunk('newsSlice/fetchRelatedNews', async (postId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`news/related-news/${postId}`);
    return response.result.relatedNews;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchMostViewedNews = createAsyncThunk('newsSlice/fetchMostViewedNews', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('news/most-viewed');
    return response.result.mostViewedNews;
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
});

const newsSlice = createSlice({
  name: 'new',
  initialState: {
    newData: null,
    relatedNews: [],
    mostViewedNews: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsById.pending, (state) => {
        state.loading = true;
        state.newData = null;
      })
      .addCase(fetchNewsById.fulfilled, (state, action) => {
        state.loading = false;
        state.newData = action.payload;
      })
      .addCase(fetchNewsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchRelatedNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRelatedNews.fulfilled, (state, action) => {
        state.loading = false;
        state.relatedNews = action.payload;
      })
      .addCase(fetchRelatedNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMostViewedNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMostViewedNews.fulfilled, (state, action) => {
        state.loading = false;
        state.mostViewedNews = action.payload;
        state.error = null;
      })
      .addCase(fetchMostViewedNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default newsSlice.reducer;
