import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageNumber: 1,
  productSearch: "",
  limit: 20,
  //   rating: 0,
  //   category: "",
  //   sortByPrice: "",
  //   sortOrder: "asc",
  products: [],
  filters: {
    // Your initial filter values go here
    rating: null,
    category: null,
    price: null,
    // Add more filters as needed
  },
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    changePageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    changePerpageLimit: (state, action) => {
      state.limit = action.payload;
    },
    searchProduct: (state, action) => {
      state.productSearch = action.payload;
      // console.log(object);
    },
    clearSearchProduct: (state) => {
      state.productSearch = "";
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {
        // Reset filters to initial values
        rating: null,
        category: null,
        price: null,
      };
    },
  },
});

export default productSlice.reducer;
export const {
  changePageNumber,
  searchProduct,
  clearSearchProduct,
  changePerpageLimit,
} = productSlice.actions;
