import React from "react";
import useAuth from "../Hooks/useAuth";
import Spinner from "../Components/Spinner/Spinner";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location =useLocation();

  if (loading) {
    return <Spinner/>;
  }
  if (!user) {
   return <Navigate state={{from:location.pathname}} to={"/login"}></Navigate>;
  }
  return children;
};

export default PrivateRoute;
