import React from "react";
import MainContainer from "../container/MainContainer";
import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import bgImg from "../../../public/bg.webp";
const SITEMAP = [
  {
    title: "Store Information",
    links: [
      {
        label: "4005 Silver Business Point abc",
      },
      {
        label: "01700 090909",
      },
      {
        label: "info@example.com",
      },
    ],
  },
  {
    title: "Your account",
    links: [
      {
        label: "Personal Info",
        path: "#",
      },
      {
        label: "Orders",
        path: "#",
      },
      {
        label: "Credit Slips",
        path: "#",
      },
      {
        label: "Adresses",
        path: "#",
      },
      {
        label: "My Wishlists",
        path: "#",
      },
    ],
  },
  {
    title: "Products",
    links: [
      {
        label: "Delivery",
        path: "#",
      },
      {
        label: "Legal Notice",
        path: "#",
      },
      {
        label: "prices Drops",
        path: "#",
      },
      {
        label: "New Products",
        path: "#",
      },
      {
        label: "Best Sales",
        path: "#",
      },
    ],
  },
  {
    title: "Our Company",
    links: [
      {
        label: "Personal Info",
        path: "#",
      },
      {
        label: "Orders",
        path: "#",
      },
      {
        label: "Credit Slips",
        path: "#",
      },
      {
        label: "Adresses",
        path: "#",
      },
      {
        label: "My Wishlists",
        path: "#",
      },
    ],
  },
  {
    title: "Information",
    links: [
      {
        label: "Delivery",
        path: "#",
      },
      {
        label: "Legal Notice",
        path: "#",
      },
      {
        label: "About Us",
        path: "#",
      },
      {
        label: "Secure Payment",
        path: "#",
      },
    ],
  },
];

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <div
      style={{ backgroundImage: `url(${bgImg})` }}
      className="bg-no-repeat  bg-center bg-cover"
    >
      <MainContainer>
        <footer className="relative w-full">
          <div className="mx-auto w-full max-w-7xl px-8 md:py-20">
            <div className="mx-auto grid w-full gap-8 py-12 grid-cols-2  md:grid-cols-3 lg:grid-cols-5">
              {SITEMAP.map(({ title, links }, key) => (
                <div key={key} className="w-full">
                  <h4 className="mb-4 font-bold uppercase  text-black md:text-xl">
                    {title}
                  </h4>
                  <ul className="space-y-1">
                    {links.map((link, key) => (
                      <Typography
                        key={key}
                        as="li"
                        color="blue-gray"
                        className="font-normal"
                      >
                        <Link
                          to={link?.path}
                          className="text-gray-700 hover:text-pink-400 inline-block py-1 pr-2 duration-300 hover:scale-105 transition-all"
                        >
                          {link?.label}
                        </Link>
                      </Typography>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="flex w-full  items-center justify-center border-t border-blue-gray-50 py-14 ">
              <Typography
                variant="small"
                className="mb-4 text-center font-normal text-blue-gray-700 md:mb-0"
              >
                &copy; {currentYear}{" "}
                <Link to="https:jihad-hossain.web.app/">Jihad Hossain</Link>.
                All Rights Reserved.
              </Typography>
            </div>
          </div>
        </footer>
      </MainContainer>
    </div>
  );
};

export default Footer;
