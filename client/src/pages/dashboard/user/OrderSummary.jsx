import React from "react";
import { useGetSingleUserCartQuery } from "../../../redux/features/api/userApi";

const OrderSummary = () => {
  const userId = "65283decc56a5ba37161e5f1";
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
        <div>
          <h4>Subtotal {`(${cartsItem?.length} items)`}</h4>
          <h4>{`$ ${toTal}`}</h4>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
