import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import Footer from '../Pages/Shared/Footer/Footer';

const Dashboard = () => {
    return (
        <div>
           <div className='p-8'><Navbar></Navbar></div>
           <div className='py-8 px-50'> <Outlet></Outlet></div>
            <div className='p-8'><Footer></Footer></div>
        </div>
    );
};

export default Dashboard;