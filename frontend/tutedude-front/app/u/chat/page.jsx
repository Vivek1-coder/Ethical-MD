"use client";
import ChatAll from "@components/ChatAll";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@components/ui/button";
import { Suspense } from "react";
import { Input } from "../../components/ui/input";
import { Card } from "../../components/ui/card";
import { EmptyChatPlaceholder } from "../../components/EmptyChatPlaceholder";
import Loading from "../../loading";
import { Send, Bot, User } from "lucide-react";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Loader from "@components/Loader";
import { toast } from "react-toastify";
const Chat = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [compLoading, isCompLoading] = useState(false);
  const messagesEndRef = useRef(null);

  async function GenerateNewSession() {
    isCompLoading(true);
    const res = await axios.post(
      "/api/chat/new-session",
      {},
      { withCredentials: true }
    );
    isCompLoading(false);
    console.log(res);
    params.set("chatId", res.data.chatId);
    router.replace(`${pathname}?${params.toString()}`);
    setMessages([]);
    toast("Session created");
    // return res.data;
  }
  async function loadOldChat(id) {
    isCompLoading(true);
    const res = await axios.post(
      `/api/chat/load-chat`,
      { id },
      { withCredentials: true }
    );
    isCompLoading(false);
    if (res.status != 200) {
      toast("Failed to load old chat");
    }

    console.log(res.data);
    let data = res.data.messages;
    data = data.map((obj) => {
      if (obj.role === "user") return obj;

      let content = obj.content;
      content = JSON.parse(content);
      content = `Answer: ${content.answer}\n\nExplaination: ${content.explaination}`;
      obj.content = content;
      return obj;
    });
    setMessages(data);
    params.set("chatId", res.data._id);
    router.replace(`${pathname}?${params.toString()}`);
    console.log(res);
  }
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (content) => {
    const messageContent = content || inputValue.trim();
    if (!messageContent) return;

    const userMessage = {
      id: Date.now().toString(),
      content: messageContent,
      sender: "user",
      role: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    const chatId = searchParams.get("chatId");
    if (!chatId) {
      return;
    }
    console.log(chatId);
    const res = await axios.post(
      "/api/chat/query",
      {
        query: messageContent,
        chatId,
      },
      { withCredentials: true }
    );
    const { answer, explaination } = res.data.response;
    const aiMessage = {
      id: (Date.now() + 1).toString(),
      content: `Answer: ${answer}\n\nExplaination: ${explaination}`,
      sender: "ai",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, aiMessage]);
    setIsLoading(false);
  };

  return (
    <div className="h-full flex bg-[#f0f3f4] dark:bg-gray-900 ">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 overflow-y-auto">
        <div>
          <Button
            onClick={() => GenerateNewSession()}
            className="w-full cursor-pointer "
          >
            + New Conversation
          </Button>
        </div>

        <h2 className="text-lg font-semibold text-[#293241] dark:text-white mb-4 mt-4">
          Previous Chats
        </h2>

        <div className="space-y-2">
          <Suspense fallback={<Loading />}>
            <ChatAll
              GenerateNewSession={GenerateNewSession}
              loadOldChat={loadOldChat}
            />
          </Suspense>
        </div>
      </div>
      {/* Chat Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {compLoading && <Loader></Loader>}
          {!compLoading && messages?.length === 0 && <EmptyChatPlaceholder />}
          {!compLoading &&
            messages?.length > 0 &&
            messages.map((message) => (
              <motion.div
                key={message._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  message.sender === "user" || message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`flex max-w-xs lg:max-w-md xl:max-w-lg ${
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === "user"
                        ? "bg-[#006d77] text-white ml-2 mr-2"
                        : "bg-[#f28482] text-white p-2 mr-2"
                    }`}
                  >
                    {message.role === "user" || message.sender == "user" ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-8 h-8" />
                    )}
                  </div>
                  <Card
                    className={`p-3 ${
                      message.sender === "user"
                        ? "bg-[#006d77] text-white"
                        : "bg-white dark:bg-gray-800"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">
                      {message.content}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === "user"
                          ? "text-white/70"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {/* {message?.timestamp?.toLocaleTimeString()} */}
                    </p>
                  </Card>
                </div>
              </motion.div>
            ))}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-[#f28482] text-white mr-2 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <Card className="p-3 bg-white dark:bg-gray-800">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </Card>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Describe your symptoms..."
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="flex-1"
            />
            <Button
              onClick={() => handleSend()}
              disabled={!inputValue.trim() || isLoading}
              className="bg-[#006d77] hover:bg-[#006d77]/90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading chat...</div>}>
      <Chat />
    </Suspense>
  );
}
