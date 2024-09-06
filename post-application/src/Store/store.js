import { configureStore } from '@reduxjs/toolkit';
import postReducer from 'Slice/PostSlice';

const store = configureStore({
  reducer: {
    post: postReducer,
  },
});

export default store;
