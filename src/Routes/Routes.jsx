import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import AuthLayout from "../Layout/AuthLayout";
import Coverage from "../Pages/Coverage/Coverage";
import Dashboard from "../Layout/Dashboard";

import PrivateRoute from "./PrivateRoute";
import MyParcels from "../Pages/Dashboard/MyParcel/MyParcels";
import SendParcel from "../Pages/Dashboard/SendParcel/SendParcel";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/coverage",
        Component: Coverage,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "Send-Parcel",
        Component: SendParcel
      },
      {
        path: "my-parcels",
        Component: MyParcels,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
]);
