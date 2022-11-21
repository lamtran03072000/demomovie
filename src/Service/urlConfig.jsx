import axios from "axios";
import { store } from "..";
import { BAT_LOADING, TAT_LOADING } from "../redux/constant/LoadingConstant";
import { userLocal } from "./localService";

export const BASE_URL = "https://movienew.cybersoft.edu.vn";
export const TOKEN_CYBER =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzM0UiLCJIZXRIYW5TdHJpbmciOiIxOS8wNC8yMDIzIiwiSGV0SGFuVGltZSI6IjE2ODE4NjI0MDAwMDAiLCJuYmYiOjE2NTQzNjIwMDAsImV4cCI6MTY4MjAxMDAwMH0.8vVBHKZZpOpTUa6ep4mWe7SQc5U-y_8IFYOnVCJLEgI";
export const configHeader = () => {
  return {
    TokenCybersoft: TOKEN_CYBER,
    Authorization: "Bearer " + userLocal.get()?.accessToken,
  };
};
export const MA_NHOM = "GP03";
export const https = axios.create({
  baseURL: BASE_URL,
  headers: configHeader(),
});
// Add a request interceptor
https.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    store.dispatch({
      type: BAT_LOADING,
    });
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
https.interceptors.response.use(
  function (response) {
    setTimeout(() => {
      store.dispatch({
        type: TAT_LOADING,
      });
    }, 700);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    store.dispatch({
      type: TAT_LOADING,
    });

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
