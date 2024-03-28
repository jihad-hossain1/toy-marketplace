import React from 'react';
import { useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";

const UserProfile = () => {
  const user = useSelector((state) => state.auth?.userData);
  //   console.log(user);
  return (
    <div className="flex flex-col gap-3">
      <h4 className="flex gap-2">
        <span className="font-semibold">Name:</span>
        <span>{user?.fullname || "blank"}</span>
      </h4>
      <h4 className="flex gap-2">
        <span className="font-semibold">User-Name:</span>
        <span>{user?.username || "blank"}</span>
      </h4>
      <h4 className="flex gap-2">
        <span className="font-semibold">Role:</span>
        <span>{user?.role || "blank"}</span>
      </h4>
      <h4 className="flex gap-2">
        <span className="font-semibold">Email:</span>
        <span>{user?.email || "blank"}</span>
      </h4>

      <Button className="w-fit" variant="outlined" color="pink">
        Update Profile
      </Button>
    </div>
  );
};

export default UserProfile;