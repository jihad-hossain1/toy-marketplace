import { Rate } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { BiPencil } from "react-icons/bi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import ToyReview from "./toyReview/ToyReview";
import { Link } from "react-scroll";
// import UserCart from "../../dashboard/user/AddToCartButton";
import SideNavBar from "../../../components/sideNavBar/SideNavBar";
import WhitelistButton from "../singleCard/WhitelistButton";
import { useGetProductByIdQuery } from "../../../redux/features/api/productApi";
import ProductShipingPolicy from "./ProductShipingPolicy";
import ProductDescription from "./ProductDescription";
import StockOutProgressBar from "./StockOutProgressBar";
import { MoonLoader } from "react-spinners";
import AddToCartButton from "./AddToCartButton";

const ToyDetails = () => {
  let { id } = useParams();
  const {
    data: singleToy,
    isLoading,
    isError,
    error,
  } = useGetProductByIdQuery(id) || {};

  const [activeTab, setActiveTab] = useState("description");

  if (isLoading) {
    return (
      <div className=" flex flex-col justify-center items-center my-20  md:mt-48">
        <MoonLoader color="#ff0b96" />
      </div>
    );
  }
  if (isError) {
    return <div>{error?.message}</div>;
  }

  return (
    <div className="flex space-x-2">
      <div className="hidden md:block ">
        <SideNavBar></SideNavBar>
        {/* <DealOfTheDay /> */}
      </div>
      <div className="p-2 mt-4 font-kanit font-medium">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="h-96">
            <img className="object-cover" src={singleToy?.image} alt="" />
          </div>
          <div className="ml-3">
            {/* toy title  */}
            <h4 className="text-xl md:text-2xl mb-4">{singleToy?.toyTitle}</h4>
            {/* rating & write review  */}
            <div className="flex items-center space-x-2 mb-2">
              <Rate className="text-sm" disabled value={singleToy?.rating} />
              <Link to={`review`} spy={true} smooth={true} duration={500}>
                <button className="text-blue-gray-700 flex space-x-1 items-center">
                  <span className="text-blue-gray-700 text-sm">
                    Write Review
                  </span>{" "}
                  <BiPencil className="h-5" />
                </button>
              </Link>
            </div>
            {/* priece  */}
            <h4 className="text-sm md:text-md font-semibold mb-2">
              <span className="text-blue-gray-600 line-through text-xs">
                ${singleToy?.price}.00
              </span>{" "}
              <span className="text-xl font-poppin">
                ${singleToy?.price - 10}.00
              </span>
            </h4>
            {/* seller info  */}
            <h4 className="text-blue-gray-700 mb-2 font-">
              Vendor :{" "}
              <span className="ml-2">
                {singleToy?.seller || "stock product"}
              </span>
            </h4>
            <h4 className="text-blue-gray-700 mb-2 font-">
              Toy Type : <span className="ml-2">{singleToy?.category}</span>
            </h4>
            {/* add to whitelist & Sizechart  */}
            <div className=" flex items-center space-x-5 mb-2">
              <WhitelistButton item={singleToy} />
              <button className="text-sm text-blue-gray-700 flex items-center space-x-1">
                <LiaChalkboardTeacherSolid className="text-xl text-blue-gray-700" />
                <span>Sizechart</span>
              </button>
            </div>
            {/* progrssbar  */}
            <div className="">
              <StockOutProgressBar quantity={singleToy?.quantity} />
            </div>

            {/* add cart button  */}
            <AddToCartButton
              pid={singleToy?._id}
              quantity={singleToy?.quantity}
            />
          </div>
        </div>
        {/* description & review & condition by tab section  */}
        <div className="mt-2">
          <Tabs id="custom-animation" value={activeTab}>
            <TabsHeader>
              <Tab
                onClick={() => setActiveTab()}
                className={activeTab ? "text-gray-900" : ""}
                value={"description"}
              >
                {"Description"}
              </Tab>
              <Tab
                onClick={() => setActiveTab()}
                className={activeTab ? "text-gray-900" : ""}
                value={"review"}
              >
                <div id="review">{"Review"}</div>
              </Tab>
              <Tab
                onClick={() => setActiveTab()}
                className={activeTab ? "text-gray-900" : ""}
                value={"ShipingReturn"}
              >
                {"Shipping"}
              </Tab>
              <Tab
                onClick={() => setActiveTab()}
                className={activeTab ? "text-gray-900" : ""}
                value={"others"}
              >
                {"Others"}
              </Tab>
            </TabsHeader>
            <TabsBody
              animate={{
                initial: { y: 250 },
                mount: { y: 0 },
                unmount: { y: 250 },
              }}
            >
              <TabPanel value={"description"}>
                <ProductDescription details={singleToy?.details} />
              </TabPanel>
              <ToyReview pid={singleToy?._id} />
              <TabPanel value={"ShipingReturn"}>
                <ProductShipingPolicy />
              </TabPanel>
              <TabPanel value={"others"}>
                <div className="min-h-[200px]"></div>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ToyDetails;
