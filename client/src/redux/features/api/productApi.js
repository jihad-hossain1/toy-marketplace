import baseApi from "./baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // all query query
    getProducts: builder.query({
      query: () => "/api/products",
      invalidatesTags: ["Products"],
    }),
    getProductById: builder.query({
      query: (id) => `/api/products/${id}`,
    }),
    getUserProductByEmail: builder.query({
      query: (email) => `/api/userProducts/${email}`,
    }),
    // getProductsByPage: builder.query({
    //   query: (params) => `/api/products_page?${new URLSearchParams(params)}`,
    //   invalidatesTags: ["Products"],
    // }),
    getProductsByPage: builder.query({
      query: (pageNumber) => `/api/products_page?page=${pageNumber}`,
      invalidatesTags: ["Products"],
    }),
    // getProductsByPage: builder.query({
    //   query: (params) => `/api/products_page?${new URLSearchParams(params)}`,
    //   invalidatesTags: ["Products"],
    // }),
    // all mutation
    addProduct: builder.mutation({
      query: (product) => ({
        url: "/api/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProductByIdQuery,
  useGetProductsQuery,
  useAddProductMutation,
  useGetUserProductByEmailQuery,
  useGetProductsByPageQuery,
} = productApi;
