import { Button, Textarea } from "@material-tailwind/react";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useAddReplyMutation } from "../../../../../redux/features/api/reviewApi";
import { BsThreeDots } from "react-icons/bs";
import ReplyAction from "./ReplyAction";
import { useSelector } from "react-redux";

const ReviewReply = ({ rid, replies, productId }) => {
  const user = useSelector((state) => state.auth?.userData);

  const [content, setcontent] = useState("");
  const [toggle, setToggle] = useState(false);

  const [addReplay, { isLoading, data, isError, error, isSuccess }] =
    useAddReplyMutation() || {};

  //   console.log(content);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      return toast.error("please login, then you able to add reply");
    }
    // console.log(content);
    addReplay({
      reviewId: rid,
      data: {
        reviewId: rid,
        username: user?.displayName,
        content: content,
      },
    });
    if (isError) {
      toast.error(`ERROR: ${error?.data.message}`);
    }
    if (isSuccess) {
      setcontent("");
      toast.success("Reply added successfull");
      setTimeout(() => {
        setToggle(false);
      }, 1000);
    }
  };

  console.log(data);
  //   console.log(rid);

  return (
    <>
      <div className="relative pb-2">
        <button
          onClick={() => setToggle(!toggle)}
          className="absolute right-0  text-xs border border-pink-300 px-2 rounded-md shadow-sm hover:shadow hover:bg-gray-100/70 transition duration-300"
        >
          Write Reply
        </button>
      </div>
      {toggle && (
        <div>
          <form
            onSubmit={handleSubmit}
            action=""
            className="max-w-[450px] px-2 py-2"
          >
            <Textarea
              required
              onChange={(e) => setcontent(e.target.value)}
              value={content}
              name="content"
              label="reply content"
              color="pink"
            ></Textarea>
            <Button size="sm" color="amber" type="submit">
              {isLoading ? "loading" : "submit"}
            </Button>
          </form>
        </div>
      )}

      <div className="flex flex-col gap-2 mt-4 ml-8">
        {replies?.map((reply) => (
          <div key={reply?._id} className="border  rounded-md ">
            <div className="border-b min-h-[30px] p-2 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <h4 className="text-sm font-semibold">{reply?.username}</h4>
                <p className="text-xs text-gray-500">
                  {reply?.createdAt.slice(0, 10)}
                </p>
              </div>
              <div>
                <ReplyAction
                  reId={reply?._id}
                  rid={rid}
                  preContent={reply?.content}
                  productId={productId}
                />
              </div>
            </div>
            <div className="p-2 lg:p-4">
              <h4>{reply?.content}</h4>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ReviewReply;
