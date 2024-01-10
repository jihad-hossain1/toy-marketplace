import React, { useContext, useState } from 'react';
import NotFoundItem from '../../../../components/notFoundItem/NotFoundItem';
import useCart from '../../../../hooks/useCart';
import { AuthContext } from '../../../../authentication/AuthProvider';
import SingleCheckoutCard from './SingleCheckoutCard';
import StepperWithIcon from './StepperWithIcon';

// import { StepperWithIcon } from './StepperWithIcon';
import { MoonLoader } from "react-spinners";

const Checkout = () => {
    const {user} = useContext(AuthContext)
    const [cart, refetch ,isError,isLoading,error] = useCart();
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
      
      
      const cartAmount = cart.reduce((pre,curr)=>curr?.item?.price + pre,0)
    return (
       <div className='min-h-screen bg-pink-50 p-3 rounded-lg bg-opacity-40 shadow shadow-pink-100 m-2'>
         <main className=' grid md:grid-cols-2'>
            <aside className='w-[600px]'>
                <StepperWithIcon />
                <div>
                    <h4 className='text-blue-gray-800 font-semibold text-xl underline text-center'>
                        Account Information
                    </h4>
                </div>
            </aside>
           <div>
           <section className='grid gap-3 '> 
            {user ? cart?.map((c_item,index)=><SingleCheckoutCard key={c_item?._id} c_item={c_item} index={index} refetch={refetch} />) : <NotFoundItem
          title="No Carts Available!"
          subtitle="Please Select & add to cart item."
          center={true}
        ></NotFoundItem>}
           </section>
           <div className='inline-block border border-pink-200 rounded-lg p-4 mt-6'>
            <h4>Total payable amount: {user ? cartAmount : 0}$ </h4>
           </div>
           </div>
        </main>
       </div>
    );
};

export default Checkout;

