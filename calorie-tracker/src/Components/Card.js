import React from 'react';
import PropTypes from 'prop-types';

const Card = React.memo(({ food }) => {
  food = JSON.parse(food);
  const date = new Date(food.dateTime);
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();

  return (
    <div className="place-content-center min-w-full">
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {food.foodName}
        </h1>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Calories: {food.calories}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Date: {formattedDate}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Time: {formattedTime}
        </p>
        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Read more
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </a>
      </div>
    </div>
  );
});


// for eslint correction as it was causing error here after using eslint
Card.displayName = 'Card';

Card.propTypes = {
  food: PropTypes.string.isRequired
};

export default Card;
