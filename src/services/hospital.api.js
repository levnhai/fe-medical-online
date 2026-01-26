import { api } from './api.core';

export const hospitalApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getHospitals: builder.query({
      query: () => ({
        url: 'hospital/get-all-hospital',
        method: 'GET',
      }),
      transformResponse: (response) => {
        if (!response?.result?.status) {
          throw new Error(response?.result?.message);
        }
        return {
          data: response.result.data,
          total: response.result.total,
        };
      },
      providesTags: ['Hospital'],
    }),
    getHospitalsByType: builder.query({
      query: ({ type, search }) => ({
        url: 'hospital/get-hospital-by-type',
        method: 'POST',
        body: { type, search },
      }),
      transformResponse: (response) => {
        if (!response?.result?.status) {
          throw new Error(response?.result?.message);
        }
        return {
          data: response.result.data,
          total: response.result.total,
        };
      },
      providesTags: ['Hospital'],
    }),
    getCountHospitalsByType: builder.query({
      query: ({ search }) => ({
        url: 'hospital/get-count-hospital-by-type',
        method: 'POST',
        body: { search },
      }),
      transformResponse: (response) => {
        if (!response?.result?.status) {
          throw new Error(response?.result?.message);
        }
        return {
          data: response.result,
        };
      },
      providesTags: ['Hospital'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetHospitalsQuery, useGetHospitalsByTypeQuery, useGetCountHospitalsByTypeQuery } = hospitalApi;
