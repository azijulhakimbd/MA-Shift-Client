import React from "react";
import axios from "axios";
import useAuth from "./useAuth";
const axiosSecure = axios.create({
  baseURL: `https://ma-shift-server.vercel.app`,
});

const useAxiosSecure = () => {
  const { user } = useAuth();
  axios.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
