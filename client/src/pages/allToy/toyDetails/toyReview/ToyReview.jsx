import { Button, TabPanel, Textarea } from "@material-tailwind/react";
import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAddReviewMutation } from "../../../../redux/features/api/reviewApi";
import FetchAllReview from "./FetchAllReview";
import { useSelector } from "react-redux";

const ToyReview = ({ pid }) => {
  const user = useSelector((state) => state.auth?.userData);

  const [content, setcontent] = useState("");

  const [addReview, { isError, isLoading, data, error }] =
    useAddReviewMutation() || {};

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      return toast.error("please login, then you able to add review");
    }
    addReview({
      productId: pid,
      data: {
        productId: pid,
        username: user?.username,
        content,
      },
    });
    toast.success("your reivew added successfull");
    setcontent("");
    // setIsReviewToggle(false);
    // console.log(isReview);
  };

  // console.log(data);
  return (
    <TabPanel value={"review"}>
      <div className="min-h-[200px]">
        {/* review or review section  */}
        <hr className="py-4" />
        <div className="">
          <h4 className="text-blue-gray-600 font-semibold px-2">
            Leave a reviews..
          </h4>
          <form
            onSubmit={handleSubmit}
            action=""
            className="max-w-[450px] px-2 py-2"
          >
            <span>
              {/* <Rate
                tooltips={desc}
                onChange={setValue}
                allowHalf
                className="mb-2"
                defaultValue={singleToy?.rating}
              />
              {value ? (
                <span className="ant-rate-text">{desc[value - 1]}</span>
              ) : (
                ""
              )} */}
            </span>
            {/* <div className="mb-3">
              <Input
                required
                name="reviewUserName"
                label="Your Name"
                color="pink"
              ></Input>
            </div> */}
            <Textarea
              required
              onChange={(e) => setcontent(e.target.value)}
              defaultValue={content}
              name="content"
              label="Leave a reviews"
              color="pink"
            ></Textarea>
            <Button label="" color="amber" type="submit">
              {isLoading ? "loading" : "submit"}
            </Button>
          </form>
          {isError ? (
            <p className="text-sm text-pink-500">{error?.message}</p>
          ) : (
            ""
          )}
        </div>
        <hr className="py-4" />

        {/* fetch all review section  */}
        <FetchAllReview productId={pid} />
      </div>
    </TabPanel>
  );
};

export default ToyReview;
