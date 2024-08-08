import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const foodApi = createApi({
  reducerPath: 'foodApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://66b467039f9169621ea2be8d.mockapi.io/' }),
  tagTypes: ['Food'],
  endpoints: (builder) => ({
    fetchFoods: builder.query({
      query: () => {
        const currUser = JSON.parse(localStorage.getItem('user'));
        return currUser === 'admin@gmail.com' ? 'foods' : `foods?username=${currUser}`;
      },
      providesTags: ['Food'],
    }),
    fetchFoodById: builder.query({
      query: (id) => `foods/${id}`,
      invalidatesTags: ['Food'],
    }),
    addFoodEntry: builder.mutation({
      query: (newEntry) => ({
        url: 'foods',
        method: 'POST',
        body: newEntry,
      }),
      invalidatesTags: ['Food'],
    }),
    updateFoodEntry: builder.mutation({
      query: (updatedEntry) => ({
        url: `foods/${updatedEntry.id}`,
        method: 'PUT',
        body: updatedEntry,
      }),
      invalidatesTags: ['Food'],
    }),
    deleteFoodEntry: builder.mutation({
      query: (id) => ({
        url: `foods/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Food'],
    }),
  }),
});

export const {
  useFetchFoodsQuery,
  useFetchFoodByIdQuery,
  useAddFoodEntryMutation,
  useUpdateFoodEntryMutation,
  useDeleteFoodEntryMutation,
} = foodApi;
