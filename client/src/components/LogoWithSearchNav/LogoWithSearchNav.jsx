import React, { useState } from "react";
import {
  Button,
  DialogHeader,
  DialogBody,
  Dialog,
  DialogFooter,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { TfiEmail } from "react-icons/tfi";
import { RiSearchLine } from "react-icons/ri";
import Search from "../search/Search";
import CartDrawer from "./CartDrawer";

const LogoWithSearchNav = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
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
            Toy Store
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
        <div className="flex gap-3 items-center">
          <div className="hidden md:flex gap-3 items-center">
            <TfiEmail className="text-4xl" />
            <div>
              <h4 className=" font-semibold">Email Us</h4>
              <p className="text-gray-600 text-sm">abcInfo@example.com</p>
            </div>
          </div>
          <CartDrawer />
        </div>
        {/* cart Drawer  */}
      </div>
    </div>
  );
};

export default LogoWithSearchNav;
