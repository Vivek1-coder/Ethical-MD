import { NextResponse } from "next/server";
import axios from "axios";
const apiUrl = "https://med-xplain-backend.onrender.com";
// const apiUrl = "http://localhost:4000";

export async function POST(request) {
  const token = request.cookies.get("token")?.value;

  const res = await axios.get(`${apiUrl}/user-query/all`, {
    headers: { cookie: token },
  });

  return NextResponse.json((await res).data, { status: res.status });
}
