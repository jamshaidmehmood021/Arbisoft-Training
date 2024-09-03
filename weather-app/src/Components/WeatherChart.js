import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const WeatherChart = (props) => {
  const { data } = props;
  const [chartWidth, setChartWidth] = useState(window.innerWidth > 1024 ? 600 : window.innerWidth - 20);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setChartWidth(600);
      } else if (window.innerWidth > 768) {
        setChartWidth(window.innerWidth - 40); 
      } else {
        setChartWidth(window.innerWidth - 20);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const CustomTooltip = ({ payload, label }) => {
    if (payload && payload.length) {
      const { date, temp, feelsLike, minimum_temp, maximum_temp } = payload[0].payload;
      return (
        <div className="bg-white p-2 border rounded">
          <p className="font-bold">{date}</p>
          <p><i className="fas fa-thermometer-half text-red-500"></i>Temperature: {temp}°C</p>
          <p><i className="fas fa-thermometer-three-quarters text-red-500"></i>Feels Like: {feelsLike}°C</p>
          <p><i class="fa-solid fa-temperature-low"></i>Min Temp: {minimum_temp}°C</p>
          <p><i class="fa-solid fa-temperature-high"></i>Max Temp: {maximum_temp}°C</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className='bg-white'>
      <BarChart
        width={chartWidth}
        height={300}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="temp" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default WeatherChart;
