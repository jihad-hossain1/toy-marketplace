import React, { useContext, useState } from "react";
import {
  Input,
  Button,
  Drawer,
  Typography,
  IconButton,
  DialogHeader,
  DialogBody,
  Dialog,
  DialogFooter,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";
import { RiSearchLine } from "react-icons/ri";
import Search from "../search/Search";
import { BsFillTrash3Fill } from "react-icons/bs";
import { AuthContext } from "../../authentication/AuthProvider";
import { Badge } from "antd";

import toast, { Toaster } from "react-hot-toast";
import { useGetSingleUserCartQuery } from "../../redux/features/api/userApi";

const LogoWithSearchNav = () => {
  // const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);

  const userId = "65283decc56a5ba37161e5f1";
  const {
    data: cartsItem,
    isLoading,
    isError,
    error,
  } = useGetSingleUserCartQuery(userId) || {};

  // console.log(cartsItem);

  const [openRight, setOpenRight] = useState(false);
  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const handleDeleteToy = (ditem) => {};
  return (
    <div className="container mx-auto flex justify-between items-center md:mt-2 py-3  md:py-6 text-gray-700 px-2">
      {/* logo here  */}

      <div className="block md:hidden">
        <button onClick={handleOpen}>
          <RiSearchLine className="text-3xl" />
        </button>
      </div>
      <div className="md:hidden ">
        {open ? (
          <Dialog open={open} handler={handleOpen} className="fixed top-10">
            <DialogHeader className="ml-6">
              <Search />
            </DialogHeader>
            <DialogBody divider className="grid place-items-center gap-4">
              <div className="min-h-[200px]"></div>
            </DialogBody>
            <DialogFooter className="space-x-2">
              <Button size="sm" variant="gradient" onClick={handleOpen}>
                close
              </Button>
            </DialogFooter>
          </Dialog>
        ) : (
          ""
        )}
      </div>
      <div className="-ml-12 md:ml-0">
        <Link to={"/"} className="flex flex-col items-center drop-shadow-sm">
          <span className="text-pink-600 font-bold text-md md:text-xl">
            Animal Toy
          </span>
          <span className="bg-[#ffd92e] rounded-sm px-1 text-black text-xs md:text-sm font-serif uppercase">
            Super Store
          </span>
        </Link>
      </div>
      {/* search section  */}
      <div className="hidden md:block">
        <Search />
      </div>
      {/* cart and contact email  */}
      <div>
        <div className="flex space-x-3 items-center">
          <div className="hidden md:flex space-x-3 items-center">
            <TfiEmail className="text-4xl" />
            <div>
              <h4 className=" font-semibold">Email Us</h4>
              <p className="text-gray-600 text-sm">abcInfo@example.com</p>
            </div>
          </div>
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
        </div>

        {/* cart Drawer  */}

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
                      <Toaster />
                      <h4>{citem?.product?.toyTitle}</h4>
                      <button
                        size="sm"
                        className=""
                        variant="gradient"
                        onClick={() => handleDeleteToy(citem)}
                      >
                        <BsFillTrash3Fill className="text-xl text-pink-400" />
                      </button>
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
                  className="bg-[#fc82bd] px-2 py-1 md:px-4 md:py-2 rounded text-black text-xs md:text-[14px] inline-block uppercase hover:bg-[#f0c507] hover:text-white transition-all duration-500"
                >
                  continue shop
                </button>
              </Link>
              <Link to={"/checkout"}>
                <button
                  onClick={closeDrawerRight}
                  disabled={cartsItem?.length == 0}
                  className="bg-[#f0c507] px-2 py-1 md:px-4 md:py-2 rounded text-black text-xs md:text-[14px] inline-block uppercase hover:bg-[#fc82bd] hover:text-white transition-all duration-500"
                >
                  checkout
                </button>
              </Link>
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default LogoWithSearchNav;
