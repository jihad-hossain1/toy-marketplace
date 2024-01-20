import SingleWhitelist from "./SingleWhitelist";

const WhiteList = () => {
  return (
    <section className="min-h-screen">
      <div className=" px-3 py-6">
        <h4 className="text-center underline mb-4">
          {/* Your Total Listed Item {`( ${user ? whitelist?.length : 0} )`} */}
        </h4>
        whiteList
        <div className=" grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          {/* {(user &&
              whitelist?.map((white) => (
                <SingleWhitelist
                  card={white}
                  isWhitelistRefetch={isWhitelistRefetch}
                  key={white?._id}
                ></SingleWhitelist>
              ))) || (
              <div className="flex justify-center">
                <h4 className="text-blue-gray-700 text-center mt-10 md:mt-20">
                  no whitelisted items here ...
                </h4>
              </div>
            )} */}
        </div>
      </div>
    </section>
  );
};

export default WhiteList;
