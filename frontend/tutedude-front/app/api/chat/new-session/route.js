import axios from "axios";
import { NextResponse } from "next/server";
// const apiUrl = "http://localhost:4000";
const apiUrl = "https://med-xplain-backend.onrender.com";

export async function POST(request) {
  const token = request.cookies.get("token")?.value;
  // console.log(token);
  // const { chatId } = await request.json();
  const res = await axios.post(
    `${apiUrl}/chats/new-session`,
    {},
    { headers: { cookie: token } }
  );
  console.log(res);
  return NextResponse.json(res.data, {
    status: res.status,
  });
}
