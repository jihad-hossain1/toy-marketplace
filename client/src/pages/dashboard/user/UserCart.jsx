import React from "react";
import { useGetSingleUserCartQuery } from "../../../redux/features/api/userApi";
import SingleCart from "./SingleCart";
import AllItemDeleteFromCart from "./AllItemDeleteFromCart";
import OrderSummary from "./OrderSummary";
import { useSelector } from "react-redux";

const UserCart = () => {
   const user = useSelector((state) => state.auth?.userData);
  const userId = user?._id;

  const {
    data: cartsItem,
    isLoading,
    isError,
    error,
  } = useGetSingleUserCartQuery(userId) || {};

  return (
    <div>
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="col-span-2">
          <AllItemDeleteFromCart />
          <div className="flex flex-col gap-3 ">
            {!isError &&
              !isLoading &&
              cartsItem?.map((cart) => (
                <SingleCart
                  cartitem={cart?.product}
                  productId={cart?._id}
                  quantity={cart?.quantity}
                />
              ))}
          </div>
        </div>
        <div className="col-span-1">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default UserCart;
