import baseApi from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //query
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
      invalidatesTags: ["Users"],
    }),

    //mutaion
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
  }),
  overrideExisting: false,
});

export const {
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
} = userApi;
