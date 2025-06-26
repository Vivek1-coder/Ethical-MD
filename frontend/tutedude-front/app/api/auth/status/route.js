import { NextResponse } from "next/server";
const apiUrl = "https://med-xplain-backend.onrender.com";

export async function GET(request) {
  const token = request.cookies.get("token")?.value;
  return NextResponse.json({ isLoggedIn: !!token });
}
