import { NextResponse } from "next/server";
import axios from "axios";
const apiUrl = "https://med-xplain-backend.onrender.com";
// const apiUrl = "http://localhost:4000";

export async function POST(request) {
  const token = request.cookies.get("token")?.value;

  const { id } = await request.json();
  console.log(`${apiUrl}/user-query/single`);
  const res = await axios.post(
    `${apiUrl}/user-query/single`,
    {
      summaryId: id,
    },
    {
      headers: { cookie: token },
    }
  );
  return NextResponse.json(res.data, { status: res.status });
}
