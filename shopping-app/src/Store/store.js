import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice'
import productSlice from "./productSlice";

const store = configureStore({
    reducer:{
        cart: cartReducer,
        // in case of more reducers just simply configure it there
        product: productSlice
    },
});
export default store;