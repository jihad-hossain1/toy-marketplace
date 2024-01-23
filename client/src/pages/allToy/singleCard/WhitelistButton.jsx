import axios from "axios";
import React, { useContext } from "react";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { AuthContext } from "../../../authentication/AuthProvider";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const WhitelistButton = ({}) => {
  const user = useSelector((state) => state.auth?.userData);

  const handleWhitelist = async (itemData) => {
    // if(!user){
    //     return toast.error('login first')
    //   }else{
    //     const whitelistVerify = whitelist?.find(w_item=> w_item?.itemId === item?._id)
    //     if(whitelistVerify){
    //       return toast.error('already added please check whitelist')
    //     }else{
    //       const info={
    //           itemId: itemData?._id,
    //           email: user?.email,
    //           item: itemData,
    //       }
    //       const res = await fetch(
    //         `${import.meta.env.VITE_BASE_URL}/whitelist`,
    //         {
    //           method: "POST",
    //           headers: {
    //             "content-type": "application/json",
    //           },
    //           body: JSON.stringify(info),
    //         }
    //       );
    //       const data = await res.json();
    //       if(data){
    //         refetch()
    //         toast.success('check your whitelist')
    //       //   isEnrollRefetch()
    //       }
    //       console.log(data);
    //     }
    //   }
  };
  const listedBgColorChang = true;
  // const listedBgColorChang = whitelist.find(({itemId})=>itemId === item?._id)
  return (
    <div>
      <button
        onClick={() => handleWhitelist()}
        className={
          listedBgColorChang
            ? `rounded-full p-1 flex items-center justify-center  border border-blue-gray-100 mb-1 bg-pink-300 text-white transition-all duration-500`
            : `rounded-full p-1 flex items-center justify-center bg-white border border-blue-gray-100 mb-1 hover:bg-pink-300 hover:text-white transition-all duration-500`
        }
      >
        <MdOutlineFavoriteBorder className="h-5 w-5" />
      </button>
    </div>
  );
};

export default WhitelistButton;
