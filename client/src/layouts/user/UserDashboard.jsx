import { useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getCurrentUser } from "../../redux/features/auth/authSlice";

const UserDashboard = () => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getCurrentUser());
  // }, [dispatch]);

  return (
    <div className="dark:bg-gray-900 dark:text-gray-50 bg-pink-50/20">
      <nav className="flex justify-center items-center gap-4 bg-pink-50 dark:bg-gray-800 py-4">
        <Link to={"/userDashborad/profile"}>Profile</Link>
        <Link to={"/userDashborad/users/cart"}>Cart</Link>
        <Link to={"/userDashborad/whitelist"}>whitelist</Link>
      </nav>
      <div className="max-w-screen-2xl mx-auto px-2 min-h-screen py-2">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default UserDashboard;
