import { Button, Input, TabPanel, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import Icon from "react-icons-kit";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { useRegisterUserMutation } from "../../redux/features/api/userApi";
import toast from "react-hot-toast";

const Register = () => {
  const [registerUser, { data, isError, isLoading, isSuccess, error }] =
    useRegisterUserMutation() || {};
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

  const scafolding = {
    username: "",
    email: "",
    fullname: "",
    password: "",
    // avatar: "",
    // coverImage: "",
  };

  const [formData, setFormData] = useState(scafolding);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // register section
  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    // console.log(formData);
    registerUser({ ...formData });
  };

  if (isError) {
    console.log(error);
  }
  if (isSuccess) {
    toast.success("user account created successfull");
  }
  return (
    <>
      <TabPanel value="paypal" className="p-0">
        <form
          onSubmit={handleSubmitRegister}
          className="mt-12 flex flex-col gap-4"
        >
          <Input
            defaultValue={formData?.fullname}
            onChange={handleChange}
            type="text"
            color="pink"
            label="Full name"
            variant="outlined"
            name="fullname"
            required
          />
          <Input
            defaultValue={formData?.username}
            onChange={handleChange}
            type="text"
            color="pink"
            label="User name"
            variant="outlined"
            name="username"
            required
          />

          <Input
            defaultValue={formData?.email}
            onChange={handleChange}
            type="email"
            color="pink"
            label="Your Email"
            variant="outlined"
            name="email"
            required
          />
          <div className="flex">
            <Input
              defaultValue={formData?.password}
              onChange={handleChange}
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
          <Input
            defaultValue={formData?.password}
            onChange={handleChange}
            type={typeOfPassword}
            color="pink"
            label="confirm password"
            variant="outlined"
            name="cpassword"
            required
          />
          {/* <Input
            defaultValue={formData?.avatar}
            onChange={handleChange}
            required
            name="avatar"
            type="file"
            label="Upload avatar"
            accept="image/*"
          />
          <Input
            defaultValue={formData?.coverImage}
            onChange={handleChange}
            required
            name="coverImage"
            type="file"
            accept="image/*"
            label="Upload cover photo"
          /> */}

          <Button type="submit" color="amber" size="lg" variant="gradient">
            Register
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
        {isError && error?.data}
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

export default Register;
