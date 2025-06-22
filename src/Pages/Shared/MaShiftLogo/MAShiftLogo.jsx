import React from "react";
import logo from "../../../assets/logo.png";
import { Link } from "react-router";

const MAShiftLogo = () => {
  return (
    <Link to={'/'}>
      <div className="flex items-center">
        <img
          src={logo}
          alt="MA SHIFT Logo"
          className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 object-contain"
        />
        <p className="text-lg -ml-4 pt-5 sm:text-xl lg:text-3xl font-extrabold whitespace-nowrap">
          MA SHIFT
        </p>
      </div>
    </Link>
  );
};

export default MAShiftLogo;
