import React from "react";
import { IconButton } from "@material-tailwind/react";
import { BsGoogle, BsTwitter, BsGithub } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
const SocialButton = () => {
  return (
    <div className="relative flex flex-col justify-center items-center">
        
        
        <img className="w-[430px] md:w-[450px]" src="https://i.ibb.co/c6FZkwd/social-follow.png" alt="" />
       
      <div className="absolute top-16  md:top-20 mt-16">
        <div className="flex gap-4">
          <IconButton className="rounded bg-[#ea4335] hover:shadow-[#ea4335]/20 focus:shadow-[#ea4335]/20 active:shadow-[#ea4335]/10">
            <BsGoogle className=" text-lg" />
          </IconButton>
          <IconButton className="rounded bg-[#1DA1F2] hover:shadow-[#1DA1F2]/20 focus:shadow-[#1DA1F2]/20 active:shadow-[#1DA1F2]/10">
            <BsTwitter className=" text-lg" />
          </IconButton>
          <IconButton className="rounded bg-[#3B5998] hover:shadow-[#ea4c89]/20 focus:shadow-[#ea4c89]/20 active:shadow-[#ea4c89]/10">
            <FaFacebookF className=" text-lg" />
          </IconButton>
          <IconButton className="rounded bg-[#333333] hover:shadow-[#333333]/20 focus:shadow-[#333333]/20 active:shadow-[#333333]/10">
            <BsGithub className="fab fa-github text-lg" />
          </IconButton>
        </div>
      </div>
    
    </div>
  );
};

export default SocialButton;

