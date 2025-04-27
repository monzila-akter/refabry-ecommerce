import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { placeOrder } from '../../services/api';

export const submitOrder = createAsyncThunk(
  'order/place',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await placeOrder(orderData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    cart: [],
    orderStatus: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const itemExists = state.cart.find(item => item.id === action.payload.id);
      if (itemExists) {
        itemExists.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cart.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.cart = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderStatus = 'success';
        state.cart = [];
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.orderStatus = 'failed';
      });
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = orderSlice.actions;
export default orderSlice.reducer;