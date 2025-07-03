import React from "react";
import { Link, Outlet } from "react-router";
import {
  FaHome,
  FaBoxOpen,
  FaPaperPlane,
  FaMoneyCheckAlt,
  FaSearchLocation,
  FaUserEdit,
  FaUserCheck,
  FaUserClock,
} from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import MAShiftLogo from "../Pages/Shared/MaShiftLogo/MAShiftLogo";
const Dashboard = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none ">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
        </div>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <MAShiftLogo></MAShiftLogo>
          <li>
            <Link
              to="/dashboard/"
              className="flex items-center mt-5 gap-3 text-green-600 hover:text-green-800 transition"
            >
              <FaHome className="text-xl" /> Home
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/my-parcels"
              className="flex items-center gap-3 text-blue-600 hover:text-blue-800 transition"
            >
              <FaBoxOpen className="text-xl" /> My Parcels
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/send-parcel"
              className="flex items-center gap-3 text-cyan-600 hover:text-cyan-800 transition"
            >
              <FaPaperPlane className="text-xl" /> Send Parcels
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/payment-history"
              className="flex items-center gap-3 text-purple-600 hover:text-purple-800 transition"
            >
              <FaMoneyCheckAlt className="text-xl" /> Payment History
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/track-parcel"
              className="flex items-center gap-3 text-yellow-600 hover:text-yellow-800 transition"
            >
              <FaSearchLocation className="text-xl" /> Track a Parcel
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/update-profile"
              className="flex items-center gap-3 text-pink-600 hover:text-pink-800 transition"
            >
              <FaUserEdit className="text-xl" /> Update Profile
            </Link>
          </li>
          <li>
            <Link className="mr-1 text-green-400" to="/dashboard/active-riders">
              <FaUserCheck size={20}  /> Active
              Riders
            </Link>
          </li>
          <li>
            <Link className="mr-1 text-yellow-500" to="/dashboard/pending-riders">
              <FaUserClock size={20}  /> Pending
              Riders
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/make-admin"
              size={20} className="mr-1 text-green-500"
            >
              <MdAdminPanelSettings className="text-xl" />
              <span>Make Admin</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
