import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import {RootState} from '../app/store';

interface Order {
  id: string;
  quantity: number;
}

interface OrderState {
  orders: Order[];
  isLoading: boolean;
  error: boolean;
}

const initialState: OrderState = {
  orders: [],
  isLoading: false,
  error: false,
};

interface OrderData {
  [id: string]: number;
}

export const placeOrder = createAsyncThunk<void, Order[]>('orders/placeOrder', async (order) => {
  const orderData = order.reduce((acc, item) => {
    acc[item.id] = item.quantity;
    return acc;
  }, {} as OrderData);
  await axiosApi.post('/orders.json', orderData);
});

export const fetchOrders = createAsyncThunk<Order[]>('orders/fetchOrders', async () => {
  const {data} = await axiosApi.get('/orders.json');
  return Object.entries(data).map(([id, order]) => ({id, ...order}));
});

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<string>) => {
      const item = state.orders.find(item => item.id === action.payload);
      if (item) {
        item.quantity++;
      } else {
        state.orders.push({id: action.payload, quantity: 1});
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter(item => item.id !== action.payload);
    },
    updateCartQuantity: (state, action: PayloadAction<{ id: string, quantity: number }>) => {
      const item = state.orders.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.orders = [];
    }
  }, extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(placeOrder.fulfilled, (state) => {
        state.orders = [];
        state.isLoading = false;
      })
      .addCase(placeOrder.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export const {addToCart, removeFromCart, updateCartQuantity, clearCart} = orderSlice.actions;

export const selectCart = (state: RootState) => state.orders.orders;
export const selectIsOrdersLoading = (state: RootState) => state.orders.isLoading;
export const selectError = (state: RootState) => state.orders.error;

export const ordersReducer = orderSlice.reducer;