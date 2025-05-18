import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./reducers/categoriesReducer";
import productsReducer from "./reducers/productsReducer";
import productReducer from "./reducers/productDetailReducer";
import cartReducer from "./reducers/cartReducer";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    product: productReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
