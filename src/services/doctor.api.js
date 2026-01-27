import { api } from './api.core';

export const doctorApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDoctors: builder.query({
      query: () => ({
        url: '/doctor/get-all-doctor',
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
      providesTags: ['Doctor'],
    }),
    getDoctorByHospital: builder.query({
      query: ({ hospitalId }) => ({
        url: '/doctor/get-doctor-by-hospital',
        method: 'POST',
        body: { hospitalId },
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
      providesTags: ['Doctor'],
    }),
    getTopDoctor: builder.query({
      query: ({ limit }) => ({
        url: `/doctor/get-top-doctor?limit=${limit}`,
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
      providesTags: ['Doctor'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetDoctorsQuery, useGetDoctorByHospitalQuery, useGetTopDoctorQuery } = doctorApi;
