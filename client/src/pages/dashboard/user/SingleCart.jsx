import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { BsFillTrash3Fill } from "react-icons/bs";
import { useDeleteUserCartProductMutation } from "../../../redux/features/api/userApi";
import ManageCartQuantity from "./ManageCartQuantity";
import { FaRegHeart } from "react-icons/fa6";
import { Checkbox } from "@material-tailwind/react";

const SingleCart = ({ cartitem, productId, quantity }) => {
  const userId = "65283decc56a5ba37161e5f1";

  const [deleteCartProduct, { data, isSuccess }] =
    useDeleteUserCartProductMutation() || {};

  const handleDeleteToy = () => {
    deleteCartProduct({ userId: userId, productId: productId });
  };

  isSuccess ? toast.success(`${data?.message}`) : "";
  // console.log(data);

  const handleFavorite = () => {
    toast.success("ops! we are implement letter...");
  };

  return (
    <div className="flex justify-between  bg-white p-4 rounded shadow-sm">
      <Toaster />
      <div className="flex gap-3">
        <div className="flex items-center gap-1 ">
          <Checkbox color="red" />
          <img
            src={cartitem?.image}
            alt="product photo"
            className="w-20 rounded-md"
          />
        </div>
        <div>
          <h4 className="text-sm">{cartitem?.toyTitle}</h4>
        </div>
      </div>
      <div className="flex flex-col gap-3 items-center">
        <h4 className="">$ {cartitem?.price}</h4>
        <div className="flex justify-end gap-4 items-center">
          <button
            size="sm"
            className=""
            variant="gradient"
            onClick={() => handleFavorite()}
          >
            <FaRegHeart className="text-xl text-pink-400" />
          </button>
          <button
            size="sm"
            className=""
            variant="gradient"
            onClick={() => handleDeleteToy()}
          >
            <BsFillTrash3Fill className="text-xl text-pink-600" />
          </button>
        </div>
      </div>
      <ManageCartQuantity quantity={quantity} productId={productId} />
    </div>
  );
};

export default SingleCart;
