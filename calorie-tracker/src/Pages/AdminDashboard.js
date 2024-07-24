import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFoods, deleteFoodEntry } from '../Features/Food/foodSlice';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.foods.foods);

  useEffect(() => {
    dispatch(fetchFoods());
  }, [dispatch]);

  const handleDeleteClick = (id) => {
    dispatch(deleteFoodEntry(id));
    toast.error("Food Item Deleted!");
  };

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

export default AdminDashboard;
