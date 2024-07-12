import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/* creating enum type object and making it secure so that 
no one can change it using freez method*/
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

    reducers: {
        // this is the code for the simple mannual thunk
        // setProducts(state, action){
        //     // do not perform any async operation in the reducer like api call
            
        //     state.data = action.payload;
        // },
        // setStatus(state, action)
        // {
        //     state.STATUS=action.payload;
        // }
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
})


// simple thunks  by mannual method
// export function fetchProducts() {

//     return async function fetchProductThunk(dispatch, getState) {
//         dispatch(setStatus(STATUS.LOADING));
//         try {
//             const res = await fetch('https://fakestoreapi.com/products');
//             const data = await res.json();
//             dispatch(setProducts(data));
//             dispatch(setStatus(STATUS.IDLE));
//         } catch (err) {
//             console.log(err);
//             dispatch(setStatus(STATUS.ERROR));
//         }
//     };
// }