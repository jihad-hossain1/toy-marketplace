import React, { useContext, useState } from "react";
import { Drawer, Typography, IconButton } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";

import { Badge } from "antd";

import toast, { Toaster } from "react-hot-toast";
import { useGetSingleUserCartQuery } from "../../redux/features/api/userApi";
import DeleteCartItem from "./DeleteCartItem";
import { useSelector } from "react-redux";

const CartDrawer = () => {
  const user = useSelector((state) => state.auth?.userData);

  const userId = user?._id;
  const {
    data: cartsItem,
    isLoading,
    isError,
    error,
  } = useGetSingleUserCartQuery(userId) || {};

  const [openRight, setOpenRight] = useState(false);
  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <>
      <button className="md:flex space-x-2 items-center">
        <Badge size="default" count={cartsItem?.length || 0}>
          <MdAddShoppingCart
            onClick={openDrawerRight}
            className="text-3xl md:text-4xl"
          />
        </Badge>
        <div className="hidden md:block">
          <span className=" font-semibold">Shoping Cart</span>
          <p className="text-gray-600 text-sm ">
            <span>{cartsItem?.length || 0}</span> item
          </p>
        </div>
      </button>

      <Drawer
        placement="right"
        open={openRight}
        onClose={closeDrawerRight}
        className="p-4"
      >
        <div className="">
          {/* drwer top side  */}
          <div>
            <div className="mb-6 flex items-center justify-between border-b border-blue-gray-200">
              <Typography
                variant="h5"
                color="blue-gray"
                className="uppercase text-sm"
              >
                Cart
              </Typography>
              <IconButton
                variant="text"
                color="blue-gray"
                onClick={closeDrawerRight}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </IconButton>
            </div>
            <div className="">
              <div>
                {cartsItem?.length || <div>Your cart item is {`(${0})`}</div>}
              </div>
            </div>
            <div>
              {cartsItem?.map((citem) => (
                <div key={citem?._id}>
                  <div className="flex justify-between space-y-4 items-center border-b border-blue-gray-100 pb-2">
                    <h4>{citem?.product?.toyTitle}</h4>
                    <DeleteCartItem productId={citem?._id} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Drawer bottom side  */}
          <div className="fixed bottom-4 flex space-x-2">
            <Link to={"/alltoys"}>
              <button
                onClick={closeDrawerRight}
                className={cartsItem?.length == 0 ? "hidden" : "btn1"}
              >
                continue shop
              </button>
            </Link>
            <Link to={"/userDashborad/users/cart"}>
              <button
                onClick={closeDrawerRight}
                disabled={cartsItem?.length == 0}
                className={cartsItem?.length == 0 ? "hidden" : "btn1"}
              >
                checkout
              </button>
            </Link>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default CartDrawer;
