// Import the configureStore function from Redux Toolkit.
import { configureStore } from "@reduxjs/toolkit";

// Import the counterSlice reducer that you've created earlier.
import counterSlice from "./features/counterSlice";
import productSlice from "./features/productSlice";

// Configure your Redux store.
const store = configureStore({
  // Define your reducers here as an object.
  reducer: {
    // Create a 'counter' slice in the Redux store and associate it with the 'counterSlice' reducer.
    counter: counterSlice,
    // You can add more slices and reducers here if needed.
    // For example:
    product: productSlice,
    // someFeature: someFeatureReducer,
  },
});

// Export the configured Redux store.
export default store;
