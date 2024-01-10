import React from "react";
import { useGetSingleUserCartQuery } from "../../../redux/features/api/userApi";
import { useParams } from "react-router-dom";

const UserCart = () => {
  let { uid } = useParams();
  const userId = "65283decc56a5ba37161e5f1";
  const {
    data: cartsItem,
    isLoading,
    isError,
    error,
  } = useGetSingleUserCartQuery(userId) || {};
  console.log(cartsItem);
  return <div>UserCart: {!isError && !isLoading && cartsItem?.length} </div>;
};

export default UserCart;
