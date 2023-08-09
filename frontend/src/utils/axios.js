//Author - Roshil Ka Patel (B00917345)
import axios from "axios";
import Cookies from "js-cookie";
const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_BASE_URL}`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); // Replace with your actual token
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
