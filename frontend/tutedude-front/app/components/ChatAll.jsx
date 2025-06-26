"use client";
import React, { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import Loader from "./Loader";
import axios from "axios";
import { toast } from "react-toastify";
function ChatAll({ loadOldChat, GenerateNewSession }) {
  const [oldChats, setOldChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const deleteChat = async (chatId) => {
    try {
      const response = await axios.delete("/api/chat/delete-chat", {
        data: { chatId },
        withCredentials: true, // axios uses `data` for DELETE body
      });

      setOldChats((prevChats) =>
        prevChats.filter((chat) => chat._id !== chatId)
      );
      toast("Deleted Successfully");
    } catch (error) {
      toast("Failed To Delete");
      console.error(
        "Failed to delete chat:",
        error.response?.data || error.message
      );
    }
  };
  useEffect(() => {
    // define your async function inside
    const loadPrevChats = async () => {
      try {
        setIsLoading(true);
        const res = await axios.post(
          "/api/chat/load-prev-chats",
          {},
          { withCredentials: true }
        );
        setIsLoading(false);
        setOldChats(res.data);
        if (res.data.length > 0) {
          console.log(res.data);
          const temp_initial_id = res.data[0]._id;
          console.log("intially load , loading chat_id", temp_initial_id);
          loadOldChat(temp_initial_id);
        } else {
          GenerateNewSession();
        }

        console.log(res);
      } catch (err) {
        console.error("Failed to load previous chats:", err);
      }
    };

    loadPrevChats();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading &&
        oldChats?.map((oldChat) => (
          <Card
            key={oldChat._id}
            className="flex items-center justify-between w-full p-2 mb-2 border rounded-md shadow-sm hover:bg-gray-100"
          >
            <div
              className="flex-1 cursor-pointer text-left truncate"
              onClick={() => loadOldChat(oldChat._id)}
            >
              {oldChat?.title || "Untitled Chat"}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteChat(oldChat._id)}
              className="text-red-500 hover:text-red-700 hover:bg-gray-200 cursor-pointer"
            >
              <Trash className="w-4 h-4" />
            </Button>
          </Card>
        ))}
    </>
  );
}

export default ChatAll;
