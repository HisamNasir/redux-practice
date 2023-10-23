import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/counterSlice";
import productSlice from "./features/productSlice";
const store = configureStore({
  reducer: {
    counter: counterSlice,
    product: productSlice,
  },
});
export default store;
