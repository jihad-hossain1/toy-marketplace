import baseApi from "./baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => `/api/blogs`,
      providesTags: ["blogs"],
    }),

    // mutation /products/blogs
    addBlog: builder.mutation({
      query: (data) => ({
        url: `/api/blogs`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["blogs"],
    }),
    blogDeleteByAdmin: builder.mutation({
      query: ({ id }) => ({
        url: `/api/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blogs"],
    }),
  }),
});

export const {
  useAddBlogMutation,
  useGetBlogsQuery,
  useBlogDeleteByAdminMutation,
} = blogApi;
