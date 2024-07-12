import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add(state, action){
            // in redux we have to do something like that:
            // return [...state, action.payload] 
            const existingProduct = state.find(product => product.id === action.payload.id);
            if (!existingProduct) {
                state.push(action.payload);
            }

        },
        remove(state, action){
            return state.filter((item) => item.id !== action.payload) 
        }
    }
})

export const {add, remove} = cartSlice.actions; 
export default cartSlice.reducer;