import React from 'react';
import { Link } from 'react-router-dom';
import {TbEye} from 'react-icons/tb'
import {MdOutlineFavoriteBorder} from 'react-icons/md'
import { Badge } from 'antd';

const NewArrival = () => {
    return (
      <div className="group p-3">
        <Badge.Ribbon text="New Arrive" color="gold">
          <div className="">
            <div className="relative overflow-hidden">
              <img
                className="rounded-lg"
                src="https://i.ibb.co/stW7VR0/left-banner.webp"
                alt=""
              />
              <div className="btn3">
                <div className="flex justify-end ">
                  <div className="flex flex-col mr-4 mt-8">
                    <Link to={`/alltoys`}>
                      <button className="btn2">
                        <TbEye className="h-5 w-5" />
                      </button>
                    </Link>
                    <button className="rounded-full p-1 flex items-center justify-center bg-white border border-blue-gray-100 mb-1 hover:bg-pink-300 hover:text-white transition-all duration-500">
                      <MdOutlineFavoriteBorder className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Badge.Ribbon>
      </div>
    );
};

export default NewArrival;


