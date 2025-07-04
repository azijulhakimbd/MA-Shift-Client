import React from "react";
import { Link } from "react-router";
import { FaLock } from "react-icons/fa";

const Permission = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-10 max-w-md w-full">
        <div className="text-red-500 mb-4">
          <FaLock className="text-5xl mx-auto" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You don’t have permission to access this page.
        </p>
        <Link to="/" className="btn btn-primary">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Permission;
