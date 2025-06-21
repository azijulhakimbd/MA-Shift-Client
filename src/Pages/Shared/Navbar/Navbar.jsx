import React from "react";
import { NavLink } from "react-router";
import MAShiftLogo from "../MaShiftLogo/MAShiftLogo";

const Navbar = () => {
  const navItems = (
    <>
      <li>
        <NavLink to={"/Services"}>Services</NavLink>
      </li>
      <li>
        <NavLink to={"/Coverage"}>Coverage</NavLink>
      </li>
      <li>
        <NavLink to={"/About-Us"}>About Us</NavLink>
      </li>
      <li>
        <NavLink to={"/Pricing"}>Pricing</NavLink>
      </li>
      <li>
        <NavLink to={"/Be-a-Rider"}>Be a Rider</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-white shadow-sm">
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
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl"><MAShiftLogo></MAShiftLogo></a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className="navbar-end">
        <NavLink className="btn btn-outline rounded-4xl text-custom" to={'/login'}>Sign In</NavLink>
        <NavLink className="btn rounded-3xl bg-custom" to={'/'}>Be a rider</NavLink>
      </div>
    
    </div>
  );
};

export default Navbar;
