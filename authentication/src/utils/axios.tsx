import axios, {  AxiosError, InternalAxiosRequestConfig } from 'axios';

interface User {
  token: {
    access: string;
  };
}

const axiosInstance = axios.create({
  baseURL: 'https://instagram-lite-backend.vercel.app', 
  timeout: 5000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsedUser: User = JSON.parse(user);
        if (parsedUser.token && parsedUser.token.access) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${parsedUser.token.access}`;
        }
      } catch (error) {
        console.error('Failed to parse user data:', error);
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
