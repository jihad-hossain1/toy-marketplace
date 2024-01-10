import React from 'react';
import { Link } from 'react-router-dom';
const data =[
    {
        img: "https://i.ibb.co/TvwNwgc/daasd-1.png",
        link: "/allToys"
    },
    {
        img: " https://i.ibb.co/LYq7vZs/daasd-2.png",
        link: "/allToys"
    },
    {
        img: "https://i.ibb.co/qdM3LgS/daasd-3.png",
        link: "/allToys"
    },
    {
        img: "https://i.ibb.co/FVS9sY0/daasd-4.png",
        link: "/allToys"
    },
]
const Offer = () => {
    return (
        <div className='flex flex-col justify-center items-center sm:grid sm:grid-cols-2 md:grid-cols-4 gap-3'>
            {
                data.map((item,index)=><Link to={item?.link} key={index}>
                <div  className='bg-white rounded-md p-2'>
                    <img src={item?.img} className='object-cover rounded-lg' alt="" />
                </div></Link>)
            }
        </div>
    );
};

export default Offer;