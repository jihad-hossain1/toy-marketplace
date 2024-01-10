
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";

import {BiArrowBack} from 'react-icons/bi'
const SellerNavbar = () => {
    const [openNav, setOpenNav] = useState(false);
 
    useEffect(() => {
      window.addEventListener(
        "resize",
        () => window.innerWidth >= 960 && setOpenNav(false)
      );
    }, []);
   
    const navList = (
      <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <NavLink className={({isActive})=>isActive ? 'text-pink-500 flex items-center' : 'flex items-center'}  to={`/dashboardSellerOnly/manageToy`} >
            Manage Toys
          </NavLink>
        </Typography>
        
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <NavLink className={({isActive})=>isActive ? 'text-pink-500 flex items-center' : 'flex items-center'} to={`/dashboardSellerOnly/carts`} >
            Carts
          </NavLink>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <NavLink  to={`/dashboardSellerOnly`} >
            Dash-Home
          </NavLink>
        </Typography>
      </ul>
    );
    return (
        <div className=" bg-pink-50 bg-opacity-30">
           <div className="container mx-auto mt-2 -m-6 max-h-screen  w-full">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
        <NavLink  to={'/'}>
            <Button variant="outlined" size="sm" fullWidth className=" flex items-center space-x-2 rounded py-1">
            <BiArrowBack className="text-xl hover:text-pink-400" /> <span>Home</span> 
          </Button>
          </NavLink>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <Typography
            as="a"
            to={``}
            className="mr-4 cursor-pointer py-1.5 font-bold"
          >
            Seller Dashboard
          </Typography>
            
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}
          
        </MobileNav>
      </Navbar>
      
    </div>
        </div>
    );
};

export default SellerNavbar;



 
