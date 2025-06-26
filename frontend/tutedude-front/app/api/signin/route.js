// app/api/signin/route.js
import { NextResponse } from "next/server";
import { signin } from "@lib/login-service";
// const apiUrl = "http://localhost:4000";
const apiUrl = "https://med-xplain-backend.onrender.com";

import axios from "axios";
export async function POST(request) {
  try {
    const body = await request.json();
    console.log(body);
    const { email, password } = body;
    const res = await axios.post(`${apiUrl}/api/login`, {
      email,
      password,
    });
    // return response.data;

    // calls your axios-based helper which POSTs to your Node backend
    const { id, name, token } = res.data;

    // Build a NextResponse JSON
    const response = NextResponse.json({ id, name, email }, { status: 200 });

    // If your backend returned a token, set it as an HttpOnly cookie
    if (token) {
      response.cookies.set({
        name: "token",
        value: token,
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
        sameSite: "lax",
        secure: true,
      });
    }

    return response;
  } catch (err) {
    console.error("Signin route error:", err);
    // If err.message is your backend’s 4xx message, you can pass its status
    const status = err.response?.status || 500;
    const msg = err.response?.data?.error || "Server error";
    return NextResponse.json({ error: msg }, { status });
  }
}
