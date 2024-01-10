
import React from "react";
import { NavLink } from "react-router-dom";


export const navList = (
  <>
    <NavLink
      to={`/`}
      className={({ isActive }) =>
        isActive
          ? "text-pink-400 font-semibold"
          : "text-black md:text-white font-semibold hover:text-pink-500"
      }
    >
      <li className="uppercase text-sm">Home</li>
    </NavLink>
    <NavLink
      to={`/alltoys`}
      className={({ isActive }) =>
        isActive
          ? "text-pink-400 font-semibold"
          : "text-black md:text-white font-semibold hover:text-pink-500"
      }
    >
      <li className="uppercase text-sm">All Toys</li>
    </NavLink>
    <NavLink
      to={`/blogs`}
      className={({ isActive }) =>
        isActive
          ? "text-pink-400 font-semibold"
          : "text-black md:text-white font-semibold hover:text-pink-500"
      }
    >
      <li className="uppercase text-sm">Blogs</li>
    </NavLink>
    {/* <NavLink
          to={`/tranding`}
          className={({ isActive }) => (isActive ? "text-pink-400 font-semibold" : "text-black md:text-white font-semibold hover:text-pink-500")}
        >
          <li className="uppercase text-sm">Tranding</li>
        </NavLink> */}
    <NavLink
      to={`/contact`}
      className={({ isActive }) =>
        isActive
          ? "text-pink-400 font-semibold"
          : "text-black md:text-white font-semibold hover:text-pink-500"
      }
    >
      <li className="uppercase text-sm">Contact</li>
    </NavLink>
    <NavLink
      to={`/about`}
      className={({ isActive }) =>
        isActive
          ? "text-pink-400 font-semibold"
          : "text-black md:text-white font-semibold hover:text-pink-500"
      }
    >
      <li className="uppercase text-sm">About</li>
    </NavLink>
  </>
);
const DesktopNav = () => {

  return (
    <>
    <div className="md:bg-gray-900">
        <div className="container mx-auto flex justify-center">
      <div>
        <ul className="hidden md:flex space-x-6  py-4">
          {navList}
        </ul>
        
      </div>
    </div>
    </div>
    
    </>
  );
};

export default DesktopNav;


