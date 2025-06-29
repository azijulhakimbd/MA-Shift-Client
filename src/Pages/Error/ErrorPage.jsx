import React from "react";
import { Link } from "react-router";
import { FaTruckLoading } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-base-200">
      <FaTruckLoading className="text-7xl text-red-500 mb-4 animate-bounce" />
      <h1 className="text-6xl font-extrabold text-blue-600">404</h1>
      <p className="text-xl mt-2 text-red-500">
        Oops! The page you're looking for doesn’t exist.
      </p>
      <p className="mb-6 text-gray-500 dark:text-gray-400">
        It might have been moved or deleted.
      </p>
      <Link
        to="/"
        className="px-6 py-2 text-white bg-green-500 rounded hover:bg-green-600 transition duration-300"
      >
        🚀 Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
