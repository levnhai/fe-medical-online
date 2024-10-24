// const BASE_URL = process.env.REACT_APP_BACKEND_URL;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '~/axios';

// get all news
export const fetchGetAllNew = createAsyncThunk('newsSlice/fetchGetAllNew', async () => {
  try {
    const response = await axios.get('news/get-all');
    return response.result;
  } catch (error) {
    throw new Error(error.message);
  }
});
// get service news
export const fetchServiceNews = createAsyncThunk('newsSlice/fetchServiceNews', async () => {
  try {
    const response = await axios.get('news/category/tin-dich-vu');
    return response.result;
  } catch (error) {
    throw new Error(error.message);
  }
});
// get medical news
export const fetchMedicalNews = createAsyncThunk('newsSlice/fetchMedicalNews', async () => {
  try {
    const response = await axios.get('news/category/tin-y-te');
    return response.result;
  } catch (error) {
    throw new Error(error.message);
  }
});

// get practical medical knowledge
export const fetchKnowlageNews = createAsyncThunk('newsSlice/fetchKnowlageNews', async () => {
  try {
    const response = await axios.get('news/category/thuong-thuc-y-te');
    return response.result;
  } catch (error) {
    throw new Error(error.message);
  }
});

  const newsSlice = createSlice({
    name: 'new',
    initialState: {
      newData: null,
      loading: false,
      error: null,
    },
    reducers: {},
  extraReducers: (builder) => {
    // get all news
    builder
      .addCase(fetchGetAllNew.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGetAllNew.fulfilled, (state, action) => {
        state.loading = false;
        state.newData = action.payload;
      })
      .addCase(fetchGetAllNew.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // get service news
      .addCase(fetchServiceNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceNews.fulfilled, (state, action) => {
        state.loading = false;
        state.newData = action.payload;
      })
      .addCase(fetchServiceNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // get medical news
      .addCase(fetchMedicalNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMedicalNews.fulfilled, (state, action) => {
        state.loading = false;
        state.newData = action.payload;
      })
      .addCase(fetchMedicalNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // get medical knowledge
      .addCase(fetchKnowlageNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKnowlageNews.fulfilled, (state, action) => {
        state.loading = false;
        state.newData = action.payload;
      })
      .addCase(fetchKnowlageNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
  });

export default newsSlice.reducer;

// // send otp
// export const getMainNews = createAsyncThunk('newsSlice/getMainNews', async () => {
//   try {
//     const response = await axios.get('news?_sort=createdAt:DESC&_limit=3');
//     return response.json();;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// });

// //allnews
// export const newsSlice = {
//   // async getMainNews() {
//   //   // const response = await fetch(`${BASE_URL}/news?_sort=createdAt:DESC&_limit=3`);
//   //   const response = await axios.post('auth/otp-input', { phoneNumber });


//   //   return await response.json();
//   // },

//   async getSideNews() {
//     const response = await fetch(`${BASE_URL}/news?_sort=createdAt:DESC&_start=3&_limit=10`);
//     return await response.json();
//   },

//   async getServiceNews() {
//     const response = await fetch(`${BASE_URL}/news/category/tin-dich-vu`);
//     return await response.json();
//   },

//   async getMedicalNews() {
//     const response = await fetch(`${BASE_URL}/news/category/tin-y-te`);
//     return await response.json();
//   },

//   async getCommonMedicalNews() {
//     const response = await fetch(`${BASE_URL}/news/category/thuong-thuc-y-te`);
//     return await response.json();
//   },

//   async getAllNews() {
//     try {
//       const [mainNews, sideNews, serviceNews, medicalNews, commonMedicalNews] = await Promise.all([
//         this.getMainNews(),
//         this.getSideNews(),
//         this.getServiceNews(), 
//         this.getMedicalNews(),
//         this.getCommonMedicalNews()
//       ]);

//       return {
//         mainNews,
//         sideNews,
//         serviceNews,
//         medicalNews,
//         commonMedicalNews
//       };
//     } catch (error) {
//       console.error('Error fetching all news:', error);
//       throw error;
//     }
//   }
// };
// //service
// export const newsService = {
//   async getMainNews() {
//     const response = await fetch(`${BASE_URL}/news/category/tin-dich-vu?_sort=createdAt:DESC&_limit=3`);
//     return await response.json();
//   },

//   async getSideNews() {
//     const response = await fetch(`${BASE_URL}/news/category/tin-dich-vu?_sort=createdAt:DESC&_start=3&_limit=10`);
//     return await response.json();
//   },

//   async getServiceNews() {
//     const response = await fetch(`${BASE_URL}/news/category/tin-dich-vu`);
//     return await response.json();
//   },

//   async getAllNews() {
//     try {
//       const [mainNews, sideNews, serviceNews] = await Promise.all([
//         this.getMainNews(),
//         this.getSideNews(),
//         this.getServiceNews(), 
//       ]);

//       return {
//         mainNews,
//         sideNews,
//         serviceNews,
//       };
//     } catch (error) {
//       console.error('Error fetching all news:', error);
//       throw error;
//     }
//   }
// };
// //medical
// export const newsMedical = {
//     async getMainNews() {
//       const response = await fetch(`${BASE_URL}/news/category/tin-y-te?_sort=createdAt:DESC&_limit=3`);
//       return await response.json();
//     },
  
//     async getSideNews() {
//       const response = await fetch(`${BASE_URL}/news/category/tin-y-te?_sort=createdAt:DESC&_start=3&_limit=10`);
//       return await response.json();
//     },
  
//     async getServiceNews() {
//       const response = await fetch(`${BASE_URL}/news/category/tin-y-te`);
//       return await response.json();
//     },
  
//     async getAllNews() {
//       try {
//         const [mainNews, sideNews, serviceNews] = await Promise.all([
//           this.getMainNews(),
//           this.getSideNews(),
//           this.getServiceNews(), 
//         ]);
  
//         return {
//           mainNews,
//           sideNews,
//           serviceNews,
//         };
//       } catch (error) {
//         console.error('Error fetching all news:', error);
//         throw error;
//       }
//     }
//   };
// //knowlage
// export const newsKnowlage = {
//     async getMainNews() {
//       const response = await fetch(`${BASE_URL}/news/category/thuong-thuc-y-te?_sort=createdAt:DESC&_limit=3`);
//       return await response.json();
//     },
  
//     async getSideNews() {
//       const response = await fetch(`${BASE_URL}/news/category/thuong-thuc-y-te?_sort=createdAt:DESC&_start=3&_limit=10`);
//       return await response.json();
//     },
  
//     async getServiceNews() {
//       const response = await fetch(`${BASE_URL}/news/category/thuong-thuc-y-te`);
//       return await response.json();
//     },
  
//     async getAllNews() {
//       try {
//         const [mainNews, sideNews, serviceNews] = await Promise.all([
//           this.getMainNews(),
//           this.getSideNews(),
//           this.getServiceNews(), 
//         ]);
  
//         return {
//           mainNews,
//           sideNews,
//           serviceNews,
//         };
//       } catch (error) {
//         console.error('Error fetching all news:', error);
//         throw error;
//       }
//     }
//   };
