import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice'

const store = configureStore({
    reducer:{
        cart: cartReducer
        // in case of more reducers just simply configure it there
    },
});
export default store;