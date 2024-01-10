import React from 'react';
import { Link, Outlet } from "react-router-dom";

const UserDashboard = () => {
  return (
    <div className="bg-gray-900 text-gray-50">
      <nav className="flex justify-center items-center gap-4">
        <Link to={"/userDashborad/profile"}>Profile</Link>
        <Link to={"/userDashborad/users/cart"}>Cart</Link>
        <Link to={"/userDashborad/whitelist"}>whitelist</Link>
      </nav>
      <div className="max-w-screen-xl mx-auto px-2 min-h-screen">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default UserDashboard;