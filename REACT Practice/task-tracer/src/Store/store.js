import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./taskSlice";
import appSlice from "./appSlice";
import commentSlice from "./commentSlice";

const store = configureStore({
    reducer:{
        task: taskSlice,
        app:appSlice,
        comment: commentSlice
    },
});
export default store;