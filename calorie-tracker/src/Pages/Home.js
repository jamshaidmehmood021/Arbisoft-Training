import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFoods } from '../Features/Food/foodSlice';
import Card from '../Components/Card';
import { Bars } from 'react-loading-icons';

const Home = () => {
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.foods.foods);

  const status = useSelector((state) => state.foods.status);
  const error = useSelector((state) => state.foods.error);

  useEffect(() => {
    dispatch(fetchFoods());
  }, [dispatch]);

  if (status === 'loading') {
    return <Bars />;
  }

  if (status === 'failed') {
    return <p>Error in fetching foods: {error}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-items-center min-h-screen p-4">
      {foods.length > 0 ? (
        foods.map((food) => (
          <Card key={food.id}  food={JSON.stringify(food)} />
        ))
      ) : (
        <h1 className='text-white justify-center'>No food entries found.</h1>
      )}
    </div>
  );
};

export default Home;
