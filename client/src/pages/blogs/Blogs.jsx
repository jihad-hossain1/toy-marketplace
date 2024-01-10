import React from "react";
import { Link } from "react-router-dom";

const Blogs = () => {
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
      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
            From the blog
          </h1>

          <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
            {
                newses.map((item,index)=><div key={index} className="lg:flex">
                <img
                  className="object-cover w-full h-56 rounded-lg lg:w-64"
                  src={item?.img}
                  alt=""
                />
  
                <div className="flex flex-col justify-between py-6 lg:mx-6">
                  <Link
                    href="#"
                    className="text-xl font-semibold text-gray-800 hover:underline dark:text-white "
                  >
                   {item?.about}
                  </Link>
  
                  <span className="text-sm text-gray-500 dark:text-gray-300">
                    On: 20 October 2023
                  </span>
                </div>
              </div>)
            }
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
