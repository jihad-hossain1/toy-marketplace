import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import TopHeader from "../../components/header/topHeader/TopHeader";
import LogoWithSearchNav from "../../components/LogoWithSearchNav/LogoWithSearchNav";
import DesktopNav from "../../components/desktopNav/DesktopNav";

import SideNavBar from "../../components/sideNavBar/SideNavBar";
import Footer from "../../components/footer/Footer";
import MobileNav from "../../components/mobileNav/MobileNav";

const Main = () => {

  return (
    <div className="">
      <header>
        {/* top nav  */}
        <TopHeader></TopHeader>
        {/* logo with search and shoping cart  */}
        <div className="flex justify-between items-center ">
          <div className=" md:hidden">
            <SideNavBar></SideNavBar>
          </div>
          <LogoWithSearchNav></LogoWithSearchNav>
          {/* Mobile nav  */}
          <div className="md:hidden">
            <MobileNav />
          </div>
          
        </div>
        {/* Desktop Navbar  */}
          <DesktopNav></DesktopNav>
      </header>
      <div className="container mx-auto ">
        
      <Outlet></Outlet>
      </div>
      {/* footer section  */}
      <Footer></Footer>
    </div>
  );
};

export default Main;

const raf = (
  <>
  <div className="container mx-auto grid md:flex  md:space-x-2">
        <div className="hidden md:block ">
        <SideNavBar></SideNavBar>
        </div>
        {/* main Outlet  */}
        <div className="md:ml-48 container  mx-auto border px-2">
        <Outlet></Outlet>
        </div>
      </div>
  </>
)