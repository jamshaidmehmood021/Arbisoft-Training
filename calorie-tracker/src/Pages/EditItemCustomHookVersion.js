import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFoodEntry, selectFoodById, STATUS } from '../Features/Food/foodSlice';
import { useParams, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import useFetchSuggestions from '../Hooks/useFetchSugession';
import useFetchNutrientCalorie from '../Hooks/useFetchNutrientCalorie';

const EditItemCustomHookVersion = () => {
  const { foodId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const food = useSelector((state) => selectFoodById(state, Number(foodId)));
  const [foodName, setFoodName] = useState(food?.foodName || '');
  const [dateTime, setDateTime] = useState(food?.dateTime || '');
  const [selectedFood, setSelectedFood] = useState('');
  const [requestStatus, setRequestStatus] = useState(STATUS.IDLE);
  const { suggestions } = useFetchSuggestions(foodName);
  const { calories, fetchNutrientCalorie } = useFetchNutrientCalorie();

  useEffect(() => {
    if (food) {
      setFoodName(food.foodName);
      setDateTime(food.dateTime);
    }
  }, [food]);

  const handleSuggestionSelect = async (e) => {
    const selected = e.target.value;
    setSelectedFood(selected);
    const selectedSuggestion = suggestions.find(suggestion => suggestion.food_name === selected);
    if (selectedSuggestion) {
      setFoodName(selectedSuggestion.food_name);
      await fetchNutrientCalorie(selectedSuggestion.food_name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (foodName && calories && dateTime && requestStatus === STATUS.IDLE) {
      try {
        setRequestStatus(STATUS.PENDING);
        await dispatch(updateFoodEntry({ id: foodId, foodName, calories, dateTime })).unwrap();
        toast.success("Food Item Edited!");
        navigate('/home');
      } catch (err) {
        console.error('Failed to save the food entry', err);
      } finally {
        setRequestStatus(STATUS.IDLE);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Edit Food Entry</h2>
        <div className="mb-5 relative">
          <label htmlFor="food-name" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Food/Product Name</label>
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
              className="absolute z-10 w-full bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 mt-2"
              size={suggestions.length > 5 ? 5 : suggestions.length}
              onChange={handleSuggestionSelect}
              value={selectedFood}
            >
              <option value="" disabled>Select a suggestion</option>
              {suggestions.map((food, index) => (
                <option key={index} value={food.food_name}>{food.food_name}</option>
              ))}
            </select>
          )}
        </div>
        <div className="mb-5">
          <label htmlFor="date-time" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Date/Time</label>
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
          Save Changes
        </button>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default EditItemCustomHookVersion;
