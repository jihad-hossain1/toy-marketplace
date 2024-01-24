import { Button, Input, TabPanel, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import Icon from "react-icons-kit";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, userLogin } from "../../redux/features/auth/authSlice";

const LoginT = () => {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [typeOfPassword, setTypeOfPassword] = useState("password");
  const [iconEye, setIconEye] = useState(eyeOff);
  const handlePasswordShowToggle = () => {
    if (typeOfPassword === "password") {
      setIconEye(eye);
      setTypeOfPassword("text");
    } else {
      setIconEye(eyeOff);
      setTypeOfPassword("password");
    }
  };

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth?.loading);

  const handleSubmitsLogIn = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
      username,
    };

    const response = await dispatch(userLogin(data));

    const user = await dispatch(getCurrentUser());

    if (user && response?.payload) {
      toast.success("Login Successfull");
      // setTimeout(() => {
      //   navigate("/");
      // }, 2000);
    }
  };

  return (
    <>
      <TabPanel value="card" className="p-0">
        <form
          onSubmit={handleSubmitsLogIn}
          className="mt-12 flex flex-col  gap-1"
        >
          <Input
            value={username}
            onChange={(e) => setusername(e.target.value)}
            color="pink"
            label="User Name"
            variant="outlined"
            name="username"
          />
          <div className="text-center text-xs text-pink-400">Or</div>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            color="pink"
            label="Your Email"
            variant="outlined"
            name="email"
          />
          <div className="flex my-4">
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type={typeOfPassword}
              color="pink"
              label="Password"
              variant="outlined"
              name="password"
            />
            <span
              class="flex justify-around items-center cursor-pointer"
              onClick={handlePasswordShowToggle}
            >
              <Icon className="absolute mr-10" icon={iconEye} size={16} />
            </span>
          </div>
          <Button
            type="submit"
            color="amber"
            size="lg"
            variant="gradient"
            disabled={loading}
          >
            {loading ? "Loading..." : "Log In"}
          </Button>
          <Typography
            variant="small"
            color="gray"
            className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
          >
            <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Please make sure
            valid information
          </Typography>
        </form>
        <Button
          onClick={() => {
            setusername("guset");
            setEmail("guest@example.com");
            setPassword("123456");
          }}
          className="w-full mt-2"
          type="button"
          color="green"
          size="md"
          variant="gradient"
        >
          Demo Credential
        </Button>
        <div className="flex flex-col items-center gap-4 py-2">
          <Link to={"/"}>
            <Button variant="text" className="flex items-center gap-2">
              <HiOutlineArrowNarrowLeft className="h-5 w-5" /> Go Home
            </Button>
          </Link>
        </div>
      </TabPanel>
    </>
  );
};

export default LoginT;
