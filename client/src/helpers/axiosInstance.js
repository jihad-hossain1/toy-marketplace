import axios from "axios";


const BASE_URL = "https://toyproductsserver.vercel.app/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});



export default axiosInstance;
