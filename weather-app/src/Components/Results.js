import React from 'react';

const Results = ({ today }) => {

    return (
      
        <div id="weather-info" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <div className="border rounded-md p-4 bg-yellow-200 hover:bg-yellow-300 transition-colors duration-300 ease-in-out">
                <span className="text-gray-900 text-sm md:text-base">
                    <i className="fas fa-thermometer-half text-red-500"></i> Temperature:
                </span>
                <span className="text-gray-800 font-medium text-lg">{today.main.temp}°C</span>
            </div>
            <div className="border rounded-md p-4 bg-blue-200 hover:bg-blue-300 transition-colors duration-300 ease-in-out">
                <span className="text-gray-900 text-sm md:text-base">
                    <i className="fas fa-cloud-sun text-blue-500"></i> Weather:
                </span>
                <span className="text-gray-800 font-medium text-lg">{today.weather[0].description}</span>
            </div>
            <div className="border rounded-md p-4 bg-green-200 hover:bg-green-300 transition-colors duration-300 ease-in-out">
                <span className="text-gray-900 text-sm md:text-base">
                    <i className="fas fa-tint text-green-500"></i> Humidity:
                </span>
                <span className="text-gray-800 font-medium text-lg">{today.main.humidity}%</span>
            </div>
            <div className="border rounded-md p-4 bg-purple-200 hover:bg-purple-300 transition-colors duration-300 ease-in-out">
                <span className="text-gray-900 text-sm md:text-base">
                    <i className="fas fa-wind text-yellow-500"></i> Wind Speed:
                </span>
                <span className="text-gray-800 font-medium text-lg">{today.wind.speed} km/h</span>
            </div>
            <div className="border rounded-md p-4 bg-red-200 hover:bg-red-300 transition-colors duration-300 ease-in-out">
                <span className="text-gray-900 text-sm md:text-base">
                    <i className="fas fa-thermometer-three-quarters text-red-500"></i> Real Feel:
                </span>
                <span className="text-gray-800 font-medium text-lg">{today.main.feels_like}°C</span>
            </div>
            <div className="border rounded-md p-4 bg-pink-200 hover:bg-pink-300 transition-colors duration-300 ease-in-out">
                <span className="text-gray-900 text-sm md:text-base">
                    <i className="fas fa-eye text-indigo-500"></i> Visibility:
                </span>
                <span className="text-gray-800 font-medium text-lg">{today.visibility / 1000} km</span>
            </div>
        </div>
    );
}

export default Results;
