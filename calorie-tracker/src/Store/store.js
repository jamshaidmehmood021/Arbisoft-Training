import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../Features/users/userSlice";

const store = configureStore({
    reducer:{
        users: userSlice,
        
    },
});
export default store;