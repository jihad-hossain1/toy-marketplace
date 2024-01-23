import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../redux/features/auth/authSlice";
import NotLoginPage from "./NotLoginPage";
import { Link } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth?.userData);
  // console.log(user);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getCurrentUser());
  // }, [dispatch]);
  useEffect(() => {
    if (!user) {
      console.log("user are not found");
    }
    dispatch(getCurrentUser());
  }, [dispatch]);
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="flex flex-col items-center">
          <div className="uppercase text-2xl font-semibold">
            your are not logged your Account
          </div>
          <div className="w-fit">
            <Link to={"/login"}>Log-In</Link>
          </div>
        </div>
      </div>
    );
  } else {
    return children;
  }
  // !user ? <NotLoginPage /> : children;
};

export default ProtectedRoute;
