import { configureStore } from "@reduxjs/toolkit";
import baseApi from "./features/api/baseApi";
import productSlice from "./features/productSlice/productSlice";

export const store = configureStore({
  reducer: {
    products: productSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;
