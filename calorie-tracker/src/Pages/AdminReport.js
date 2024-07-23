import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFoods } from '../Features/Food/foodSlice';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const AdminReport = () => {
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.foods.foods);

  useEffect(() => {
    dispatch(fetchFoods());
  }, [dispatch]);

  const currentDate = new Date();
  const last7Days = new Date(currentDate);
  last7Days.setDate(last7Days.getDate() - 7);

  const previous7DaysStart = new Date(last7Days);
  previous7DaysStart.setDate(previous7DaysStart.getDate() - 7);

  const currentWeekEntries = foods.filter(food => new Date(food.dateTime) >= last7Days);
  const previousWeekEntries = foods.filter(food => new Date(food.dateTime) < last7Days && new Date(food.dateTime) >= previous7DaysStart);

  const currentWeekCount = currentWeekEntries.length;
  const previousWeekCount = previousWeekEntries.length;

  const currentWeekCalories = currentWeekEntries.reduce((total, food) => total + (food.calories || 0), 0);
  const previousWeekCalories = previousWeekEntries.reduce((total, food) => total + (food.calories || 0), 0);

  const avgCaloriesPerUser = currentWeekEntries.length ? (currentWeekCalories / currentWeekEntries.length) : 0;

  const data = [
    { name: 'Last 7 Days', Entries: currentWeekCount, Calories: currentWeekCalories },
    { name: 'Previous 7 Days', Entries: previousWeekCount, Calories: previousWeekCalories }
  ];

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-white">Admin Report</h1>
      <div className="mb-6 p-4 bg-gray-900 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-white">Entries Report</h2>
        <p className="text-lg text-white mb-2">Number of entries in the last 7 days: <span className="font-semibold">{currentWeekCount}</span></p>
        <p className="text-lg text-white">Number of entries in the week before last: <span className="font-semibold">{previousWeekCount}</span></p>
      </div>
      <div className="mb-6 p-4 bg-gray-900 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-white">Average Calories Report</h2>
        <p className="text-lg text-white">Average number of calories per user in the last 7 days: <span className="font-semibold">{avgCaloriesPerUser.toFixed(2)}</span></p>
      </div>
      <div className="p-4 bg-gray-900 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-white">Graphical Representation</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />
            <Tooltip />
            <Legend />
            <Bar dataKey="Entries" fill="#8884d8" />
            <Bar dataKey="Calories" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="p-4 bg-gray-900 rounded-lg shadow-md">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 30, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Entries" stroke="#8884d8" />
            <Line type="monotone" dataKey="Calories" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminReport;
