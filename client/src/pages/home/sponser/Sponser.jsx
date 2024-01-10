import React from "react";
const arrOfsponse = [
  {
    img: "https://i.ibb.co/7jttWpP/3-5d84d25b-07e2-458f-b573-68ad7ba844b4-130x130-2x.webp",
  },
  {
    img: "https://i.ibb.co/Vt6V535/4-22d8133e-a151-4ff3-86d7-c7c586bbeff0-130x130-2x.png",
  },
  {
    img: "https://i.ibb.co/cF2dMVK/6-130x130-2x.png",
  },
  {
    img: "https://i.ibb.co/N6fmBhw/1-09b3fbe0-c214-4670-b638-c2fb41194dfb-130x130-2x.png",
  },
  {
    img: "https://i.ibb.co/ch4tQZX/2-5f17de91-c811-427b-ad06-341456ecfe4d-130x130-2x.png",
  },
];
const Sponser = () => {
  return (
    <div className="mt-10">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {arrOfsponse.map((itm, index) => (
          <div  key={index} >
            <img className="cursor-pointer hover:[transform:rotateY(180deg)] transition-all duration-700" src={itm?.img} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sponser;
