import React from "react";
import { useDeleteUserCartProductMutation } from "../../redux/features/api/userApi";
import { BsFillTrash3Fill } from "react-icons/bs";
import toast from "react-hot-toast";

const DeleteCartItem = ({ productId }) => {
  const userId = "65283decc56a5ba37161e5f1";

  const [deleteCartProduct, { data, isSuccess }] =
    useDeleteUserCartProductMutation() || {};

  const handleDeleteToy = () => {
    deleteCartProduct({ userId: userId, productId: productId });
  };

  isSuccess ? toast.success(`${data?.message}`) : "";
  return (
    <>
      <button className="" onClick={() => handleDeleteToy()}>
        <BsFillTrash3Fill className="text-xl text-pink-400" />
      </button>
    </>
  );
};

export default DeleteCartItem;
