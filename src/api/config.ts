import { AxiosRequestConfig } from "axios";

export const axiosRequestConfiguration: AxiosRequestConfig = {
  baseURL: "https://api.edamam.com",
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
};
