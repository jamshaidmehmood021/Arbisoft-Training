import { useState, useEffect } from 'react';
import axios from 'axios';

import { SUGGESSION_ROUTE } from './apiRoutes';

const REACT_APP_API_ID = 'bc28a3d1'
const REACT_APP_API_KEY = '86d3b74b081e66cb15e650e2713594d0'

const useFetchSuggestions = (query) => {
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);

  const fetchSuggestions = async () => {
    if (query.length > 1) {
      try {
        const response = await axios.get(SUGGESSION_ROUTE , {
          params: { query },
          headers: {
            'Content-Type': 'application/json',
            'x-app-id': REACT_APP_API_ID,
            'x-app-key': REACT_APP_API_KEY,
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
