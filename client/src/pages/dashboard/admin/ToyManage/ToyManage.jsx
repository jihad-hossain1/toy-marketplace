import React from "react";
import Action from "./Action";
import { useGetProductCategoryQuery } from "../../../../redux/features/api/productCategoryApi";

const ToyManage = () => {
  const { data, isLoading, isError, error } =
    useGetProductCategoryQuery() || {};
  return (
    <main className="min-h-screen max-w-screen-xl mx-auto bg--800">
      ToyManage
      <div>
        <Action />
      </div>
      <ul className="flex flex-col gap-2 ">
        {isError && error?.error}
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          data?.map((category) => (
            <li key={category?._id}>{category?.category}</li>
          ))
        )}
      </ul>
    </main>
  );
};

export default ToyManage;
