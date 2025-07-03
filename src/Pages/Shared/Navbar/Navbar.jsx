import React from "react";
import { NavLink } from "react-router"; 
import MAShiftLogo from "../MaShiftLogo/MAShiftLogo";
import useAuth from "../../../Hooks/useAuth";

// React Icons
import {
  FaMapMarkedAlt,
  FaServicestack,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdAttachMoney, MdOutlineDashboard } from "react-icons/md";
import { AiFillInfoCircle } from "react-icons/ai";
import { GiDeliveryDrone } from "react-icons/gi";

const Navbar = () => {
  const { user, userSignOut } = useAuth();

  const handleLogout = () => {
    userSignOut();
  };

  const navItems = (
    <>
      <li>
        <NavLink to="/Services">
          <FaServicestack size={20} className="mr-1 text-blue-600" /> Services
        </NavLink>
      </li>
      <li>
        <NavLink to="/Coverage">
          <FaMapMarkedAlt size={20} className="mr-1 text-green-600" /> Coverage
        </NavLink>
      </li>
      <li>
        <NavLink to="/About-Us">
          <AiFillInfoCircle size={20} className="mr-1 text-orange-500" /> About Us
        </NavLink>
      </li>
      <li>
        <NavLink to="/Pricing">
          <MdAttachMoney size={20} className="mr-1 text-emerald-500" /> Pricing
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard">
          <MdOutlineDashboard size={20} className="mr-1 text-purple-600" /> Dashboard
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar p-5 bg-white mx-auto rounded-2xl shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {navItems}
          </ul>
        </div>
        <MAShiftLogo />
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <>
            <NavLink className="btn rounded-3xl mr-1 bg-custom text-white" to="be-a-rider">
              <GiDeliveryDrone size={18} className="mr-1 text-white" /> Be a Rider
            </NavLink>
            <button
              className="text-red-500 btn btn-outline rounded-4xl"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="mr-1 text-red-500" /> Log out
            </button>
          </>
        ) : (
          <NavLink
            className="btn btn-outline mr-1 rounded-4xl text-custom"
            to="/login"
          >
            <FaSignInAlt className="mr-1 text-custom" /> Sign In
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
