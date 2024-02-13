import { PencilIcon } from '@heroicons/react/24/solid';
import { Button, IconButton, Input, MenuItem, Textarea } from '@material-tailwind/react';
import React, { useContext, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from "react-redux";

const UpdateToy = ({ ite }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const modalRef = useRef(null);
  const formRef = useRef(null);
  const [updateData, setUpdateData] = useState(null);

  const openModal = (modalComp) => {
    // console.log(modalComp);
    setUpdateData(modalComp);
    modalRef.current.showModal();
  };
  const closeModal = () => {
    // setUpdateData(null);
    modalRef.current.close();
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const toyTitle = form.toyTitle.value;
    const category = form.category.value;
    const price = form.price.value;
    const quantity = form.quantity.value;
    // const rating = form.rating.value;
    const seller = form.seller.value;
    const email = form.email.value;

    const updateinfo = {
      toyTitle,
      category,
      seller,
      email,
      price: parseFloat(price),
      quantity: parseFloat(quantity),
    };
    // console.log(updateinfo)
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/toys/${updateData._id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updateinfo),
      }
    );
    const data = await res.json();

    if (data.modifiedCount == 1) {
      toast.success(` Toy updated succesfull`);
      // console.log(data.modifiedCount);
      closeModal();
      // refetch();
      form.reset();
    } else console.log(res);
  };
  return (
    <>
      <MenuItem
        onClick={() => openModal(ite)}
        className="flex space-x-3 items-center"
      >
        <IconButton variant="text" className="">
          <PencilIcon className="h-4 w-4" />
        </IconButton>{" "}
        <span>Edit</span>
      </MenuItem>

      {/* modal components  */}
      <dialog
        ref={modalRef}
        className="w-[90%] max-w-[500px] rounded-md px-3 pt-2 pb-5"
      >
        <div>
          <div className="text-right mb-2">
            <button
              onClick={() => {
                closeModal();
              }}
              className="hover:text-pink-600 p-2"
            >
              Close
            </button>
          </div>
          <form ref={formRef} action="" onSubmit={handleUpdate}>
            <h4 className="text-2xl font-semibold text-center text-blue-gray-700 mb-5">
              Update Your Toy
            </h4>
            <div className="md:gap-3 gap-2 grid md:grid-cols-1 ">
              <div className="mb-2">
                <Input
                  variant="outlined"
                  label="Toy Title"
                  name="toyTitle"
                  color="pink"
                  type="text"
                  required
                  defaultValue={updateData?.toyTitle}
                />
              </div>
              <div className="mb-2">
                <Input
                  variant="outlined"
                  label="Toy Category"
                  name="category"
                  color="pink"
                  type="text"
                  required
                  defaultValue={updateData?.category}
                />
              </div>
              <div className="mb-2">
                <Input
                  variant="outlined"
                  label="Seller Name"
                  name="seller"
                  color="pink"
                  type="text"
                  required
                  defaultValue={updateData?.seller}
                />
              </div>
              <div className="mb-2">
                <Input
                  variant="outlined"
                  label="Quantity"
                  name="quantity"
                  color="pink"
                  type="number"
                  required
                  defaultValue={updateData?.quantity}
                />
              </div>
            </div>
            <div className="md:gap-3 gap-2 grid  md:grid-cols-1 ">
              <div className="mb-2">
                <Input
                  variant="outlined"
                  label="Seller Email"
                  name="email"
                  color="pink"
                  type="text"
                  defaultValue={user?.email}
                  required
                />
              </div>

              <div className="mb-2">
                <Input
                  variant="outlined"
                  label="Price"
                  name="price"
                  color="pink"
                  type="number"
                  required
                  defaultValue={updateData?.price}
                />
              </div>
            </div>

            <div>
              <Button
                className="w-full"
                type="submit"
                color="pink"
                variant="gradient"
              >
                {" "}
                Update Toy{" "}
              </Button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default UpdateToy;