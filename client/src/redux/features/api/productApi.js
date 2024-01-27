import baseApi from "./baseApi";

const productApi = baseApi.injectEndpoints({
  // tagTypes: ["products"],
  endpoints: (builder) => ({
    // all query query
    getProducts: builder.query({
      query: () => "/api/products",
      // invalidatesTags: ["products"],
    }),
    getProductById: builder.query({
      query: (id) => `/api/products/${id}`,
    }),
    getUserProductByEmail: builder.query({
      query: (email) => `/api/userProducts/${email}`,
      providesTags: ["products"],
    }),

    getProductsByPage: builder.query({
      query: (pageNumber) => `/api/products_page?page=${pageNumber}`,
      invalidatesTags: ["products"],
    }),

    // all mutation
    addProduct: builder.mutation({
      query: (product) => ({
        url: "/api/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["products"],
    }),

    deleteSellerProduct: builder.mutation({
      query: ({ id, email }) => ({
        url: `/api/products_email/${id}/user/${email}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),

    productDeleteByAdmin: builder.mutation({
      query: ({ id }) => ({
        url: `/api/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
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
  useDeleteSellerProductMutation,
  useProductDeleteByAdminMutation,
} = productApi;
