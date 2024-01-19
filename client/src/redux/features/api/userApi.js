import baseApi from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //query
    getCurrentUser: builder.query({
      query: () => "/api/users/current-user",
      invalidatesTags: ["Users"],
    }),

    getUsers: builder.query({
      query: () => "/api/users",
      invalidatesTags: ["Users"],
    }),

    getGenerateToken: builder.query({
      query: () => "/api/generateApikey",
    }),

    getPaginatedUsers: builder.query({
      query: (pageNumber) => `/api/users?page=${pageNumber}`,
    }),

    searchUserQuery: builder.query({
      query: (first_name) => `/api/users/${first_name}`,
    }),

    getLogUser: builder.query({
      query: () => "/api/login",
    }),

    getUserById: builder.query({
      query: (id) => `/api/users/${id}`,
    }),

    getSingleUserCart: builder.query({
      query: (userId) => `api/users/${userId}/cart`,
      providesTags: ["Users"],
      // providesTags: ["products"],
    }),

    //mutaion
    registerUser: builder.mutation({
      query: (formData) => ({
        url: `/api/users/register`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Users"],
    }),

    userLogin: builder.mutation({
      query: (formData) => ({
        url: `/api/users/login`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Users"],
    }),

    addToCart: builder.mutation({
      query: ({ userId, item }) => ({
        url: `/api/users/${userId}/cart`,
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["Users"],
    }),

    setUser: builder.mutation({
      query: (post) => ({
        url: "/api/create_user",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["Users"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),

    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    deleteUserCartProduct: builder.mutation({
      query: ({ userId, productId }) => ({
        url: `/api/users/${userId}/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),

    // /users/:userId/cart/increase_cart_product
    increaseCartProduct: builder.mutation({
      query: ({ userId, productId }) => ({
        url: `/api/users/${userId}/cart/increase_cart_product`,
        method: "POST",
        body: { userId, productId },
      }),
      invalidatesTags: ["Users"],
    }),

    // /users/:userId/cart/decrease_cart_product
    decreaseCartProduct: builder.mutation({
      query: ({ userId, productId }) => ({
        url: `/api/users/${userId}/cart/decrease_cart_product`,
        method: "POST",
        body: { userId, productId },
      }),
      invalidatesTags: ["Users"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useUserLoginMutation,
  useRegisterUserMutation,
  useSetUserMutation,
  useGetUserByIdQuery,
  useGetLogUserQuery,
  useGetUsersQuery,
  useGetPaginatedUsersQuery,
  useGetGenerateTokenQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetSingleUserCartQuery,
  useAddToCartMutation,
  useDeleteUserCartProductMutation,
  useIncreaseCartProductMutation,
  useDecreaseCartProductMutation,
  useGetCurrentUserQuery,
} = userApi;
