import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/* 
creating enum type object and making it secure so that 
no one can change it using freez method
*/
export const STATUS = Object.freeze({
    IDLE: "idle",
    ERROR: 'error',
    LOADING: "LOADING"
})

const productSlice = createSlice({
    name: 'product',
    initialState:{
        data: [],
        status: STATUS.IDLE
    },
    // this is the code added for redux toolkit thunks
    extraReducers : (builder) => {
        builder
        .addCase(fetchProducts.pending, (state, action) =>{
            state.status= STATUS.LOADING
        })
        .addCase(fetchProducts.fulfilled, (state,action)=>{
            state.data=action.payload
            state.status= STATUS.IDLE
        })
        .addCase(fetchProducts.rejected, (state,action)=>{
            state.status=STATUS.ERROR
        })

    }

})

export const {setProducts, setStatus} = productSlice.actions; 
export default productSlice.reducer;

// thunk method provided in the redux toolkit
export const fetchProducts = createAsyncThunk('product/fetchThunk', async () => {
            const res = await fetch('https://fakestoreapi.com/products');
            const data = await res.json();
            return data;
});
