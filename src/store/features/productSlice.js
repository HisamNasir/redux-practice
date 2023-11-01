import { createSlice } from "@reduxjs/toolkit";
const productSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    setProducts: (state, action) => {
      return action.payload;
    },
    publishProduct: (state, action) => {
      return [...state, action.payload];
    },
  },
});

export const { publishProduct, setProducts } = productSlice.actions;
export const selectProducts = (state) => state.products;
export default productSlice.reducer;
