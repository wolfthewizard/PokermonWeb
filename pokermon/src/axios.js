import axios from "axios";

const axiosInstance = axios.create({
  headers: {
    "x-tenantid-1": "main",
  },
});

export const getAxiosInstance = () => axiosInstance;
