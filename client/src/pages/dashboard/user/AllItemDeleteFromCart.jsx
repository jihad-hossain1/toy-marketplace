import { Checkbox } from "@material-tailwind/react";
import { useGetSingleUserCartQuery } from "../../../redux/features/api/userApi";
import { BsFillTrash3Fill } from "react-icons/bs";
import { useSelector } from "react-redux";

const AllItemDeleteFromCart = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const userId = user?._id;
  const {
    data: cartsItem,
    isLoading,
    isError,
    error,
  } = useGetSingleUserCartQuery(userId) || {};
  //   console.log(cartsItem);
  return (
    <div className=" bg-white  mb-3 px-2">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <Checkbox color="red" />
          <h4>
            {" "}
            <span className="uppercase">select all </span>{" "}
            {!isError && !isLoading && `(${cartsItem?.length} ITEM(S))`}
          </h4>
        </div>
        <div className="">
          <button className="flex gap-1 text-gray-600 hover:text-pink-400 transition-all duration-300">
            {" "}
            <BsFillTrash3Fill />
            <span className="text-sm uppercase">delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllItemDeleteFromCart;
