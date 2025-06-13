"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Message } from "@/types/message";
import ChatBubble from "../../diary/[date]/_component/ChatBubble";
import DiaryHeader from "../../diary/_component/DiaryHeader";

const ChattingPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "안녕! 난 챗인지야 :)\n무슨 이야기든 편하게 말해도 괜찮아.",
      isUser: false,
    },
  ]);

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const input = formData.get("message");
    if (!input || typeof input !== "string" || !input.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        text: input,
        isUser: true,
      },
    ]);
    e.currentTarget.reset();
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <DiaryHeader />
      <div className="flex-1 p-4 space-y-2 overflow-y-auto">
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
      </div>
      {/* 메시지 입력창 */}
      <form
        onSubmit={handleSend}
        className="flex items-center p-3 border-t border-gray-200 gap-2 bg-white rounded-t-[20px] shadow-lg"
        style={{ minHeight: 60 }}
      >
        <input
          name="message"
          type="text"
          className="flex-1 border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="메시지를 입력하세요"
          autoComplete="off"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-primary text-white rounded-full font-bold"
        >
          전송
        </button>
      </form>
    </div>
  );
};

export default ChattingPage;
