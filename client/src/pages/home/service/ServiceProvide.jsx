import React from 'react';
import {
  Typography,
  MenuItem,
} from "@material-tailwind/react";
import {
  GiftIcon,

} from "@heroicons/react/24/outline";
import {TbTruckDelivery} from 'react-icons/tb'
import {FcOnlineSupport} from 'react-icons/fc'
import {PiPiggyBankFill} from 'react-icons/pi'
import { createElement } from 'react';
const colors = {
    blue: "bg-blue-50 text-blue-500",
    orange: "bg-orange-50 text-orange-500",
    green: "bg-green-50 text-green-500",
    "blue-gray": "bg-blue-gray-50 text-blue-gray-500",
    purple: "bg-purple-50 text-purple-500",
    teal: "bg-teal-50 text-teal-500",
    cyan: "bg-cyan-50 text-cyan-500",
    pink: "bg-pink-50 text-pink-500",
  };
  const navListMenuItems = [
    
    {
      color: "pink",
      icon: GiftIcon,
      title: "Gift Voucher",
      description: "Lorem ipsum dumi text",
    },
    {
      color: "teal",
      icon: TbTruckDelivery,
      title: "Worldwide Delivery",
      description: "Lorem ipsum dumi text",
    },
    {
      color: "orange",
      icon: FcOnlineSupport,
      title: "24X7 Support",
      description: "Lorem ipsum dumi text",
    },
    {
      color: "green",
      icon: PiPiggyBankFill,
      title: "Great Saving",
      description: "Lorem ipsum dumi text",
    },
  ];
const ServiceProvide = () => {

    const renderItems = navListMenuItems.map(
        ({ icon, title, description, color }, key) => (
          <div className='cursor-pointer group' key={key}>
            <div className='cursor-pointer relative'>
            <MenuItem className=" flex  flex-col justify-center items-center  gap-3 rounded-lg">
              <div className={`rounded-lg p-5 ${colors[color]} group-hover:[transform:rotateY(180deg)] transition-all duration-300`}>
                {createElement(icon, {
                  strokeWidth: 2,
                  className: "h-10 w-10",
                })}
              </div>
              <div>
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="text-center group-hover:scale-125  transform-gpu transition-all duration-700"
                >
                  {title}
                </Typography>
                <Typography variant="small" color="gray" className="font-normal text-center">
                  {description}
                </Typography>
              </div>
            </MenuItem>
          </div>
          </div>
        )
      );
    return (
        <div className='grid grid-cols-2 md:grid-cols-4 border rounded-lg gap-3 p-4 md:p-6 mt-4'>
            {renderItems}
        </div>
    );
};

export default ServiceProvide;