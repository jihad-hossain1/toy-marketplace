import { Button, Input } from "@material-tailwind/react";
import React, { useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import axios from "axios";

const SingleInformation = ({ handleChange, formData, _photo, setPhoto }) => {
  const [image, setimage] = useState(null);

  const handleOnFileUpload = async (e) => {
    e.preventDefault();
    try {
      let data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "images_preset");
      let api = `https://api.cloudinary.com/v1_1/dqfi9zw3e/image/upload`;
      const res = await axios.post(api, data);
      let _up = await res?.data?.secure_url;
      setPhoto(_up);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="mb-2">
        <Input
          defaultValue={formData?.toyTitle}
          onChange={handleChange}
          variant="outlined"
          label="Toy Title"
          name="toyTitle"
          color="pink"
          type="text"
          required
        />
      </div>

      <select
        name="category"
        style={{ border: "2px solid gray" }}
        className="rounded-md bg-transparent border border-r-gray-400"
        label="Select Category"
        defaultValue={formData?.category}
        onChange={handleChange}
      >
        <option value="Panda">Panda</option>
        <option value="Planet of Toys">Planet of Toys</option>
        <option value="Soft Toys And Dolls">Soft Toys And Dolls</option>
      </select>
      <div className="mb-2">
        <Input
          defaultValue={formData?.quantity}
          onChange={handleChange}
          variant="outlined"
          label="Quantity"
          name="quantity"
          color="pink"
          type="number"
          required
        />
      </div>
      <div className="mb-2">
        <Input
          defaultValue={formData?.price}
          onChange={handleChange}
          variant="outlined"
          label="Price"
          name="price"
          color="pink"
          type="number"
          required
        />
      </div>
      <div className="flex gap-4 items-center">
        <button
          component="label"
          variant="contained"
          className="w-fit"
          color="warning"
        >
          <input
            type="file"
            name=""
            accept="image/*"
            id="image"
            onChange={(e) => setimage((prev) => e.target.files[0])}
          />
        </button>
        <Button color="deep-purple" onClick={handleOnFileUpload}>
          upLoad
        </Button>

        <div>
          {_photo ? (
            <div className="flex items-center gap-4">
              <img src={_photo} alt="" className="w-20" />
              <div className="w-fit p-2 rounded border shadow flex flex-col gap-2 items-center">
                <IoMdCheckmarkCircleOutline
                  size={25}
                  className="text-green-600"
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default SingleInformation;
