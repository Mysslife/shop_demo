import axios from "axios";

const BASE_URL = "http://localhost:5000/api";
const persist = localStorage.getItem("persist:root");
let TOKEN;
if (persist) {
  const user = JSON.parse(persist).user;
  TOKEN = user ? JSON.parse(user).currentUser?.accessToken : "";
}

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
