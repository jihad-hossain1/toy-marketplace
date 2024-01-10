import React from "react";

const LineSkeleton = () => {
  return (
    <div class="w-full animate-pulse">
      <div class="block w-full h-5 mb-4 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-300 rounded-full text-inherit">
        &nbsp;
      </div>
    </div>
  );
};

export default LineSkeleton;
