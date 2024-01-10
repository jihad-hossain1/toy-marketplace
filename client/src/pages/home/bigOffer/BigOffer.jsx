import React from "react";
// const imgUrl = {
//     img1: 'https://i.ibb.co/b7wbjJ3/banner-1-532x299.webp'
// }
const BigOffer = () => {
  return (
    <div className=" md:flex md:space-x-2 md:items-center md:justify-between mt-6 ">
      <div className=" group">
        <div className=" flex space-x-4">
          <div className="rounded-lg flex flex-col md:flex-row justify-between bg-[#6eb1ef] bg-opacity-70 w-[300px] md:w-[470px] p-6 md:h-[300px]">
           
            <div className="flex flex-col justify-center items-center space-y-3">
              <h4 className="text-2xl font-semibold text-center">50% Off</h4>
              <h4 className="text-3xl font-extrabold text-center text-white">
                Big Offer
              </h4>
              <div className="">
                <button className="bg-[#fc82bd]  px-3 py-2 rounded-lg text-black text-xs md:text-[14px] inline-block uppercase hover:text-white transition-all duration-500">
                  shop now
                </button>
              </div>
            </div>
            <div className="w-96">
            <img
              className="max-w-96 object-cover group-hover:scale-105 transition-all duration-700"
              src="https://i.ibb.co/NytpgVW/dog.png"
              alt=""
            />
            </div>
          </div>
        </div>
      </div>
      
      <div className=" group">
        <div className=" flex space-x-4">
          <div className="rounded-lg flex flex-col md:flex-row justify-between bg-pink-300 bg-opacity-70 w-[300px] md:w-[470px] p-6 md:h-[300px]">
            <img
              className=" object-cover group-hover:scale-105 transition-all duration-700"
              src="https://i.ibb.co/Mp93cy7/pig.png"
              alt=""
            />
            <div className="flex flex-col justify-center items-center space-y-3">
              <h4 className="text-2xl font-semibold text-center">50% Off</h4>
              <h4 className="text-3xl font-extrabold text-center text-white">
                Big Offer
              </h4>
              <div className="">
                <button className="bg-[#f0c507]  px-3 py-2 rounded-lg text-black text-xs md:text-[14px] inline-block uppercase hover:text-white transition-all duration-500">
                  shop now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default BigOffer;
// style={{
//     backgroundImage: `url(${trnad[currentIndex]?.images?.img?.img1})`,
//   }}

//
// https://i.ibb.co/NytpgVW/dog.png
// https://i.ibb.co/Mp93cy7/pig.png