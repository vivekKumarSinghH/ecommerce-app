import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Product } from "./productsReducer";

// State interface
interface ProductState {
  item: Product | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ProductState = {
  item: null,
  loading: false,
  error: null,
};

// Async thunk to fetch product by ID
export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (productId: string, { rejectWithValue }) => {
    try {
      // For other products, fetch from API
      const response = await axios.get(
        `https://fakestoreapi.com/products/${productId}`
      );
      return response.data;
    } catch {
      return rejectWithValue(`Failed to fetch product: ${productId}`);
    }
  }
);

// Product slice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.item = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productSlice.reducer;
