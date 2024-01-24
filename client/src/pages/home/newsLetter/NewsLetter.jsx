import React from "react";
import { BsEnvelopePaperHeart } from "react-icons/bs";
import { Button, Input } from "@material-tailwind/react";
import toast, { Toaster } from "react-hot-toast";
const NewsLetter = () => {
  const handleSubmit =(e)=>{
    e.preventDefault()
    const form = e.target;
    const email = form.email.value;
    if(email){
      toast.success('Thank U For Subscribe')
      form.reset()
    }
  }
  return (
    <div className="bg-blue-gray-50 bg-opacity-50 rounded-lg p-2 md:p-5">
      <div>
        <div className="font-extrabold uppercase text-center md:text-start mb-5  border-b border-blue-gray-200  pb-4  flex space-x-4 items-center">
          <div className="bg-[#fc82bd] drop-shadow shadow-md rounded-full w-3 h-3"></div>
          <h4>NEWSLETTER</h4>
        </div>
      </div>
      <div>
        <div className="flex flex-col justify-center items-center space-y-4">
          <BsEnvelopePaperHeart className="text-4xl text-[#fc82bd]" />
          <h4 className="text-blue-gray-800 font-semibold text-xl">
            Sign Up & Get News
          </h4>
          <p className="text-center break-all text-blue-gray-600">
            Contrary to popular belief, Lorem is not simply random text
          </p>
        </div>
        <div className="mt-4">
          <form action="" onSubmit={handleSubmit}>
            <div className="mb-3">
              <Input
                label="Your Email"
                name="email"
                type="email"
                required
                className=""
                color="pink"
              />
            </div>
            <div className="mb-3">
              <Button
                type="submit"
                className="bg-[#f0c507] px-2 py-2 w-full md:px-4 md:py-2 rounded-lg text-black text-xs md:text-[14px] inline-block uppercase hover:bg-[#fc82bd] hover:text-white transition-all duration-500"
              >
                subscribe
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
