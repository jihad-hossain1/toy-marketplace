import { Link, NavLink } from "react-router-dom";
import { VscTag } from "react-icons/vsc";
import { IoLogoUsd } from "react-icons/io";
import { PiCurrencyGbpBold } from "react-icons/pi";
import { TbLogin2, TbHelpTriangleFilled } from "react-icons/tb";
import { RiHeartPulseFill } from "react-icons/ri";
import { LuLayoutDashboard } from "react-icons/lu";
import { BiChevronDown, BiLogOut } from "react-icons/bi";
import { MdAddShoppingCart } from "react-icons/md";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import { Badge } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  getCurrentUser,
  userLogout,
} from "../../../redux/features/auth/authSlice";

const TopHeader = () => {
  const user = useSelector((state) => state.auth?.userData);

  const seller = user?.role == "seller";
  const admin = user?.role == "admin";

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userLogout());
  };

  // useEffect(() => {
  //   if (!user) {
  //     console.log("user are not found");
  //   }
  //   dispatch(getCurrentUser());
  // }, [dispatch]);
  return (
    <>
      <div className="bg-blue-gray-50 text-gray-700">
        <div className="container mx-auto flex md:items-center md:justify-between justify-center  md:px-0">
          <div className="hidden md:block">
            <h4 className="flex text-gray-700 space-x-3 items-center">
              <VscTag />
              <span> Welcome To Our Toy Store</span>
            </h4>
          </div>
          <div className="py-2 px-1">
            <ul className="flex space-x-3 items-center">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `text-pink-400 flex items-center space-x-2 hover:text-pink-300`
                    : ` flex items-center space-x-2 hover:text-pink-300`
                }
                to={"/userDashborad/whitelist"}
              >
                <li className="text-sm md:text-md">whiteList</li>
                <Badge
                  color="gold"
                  text=""
                  size="small"
                  // count={whitelist ? whitelist.length : 0}
                >
                  <RiHeartPulseFill className="text-pink-400 text-xl" />
                </Badge>
              </NavLink>
              <div className="h-[10px] min-h-[20px] w-px self-stretch bg-gradient-to-tr from-transparent via-blue-gray-900 to-transparent opacity-20 dark:opacity-100"></div>
              <li className="cursor-pointer ">
                <Menu>
                  <MenuHandler>
                    <button className="flex space-x-2 items-center">
                      <span className="text-sm md:text-md">
                        {user ? user?.username : "Account"}
                      </span>{" "}
                      <BiChevronDown className="text-md md:text-xl" />
                    </button>
                  </MenuHandler>
                  <MenuList>
                    {user ? (
                      <>
                        <Link to={"/"}>
                          <MenuItem className="flex space-x-2 items-center">
                            <Avatar
                              size="sm"
                              alt="user photo"
                              src={
                                user?.avatar
                                  ? user?.avatar
                                  : "https://i.ibb.co/R7B1dV8/cat4.png"
                              }
                              className="border border-yellow-500 shadow-xl shadow-green-900/20 ring-4 ring-pink-200/30 mr-2"
                            />{" "}
                            <span>Profile</span>
                          </MenuItem>
                        </Link>

                        <Link to={"/userDashborad/users/cart"}>
                          <MenuItem className="flex space-x-2 items-center">
                            <MdAddShoppingCart className="text-xl" />
                            <span>Cart</span>
                          </MenuItem>
                        </Link>
                        {seller ? (
                          <Link to={"/dashboardSellerOnly"}>
                            <MenuItem className="flex space-x-2 items-center">
                              <LuLayoutDashboard className="text-xl" />
                              <span>Dashboard</span>
                            </MenuItem>
                          </Link>
                        ) : (
                          ""
                        )}
                        {admin && (
                          <Link to={"/dashboardAdminOnly"}>
                            <MenuItem className="flex space-x-2 items-center">
                              <LuLayoutDashboard className="text-xl" />
                              <span>Admin</span>
                            </MenuItem>
                          </Link>
                        )}
                        <button onClick={() => handleLogout()}>
                          <MenuItem
                            onClick={""}
                            className="flex space-x-2 items-center"
                          >
                            <BiLogOut className="text-xl" />
                            <span>Log-Out</span>
                          </MenuItem>
                        </button>
                      </>
                    ) : (
                      <>
                        <Link to={"/login"}>
                          <MenuItem className="flex space-x-2 items-center">
                            <TbLogin2 className="text-xl" /> <span>Log-In</span>
                          </MenuItem>
                        </Link>
                      </>
                    )}
                    <MenuItem className="flex space-x-2 items-center">
                      <TbHelpTriangleFilled className="text-xl" />
                      <span>Help</span>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </li>
              <div className="h-[10px] min-h-[20px] w-px self-stretch bg-gradient-to-tr from-transparent via-blue-gray-900 to-transparent opacity-20 dark:opacity-100"></div>
              <li className="cursor-pointer">
                <Menu>
                  <MenuHandler>
                    <button className="flex space-x-2 items-center">
                      <span className="text-sm md:text-md">USD $</span>
                      <BiChevronDown className="text-md md:text-xl" />
                    </button>
                  </MenuHandler>
                  <MenuList>
                    <MenuItem className="flex space-x-2 items-center">
                      <IoLogoUsd className="text-xl" /> <span>USD</span>
                    </MenuItem>
                    <MenuItem className="flex space-x-2 items-center">
                      <PiCurrencyGbpBold className="text-xl" /> <span>GBP</span>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </li>
              <div className="h-[10px] min-h-[20px] w-px self-stretch bg-gradient-to-tr from-transparent via-blue-gray-900 to-transparent opacity-20 dark:opacity-100"></div>
              <li className="cursor-pointer">
                <Menu>
                  <MenuHandler>
                    <button className="flex space-x-2 items-center">
                      <span className="text-sm md:text-md">English</span>{" "}
                      <BiChevronDown className="text-md md:text-xl" />
                    </button>
                  </MenuHandler>
                  <MenuList>
                    <MenuItem className="text-center"> English</MenuItem>
                    <MenuItem className="text-center"> العربية</MenuItem>
                    <MenuItem className="text-center"> Espenol</MenuItem>
                  </MenuList>
                </Menu>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopHeader;
