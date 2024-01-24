import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {BsFillTrash3Fill} from 'react-icons/bs'

const HomeCart = ({citem,refetch}) => {


        return (
          <div className="flex justify-between space-y-4 items-center border-b border-blue-gray-100 pb-2">
            <h4>{citem?.item?.toyTitle}</h4>
            <button
              size="sm"
              className=""
              variant="gradient"
              onClick={() => handleDeleteToy(citem)}
            >
              <BsFillTrash3Fill className="text-xl text-pink-400" />
            </button>
          </div>
        );
};

export default HomeCart;