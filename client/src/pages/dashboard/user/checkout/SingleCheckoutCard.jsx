import React, { useState } from "react";


const SingleCheckoutCard = ({ c_item, refetch,index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex space-x-2 group ">
      <div>#{index + 1} </div>
      <div onClick={(prev) => setOpen(!open)} className="cursor-pointer group-hover:will-change-transform duration-700">{c_item?.item?.toyTitle}</div>
      <div className="font-semibold">
        Price: {c_item?.item?.price}$
      </div>
      {open && (
        <div className="">
          <img
            src={c_item?.item?.images?.img?.img1}
            className="w-[200px] object-cover  transition-all duration-700"
            alt=""
          />
        </div>
      )}
      
    </div>
  );
};

export default SingleCheckoutCard;
