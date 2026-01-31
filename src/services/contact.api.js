import { api } from './api.core';

export const contactApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createContact: builder.mutation({
      query: (contactData) => ({
        url: 'contact/create',
        method: 'POST',
        body: contactData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreateContactMutation } = contactApi;
