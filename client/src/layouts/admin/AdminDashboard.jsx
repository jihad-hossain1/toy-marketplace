import React from 'react';
import { Outlet, Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <nav className="flex items-center gap-10 bg-gray-700 text-white py-4">
        <Link to={"/dashboardAdminOnly"}>Admin Dashboard</Link>
        <Link to={"/dashboardAdminOnly/toyManage"}>Toys Manage</Link>
        <Link to={"/dashboardAdminOnly/blogManage"}>Blogs Manage</Link>
      </nav>
      <Outlet></Outlet>
    </div>
  );
};

export default AdminDashboard;