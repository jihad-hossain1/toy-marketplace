import baseApi from "./baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviewByProduct: builder.query({
      query: (productId) => `/api/products/${productId}/reviews`,
      providesTags: ["Reviews"],
    }),

    // mutation /products/:productId/reviews
    addReview: builder.mutation({
      query: ({ productId, data }) => ({
        url: `/api/products/${productId}/createReview`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reviews"],
    }),
    addReply: builder.mutation({
      query: ({ reviewId, data }) => ({
        url: `/api/products/${reviewId}/reply`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Reviews"],
    }),
    deleteReply: builder.mutation({
      query: ({ reviewId, replyId }) => ({
        url: `/api/products/${reviewId}/replies/${replyId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reviews"],
    }),
    deleteReview: builder.mutation({
      query: ({ reviewId }) => ({
        url: `/api/products/${reviewId}/review`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reviews"],
    }),
    updateReview: builder.mutation({
      query: ({ productId, reviewId, data }) => ({
        url: `/api/products/${productId}/reviews/${reviewId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Reviews"],
    }),
    updateReviewReply: builder.mutation({
      query: ({ productId, reviewId, replyId, data }) => ({
        url: `/api/products/${productId}/reviews/${reviewId}/replies/${replyId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Reviews"],
    }),
  }),
});

export const {
  useAddReviewMutation,
  useGetAllReviewByProductQuery,
  useAddReplyMutation,
  useDeleteReplyMutation,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
  useUpdateReviewReplyMutation,
} = reviewApi;
