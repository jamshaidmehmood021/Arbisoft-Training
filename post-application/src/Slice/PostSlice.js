import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from 'utils/axios/axios';

export const STATUS = Object.freeze({
    IDLE: "idle",
    ERROR: 'error',
    LOADING: "loading",
    SUCCESS: 'success',
    PENDING: 'pending'
});

const initialState = {
  posts: [],
  status: STATUS.IDLE,
  error: null,
};

export const createPost = createAsyncThunk(
    'posts/createPost',
    async (postData, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post('/addPost', postData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
);

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get('/getPosts');
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
);

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(createPost.pending, (state) => {
          state.status = STATUS.PENDING;
        })
        .addCase(createPost.fulfilled, (state, action) => {
          state.status = STATUS.SUCCESS;
        })
        .addCase(createPost.rejected, (state, action) => {
          state.status = STATUS.ERROR;
          state.error = action.payload;
        })
        .addCase(fetchPosts.pending, (state) => {
          state.status = STATUS.PENDING;
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
          state.status = STATUS.SUCCESS;
          state.posts = action.payload;
        })
        .addCase(fetchPosts.rejected, (state, action) => {
          state.status = STATUS.ERROR;
          state.error = action.payload;
        });
    },
});

export default postSlice.reducer;
