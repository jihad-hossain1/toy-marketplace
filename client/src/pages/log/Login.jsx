import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
} from "@material-tailwind/react";
import { FcKey } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Register from "./Register";
import LoginT from "./LoginT";
import { useState } from "react";
import { useSelector } from "react-redux";

export const Login = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  if (isAuthenticated) {
    return (
      <div className="flex justify-center min-h-[70vh] items-center">
        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-2xl lg:text-4xl">
            You are already LoggedIn
          </h4>
          <Link
            className="text-blue-700 font-semibold text-center px-4 py-1 border "
            to={"/"}
          >
            Go Back
          </Link>
        </div>
      </div>
    );
  }
  const [type, setType] = useState("card");

  return (
    <div className="bg-pink-50 min-h-screen px-2 py-4">
      <Toaster />
      <div className="min-h-screen  flex flex-col justify-center relative overflow-hidden ">
        <div className="max-w-7xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-300 to-pink-300 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative  ring-1 ring-gray-900/5 rounded-lg leading-none  ">
              <Card className="w-[350px] md:w-[400px]">
                <CardHeader
                  color="pink"
                  floated={false}
                  shadow={false}
                  className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
                >
                  <div className="mb-4 rounded-full border border-white/10 bg-white/10 p-6 text-white">
                    <FcKey className="h-10 w-10" />
                  </div>
                  <Typography variant="h4" color="white">
                    LogIn Your Account Here
                  </Typography>
                </CardHeader>
                <CardBody>
                  <Tabs value={type} className="overflow-visible">
                    <TabsHeader className="relative z-0 ">
                      <Tab value="card" onClick={() => setType("card")}>
                        Log In
                      </Tab>
                      <Tab value="paypal" onClick={() => setType("paypal")}>
                        Register
                      </Tab>
                    </TabsHeader>
                    <TabsBody
                      className="!overflow-x-hidden !overflow-y-hidden"
                      animate={{
                        initial: {
                          x: type === "card" ? 400 : -400,
                        },
                        mount: {
                          x: 0,
                        },
                        unmount: {
                          x: type === "card" ? 400 : -400,
                        },
                      }}
                    >
                      {/* Login panel  */}
                      <LoginT />
                      {/* register panel  */}
                      <Register />
                    </TabsBody>
                  </Tabs>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
