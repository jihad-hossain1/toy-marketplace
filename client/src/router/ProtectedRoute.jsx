import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth?.userData);
  const loading = useSelector((state) => state.auth?.loading);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[70vh] ">
        <h4 className="text-2xl">Loading....</h4>
      </div>
    );
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
};

export default ProtectedRoute;
