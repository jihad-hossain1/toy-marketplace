// import { Button } from '@material-tailwind/react';
import axios from 'axios';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {BsFillTrash3Fill} from 'react-icons/bs'
import { Button, message, Popconfirm } from 'antd';
import Swal from 'sweetalert2';


const SingleCart = ({cartitem, refetch}) => {
    const {item} = cartitem;


    const handleDeleteToy = (ditem) => {
        if(ditem){
        
            fetch(
                `${import.meta.env.VITE_BASE_URL}/allcarts/${ditem?._id}`,{
                    method: "DELETE",
                    headers: {
                        'content-type': 'application/json',
                      }
                }
              )
              .then((res) => {
                if (res) {
                  refetch();
                  // Swal.fire("Deleted!", "Your file has been deleted.", "success");
                  toast.success("your toy delete successfull");
                }
              })
        }
        
      };

    return (
        <div className='flex justify-between space-y-4 items-center border-b border-blue-gray-100 pb-2'>
            <Toaster />
            <h4>
                {item?.toyTitle}
            </h4> 
            <button size='sm' className='' variant='gradient' onClick={()=>handleDeleteToy(cartitem)}  >
            <BsFillTrash3Fill className='text-xl text-pink-400' />
            </button>
        </div>
    );
};

export default SingleCart;