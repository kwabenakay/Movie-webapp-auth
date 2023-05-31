import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});
export async function login(formData: { email: string; password: string }) {
  try {
    const response = await api.post("/login", formData);
    console.log(formData);
    console.log(response);
    return response;
  } catch (error) {
    alert("Error while logging in");
    console.log(error);
  }
}

export async function signup(formData: { email: string; password: string }) {
  try {
    console.log("data is sending");
    const response = await api.post("/signup", formData);
    console.log("data is sent");
    console.log(response);
    return response;
  } catch (error) {
    alert("Error while singing up");
    console.log(error);
  }
}
