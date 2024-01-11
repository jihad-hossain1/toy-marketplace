import React from "react";
import { useBlogDeleteByAdminMutation } from "../../../../redux/features/api/blogApi";

const Action = ({ blog }) => {
  const [deleteBlog, { data, isError, error }] =
    useBlogDeleteByAdminMutation() || {};
  const handleDelete = () => {
    //
    deleteBlog({ id: blog?._id });
  };
  if (isError) {
    console.log(error);
  }
  return (
    <div>
      <button
        className="border border-red-700 p-2"
        onClick={() => handleDelete()}
      >
        delete
      </button>
    </div>
  );
};

export default Action;
