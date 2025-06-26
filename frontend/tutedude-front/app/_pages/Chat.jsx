import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { Send, Bot, User, Heart, Brain, Thermometer } from "lucide-react";

const quickSymptoms = [
  {
    icon: Heart,
    label: "Heart Issues",
    prompt: "I am experiencing heart palpitations",
  },
  { icon: Brain, label: "Headache", prompt: "I have a persistent headache" },
  {
    icon: Thermometer,
    label: "Fever",
    prompt: "I have a fever and feel unwell",
  },
];

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      content:
        "Hello! I'm your EthicalMD assistant. How can I help you today? Please describe your symptoms or health concerns.",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef < HTMLDivElement > null;

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
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        content: `I understand you're experiencing ${messageContent.toLowerCase()}. Based on the symptoms you've described, I'd like to gather more information. Can you tell me:

1. When did these symptoms start?
2. How would you rate the severity on a scale of 1-10?
3. Have you noticed any triggers or patterns?

Please remember that I'm an AI assistant and this is not a substitute for professional medical advice. If you're experiencing severe symptoms, please contact your healthcare provider or emergency services immediately.`,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleQuickSymptom = (prompt) => {
    handleSend(prompt);
  };

  return (
    <div className="h-screen flex bg-[#f0f3f4] dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
        <h2 className="text-lg font-semibold text-[#293241] dark:text-white mb-4">
          Quick Symptoms
        </h2>
        <div className="space-y-2">
          {quickSymptoms.map((symptom) => (
            <Button
              key={symptom.label}
              variant="outline"
              className="w-full justify-start"
              onClick={() => handleQuickSymptom(symptom.prompt)}
            >
              <symptom.icon className="w-4 h-4 mr-2" />
              {symptom.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex max-w-xs lg:max-w-md xl:max-w-lg ${
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === "user"
                      ? "bg-[#006d77] text-white ml-2"
                      : "bg-[#f28482] text-white mr-2"
                  }`}
                >
                  {message.sender === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
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
                    {message.timestamp.toLocaleTimeString()}
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
              <div className="flex">
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

export default Chat;
