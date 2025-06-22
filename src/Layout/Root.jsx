import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import Footer from '../Pages/Shared/Footer/Footer';

const Root = () => {
    return (
        <div>
            <div className='p-8'><Navbar></Navbar></div>
            <Outlet></Outlet>
            <div className='p-8'><Footer></Footer></div>
        </div>
    );
};

export default Root;