import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Bars } from 'react-loading-icons';

import { useDeleteFoodEntryMutation, useFetchFoodsQuery } from '../Features/Services/foodSliceApi';

const AdminDashboardCustomHookVersion = () => {
  const { data: foods = [], error, isLoading } = useFetchFoodsQuery();
  const [deleteFoodEntry] = useDeleteFoodEntryMutation();
  const [localFoods, setLocalFoods] = useState(foods);

  useEffect(() => {
    setLocalFoods(foods);
  }, [foods]);

  const handleDeleteClick = async (id) => {
    const updatedFoods = localFoods.filter(food => food.id !== id);
    setLocalFoods(updatedFoods);
    try {
      await deleteFoodEntry(id).unwrap();
      toast.error("Food Item Deleted!");
    } catch (error) {
      setLocalFoods(foods);
      toast.error(error);
    }
  };

  if (isLoading) return <div><Bars/></div>;
  if (error) return <div className='text-white'>Error while loading data</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Admin Dashboard</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Food Name</th>
              <th scope="col" className="px-6 py-3">Calories</th>
              <th scope="col" className="px-6 py-3">Date/Time</th>
              <th scope="col" className="px-6 py-3">Username</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <tr key={food.id} className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {food.foodName}
                </td>
                <td className="px-6 py-4">{food.calories}</td>
                <td className="px-6 py-4">{food.dateTime}</td>
                <td className="px-6 py-4">{food.username}</td>
                <td className="px-6 py-4 flex items-center space-x-2">
                  <Link to={`/food/edit/${food.id}`}>
                    <FaEdit
                      className="cursor-pointer text-yellow-500 hover:text-yellow-700"
                      size={24}
                    />
                  </Link>
                  <MdDelete
                    className="cursor-pointer text-red-500 hover:text-red-700"
                    size={24}
                    onClick={() => handleDeleteClick(food.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboardCustomHookVersion;
