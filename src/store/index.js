import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/counterSlice";
import productSlice from "./features/productSlice";
import cartReducer from '@/src/store/features/cartSlice';

const store = configureStore({
  reducer: {
    counter: counterSlice,
    product: productSlice,
    cart: cartReducer,
  },
});
export default store;
