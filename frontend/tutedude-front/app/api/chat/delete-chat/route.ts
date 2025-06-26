// app/api/chat/delete-chat/route.js
import { NextResponse } from "next/server";
import axios from "axios";

export async function DELETE(request) {
  try {
    const { chatId } = await request.json();
    const token = request.cookies.get("token")?.value;

    if (!token) {
      console.error("Missing token");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!chatId) {
      console.error("Missing chatId");
      return NextResponse.json({ error: "Missing chatId" }, { status: 400 });
    }   
    console.log("token",token);

await axios.delete(`https://med-xplain-backend.onrender.com/chats/${chatId}`, {
  headers: { cookie: token }
});
return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/chat/delete-chat failed:", {
      message: error.message,
      response: error.response?.data,
      stack: error.stack,
    });

    return NextResponse.json(
      { error: "Server Error" },
      { status: error.response?.status || 500 }
    );
  }
}
