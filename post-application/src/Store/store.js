import { configureStore } from "@reduxjs/toolkit";
import postSlice from "../Features/posts/postSlice";
import userSlice from "../Features/users/userSlice";

const store = configureStore({
    reducer:{
        posts:postSlice,
        users:userSlice
        
    },
});
export default store;