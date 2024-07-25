import { useState } from 'react';
import axios from 'axios';

const useFetchNutrientCalorie = () => {
  const [calories, setCalories] = useState(null);
  const [error, setError] = useState(null);

  const fetchNutrientCalorie = async (query) => {
    try {
      const response = await axios.post(
        'https://trackapi.nutritionix.com/v2/natural/nutrients',
        { query },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-app-id': 'bc28a3d1',
            'x-app-key': '86d3b74b081e66cb15e650e2713594d0',
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
