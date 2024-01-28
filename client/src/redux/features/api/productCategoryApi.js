import baseApi from "./baseApi";

const productCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductCategory: builder.query({
      query: () => `/api/productCategory`,
      providesTags: ["category"],
    }),

    // mutation /products/blogs
    addProductCategroy: builder.mutation({
      query: (data) => ({
        url: `/api/productCategory`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),

    updateProductCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/productCategory/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useAddProductCategroyMutation,
  useGetProductCategoryQuery,
  useUpdateProductCategoryMutation,
} = productCategoryApi;
