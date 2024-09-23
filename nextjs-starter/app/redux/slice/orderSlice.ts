import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface OrderState {
  loading: boolean;
  error: string | null;
  success: boolean;
  orders: Order[];
}

const initialState: OrderState = {
  loading: false,
  error: null,
  success: false,
  orders: [],
};

export interface Order {
  id: number;
  deadline: string;
  gigId: number;
  buyerId: number;
  sellerId: number;
  amount: number;
  orderStatus: string;
}

export const createOrder = createAsyncThunk(
    'orders/createOrder',
    async (orderData: { gigId: number; buyerId: number; sellerId: number; deadline: string; amount: number }, { rejectWithValue }) => {
      try {
       
        const token = localStorage.getItem('token');
        if (!token) {
          return rejectWithValue('Token is missing');
        }

        const response = await fetch('http://localhost:5000/createOrder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          },
          body: JSON.stringify(orderData),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to create order');
        }
        return await response.json(); 
      } catch (error: any) {
        return rejectWithValue(error.message || 'Failed to create order');
      }
    }
  );
  
export const fetchOrdersByUserId = createAsyncThunk(
    'orders/fetchOrdersByUserId',
    async (userId: number, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return rejectWithValue('Token is missing');
        }
  
        const response = await fetch(`http://localhost:5000/getOrderById/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch orders');
        }
  
        return await response.json();
      } catch (error: any) {
        return rejectWithValue(error.message || 'Failed to fetch orders');
      }
    }
  );
  

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchOrdersByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload; 
      })
      .addCase(fetchOrdersByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;
