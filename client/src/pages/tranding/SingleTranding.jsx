import React, { useContext } from 'react';
import {TbEye} from 'react-icons/tb'
import {MdOutlineFavoriteBorder} from 'react-icons/md'
import { Link } from 'react-router-dom';
// import { Rating } from '@material-tailwind/react';
import { Rate } from 'antd';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../authentication/AuthProvider';
import useUserCart from '../../hooks/useUserCart';
const SingleTranding = ({trandToy}) => {
    const {price,images,toyTitle,rating,quantity} = trandToy;
    const {user} = useContext(AuthContext)
    const [carts, refetch] = useUserCart()

    const handleEnrollCart = async (toyObj)=>{
        if(!user){
          return toast.error('login first')
        return 
        }else{
          const cartVerify = carts?.find(item=> item?.itemId == toyObj?._id)
          if(cartVerify){
            return toast.error('already added this toy please check cart')
          }else{
            const info={
                itemId: toyObj?._id,
                email: user?.email,
                item: toyObj,
  
            }
            const res = await fetch(
              `${import.meta.env.VITE_BASE_URL}/carts`,
              {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(info),
              }
            );
            const data = await res.json();
            if(data){
              refetch()
              toast.success('check your cart')
            //   isEnrollRefetch()
            }
            console.log(data);
          }
        }
      }
   
    return (
        <div>
            <div className='group'>
                <Toaster />
            {/* {quantity <= 0 ? 'hidden' :'block' } */}
                <div className='relative overflow-hidden'>
                    <div className={quantity <= 0 ? 'block transition-all duration-300' :'hidden' }>
                        <button className={'group-hover:-left-16 transition-all duration-300 absolute px-2 text-xs bg-red-700 text-white rounded'}>Sold out</button>
                    </div>
                <img src={images?.img.img1} alt="" />
              
                    <div className="absolute w-full h-full flex flex-col justify-between -bottom-10 bg-blue-gray-400 bg-opacity-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      
                        <div className='flex justify-end '>
                            <div className='flex flex-col mr-4 mt-2'>
                            <Link to={`/singletoy/${trandToy?._id}`}>
                            <button className='rounded-full p-1 flex items-center justify-center bg-white border border-blue-gray-100 mb-1 hover:bg-pink-300 hover:text-white transition-all duration-500'>
                                <TbEye className='h-5 w-5' />
                            </button>
                            </Link>
                            <button className='rounded-full p-1 flex items-center justify-center bg-white border border-blue-gray-100 mb-1 hover:bg-pink-300 hover:text-white transition-all duration-500'>
                                <MdOutlineFavoriteBorder className='h-5 w-5' />
                            </button>
                            
                            
                            </div>
                        </div>
                       
                        <div className='flex justify-center mb-1'>
                        <button onClick={()=>handleEnrollCart(trandToy)} disabled={quantity == 0 } className='bg-[#f0c507] px-2 py-1 md:px-4 md:py-2 rounded text-black text-xs md:text-[14px] inline-block uppercase hover:bg-[#fc82bd] hover:text-white transition-all duration-500'>add to cart</button>
                        </div>
                    </div>
                
                </div>
                <div className='flex flex-col justify-center items-center mt-2'>
                    <h4 className='text-sm md:text-xl'>
                        {toyTitle}
                    </h4>
                    <Rate disabled defaultValue={rating} className='text-sm' />
                    {/* <Rating readonly unratedColor="amber" ratedColor="amber" className='text-sm' value={rating} /> */}
                    <h4 className="text-sm md:text-md font-semibold">
                        <span className='text-blue-gray-600 line-through'>${price - 10}.00</span> <span>${price}.00</span>
                    </h4>
                </div>
            </div>
        </div>
    );
};

export default SingleTranding;