"use server";
const apiUrl = "http://localhost:4000";
import axios from "axios";

export async function signup(data) {
  const { name, email, password } = data;
  const response = await axios.post(`${apiUrl}/api/signup`, {
    name,
    email,
    password,
  });
  return response.data;
  // console.log(response);
}

export async function signin(data) {
  const { email, password } = data;
  const response = await axios.post(`${apiUrl}/api/login`, {
    email,
    password,
  });
  return response.data;
}
