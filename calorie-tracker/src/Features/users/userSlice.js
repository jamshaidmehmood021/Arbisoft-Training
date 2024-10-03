import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  isAuthenticated: false,
  authError: null,
  signedUp: false
};

// eslint-disable-next-line no-undef
const url = 'https://66b467039f9169621ea2be8d.mockapi.io/users';

export const signUp = createAsyncThunk('user/signUp', async (credentials, { rejectWithValue }) => {
  try {
    // Fetch all users
    const response = await axios.get(url);
    const users = response.data;
    const userExists = users.some(user => user.email === credentials.email);

    if (userExists) {
      return rejectWithValue('User already exists');
    }

    const createResponse = await axios.post(url, credentials);
    return createResponse.data;

  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const login = createAsyncThunk('user/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}?email=${credentials.email}`);
    const users = response.data;

    if (credentials.isGoogleSignIn) {
      if (users.length === 0) {
        return rejectWithValue('User not found');
      }
      return users[0];
    }

    if (users.length === 0) {
      return rejectWithValue('User not found');
    }

    const user = users[0];
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
      localStorage.setItem('user', JSON.stringify(action.payload.email));
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
