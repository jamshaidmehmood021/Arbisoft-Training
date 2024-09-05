import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from 'lib/axios';
import { AuthContext } from 'Context/authContext';  // Import AuthContext

const useAuth = (authType) => {
  const { login } = useContext(AuthContext); 

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');

  const validateInputs = (data) => {
    let isValid = true;

    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!data.password || data.password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (authType === 'signup' && (!data.name || data.name.length < 1)) {
      setNameError(true);
      setNameErrorMessage('Name is required.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = async (data) => {
    if (!validateInputs(data)) return;

    try {
      const url = authType === 'signup' ? '/signup' : '/login';
      const response = await axiosInstance.post(url, data);

      if (response.status === 200) {
        const successMessage = authType === 'signup' 
          ? 'Sign up successful!' 
          : 'Login successful!';
        toast.success(successMessage);

        if (response.data.token) {
          login(response.data.token); 
        }

        return response.data;
      } else {
        toast.error('Authentication failed');
        console.error('Authentication failed');
      }
    } catch (error) {
      toast.error('API error:', error.message);
      console.error('API error:', error.message);
    }
  };

  return {
    emailError,
    emailErrorMessage,
    passwordError,
    passwordErrorMessage,
    nameError,
    nameErrorMessage,
    handleSubmit,
  };
};

export default useAuth;
