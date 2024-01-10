// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { BiCalendar } from "react-icons/bi";
import { FiMessageCircle } from "react-icons/fi";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

const LatestNews = () => {
  const newses = [
    {
      title: "Nostro Expetenda Voluptatum ",
      img: "https://i.ibb.co/Dzn0kSy/5.webp",
      date: "25 jun",
      comment: 4,
      about:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate voluptatum fugiat excepturi, blanditiis culpa sequi eaque....",
    },
    {
      title: "Christmas Sale Is Here 8",
      img: "https://i.ibb.co/HrLvFQx/4.webp",
      date: "25 jun",
      comment: 4,
      about:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate voluptatum fugiat excepturi, blanditiis culpa sequi eaque....",
    },
    {
      title: "Viderer Voluptatum Te Eum",
      img: "https://i.ibb.co/bJxbBCR/8.webp",
      date: "25 jun",
      comment: 4,
      about:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate voluptatum fugiat excepturi, blanditiis culpa sequi eaque....",
    },
    {
      title: "Christmas Sale Is Here 8",
      img: "https://i.ibb.co/XyVnz5q/3.webp",
      date: "25 jun",
      comment: 4,
      about:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate voluptatum fugiat excepturi, blanditiis culpa sequi eaque....",
    },
    {
      title: "Christmas Sale Is Here 8",
      img: "https://i.ibb.co/Dzn0kSy/5.webp",
      date: "25 jun",
      comment: 4,
      about:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate voluptatum fugiat excepturi, blanditiis culpa sequi eaque....",
    },
  ];

  return (
    <div>
      <div className="hidden md:block mt-10 border-t border-l border-r  p-2 md:p-5 rounded-lg">
        <div className="font-extrabold uppercase text-center md:text-start mb-7  border-b  pb-4  flex space-x-4 items-center">
          <div className="bg-[#fc82bd] drop-shadow shadow-md rounded-full w-3 h-3"></div>
          <h4>Latest News</h4>
        </div>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {newses.map((item, index) => (
            <div key={index} className="mt-3">
              <SwiperSlide>
                <Link to={"/blogs"}>
                  <div className="group">
                    <div className="">
                      <div className="max-w-[300px] group-hover:scale-110 transition-all duration-1000 rounded-lg">
                        <img className="rounded-lg" src={item?.img} alt="" />
                      </div>
                      <div className="mt-4 flex flex-col items-start">
                        <div className="text-sm flex items-center space-x-3 text-blue-gray-600">
                          <div className="flex items-center space-x-2">
                            <BiCalendar />
                            <p>{item?.date}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FiMessageCircle />
                            <p>{item?.comment}</p>
                            <p>Comments</p>
                          </div>
                        </div>
                        <h4 className="text-blue-gray-700 font-semibold break-all ">
                          {item?.title}
                        </h4>
                        <h4 className="text-blue-gray-500 text-sm break-all">
                          {item?.about}
                        </h4>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            </div>
          ))}
        </Swiper>
      </div>

      {/* for mobile device  */}
      <div className="md:hidden mt-6 border p-2 md:p-5 rounded-lg ">
      <div className="font-extrabold uppercase text-center md:text-start mb-5 md:mb-0 border-b md:border-0 pb-4 md:pb-0 flex space-x-4 items-center">
          <div className="bg-[#fc82bd] drop-shadow shadow-md rounded-full w-3 h-3"></div>
          <h4>Latest News</h4>
        </div>
        <div className="group">
          <div className="">
            <div className="max-w-[300px] group-hover:scale-110 transition-all duration-1000 rounded-lg">
              <img
                className="object-cover rounded-lg"
                src="https://i.ibb.co/Dzn0kSy/5.webp"
                alt=""
              />
            </div>
            <div className="mt-4 flex flex-col items-start">
              <div className="text-sm flex items-center space-x-3 text-blue-gray-600">
                <div className="flex items-center space-x-2">
                  <BiCalendar />
                  <p>24 jun</p>
                </div>
                <div className="flex items-center space-x-2">
                  <FiMessageCircle />
                  <p>4</p>
                  <p>Comments</p>
                </div>
              </div>
              <h4 className="text-blue-gray-700 font-semibold break-all ">
                Nostro Expetenda Voluptatum
              </h4>
              <h4 className="text-blue-gray-500 text-sm break-all">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptate voluptatum fugiat excepturi, blanditiis culpa sequi
                eaque....
              </h4>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Link to={"/blogs"}>
            <button className="bg-[#f0c507] px-3 py-2 md:px-4 md:py-2 rounded-lg text-black text-xs md:text-[14px] inline-block uppercase hover:bg-[#fc82bd] hover:text-white transition-all duration-500">
              View all
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
