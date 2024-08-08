import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import { productApi } from '../Services/productApi';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

export default store;
