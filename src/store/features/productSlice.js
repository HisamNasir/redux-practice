// productSlice.js
import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products', // Change the name to 'products' to manage an array of products
  initialState: [],
  reducers: {
    setProducts: (state, action) => {
      return action.payload;
    },
    publishProduct: (state, action) => {
      // Add the new product to the state
      return [...state, action.payload];
    },
  },
});

export const { publishProduct, setProducts } = productSlice.actions;
export const selectProducts = (state) => state.products;
export default productSlice.reducer;
