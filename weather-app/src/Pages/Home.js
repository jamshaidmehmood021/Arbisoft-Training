import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCity } from '../Slice/citySlice';
import { useGetWeatherByCityQuery } from '../Features/Services/weatherApi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import '@fortawesome/fontawesome-free/css/all.min.css';

import WeatherChart from '../Components/WeatherChart';
import Results from '../Components/Results';
import { z } from 'zod';

const citySchema = z.object({
  city: z.string().min(1, { message: "Please enter a city name." }),
});

function Home() {
  const dispatch = useDispatch();
  const city = useSelector((state) => state.city);

  const { register, handleSubmit, formState: { errors, isSubmitted } } = useForm({
    resolver: zodResolver(citySchema),
    mode: "onSubmit", // Validation will be triggered on submit only
  });

  const { data: weatherData, error: fetchError, isLoading } = useGetWeatherByCityQuery(city, {
    skip: city === '',
  });

  const processWeatherData = () => {
    if (!weatherData) return [];
    return weatherData.list.map(entry => {
      const date = new Date(entry.dt_txt);
      return {
        date: date.toDateString(),
        temp: entry.main.temp,
        feelsLike: entry.main.feels_like,
        minimum_temp: entry.main.temp_min,
        maximum_temp: entry.main.temp_max,
      };
    });
  };

  const data = processWeatherData();

  const displayWeather = () => {
    if (!weatherData) return null;
    const today = weatherData.list[0];
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Today's Forecast</h2>
        <Results today={today} />
      </div>
    );
  };

  const onSubmit = (formData) => {
    dispatch(setCity(formData.city));
  };

  return (
    <div className="bg-gradient-to-br from-blue-400 to-purple-600 min-h-screen flex flex-col justify-center items-center p-4">
      <div className="bg-white p-8 rounded-md shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-semibold mb-6 text-green-500 text-center">
          Weather Forecast
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-6 relative">
          <div className="flex flex-col md:flex-row md:items-center">
            <input
              type="text"
              {...register('city')}
              className="mt-1 px-4 py-2 block w-full md:w-64 h-12 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 placeholder-gray-500"
              placeholder="Enter city name"
            />
            <button type="submit" className="mt-2 md:ml-1 bg-blue-500 text-white py-2 px-4 h-12 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              Get Weather
            </button>
          </div>
          {isSubmitted && errors.city && (
            <div className="text-red-500 text-center">{errors.city.message}</div>
          )}
        </form>

        {fetchError && (
          <div className="text-red-500 text-center">
            {fetchError.status === 404
              ? 'City not found. Please check the city name and try again.'
              : fetchError.message}
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center items-center">
            <i className="fas fa-spinner fa-spin text-4xl text-blue-500"></i>
          </div>
        )}

        {!isLoading && weatherData && displayWeather()}
      </div>
      <div className="mt-8">
        {data.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">5 Days Forecast</h2>
            <div className="mx-auto max-w-full md:max-w-3xl lg:max-w-4xl">
              <WeatherChart data={data} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
