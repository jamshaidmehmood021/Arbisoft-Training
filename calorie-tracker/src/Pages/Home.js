import React, { useMemo } from 'react';
import { useFetchFoodsQuery } from '../Features/Services/foodSliceApi';
import { Bars } from 'react-loading-icons';
import Card from '../Components/Card';

const Home = () => {
  const { data: foods = [], error, isLoading } = useFetchFoodsQuery();

  const groupFoodsByDate = (foods) => {
    const grouped = foods.reduce((acc, food) => {
      const date = new Date(food.dateTime).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = { totalCalories: 0, foods: [] };
      }
      acc[date].totalCalories += food.calories;
      acc[date].foods.push(food);
      return acc;
    }, {});
    return grouped;
  };

  const groupedFoods = useMemo(() => {
    return groupFoodsByDate(foods);
  }, [foods]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Bars />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600 dark:text-red-400">Error in fetching foods: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      {Object.keys(groupedFoods).length > 0 ? (
        Object.keys(groupedFoods).map((date) => (
          <div key={date} className="mb-6 w-full p-4 bg-white rounded-lg shadow dark:bg-gray-800">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
              {date}
            </h2>
            <p className="mb-4 font-normal text-white">
              Total Calories: {groupedFoods[date].totalCalories.toFixed(2)}
              <b className={groupedFoods[date].totalCalories > 2.100 ? 'text-red-600' : 'text-white'}>
                {groupedFoods[date].totalCalories > 2.100 ? ' (Exceeds daily limit)' : ` Behind your daily limit by ${2100 - groupedFoods[date].totalCalories} calories`}
              </b>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedFoods[date].foods.map((food) => (
                <Card key={food.id} food={JSON.stringify(food)} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">No food entries found.</h1>
        </div>
      )}
    </div>
  );
};

export default Home;
