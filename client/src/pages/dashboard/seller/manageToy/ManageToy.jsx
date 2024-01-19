import React, { useContext, } from "react";
import { Link } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import SingleManageToy from "./SingleManageToy";
import { AuthContext } from "../../../../authentication/AuthProvider";

import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Input,
} from "@material-tailwind/react";
import { useGetUserProductByEmailQuery } from "../../../../redux/features/api/productApi";
import LineSkeleton from "../../../../components/skeleton/LineSkeleton";
import { useSelector } from "react-redux";

const TABLE_HEAD = ["Avatar", "Info", "Category", "Price", "QTY", "Action"];

const ManageToy = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const email = user?.email;
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useGetUserProductByEmailQuery(email) || {};

  // const { isLoading, data, isError, error,refetch } = useQuery(["toys"], fetchData);
  // if (isLoading) {
  //   return (
  //     <div className=" flex flex-col justify-center items-center my-20  md:mt-48">
  //       <MoonLoader color="#ff0b96" />
  //     </div>
  //   );
  // }
  if (isError) {
    return <div>{error.message}</div>;
  }
  console.log(products);
  return (
    <div>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                Recent Information
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                These are details about the last toys update & manage
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <div className="w-full md:w-72">
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>

              <Link to={"/dashboardSellerOnly/addToy"}>
                <Button className="flex items-center gap-3" size="sm">
                  <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Add
                  Toy
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="w-full min-w-max table-auto text-left">
            <>
              {isLoading ? (
                <thead>
                  <tr>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((ite, _i) => (
                      <LineSkeleton key={_i} />
                    ))}
                  </tr>
                </thead>
              ) : (
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
            </>

            <>
              {isLoading ? (
                <tbody>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((ite, _i) => (
                    <LineSkeleton key={_i} />
                  ))}
                </tbody>
              ) : (
                <tbody>
                  {products?.map((ite, index) => {
                    const isLast = index === products?.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";
                    return (
                      <SingleManageToy
                        key={ite?._id}
                        classes={classes}
                        ite={ite}
                        isLoading={isLoading}
                      />
                    );
                  })}
                </tbody>
              )}
            </>
          </table>
        </CardBody>
      </Card>
    </div>
  );
};

export default ManageToy;
