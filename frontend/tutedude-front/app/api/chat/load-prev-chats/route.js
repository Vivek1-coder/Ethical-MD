// const apiUrl = "http://localhost:4000";
import axios from "axios";
import { NextResponse } from "next/server";
const apiUrl = "https://med-xplain-backend.onrender.com";

export async function POST(request) {
  const body = await request.json();
  const token = request.cookies.get("token")?.value;

  const res = await axios.get(`${apiUrl}/chats/allChats`, {
    headers: { cookie: token },
  });
  return NextResponse.json(res.data, { status: res.status });
  console.log(res);
}
