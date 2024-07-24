import {configureStore} from '@reduxjs/toolkit';
import {dishesReducer} from '../store/dishesSlice';
import {ordersReducer} from '../store/orderSlice';

export const store = configureStore({
  reducer: {
    dishes: dishesReducer,
    orders: ordersReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;