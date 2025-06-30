"use client";

import { useState } from "react";
import { sendMessageAndGetAIResponse } from "@/services/chat";
import { Message } from "@/types/message";
import { useChatContext } from "./ChatContext";

interface ChatInputProps {
  sessionId: string;
}

const ChatInput = ({ sessionId }: ChatInputProps) => {
  const [isSending, setIsSending] = useState(false);
  const { addNewMessages } = useChatContext();

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const input = formData.get("message");
    if (!input || typeof input !== "string" || !input.trim()) return;

    setIsSending(true);

    // 로컬 상태에 사용자 메시지 즉시 추가 (UI 반응성 향상)
    const userMessage: Message = {
      id: Date.now(),
      text: input,
      isUser: true,
    };

    try {
      // AI 응답을 받아서 처리
      const result = await sendMessageAndGetAIResponse(sessionId, input);

      if (result.success) {
        // AI 응답을 UI에 추가
        const aiMessage: Message = {
          id: result.aiResponse?.id || Date.now() + 1,
          text: result.aiMessage,
          isUser: false,
        };

        // Context를 통해 메시지 추가
        addNewMessages(userMessage, aiMessage);
      } else {
        console.error("AI 응답 처리 실패:", result.error);
        // 에러 처리 (사용자에게 알림 등)
      }
    } catch (error) {
      console.error("메시지 전송 중 오류:", error);
      // 에러 처리 (사용자에게 알림 등)
    } finally {
      setIsSending(false);
    }
    form.reset();
  };

  return (
    <>
      {isSending && (
        <div className="flex items-center space-x-2 text-gray-500 p-4">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
          <span className="text-sm">AI가 응답을 생성하고 있습니다...</span>
        </div>
      )}
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
          disabled={isSending}
        />
        <button
          type="submit"
          className={`ml-2 px-4 py-2 rounded-full font-bold ${
            isSending
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-primary text-white"
          }`}
          disabled={isSending}
        >
          {isSending ? "전송 중..." : "전송"}
        </button>
      </form>
    </>
  );
};

export default ChatInput;
