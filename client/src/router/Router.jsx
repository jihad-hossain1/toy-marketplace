import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main/Main";
import Home from "../pages/home/Home";
import AllToy from "../pages/allToy/AllToy";
import Contact from "../pages/contact/Contact";
import Blogs from "../pages/blogs/Blogs";
import { Login } from "../pages/log/Login";
import ToyDetails from "../pages/allToy/toyDetails/ToyDetails";
import AdminDashboard from "../layouts/admin/AdminDashboard";
import AdminDashboardHome from "../pages/dashboard/admin/adminDashboardHome/AdminDashboardHome";
import SellerDashboardHome from "../pages/dashboard/seller/SellerDashboardHome";
import UserDashboard from "../layouts/user/UserDashboard";
import UserDashboardHome from "../pages/dashboard/user/userProfile/UserDashboardHome";
import AddToy from "../pages/dashboard/seller/addToy/AddToy";
import ManageToy from "../pages/dashboard/seller/manageToy/ManageToy";
import Carts from "../pages/dashboard/user/userProfile/Carts";
import UserCart from "../pages/dashboard/user/UserCart";
import UserProfile from "../pages/dashboard/user/userProfile/UserProfile";
import SellerDashboard from "../layouts/seller/SellerDashboard";
import WhiteList from "../pages/dashboard/user/whiteList/WhiteList";
import About from "../pages/about/About";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/alltoys",
        element: <AllToy></AllToy>,
      },
      {
        path: "/singletoy/:id",
        element: <ToyDetails></ToyDetails>,
      },

      {
        path: "/contact",
        element: <Contact></Contact>,
      },

      {
        path: "/blogs",
        element: <Blogs></Blogs>,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  {
    path: "/dashboardAdminOnly",
    element: <AdminDashboard />,
    children: [
      {
        path: "/dashboardAdminOnly",
        element: <AdminDashboardHome />,
      },
    ],
  },
  {
    path: "/userDashborad",
    element: <UserDashboard />,
    children: [
      {
        path: "/userDashborad",
        element: <UserDashboardHome />,
      },
      {
        path: "/userDashborad/profile",
        element: <UserProfile />,
      },
      {
        path: "/userDashborad/users/cart",
        element: <UserCart />,
      },
      {
        path: "/userDashborad/whitelist",
        element: <WhiteList></WhiteList>,
      },
      {
        path: "/userDashborad/checkout",
        element: <div>checkout</div>,
      },
    ],
  },
  {
    path: "/dashboardSellerOnly",
    element: <SellerDashboard />,
    children: [
      {
        path: "/dashboardSellerOnly",
        element: <SellerDashboardHome />,
      },
      {
        path: "/dashboardSellerOnly/addToy",
        element: <AddToy />,
      },
      {
        path: "/dashboardSellerOnly/manageToy",
        element: <ManageToy />,
      },
      {
        path: "/dashboardSellerOnly/carts",
        element: <Carts />,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
]);
