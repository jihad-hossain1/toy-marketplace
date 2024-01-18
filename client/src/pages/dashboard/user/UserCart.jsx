import React from "react";
import { useGetSingleUserCartQuery } from "../../../redux/features/api/userApi";
import { useParams } from "react-router-dom";
import SingleCart from "./SingleCart";
import AllItemDeleteFromCart from "./AllItemDeleteFromCart";
import OrderSummary from "./OrderSummary";

const UserCart = () => {
  let { uid } = useParams();
  const userId = "65283decc56a5ba37161e5f1";
  const {
    data: cartsItem,
    isLoading,
    isError,
    error,
  } = useGetSingleUserCartQuery(userId) || {};
  // console.log(cartsItem);
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
