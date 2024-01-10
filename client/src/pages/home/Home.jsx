import React from "react";
import Slider from "./slider/Slider";
import Offer from "./offer/Offer";
import DealOfTheDay from "../../components/sideNavBar/dealOfTheDay/DealOfTheDay";
import SideNavBar from "../../components/sideNavBar/SideNavBar";
import Tranding from "./tranding/Tranding";
import ServiceProvide from "./service/ServiceProvide";
import BigOffer from "./bigOffer/BigOffer";
import LatestNews from "./latestNews/LatestNews";
import NewArrival from "./newArrival/NewArrival";
import NewsLetter from "./newsLetter/NewsLetter";
import Sponser from "./sponser/Sponser";
import SocialButton from "./social/SocialButton";

const Home = () => {
  return (
    <div className="">
      <div className="flex space-x-2">
        <div className="hidden md:block ">
          <SideNavBar></SideNavBar>
          {/* <DealOfTheDay /> */}
        </div>
        <div className="mt-2 px-2 bg-blue-gray-50 py-2 rounded-lg">
          <Slider />
        </div>
      </div>
      <div className="min-h-32 bg-blue-gray-50 bg-opacity-50 drop-shadow-sm mt-6 rounded-md p-2">
        <Offer />
      </div>
      {/* dealOfTheDay & tranding option  */}
      <div className="grid md:grid-cols-4 mt-5 mb-10 p-2 md:p-0 gap-4 bg-blue-gray-50 bg-opacity-10 rounded-lg mx-2 md:mx-0">
        <div className="hidden md:block m-2 md:m-0">
          <DealOfTheDay />
          <div className="min-h-32 bg-blue-gray-50 bg-opacity-50 drop-shadow-sm mt-6 rounded-md p-2">
            <NewArrival />
          </div>
          <div className="mt-5">
            <NewsLetter />
          </div>
        </div>
        <div className="col-span-3">
          <div className="">
            <Tranding />
          </div>
          <div>
            <ServiceProvide />
          </div>
          <div className="hidden">
            <BigOffer />
          </div>
          <div>
            <LatestNews />
          </div>
          
        </div>
      </div>
      <div className="my-12">
            <Sponser />
          </div>
      
      <div className="h-[500px] md:hidden">
        <DealOfTheDay />
      </div>
      <div className="mt-6">
            <SocialButton />
          </div>
    </div>
  );
};

export default Home;

{
  /* <div className="min-h-32 bg-blue-gray-50 bg-opacity-50 drop-shadow-sm mt-6 rounded-md p-2">
        <NewArrival />
      </div> */
}
