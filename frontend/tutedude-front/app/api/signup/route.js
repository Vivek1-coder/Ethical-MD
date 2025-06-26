// app/api/signup/route.ts
import { NextResponse } from "next/server";
import { signup } from "@lib/login-service.js"; // your existing service
// const apiUrl = "http://localhost:4000";
const apiUrl = "https://med-xplain-backend.onrender.com";

import axios from "axios";
export async function POST(request) {
  try {
    const body = await request.json();
    console.log("hello ji");
    const { name, email, password } = body;

    const response = await axios.post(`${apiUrl}/api/signup`, {
      name,
      email,
      password,
    });
    // response.data;

    // await signup(body); // throws on error or duplicate
    return NextResponse.json(
      { success: true, message: "User registered successfully" },
      { status: 201 }
    );
  } catch (err) {
    const status = err.message.includes("exists") ? 400 : 500;
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status }
    );
  }
}
