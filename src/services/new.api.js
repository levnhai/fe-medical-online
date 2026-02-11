import { api } from '~/services/api.core';

export const newApi = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      getNews: builder.query({
        query: () => ({ url: 'news/get-all', method: 'GET' }),
        transformResponse: (response) => {
          if (!response?.result?.status) {
            throw new Error(response?.result?.message);
          }

          return {
            data: response.result,
            total: response.result?.total ? response.result.total : 0,
          };
        },
        providesTags: ['New'],
        keepUnusedDataFor: 3000000, // cache time in seconds
      }),

      getNewsById: builder.query({
        query: (id) => ({ url: `news/get-news-by-id/${id}`, method: 'GET' }),
        transformResponse: (response) => {
          if (!response?.result?.status) {
            throw new Error(response?.result?.message);
          }

          return {
            data: response.result,
            total: response.result?.total ? response.result.total : 0,
          };
        },
        providesTags: ['New'],
        keepUnusedDataFor: 3000000, // cache time in seconds
      }),

      getNewsService: builder.query({
        query: () => ({ url: 'news/category/tin-dich-vu', method: 'GET' }),
        transformResponse: (response) => {
          if (!response?.result?.status) {
            throw new Error(response?.result?.message);
          }

          return {
            data: response.result,
            total: response.result?.total ? response.result.total : 0,
          };
        },
        providesTags: ['New'],
        keepUnusedDataFor: 3000000, // cache time in seconds
      }),

      getNewsMedical: builder.query({
        query: () => ({ url: 'news/category/tin-y-te', method: 'GET' }),
        transformResponse: (response) => {
          if (!response?.result?.status) {
            throw new Error(response?.result?.message);
          }

          return {
            data: response.result,
            total: response.result?.total ? response.result.total : 0,
          };
        },
        providesTags: ['New'],
        keepUnusedDataFor: 3000000, // cache time in seconds
      }),

      getNewsKnowlage: builder.query({
        query: () => ({ url: 'news/category/thuong-thuc-y-te', method: 'GET' }),
        transformResponse: (response) => {
          if (!response?.result?.status) {
            throw new Error(response?.result?.message);
          }

          return {
            data: response.result,
            total: response.result?.total ? response.result.total : 0,
          };
        },
        providesTags: ['New'],
        keepUnusedDataFor: 3000000, // cache time in seconds
      }),

      getRelateNews: builder.query({
        query: (id) => ({ url: `news/related-news/${id}`, method: 'GET' }),
        transformResponse: (response) => {
          if (!response?.result?.status) {
            throw new Error(response?.result?.message);
          }

          return {
            data: response.result,
            total: response.result?.total || 0,
          };
        },
        providesTags: ['New'],
        keepUnusedDataFor: 3000000, // cache time in seconds
      }),

      getMostViewNews: builder.query({
        query: () => ({ url: 'news/most-viewed', method: 'GET' }),
        transformResponse: (response) => {
          if (!response?.result?.status) {
            throw new Error(response?.result?.message);
          }

          return {
            data: response.result,
            total: response.result?.total || 0,
          };
        },
        providesTags: ['New'],
        keepUnusedDataFor: 3000000, // cache time in seconds
      }),
    };
  },
});

export const {
  useGetNewsQuery,
  useGetNewsByIdQuery,
  useGetNewsServiceQuery,
  useGetNewsMedicalQuery,
  useGetNewsKnowlageQuery,
  useGetRelateNewsQuery,
  useGetMostViewNewsQuery,
} = newApi;
