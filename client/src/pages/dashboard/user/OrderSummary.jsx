import React from "react";
import { useGetSingleUserCartQuery } from "../../../redux/features/api/userApi";
import { Link } from "react-router-dom";
import ProceedCheckout from "./ProceedCheckout";
import { useSelector } from "react-redux";

const OrderSummary = () => {
   const user = useSelector((state) => state.auth?.userData);
  const userId = user?._id;

  const {
    data: cartsItem,
    isLoading,
    isError,
    error,
  } = useGetSingleUserCartQuery(userId) || {};

  const productTotalPrice = cartsItem?.map(({ product, quantity }) => {
    const price = product?.price;
    let _r = price * quantity;
    return { toTal: _r };
  });
  // console.log(productTotalPrice);
  let toTal = productTotalPrice?.reduce((acc, curr) => acc + curr.toTal, 0);
  // console.log(toTal);
  return (
    <div className="bg-white rounded shadow-sm p-4">
      <h4 className="pb-2 uppercase">Order Summary</h4>

      <div className="mt-3 flex flex-col gap-4">
        {isLoading ? (
          <div>Loading....</div>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <h4>Subtotal {`(${cartsItem?.length} items)`}</h4>
              <h4>{`$ ${toTal}`}</h4>
            </div>

            <div className="flex justify-between items-center">
              <h4>Shiping Fee</h4>
              <h4>{`$ ${120}`}</h4>
            </div>
            <div className="flex justify-between items-center">
              <h4>Shipping Fee Discount</h4>
              <h4>{`$ ${23}`}</h4>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Enter Voucher Code"
                className="border rounded bg-transparent w-full  hover:outline-none p-2"
              />
              <button className="uppercase py-2 px-4 rounded bg-pink-400 text-white ">
                apply
              </button>
            </div>
            <div className="flex justify-between items-center">
              <h4>Total</h4>
              <h4>{`$ ${23 + 120 + toTal}`}</h4>
            </div>
            <div>
              <ProceedCheckout total={toTal} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
