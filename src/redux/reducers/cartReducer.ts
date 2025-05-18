import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "./productsReducer";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: Product; quantity: number }>
    ) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity,
          category: product.category,
        });
      }

      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        item.quantity = quantity;
      }

      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;
    },
    removeAll: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  removeAll,
} = cartSlice.actions;
export default cartSlice.reducer;
