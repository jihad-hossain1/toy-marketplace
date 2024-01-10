import React, { useContext } from "react";
import { AuthContext } from "../../authentication/AuthProvider";
import useWhitelist from "../../hooks/useWhitelist";
import { MoonLoader } from "react-spinners";
import SideNavBar from "../../components/sideNavBar/SideNavBar";
// import SingleCard from "../allToy/singleCard/SingleCard";
import SingleWhitelist from "./SingleWhitelist";



const WhiteList = () => {
  const { user } = useContext(AuthContext);
  const [whitelist, isWhitelistRefetch, isLoading, isError, error] = useWhitelist();
  if (isLoading) {
    return (
      <div className=" flex flex-col justify-center items-center my-20  md:mt-48">
        <MoonLoader color="#ff0b96" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="text-red-600 text-center text-xl">{error.message}</div>
    );
  }

  return (
    <section className="min-h-screen">
      <main className="flex md:space-x-4">
        <aside className="hidden md:block">
          <SideNavBar />
        </aside>
        <div className=" px-3 py-6">
          <h4 className="text-center underline mb-4">
            Your Total Listed Item {`( ${user ? whitelist?.length : 0} )`}
          </h4>
        <div className=" grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          {(user &&
            whitelist?.map((white) => (
              <SingleWhitelist card={white} isWhitelistRefetch={isWhitelistRefetch} key={white?._id}>
                
              </SingleWhitelist>
            ))) || <div className="flex justify-center">
              <h4 className="text-blue-gray-700 text-center mt-10 md:mt-20">
              no whitelisted items here ...
              </h4>
              </div>}
        </div>
        </div>
      </main>
    </section>
  );
};

export default WhiteList;
