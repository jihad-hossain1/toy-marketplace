import React from "react";

const ProductDescription = ({ details }) => {
  const productDetails = { ...details?.productDetails };
  const specifications = { ...details?.specifications };
  const size = { ...details?.size };
  const metarial = details?.materialCare?.metarial;
  return (
    <>
      <h4 className="font-semibold text-blue-gray-900 mb-2">Descriptions</h4>
      <div className="">
        {Object.keys(productDetails).map((key, index) => {
          return (
            <div
              key={index}
              className="ml-5 pl-7  border-l-2 border-[#fc82bd]/50"
            >
              <h4>
                <span className="">{key}</span>: {productDetails[key]}
              </h4>
            </div>
          );
        })}
      </div>

      <h4 className="font-semibold text-blue-gray-900 mb-2">Specifications</h4>
      <div className="">
        {Object.keys(specifications).map((key, index) => {
          return (
            <div
              key={index}
              className="ml-5 pl-7  border-l-2 border-[#fc82bd]/50"
            >
              <h4>
                <span className="">{key}</span>: {specifications[key]}
              </h4>
            </div>
          );
        })}
      </div>
      <h4 className="font-semibold text-blue-gray-900 mb-2">Size & Fit</h4>
      <div className="">
        {Object.keys(size).map((key, index) => {
          return (
            <div
              key={index}
              className="ml-5 pl-7  border-l-2 border-[#fc82bd]/50"
            >
              <h4>
                <span className="">{key}</span>: {size[key]}
              </h4>
            </div>
          );
        })}
      </div>

      <h4 className="font-semibold text-blue-gray-900 mb-2">Material Care</h4>
      <div>
        {metarial?.map((item, index) => (
          <h4 key={index} className="ml-5 pl-7  border-l-2 border-[#fc82bd]/50">
            {item}
          </h4>
        ))}
      </div>
    </>
  );
};

export default ProductDescription;
