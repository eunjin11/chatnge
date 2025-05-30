"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BottomNavigation from "@/components/BottomNavigation";
import { formatKoreanDate } from "@/utils/formatDate";
import ChatBubble from "../../diary/[date]/_component/ChatBubble";
import { Message } from "../../diary/[date]/create/page";
import DiaryDate from "../../diary/_component/DiaryDate";
import DiaryHeader from "../../diary/_component/DiaryHeader";

const ChatPage = () => {
  const params = useParams();
  const { date } = params;
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (typeof date === "string") {
      const chatMessages = [
        {
          id: 1,
          text: "안녕! 난 챗인지야 :)\n무슨 이야기든 편하게 말해도 괜찮아.",
          isUser: false,
        },
      ];
      setMessages(chatMessages as Message[]);
    }
  }, [date]);

  return (
    <div className="flex flex-col h-screen bg-white">
      <DiaryHeader />
      <DiaryDate date={formatKoreanDate(date as string)} />
      <div className="flex-1 p-4 space-y-2">
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
      </div>
      <BottomNavigation />
    </div>
  );
};

export default ChatPage;
