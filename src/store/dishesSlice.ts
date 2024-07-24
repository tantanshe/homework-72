import axiosApi from '../axiosApi';
import {RootState} from '../app/store';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Dish {
  id: string;
  title: string;
  price: number;
  image: string;
}

interface DishesState {
  dishes: Dish[];
  isLoading: boolean;
  error: boolean;
}

const initialState: DishesState = {
  dishes: [],
  isLoading: false,
  error: false,
};

export const fetchDishes = createAsyncThunk<Dish[]>('dishes/fetchDishes', async () => {
  const {data: dish} = await axiosApi.get('/dishes.json');
  return Object.keys(dish).map(id => ({
    id,
    ...dish[id],
  }));
});

export const addDish = createAsyncThunk<Dish, Dish>('dishes/addDish', async (newDish) => {
  const {data: dish} = await axiosApi.post<Dish>(`/dishes.json`, newDish);
  return {id: dish.title, ...newDish};
});

export const editDish = createAsyncThunk<Dish, { id: string, updatedDish: Dish }>('dishes/editDish',
  async ({id, updatedDish}) => {
    const {data: dish} = await axiosApi.put<Dish>(`/dishes/${id}.json`, updatedDish);
    return {id, ...dish};
  });

export const deleteDish = createAsyncThunk<string, string, { state: RootState }>('dishes/deleteDish',
  async (id) => {
    await axiosApi.delete(`/dishes/${id}.json`);
    return id;
  }
);

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishes.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(fetchDishes.fulfilled, (state, action: PayloadAction<Dish[]>) => {
        state.isLoading = false;
        state.dishes = action.payload;
      })
      .addCase(fetchDishes.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });

    builder
      .addCase(addDish.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(addDish.fulfilled, (state, action: PayloadAction<Dish>) => {
        state.dishes.push(action.payload);
        state.isLoading = false;
      })
      .addCase(addDish.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });

    builder
      .addCase(editDish.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(editDish.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(editDish.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });

    builder
      .addCase(deleteDish.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(deleteDish.fulfilled, (state, {payload: id}) => {
        state.dishes = state.dishes.filter(dishes => dishes.id !== id);
        state.isLoading = false;
      })
      .addCase(deleteDish.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export const selectDishes = (state: RootState) => state.dishes.dishes;
export const selectIsDishesLoading = (state: RootState) => state.dishes.isLoading;
export const selectError = (state: RootState) => state.dishes.error;

export const dishesReducer = dishesSlice.reducer;