import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_API_URI,
  withCredentials: true,
});

export const cancelToken = axios.CancelToken;
