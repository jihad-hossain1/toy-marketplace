import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import SingleTrandingToy from "./SingleTrandingToy";
import { Link } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import { useGetProductsQuery } from "../../../redux/features/api/productApi";
import Skeleton from "../../../components/skeleton/Skeleton";

const Tranding = () => {
  const {
    data: products,
    error,
    isLoading,
    isError,
  } = useGetProductsQuery() || {};

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="p-2">
      <div className="w-fit flex items-center gap-4">
        <div className="bg-[#fc82bd] drop-shadow shadow-md rounded-full w-3 h-3" />
        <h4 className="font-extrabold uppercase">Tranding Toys</h4>
      </div>
      <div>
        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item, ind) => (
              <Skeleton key={ind} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {products
              ?.filter((item) => item?.rating >= 4)
              .reverse()
              .slice(0, 8)
              .map((ite, index) => (
                <SingleTrandingToy key={index} ite={ite} />
              ))}
          </div>
        )}
      </div>
      <div className="flex justify-center mt-6">
        <Link to={"/alltoys"}>
          <button className="bg-[#f0c507] px-3 py-2 md:px-4 md:py-2 rounded-lg text-black text-xs md:text-[14px] inline-block uppercase hover:bg-[#fc82bd] hover:text-white transition-all duration-500">
            View all
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Tranding;
