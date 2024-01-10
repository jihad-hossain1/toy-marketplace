import React from "react";
import { useDispatch } from "react-redux";
import { changePageNumber } from "../../redux/features/productSlice/productSlice";

const PaginatedProducts = ({ currentPage, numberOfPage }) => {
  const dispatch = useDispatch();

  const incPageNumber = (cp) => {
    if (currentPage < numberOfPage) {
      dispatch(changePageNumber(cp + 1));
    }
  };

  const decPageNumber = (cp) => {
    if (currentPage == 1) {
      alert("you are on page 1");
    } else {
      dispatch(changePageNumber(cp - 1));
    }
  };
  return (
    <main className="flex justify-end mt-4 ">
      <div className="flex items-center gap-2">
        <button
          disabled={currentPage == 1}
          onClick={() => decPageNumber(currentPage)}
          className={`${
            currentPage == 1 ? "bg-gray-200 text-gray-500" : ""
          } text-sm rounded-md px-2 border border-gray-300 font-normal my-2 mx-3`}
        >
          Previous
        </button>

        <div className="">{`${currentPage}/${numberOfPage}`}</div>

        <button
          disabled={currentPage == numberOfPage}
          onClick={() => incPageNumber(currentPage)}
          className={`${
            currentPage == numberOfPage ? "bg-gray-200 text-gray-500" : ""
          } text-sm rounded-md px-2  border border-gray-300 font-normal my-2 mx-3`}
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default PaginatedProducts;
