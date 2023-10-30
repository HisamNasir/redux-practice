import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/counterSlice";
import productSlice from "./features/productSlice";
import cartReducer from '@/src/store/features/cartSlice';
import authReducer from '@/src/store/features/authSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterSlice,
    product: productSlice,
    cart: cartReducer,
  },
});
export default store;
