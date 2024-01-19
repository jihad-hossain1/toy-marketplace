import React, { useRef, useState } from "react";
import {Link} from 'react-router-dom';
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
  
} from "@material-tailwind/react";
import { AiFillSetting } from "react-icons/ai";
import { BsEyeFill,BsTrash3Fill } from "react-icons/bs";
import { PencilIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import UpdateToy from "../updateToy/UpdateToy";
import { useDeleteSellerProductMutation } from "../../../../redux/features/api/productApi";

const Action = ({ ite }) => {
  // delete toy
  const [deleteProduct] = useDeleteSellerProductMutation() || {};
  const handleDeleteToy = async (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          deleteProduct({
            id: ite?._id,
            email: ite?.email,
          });
          toast.success("reply deleted");
        } catch (error) {
          toast.error(`error: ${error?.message}`);
        }
      }
    });
  };

  return (
    <>
      <Toaster />
      <Menu>
        <MenuHandler>
          <IconButton variant="text">
            <AiFillSetting className="text-xl" />
          </IconButton>
        </MenuHandler>
        <MenuList className="flex flex-col gap-2">
          <Link to={`/singletoy/${ite?._id}`}>
            <MenuItem className="flex space-x-3 items-center">
              <IconButton variant="text" className="">
                <BsEyeFill className="h-4 w-4" />
              </IconButton>{" "}
              <span>Details</span>
            </MenuItem>
          </Link>
          {/* update a toy  */}
          <UpdateToy ite={ite} />
          <MenuItem
            onClick={() => handleDeleteToy(ite)}
            className="flex space-x-3 items-center"
          >
            <IconButton variant="text" className="">
              <BsTrash3Fill className="h-4 w-4" />
            </IconButton>{" "}
            <span>Delete</span>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default Action;
