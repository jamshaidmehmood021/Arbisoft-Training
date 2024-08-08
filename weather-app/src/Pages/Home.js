import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

import WeatherChart from './WeatherChart';
import Results from '../Components/Results';

function Home() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async (event) => {
    event.preventDefault();
    setError('');
    if (city === '') {
      setError('Please enter a city name.');
      return;
    }

    const apiKey = '1e9574a5e19cc974a9d6b17775a7657e'; 
    const apiUrl = 
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (response.ok) {
        setWeatherData(data);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to fetch weather data.');
    }
  };

  const processWeatherData = () => {
    if (!weatherData) return [];
    
    return weatherData.list.map(entry => {
      const date = new Date(entry.dt_txt);
      return {
        date: date.toDateString(), 
        temp: entry.main.temp,
        feelsLike: entry.main.feels_like,
        minimum_temp: entry.main.temp_min,
        maximum_temp: entry.main.temp_max
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

  return (
    <div className="bg-gradient-to-br from-blue-400 to-purple-600 min-h-screen flex flex-col justify-center items-center p-4">
      <div className="bg-white p-8 rounded-md shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-semibold mb-6 text-green-500 text-center">
          Weather Forecast
        </h1>
        <form onSubmit={fetchWeather} className="mb-6 relative">
          <div className="flex flex-col md:flex-row md:items-center">
            <input
              type="text"
              id="city"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-1 px-4 py-2 block w-full md:w-64 h-12 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 placeholder-gray-500"
              placeholder="Enter city name"
            />
            <button type="submit" className="mt-2 md:ml-1 bg-blue-500 text-white py-2 px-4 h-12 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              Get Weather
            </button>
          </div>
        </form>

        {error && <div className="text-red-500 text-center">{error}</div>}
        {displayWeather()}
      </div>
      <div className="mt-8">
        {data.length > 0 && (
            <>
           <h2 className="text-2xl font-semibold mb-4 text-gray-800">5 Days Forecast</h2>
          <div className="mx-auto max-w-full md:max-w-3xl lg:max-w-4xl">
            <WeatherChart data={data}/>
          </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
