import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../Features/users/userSlice";
import foodSlice from "../Features/Food/foodSlice";

const store = configureStore({
    reducer:{
        users: userSlice,
        foods: foodSlice
    },
});
export default store;