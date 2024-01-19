import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  useCurrentUserQuery,
  useRefreshTokenMutation,
} from "../../redux/features/api/authApi";
import { logout, setUser } from "../../redux/features/auth.sclice";

const UserDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [refreshToken] = useRefreshTokenMutation();
  const { data: currentUser } = useCurrentUserQuery();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser && !isAuthenticated) {
      dispatch(setUser(JSON.parse(storedUser)));
    }

    const handleRefreshToken = async () => {
      try {
        const { data } = await refreshToken();
        dispatch(setUser(data.data.user));
        // Save updated user data to localStorage
        localStorage.setItem("user", JSON.stringify(data.data.user));
      } catch (error) {
        // Handle token refresh failure
        // dispatch(logout());
      }
    };

    if (isAuthenticated && currentUser) {
      // TODO User is authenticated and current user data is available
    } else if (isAuthenticated) {
      // This may happen if the user's access token has expired
      handleRefreshToken();
    } else {
      // User is not authenticated
      navigate("/");
    }
  }, [dispatch, refreshToken, isAuthenticated, currentUser]);

  // console.log(user);
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
