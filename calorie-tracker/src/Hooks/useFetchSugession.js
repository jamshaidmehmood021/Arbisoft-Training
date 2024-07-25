import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchSuggestions = (query) => {
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);

  const fetchSuggestions = async () => {
    if (query.length > 1) {
      try {
        const response = await axios.get('https://trackapi.nutritionix.com/v2/search/instant', {
          params: { query },
          headers: {
            'Content-Type': 'application/json',
            'x-app-id': 'bc28a3d1',
            'x-app-key': '86d3b74b081e66cb15e650e2713594d0',
          },
        });
        setSuggestions(response.data.common);
      } catch (error) {
        setError(error);
      }
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, [query]);

  return { suggestions, error };
};

export default useFetchSuggestions;
