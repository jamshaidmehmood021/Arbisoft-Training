import { useState } from 'react';
import axios from 'axios';

import { NEUTRIENT_ROUTE } from './apiRoutes';

const REACT_APP_API_ID = 'bc28a3d1'
const REACT_APP_API_KEY = '86d3b74b081e66cb15e650e2713594d0'

const useFetchNutrientCalorie = () => {
  const [calories, setCalories] = useState(null);
  const [error, setError] = useState(null);

  const fetchNutrientCalorie = async (query) => {
    try {
      const response = await axios.post(
        NEUTRIENT_ROUTE,
        { query },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-app-id': REACT_APP_API_ID,
            'x-app-key': REACT_APP_API_KEY,
          }
        }
      );
      setCalories(response.data.foods[0].nf_calories);
    } catch (error) {
      setError(error);
    }
  };

  return { calories, fetchNutrientCalorie, error };
};

export default useFetchNutrientCalorie;
