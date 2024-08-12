import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../Features/users/userSlice';
import { foodApi } from '../Features/Services/foodSliceApi';  

const store = configureStore({
  reducer: {
    users: userSlice,
    [foodApi.reducerPath]: foodApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(foodApi.middleware), 
});

export default store;
