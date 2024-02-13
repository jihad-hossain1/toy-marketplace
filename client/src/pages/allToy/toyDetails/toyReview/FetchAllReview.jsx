import { Button } from "@material-tailwind/react";
import { useGetAllReviewByProductQuery } from "../../../../redux/features/api/reviewApi";
import { BsThreeDots } from "react-icons/bs";
import ReviewReply from "./ReviewReply/ReviewReply";
import ReviewAction from "./ReviewAction";

const FetchAllReview = ({ productId }) => {
  // console.log("form fetch rev: ", productId);
  const {
    data: reviews,
    isError: isreviewError,
    isLoading: reviewLoading,
    error: reviewError,
  } = useGetAllReviewByProductQuery(productId) || {};

  isreviewError ? <div>{reviewError?.message}</div> : "";
  console.log(reviews);
  return (
    <>
      <>
        {reviewLoading ? (
          <div className="flex flex-col gap-4"></div>
        ) : (
          <div className="flex flex-col gap-4">
            {reviews?.map((review) => (
              <div key={review?._id} className="border  rounded-md ">
                <div className="border-b min-h-[30px] p-2 flex justify-between items-center bg-gray-100">
                  <div className="flex  gap-2 flex-col">
                    <h4 className="text-sm font-semibold">
                      {review?.username}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {review?.createdAt.slice(0, 10)}
                    </p>
                  </div>
                  <div>
                    <ReviewAction
                      rid={review?._id}
                      review={review}
                      productId={productId}
                    />
                  </div>
                </div>
                <div className="p-2 lg:p-4">
                  <h4>{review?.content}</h4>
                  <ReviewReply
                    rid={review?._id}
                    replies={review?.replies}
                    productId={productId}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    </>
  );
};

export default FetchAllReview;
