import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiKey = '1e9574a5e19cc974a9d6b17775a7657e';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.openweathermap.org/data/2.5/' }),
  endpoints: (builder) => ({
    getWeatherByCity: builder.query({
      query: (city) => `forecast?q=${city}&appid=${apiKey}&units=metric`,
    }),
  }),
});

export const { useGetWeatherByCityQuery } = weatherApi;
