import { api } from './api.core';

export const hospitalApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getHospitals: builder.query({
      query: ({ search }) => ({
        url: '/hospital/get-all-hospital',
        params: { search },
      }),
      transformResponse: (response) => {
        return {
          data: response.result.data,
          total: response.result.total,
        };
      },
      providesTags: ['Hospital'],
    }),
    getHospitalsByType: builder.query({
      query: ({ type, search }) => ({
        url: '/hospital/get-hospital-by-type',
        params: { type, search },
      }),
      transformResponse: (response) => {
        return {
          data: response.result.data,
          total: response.result.total,
        };
      },
      providesTags: ['Hospital'],
    }),

    getHospitalCountByType: builder.query({
      query: (search) => ({
        url: '/hospitals/count',
        params: { search },
      }),
    }),
  }),
});

export const { useGetHospitalsByTypeQuery, useGetHospitalCountByTypeQuery } = hospitalApi;
