// const apiUrl = "http://localhost:4000";
import { NextResponse } from "next/server";
const apiUrl = "https://med-xplain-backend.onrender.com";

import axios from "axios";
export async function POST(request) {
  try {
    const body = await request.json();
    const { query, chatId } = body;

    // console.log(query, chatId);
    console.log("receiverd query is : ", query);
    const token = request.cookies.get("token")?.value;
    // console.log(query);

    const res = await axios.post(
      `${apiUrl}/chats/query`,
      {
        query,
        chatId,
      },
      { headers: { cookie: token } }
    );

    // console.log(res);
    return NextResponse.json(res.data, {
      status: res.status,
    });
  } catch (err) {
    console.error("Error in /api/chat/query:", err);

    return NextResponse.json(
      { error: "Failed to query chat", details: err.message },
      { status: err.response?.status || 500 }
    );
  }
}
