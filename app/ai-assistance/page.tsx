"use client";

import { useState } from "react";
import { SendIcon, RefreshCcw } from "lucide-react";
import { Avatar, Button, Card, Divider, Input } from "@heroui/react";
import Layout from "@/components/Layout/Layout";

interface Message {
  id: number;
  content: string;
  sender: "user" | "ai";
}

export default function AIAssistancePage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, content: "Hello! How can I assist you today?", sender: "ai" },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        content: inputMessage,
        sender: "user",
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");
      // Here you would typically call your AI service to get a response
      // For now, we'll just simulate a response after a short delay
      setTimeout(() => {
        const aiResponse: Message = {
          id: messages.length + 2,
          content:
            "I'm an AI assistant. I'm here to help you with any questions or tasks you might have.",
          sender: "ai",
        };
        setMessages((prevMessages) => [...prevMessages, aiResponse]);
      }, 1000);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Noc-AI Assistance</h1>
        <Card className="flex-grow flex flex-col p-4 overflow-hidden">
          <div className="flex-grow overflow-y-auto mb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                } mb-4`}
              >
                <div
                  className={`flex items-start ${
                    message.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <Avatar
                    src={
                      message.sender === "user"
                        ? "/placeholder.svg?height=32&width=32"
                        : "/placeholder.svg?height=32&width=32&text=AI"
                    }
                    className={`${message.sender === "user" ? "ml-3" : "mr-3"}`}
                  />
                  <div
                    className={`px-4 py-2 rounded-lg ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-default-100"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Divider className="my-4" />
          <div className="flex items-center">
            <Input
              fullWidth
              placeholder="Type your message here..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              endContent={
                <Button
                  isIconOnly
                  color="primary"
                  aria-label="Send"
                  onClick={handleSendMessage}
                >
                  <SendIcon className="h-4 w-4" />
                </Button>
              }
            />
            <Button
              isIconOnly
              variant="light"
              aria-label="New Chat"
              className="ml-2"
              onClick={() => setMessages([])}
            >
              <RefreshCcw className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
