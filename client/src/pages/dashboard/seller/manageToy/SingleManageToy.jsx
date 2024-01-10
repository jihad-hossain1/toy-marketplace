import { PencilIcon } from "@heroicons/react/24/solid";
import {
  Avatar,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import Action from "./Action";
import LineSkeleton from "../../../../components/skeleton/LineSkeleton";

const SingleManageToy = ({ ite, classes, isLoading }) => {
  const handleUpdate = (propCrn) => {
    clg(propCrn);
  };
  return (
    <tr>
      <td className={classes}>
        <div className="flex items-center gap-3">
          <Avatar
            src={ite?.image}
            alt={"toys"}
            size="md"
            className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
          />
          <Typography variant="small" color="blue-gray" className="font-bold">
            {ite?.toyTitle}
          </Typography>
        </div>
      </td>

      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {ite?.toyTitle}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {ite?.category}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {ite?.price}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {ite?.quantity}
        </Typography>
      </td>

      {/* edit delete view option  */}
      <td className={classes}>
        <Action ite={ite} />
      </td>
    </tr>
  );
};

export default SingleManageToy;
