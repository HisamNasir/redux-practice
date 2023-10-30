// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  selectedItems: [], // An array to track selected items (as boolean values)
  paymentSuccess: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
      state.selectedItems.push(false);
    },
    removeFromCart: (state, action) => {
      const index = state.cartItems.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.cartItems.splice(index, 1);
        state.selectedItems.splice(index, 1);
      }
    },
    toggleSelectedItem: (state, action) => {
      const index = action.payload;
      state.selectedItems[index] = !state.selectedItems[index];
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.selectedItems = [];
    },
    setPaymentSuccess: (state, action) => {
      state.paymentSuccess = action.payload;
    },
    selectCartItems: (state) => state.cartItems,
    selectSelectedItems: (state) => state.selectedItems,
    selectPaymentSuccess: (state) => state.paymentSuccess,
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  toggleSelectedItem,
  setPaymentSuccess,
  selectCartItems,
  selectSelectedItems,
  selectPaymentSuccess,
} = cartSlice.actions;

export default cartSlice.reducer;
