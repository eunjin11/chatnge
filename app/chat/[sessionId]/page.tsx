"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getChatMessages, addChatMessage } from "@/services/chat";
import { Message } from "@/types/message";
import ChatBubble from "../../diary/[date]/_component/ChatBubble";
import DiaryHeader from "../../diary/_component/DiaryHeader";

const ChatPage = () => {
  const params = useParams();
  const { sessionId } = params;
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMessages = async () => {
      if (typeof sessionId === "string") {
        setLoading(true);
        setError(null);

        try {
          const result = await getChatMessages(sessionId);

          if (result.success && result.messages) {
            // 데이터베이스 메시지를 Message 타입으로 변환
            const formattedMessages: Message[] = result.messages.map((msg) => ({
              id: msg.id,
              text: msg.content,
              isUser: msg.role === "USER",
            }));
            setMessages(formattedMessages);
          } else {
            setError(result.error || "메시지를 불러올 수 없습니다.");
          }
        } catch (err) {
          setError("메시지 로딩 중 오류가 발생했습니다.");
        } finally {
          setLoading(false);
        }
      }
    };

    loadMessages();
  }, [sessionId]);

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const input = formData.get("message");
    if (
      !input ||
      typeof input !== "string" ||
      !input.trim() ||
      typeof sessionId !== "string"
    )
      return;

    // 로컬 상태에 즉시 추가 (UI 반응성 향상)
    const newMessage: Message = {
      id: Date.now(), // 임시 ID
      text: input,
      isUser: true,
    };
    setMessages((prev) => [...prev, newMessage]);
    e.currentTarget.reset();

    try {
      // 데이터베이스에 메시지 저장
      const result = await addChatMessage(sessionId, input, "USER");

      if (!result.success) {
        console.error("메시지 저장 실패:", result.error);
        // 에러 처리 (사용자에게 알림 등)
      }
    } catch (error) {
      console.error("메시지 전송 중 오류:", error);
      // 에러 처리 (사용자에게 알림 등)
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col h-screen bg-white">
        <DiaryHeader />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">메시지를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-screen bg-white">
        <DiaryHeader />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

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

export default ChatPage;
