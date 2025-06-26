import { NextResponse } from "next/server";
import axios from "axios";
const apiUrl = "https://med-xplain-backend.onrender.com";
// const apiUrl = "http://localhost:4000";

export async function POST(request) {
  console.log("hello");
  const token = request.cookies.get("token")?.value;
  const form = await request.formData();
  const file = form.get("pdf");
  const forwardFd = new FormData();
  forwardFd.append("pdf", file, file.name);

  // console.log(request.data);
  const res = await axios.post(`${apiUrl}/pdfs/analyze-lab-report`, forwardFd, {
    headers: { cookie: token },
  });
  // return res;
  // console.log();
  console.log(JSON.stringify(res.data));
  return NextResponse.json(res.data, { status: 200 });
}
