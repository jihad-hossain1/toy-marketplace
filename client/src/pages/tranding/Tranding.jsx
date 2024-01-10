import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MoonLoader } from "react-spinners";
// import SingleCard from "../allToy/singleCard/SingleCard";
import SingleTranding from "./SingleTranding";
import SideNavBar from "../../components/sideNavBar/SideNavBar";
const fetchData = () => {
    return axios.get(`${import.meta.env.VITE_BASE_URL}/toys`);
  };
const Tranding = () => {
    const { isLoading, data, isError, error } = useQuery(["toys"], fetchData);
    if (isLoading) {
      return (
        <div className=" flex flex-col justify-center items-center my-20  md:mt-48">
          <MoonLoader color="#ff0b96" />
        </div>
      );
    }
    if (isError) {
      return <div>{error.message}</div>;
    }
    return (
      <div className="flex md:space-x-2 pb-3 mx-3">
        <div className="hidden md:block ">
        <SideNavBar></SideNavBar>
        {/* <DealOfTheDay /> */}
      </div>
        <div className="py-6 px-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            {data?.data?.filter((item)=>item?.featured === "latest").map((trandToy,index)=><SingleTranding key={index} trandToy={trandToy} />)}
          </div>
        </div>
      </div>
    );
};

export default Tranding;

