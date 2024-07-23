import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  isAuthenticated: false,
  authError: null,
  signedUp: false
};

export const signUp = createAsyncThunk('user/signUp', async (credentials, { rejectWithValue }) => {
    try {
      
      const response = await axios.get(`http://localhost:5000/users?email=${credentials.email}`);
      console.log(response)
      
      if (response.length > 0) {
        return rejectWithValue('User already exists');
      }

      const createResponse = await axios.post('http://localhost:5000/users', credentials);
      return createResponse.data;

      
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  });
  

export const login = createAsyncThunk('user/login', async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      const users = response.data;
      const user = users.find(user => user.email === credentials.email && user.password === credentials.password);
      if (!user) {
        return rejectWithValue('User not found');
      }
  
      if (user.password !== credentials.password) {
        return rejectWithValue('Incorrect password');
      }
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });

  

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.authError = null;
      localStorage.setItem('user', JSON.stringify(action.payload));
    });
    builder.addCase(login.rejected, (state, action) => {
      state.authError = action.payload;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.user = action.payload;
      state.signedUp = true;
      state.authError = null;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.authError = action.payload;
    });
  },
});

export const { logout } = userSlice.actions;

export const selectIsAuthenticated = (state) => state.users.isAuthenticated;
export const selectAuthError = (state) => state.users.authError;
export const selectIsAdmin = (state) => state.users.isAdmin;
export const selectIsSignedUp = (state) => state.users.signedUp;

export default userSlice.reducer;
