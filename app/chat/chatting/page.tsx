"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createChatSession, addChatMessage } from "@/services/chat";
import { Message } from "@/types/message";
import { v4 as uuidv4 } from "uuid";
import ChatBubble from "../../diary/[date]/_component/ChatBubble";
import DiaryHeader from "../../diary/_component/DiaryHeader";

const ChattingPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "안녕! 난 챗인지야 :)\n무슨 이야기든 편하게 말해도 괜찮아.",
      isUser: false,
    },
  ]);

  const generateSessionId = () => {
    return uuidv4();
  };

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const input = formData.get("message");
    if (!input || typeof input !== "string" || !input.trim()) return;

    // UUID 형태의 sessionId 생성
    const sessionId = generateSessionId();

    try {
      // 데이터베이스에 채팅 세션 생성
      const sessionResult = await createChatSession(sessionId);

      if (sessionResult.success) {
        // 사용자 메시지를 데이터베이스에 추가
        const messageResult = await addChatMessage(sessionId, input, "USER");

        if (messageResult.success) {
          // 성공 시 /chat/[sessionId] 경로로 이동
          router.push(`/chat/${sessionId}`);
        } else {
          console.error("채팅 메시지 추가 실패:", messageResult.error);
          // 에러 처리 (사용자에게 알림 등)
        }
      } else {
        console.error("채팅 세션 생성 실패:", sessionResult.error);
        // 에러 처리 (사용자에게 알림 등)
      }
    } catch (error) {
      console.error("채팅 세션 생성 중 오류:", error);
      // 에러 처리 (사용자에게 알림 등)
    }
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
