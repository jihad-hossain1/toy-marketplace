import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { HiPencilSquare } from "react-icons/hi2";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Textarea,
} from "@material-tailwind/react";
import {
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} from "../../../../redux/features/api/reviewApi";
import ModalForAll from "../../../../components/ModalForAll/ModalForAll";
import toast from "react-hot-toast";

const ReviewAction = ({ review, productId }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");

  const [deleteReview] = useDeleteReviewMutation() || {};
  const handleDeleteReview = async () => {
    try {
      await deleteReview({
        reviewId: review?._id,
      });
      toast.success("review deleted");
    } catch (error) {
      toast.error(`error: ${error?.message}`);
    }
  };

  const [updateReview, { data }] = useUpdateReviewMutation() || {};
  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(content);
    updateReview({
      productId: productId,
      reviewId: review?._id,
      data: { content },
    });
  };
  // console.log(data);
  return (
    <>
      <Menu placement="left-start">
        <MenuHandler>
          <button>
            <BsThreeDots />
          </button>
        </MenuHandler>
        <MenuList className="">
          <MenuItem
            className="flex gap-2 items-center hover:text-green-600 w-full"
            onClick={() => setOpen(!open)}
          >
            Edit Reply <HiPencilSquare />
          </MenuItem>
          <MenuItem
            className="flex gap-2 items-center hover:text-pink-600 w-full"
            onClick={() => handleDeleteReview()}
          >
            Delete Reply <FaTrash />
          </MenuItem>
        </MenuList>
      </Menu>

      <ModalForAll open={open} setOpen={setOpen} title={"Update Review"}>
        <form action="" className="" onSubmit={handleSubmit}>
          <Textarea
            variant="outlined"
            color="pink"
            type="text"
            label="Content"
            placeholder="content"
            onChange={(e) => setContent(e.target.value)}
            defaultValue={review?.content}
          />
          <div className="flex justify-end mt-2">
            <Button
              color="pink"
              variant="gradient"
              className="text-gray-50"
              type="submit"
            >
              Update
            </Button>
          </div>
        </form>
      </ModalForAll>
    </>
  );
};

export default ReviewAction;
