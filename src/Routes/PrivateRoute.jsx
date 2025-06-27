import React from "react";
import useAuth from "../Hooks/useAuth";
import Spinner from "../Components/Spinner/Spinner";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return Spinner;
  }
  if (!user) {
    <Navigate to={"/login"}></Navigate>;
  }
  return children;
};

export default PrivateRoute;
