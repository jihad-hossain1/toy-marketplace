import { useDispatch } from "react-redux";
import { getCurrentUser } from "./redux/features/auth/authSlice";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Main from "./layouts/Main/Main";
import { useEffect } from "react";
import Home from "./pages/home/Home";
import AllToy from "./pages/allToy/AllToy";
import ToyDetails from "./pages/allToy/toyDetails/ToyDetails";
import Contact from "./pages/contact/Contact";
import Blogs from "./pages/blogs/Blogs";
import About from "./pages/about/About";
import ProtectedRoute from "./router/ProtectedRoute";
import SellerDashboard from "./layouts/seller/SellerDashboard";
import SellerDashboardHome from "./pages/dashboard/seller/SellerDashboardHome";
import UserDashboardHome from "./pages/dashboard/user/userProfile/UserDashboardHome";
import UserCart from "./pages/dashboard/user/UserCart";
import { Login } from "./pages/log/Login";
import AdminDashboard from "./layouts/admin/AdminDashboard";
import AdminDashboardHome from "./pages/dashboard/admin/adminDashboardHome/AdminDashboardHome";
import UserProfile from "./pages/dashboard/user/userProfile/UserProfile";
import WhiteList from "./pages/dashboard/user/whiteList/WhiteList";
import UserDashboard from "./layouts/user/UserDashboard";
import AddToy from "./pages/dashboard/seller/addToy/AddToy";
import ManageToy from "./pages/dashboard/seller/manageToy/ManageToy";
import ToyManage from "./pages/dashboard/admin/ToyManage/ToyManage";
import ManageBlogs from "./pages/dashboard/admin/ManageBlogs/ManageBlogs";
import AdminProtectRoute from "./router/AdminProtectRoute";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Routes>
        {/* Main Routes  */}
        <Route path="/" element={<Main />}>
          <Route path="" element={<Home />} />
          <Route path="/alltoys" element={<AllToy />} />
          <Route path="/singletoy/:id" element={<ToyDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/about" element={<About />} />
        </Route>

        {/* Admin Routes  */}
        <Route
          path="/dashboardAdminOnly"
          element={
            <AdminProtectRoute>
              <AdminDashboard />
            </AdminProtectRoute>
          }
        >
          <Route path="/dashboardAdminOnly" element={<AdminDashboardHome />} />
          <Route path="/dashboardAdminOnly/toyManage" element={<ToyManage />} />
          <Route
            path="/dashboardAdminOnly/blogManage"
            element={<ManageBlogs />}
          />
        </Route>

        {/* Seller Routes  */}
        <Route
          path="/dashboardSellerOnly"
          element={
            <ProtectedRoute>
              <SellerDashboard />
            </ProtectedRoute>
          }
        >
          <Route
            path="/dashboardSellerOnly"
            element={<SellerDashboardHome />}
          />
          <Route path="/dashboardSellerOnly/addToy" element={<AddToy />} />
          <Route
            path="/dashboardSellerOnly/manageToy"
            element={<ManageToy />}
          />
        </Route>

        {/* user Routes  */}
        <Route
          path="/userDashborad"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="/userDashborad" element={<UserDashboardHome />} />
          <Route path="/userDashborad/profile" element={<UserProfile />} />
          <Route path="/userDashborad/whitelist" element={<WhiteList />} />
          <Route path="/userDashborad/users/cart" element={<UserCart />} />
        </Route>

        {/* Login Routes  */}
        <Route path="/login" element={<Login />} />
      </Routes>

      <Toaster
        position="top-right"
        reverseOrder={true}
        toastOptions={{
          error: {
            style: { borderRadius: "0", color: "red" },
          },
          success: {
            style: { borderRadius: "0", color: "green" },
          },
          duration: 2000,
        }}
      />
    </>
  );
}

export default App;
