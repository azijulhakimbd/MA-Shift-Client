import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import AuthLayout from "../Layout/AuthLayout";
import Coverage from "../Pages/Coverage/Coverage";
import Dashboard from "../Layout/Dashboard";
import SendParcel from "../Pages/AddParcel/SendParcel";
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
        path:'/coverage',
        Component:Coverage
      }
    ],
  },
  {
    path:'/',
    Component:Dashboard,
    children:
    [
      {
        path: '/Send-Parcel',
        Component: SendParcel
      }
    ]
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
