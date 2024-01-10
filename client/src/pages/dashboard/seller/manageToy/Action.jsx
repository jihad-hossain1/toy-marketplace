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


const Action = ({ ite }) => {
  // delete toy
  const handleDeleteToy = (item) => {
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
        axios
          .delete(`${import.meta.env.VITE_BASE_URL}/toys/${item?._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              // refetch();
              // Swal.fire("Deleted!", "Your file has been deleted.", "success");
              toast.success("your toy delete successfull");
            }
          });
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

      {/* <div>
      <FloatButton.Group
      trigger="click"
      type="primary"
      className=""
      style={{
        // right: 24,
      }}
      icon={<CustomerServiceOutlined className="" />}
    >
      <FloatButton />
      <FloatButton icon={<CommentOutlined />} />
    </FloatButton.Group>
      </div> */}
    </>
  );
};

export default Action;
