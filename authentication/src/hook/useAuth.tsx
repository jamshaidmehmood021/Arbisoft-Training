import { useState } from 'react';
import axiosInstance from '../utils/axios';

// Define the type for the API response
interface ApiResponse<T> {
  data: T;
  error?: string;
}

// Define the type for the API call
interface ApiCall {
  (endpoint: string, data?: Record<string, any>): Promise<ApiResponse<any> | null>;
}

const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const apiCall: ApiCall = async (endpoint, data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post(endpoint, data);
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setError(message || 'An error occurred.');
      return err;
    }
  };

  return { apiCall, loading, error };
};

export default useAuth;
