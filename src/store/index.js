import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/counterSlice";
import productSlice from "./features/productSlice";
import cartReducer from '@/src/store/features/cartSlice';
import authReducer from "@/src/store/features/authSlice";
const store = configureStore({
  reducer: {
    counter: counterSlice,
    product: productSlice,
    cart: cartReducer,
    auth: authReducer,
  },
});
export default store;
