import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import { addFoodEntry } from '../Features/Food/foodSlice';
import { STATUS, selectError } from '../Features/Food/foodSlice';


const DAILY_CALORIE_LIMIT = 2.100;

const AddItem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedFood, setSelectedFood] = useState('');

  const reqStatus = useSelector((state)=> state.foods.status);
  const error = useSelector(selectError);
  
  const username = JSON.parse(localStorage.getItem('user'));
  const foods = useSelector((state) => state.foods.foods);
  

  const fetchSuggestions = async (query) => {
    try {
      const response = await axios.get(`https://trackapi.nutritionix.com/v2/search/instant`, {
        params: { query },
        headers: {
          'Content-Type': 'application/json',
          'x-app-id': 'bc28a3d1', 
          'x-app-key': '86d3b74b081e66cb15e650e2713594d0' 
        }
      });
      setSuggestions(response.data.common);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  useEffect(() => {
    if (foodName.length > 1) {
      fetchSuggestions(foodName);
      setSuggestions([]);
    }
  }, [foodName]);

  const fetchNutrientCalorie = async (query) => {
    try {
      const response = await axios.post(
        'https://trackapi.nutritionix.com/v2/natural/nutrients',
        { query },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-app-id': 'bc28a3d1',
            'x-app-key': '86d3b74b081e66cb15e650e2713594d0'
          }
        }
      );
      return response.data.foods[0].nf_calories; 
  
    } catch (error) {
      console.error('Error fetching nutrients:', error.response ? error.response.data : error.message);
    }
  };

  const handleSuggestionSelect = async (e) => {
    const selected = e.target.value;
    setSelectedFood(selected);
    const food = suggestions.find(suggestion => suggestion.food_name === selected);
    if (food) {
      setFoodName(food.food_name);
      const calorie = await fetchNutrientCalorie(food.food_name);
      setCalories(calorie);
    }
    setSuggestions([]);
  };

  const checkDailyCalorieLimit = () => {
    const today = new Date().toISOString().split('T')[0];
    
    const userFoodsForToday = foods.filter(food => 
      food.username === username && food.dateTime.startsWith(today)
    );
  
    const dailyTotal = userFoodsForToday.reduce((total, food) => 
      total + food.calories, 0
    );
  
    const totalCalories = dailyTotal + (parseFloat(calories) || 0);
  
    return totalCalories > DAILY_CALORIE_LIMIT;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();


    const newEntry = {
      foodName,
      calories,
      dateTime,
      username
    };

    dispatch(addFoodEntry(newEntry));
    if (checkDailyCalorieLimit() && reqStatus === STATUS.SUCCESS) {
      toast.warning(`You have exceed your daily limit of ${DAILY_CALORIE_LIMIT} calories for ${new Date(dateTime).toLocaleDateString()}`);
      toast.success(`But still Item added successfully`);
      navigate('/home');
    }
    else if (reqStatus === STATUS.SUCCESS)
    {
      toast.success(`You have done preety good daily limit is still left`);
      toast.success(`Item added successfully`);
    }
    else{
      toast.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Add Food Entry</h2>

        <div className="mb-5 relative">
          <label
            htmlFor="food-name"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Food/Product Name
          </label>
          <input
            type="text"
            id="food-name"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 dark:text-gray-400 placeholder-gray-700 dark:placeholder-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500"
            placeholder="e.g., Milk, Banana, Hamburger"
            required
          />
          {suggestions.length > 0 && (
            <select
              className="absolute w-full bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 mt-2 mb-64"
              size={suggestions.length > 5 ? 5 : suggestions.length}
              onChange={handleSuggestionSelect}
              value={selectedFood}
              style={{ marginBottom: '3rem' }} // Add margin below the select dropdown
            >
              <option value="" disabled>Select a suggestion</option>
              {suggestions.map((food, index) => (
                <option key={index} value={food.food_name}>
                  {food.food_name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="mb-5" style={{ marginTop: suggestions.length > 0 ? '4rem' : '0' }}>
          <label
            htmlFor="date-time"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Date/Time
          </label>
          <input
            type="datetime-local"
            id="date-time"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 dark:text-gray-400 placeholder-gray-700 dark:placeholder-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddItem;
