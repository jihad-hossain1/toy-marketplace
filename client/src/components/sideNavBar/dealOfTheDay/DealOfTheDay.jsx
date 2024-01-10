import { useState } from "react";

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useGetProductsQuery } from "../../../redux/features/api/productApi";
import Skeleton from "../../skeleton/Skeleton";

const DealOfTheDay = () => {
  const {
    data: products,
    error,
    isLoading,
    isError,
  } = useGetProductsQuery() || {};

  if (isError) {
    return <div>{error.message}</div>;
  }
  const containerStyles = {
    with: "500px",
    height: "380px",
    margin: "0 auto",
  };
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? products?.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = () => {
    const isLastSlide = currentIndex === products?.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className=" min-h-[100px] bg-gray-50 bg-opacity-30 p-2 border rounded-lg">
      <div style={containerStyles} className="h-full w-full p-2">
        <>
          <div className="flex md:justify-between space-x-2 mb-2">
            <div className="uppercase font-extrabold  flex items-center space-x-4 border-b pb-3">
              <div className="bg-[#fc82bd] drop-shadow shadow-md rounded-full w-3 h-3 fontStyle"></div>{" "}
              <h4> deal Of The Day</h4>
            </div>
            {/* only for desktop side nav button slier  */}
            <div className="hidden md:block space-x-1">
              <button
                className="bg-[#f0c507]  p-1  rounded text-black text-xs md:text-[14px] inline-block uppercase hover:bg-[#fc82bd] hover:text-white transition-all duration-500"
                onClick={goToPrevious}
              >
                <AiOutlineLeft />
              </button>
              <button
                className="bg-[#f0c507]  p-1  rounded text-black text-xs md:text-[14px] inline-block uppercase hover:bg-[#fc82bd] hover:text-white transition-all duration-500"
                onClick={goToNext}
              >
                <AiOutlineRight />
              </button>
            </div>
          </div>
          {/* main slider components  */}
          <div className="relative h-full ">
            {/* main slider  */}
            {isLoading ? (
              <Skeleton />
            ) : (
              <div
                style={{
                  backgroundImage: `url(${products[currentIndex]?.image})`,
                }}
                className="w-full h-full rounded  bg-contain bg-no-repeat relative"
              >
                <div className="absolute bottom-5">
                  <div className="text-3xl">{/* 20% off */}</div>
                </div>
              </div>
            )}
          </div>

          {/* only for mobile device button slider */}
          <div className="md:hidden flex justify-center items-center">
            <div className="md:hidden space-x-1 mt-2">
              <button
                className="bg-[#f0c507]  p-2  rounded text-black text-xs md:text-[14px] inline-block uppercase hover:bg-[#fc82bd] hover:text-white transition-all duration-500"
                onClick={goToPrevious}
              >
                <AiOutlineLeft className="text-xl" />
              </button>
              <button
                className="bg-[#f0c507]  p-2  rounded text-black text-xs md:text-[14px] inline-block uppercase hover:bg-[#fc82bd] hover:text-white transition-all duration-500"
                onClick={goToNext}
              >
                <AiOutlineRight className="text-xl" />
              </button>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default DealOfTheDay;
