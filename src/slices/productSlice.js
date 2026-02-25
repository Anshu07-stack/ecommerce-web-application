import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  items: [],
  loading: false,
  error: null,
  total: 0,
  skip: 0,
  limit: 12
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ limit = 12, skip = 0 }) => {
    const response = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.items = [];
      state.skip = 0;
      state.total = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { clearProducts } = productSlice.actions;
export default productSlice.reducer;