import { Button, Input } from "@material-tailwind/react";
import React, { useContext } from "react";

const Search = () => {
  return (
    <>
      <div className="relative flex lg:w-[24rem]">
        <Input
          color="pink"
          type="text"
          label="Search Toys"
          // onChange={(e) => {
          //   filterDispatch({
          //     type: "FILTER_BY_SEARCH",
          //     payload: e.target.value,
          //   });
          // }}
          // className="pr-20"
          // containerProps={{
          //   className: "m w-full",
          // }}
        />
        <Button
          size="sm"
          // color={searchQuery ? "yellow" : "blue-gray"}
          // disabled={!searchQuery}
          className="!absolute right-1 top-1 rounded hover:text-white hover:bg-pink-500"
        >
          Search
        </Button>
      </div>
    </>
  );
};

export default Search;
