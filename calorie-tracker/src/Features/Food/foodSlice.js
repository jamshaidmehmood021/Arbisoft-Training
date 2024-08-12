import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const STATUS = Object.freeze({
  IDLE: "idle",
  ERROR: 'error',
  LOADING: "loading",
  SUCCESS: 'success',
  PENDING: 'pending'
});

const initialState = {
  foods: [],
  status: STATUS.IDLE,
  error: null,
};

// eslint-disable-next-line no-undef
const url = 'https://66b467039f9169621ea2be8d.mockapi.io/foods'; 

export const addFoodEntry = createAsyncThunk('foods/addFoodEntry', async (newEntry) => {
  const response = await axios.post(`${url}`, newEntry);
  return response.data;
});

export const fetchFoods = createAsyncThunk('foods/fetchFoods', async () => {
  const currUser = JSON.parse(localStorage.getItem('user'));
  let response;
  if (currUser === 'admin@gmail.com') {
    response = await axios.get(`${url}`);
  } else {
    response = await axios.get(`${url}?email=${currUser}`);
  }
  return response.data;
});

export const updateFoodEntry = createAsyncThunk('foods/updateFoodEntry', async (updatedEntry) => {
  const response = await axios.put(`${url}/${updatedEntry.id}`, updatedEntry);
  return response.data;
});

export const deleteFoodEntry = createAsyncThunk('foods/deleteFoodEntry', async (id) => {
  await axios.delete(`${url}/${id}`);
  return id;
});


export const selectFoodEntriesForLast7Days = (state) => {
  const currentDate = new Date();
  const last7Days = new Date(currentDate.setDate(currentDate.getDate() - 7));
  return state.foods.foods.filter(food => new Date(food.dateTime) >= last7Days);
};

export const selectFoodEntriesForPrevious7Days = (state) => {
  const currentDate = new Date();
  const previous7Days = new Date(currentDate.setDate(currentDate.getDate() - 14));
  const last7Days = new Date(currentDate.setDate(currentDate.getDate() + 7));
  return state.foods.foods.filter(food => new Date(food.dateTime) >= previous7Days && new Date(food.dateTime) < last7Days);
};


const foodSlice = createSlice({
  name: 'foods',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFoodEntry.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(addFoodEntry.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.foods.push(action.payload);
      })
      .addCase(addFoodEntry.rejected, (state, action) => {
        state.status = STATUS.ERROR;
        state.error = action.error.message;
      })
      .addCase(fetchFoods.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchFoods.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.foods = action.payload;
      })
      .addCase(fetchFoods.rejected, (state, action) => {
        state.status = STATUS.ERROR;
        state.error = action.error.message;
      })
      .addCase(updateFoodEntry.fulfilled, (state, action) => {
        const index = state.foods.findIndex((food) => food.id === action.payload.id);
        state.foods[index] = action.payload;
      })
      .addCase(deleteFoodEntry.fulfilled, (state, action) => {
        state.foods = state.foods.filter((food) => food.id !== action.payload);
      });
  },
});

export const selectFoodById = (state , foodId) => state.foods.foods.find((food) => food.id === foodId);
export const selectDood = (state) => state.foods.foods;
export const selectError = (state)=> state.foods.error;

export default foodSlice.reducer;
