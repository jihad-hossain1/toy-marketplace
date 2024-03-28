import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const AdminProtectRoute = ({ children }) => {
  const user = useSelector((state) => state.auth?.userData);
  const loading = useSelector((state) => state.auth?.loading);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[70vh] ">
        <h4 className="text-2xl">Loading....</h4>
      </div>
    );
  if (user?.role == "admin") {
    return children;
  } else {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="flex flex-col items-center">
          <div className="uppercase text-2xl font-semibold">
            your are not allow this section
          </div>
          <div className="w-fit mt-4">
            <Link to={"/login"} className="">
              <Button variant="gradient" color="pink">
                Log-In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default AdminProtectRoute;
