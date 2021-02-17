import axios from "axios";

export const AuthAxios = axios.create({
  baseURL: `${process.env.REACT_APP_ENDPOINT}`,
});
