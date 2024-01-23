import { configureStore } from "@reduxjs/toolkit";
import baseApi from "./features/api/baseApi";
import productSlice from "./features/productSlice/productSlice";
// import authSclice from "./features/auth.sclice";
import authSlice from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;
