import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { HiPencilSquare } from "react-icons/hi2";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Textarea,
  Button,
} from "@material-tailwind/react";
import {
  useDeleteReplyMutation,
  useUpdateReviewReplyMutation,
} from "../../../../../redux/features/api/reviewApi";
import ModalForAll from "../../../../../components/ModalForAll/ModalForAll";

const ReplyAction = ({ reId, rid, productId, preContent }) => {
  // console.log("productId : ", productId);
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [deleteReply] = useDeleteReplyMutation() || {};

  const handleDeleteReply = async () => {
    try {
      await deleteReply({
        reviewId: rid,
        replyId: reId,
      });
      toast.success("reply deleted");
    } catch (error) {
      toast.error(`error: ${error?.message}`);
    }
  };

  const [updateReviewReply, { data, isSuccess }] =
    useUpdateReviewReplyMutation() || {};
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(content);
    updateReviewReply({
      productId: productId,
      reviewId: rid,
      replyId: reId,
      data: { content },
    });
    if (isSuccess) {
      setOpen(false);
      setContent("");
    }
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
        <MenuList>
          <MenuItem
            className="flex gap-2 items-center hover:text-green-600"
            onClick={() => setOpen(!open)}
          >
            Edit Reply <HiPencilSquare />
          </MenuItem>
          <MenuItem
            className="flex gap-2 items-center hover:text-pink-600"
            onClick={() => handleDeleteReply()}
          >
            Delete Reply <FaTrash />
          </MenuItem>
        </MenuList>
      </Menu>
      <ModalForAll open={open} setOpen={setOpen} title={"Update Reply"}>
        <form action="" className="" onSubmit={handleSubmit}>
          <Textarea
            variant="outlined"
            color="amber"
            type="text"
            label="Content"
            placeholder="content"
            onChange={(e) => setContent(e.target.value)}
            defaultValue={preContent}
          />
          <div className="flex justify-end mt-2">
            <Button
              color="amber"
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

export default ReplyAction;
