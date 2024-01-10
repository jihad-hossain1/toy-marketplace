import React from 'react';
import { Outlet } from 'react-router-dom';
import SellerNavbar from './SellerNavbar';

const SellerDashboard = () => {
    return (
        <div className='bg-pink-50 bg-opacity-60'>
            <SellerNavbar />
            <div className='py-12 container mx-auto min-h-screen px-2'>
            <Outlet />
            </div>
        </div>
    );
};

export default SellerDashboard;