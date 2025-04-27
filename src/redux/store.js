import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import orderReducer from './slices/orderSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    order: orderReducer,
  },
});