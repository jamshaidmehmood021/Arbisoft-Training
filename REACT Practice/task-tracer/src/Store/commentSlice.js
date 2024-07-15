import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const STATUS = Object.freeze({
    IDLE: "idle",
    ERROR: 'error',
    LOADING: "LOADING"
})

const commentSlice = createSlice({
    name: 'comment',
    initialState:{
        data: [],
        status: STATUS.IDLE
    },

    reducers: {
    },
    // this is the code added for redux toolkit thunks
    extraReducers : (builder) => {
        builder
        .addCase(fetchComments.pending, (state, action) =>{
            state.status= STATUS.LOADING
        })
        .addCase(fetchComments.fulfilled, (state,action)=>{
            state.data=action.payload
            state.status= STATUS.IDLE
        })
        .addCase(fetchComments.rejected, (state,action)=>{
            state.status=STATUS.ERROR
        })
    }
})

export const {setProducts, setStatus} = commentSlice.actions; 
export default commentSlice.reducer;

// thunk method provided in the redux toolkit
export const fetchComments = createAsyncThunk('product/fetchThunk', async () => {
            const res = await fetch('https://jsonplaceholder.typicode.com/comments');
            const data = await res.json();
            return data;
})
