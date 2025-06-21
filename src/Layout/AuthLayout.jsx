import React from "react";
import { Outlet } from "react-router";
import authImg from '../assets/authImage.png'
import MAShiftLogo from "../Pages/Shared/MaShiftLogo/MAShiftLogo";
const AuthLayout = () => {
  return (
    <div className="bg-base-200 lg:p-15">
        <div className="p-5">
            <MAShiftLogo></MAShiftLogo>
        </div>
      <div className="hero-content lg:py-20 flex-col lg:flex-row-reverse">
       <div className="flex-1 bg-[#FAFDF0]">
         <img
          src={authImg}
          className="max-w-sm"
        />
       </div>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
