import axios, { AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";

const AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
  timeout: 120000,
});


export const setAuthtoken = (token: string | null) => {
  if (token) {
    AxiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    console.log("Token set in axiosInstance:", token); 
  } else {
    delete AxiosInstance.defaults.headers.common["Authorization"];
    console.log("Token cleared from axiosInstance"); 
  }
};
AxiosInstance.interceptors.request.use(
  async (config) => {
    config.headers["Content-Type"] = "application/json";
    config.headers["Accept"] =  "application/json"
    return config;
  },
  (error) => Promise.reject(error)
);

AxiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error?.response?.status === 401) {
      console.error("Unauthorized: Please check your credentials.");
    } else if (error?.response?.status === 403) {
      console.error("Forbidden: You do not have access to this resource.");
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;