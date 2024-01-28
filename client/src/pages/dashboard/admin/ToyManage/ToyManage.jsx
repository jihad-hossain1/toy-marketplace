import React from "react";
import Action from "./Action";
import { useGetProductCategoryQuery } from "../../../../redux/features/api/productCategoryApi";
import UpdateCategory from "./UpdateCategory";

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
            <li key={category?._id} className="flex gap-2 items-center">
              {category?.category}

              <UpdateCategory category={category} />
            </li>
          ))
        )}
      </ul>
    </main>
  );
};

export default ToyManage;
