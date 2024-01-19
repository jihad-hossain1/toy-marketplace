import baseApi from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    currentUser: builder.query({
      query: () => "/api/users/current-user",
      // providesTags: ["Users"],
    }),

    //mutaion
    newUserCreate: builder.mutation({
      query: (formData) => ({
        url: `/api/users/register`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Users"],
    }),

    savedUserLogin: builder.mutation({
      query: (formData) => ({
        url: `/api/users/login`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Users"],
    }),

    refreshToken: builder.mutation({
      query: () => ({ url: "/api/users/refresh-token", method: "POST" }),
    }),
  }),
});

export const {
  useCurrentUserQuery,
  useSavedUserLoginMutation,
  useNewUserCreateMutation,
  useRefreshTokenMutation,
} = authApi;
