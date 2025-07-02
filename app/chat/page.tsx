"use client";

import { useEffect, useState } from "react";
import BottomNavigation from "@/components/BottomNavigation";
import Header from "@/components/Header";
import { getUserChatSessions } from "@/services/chat";
import ChatButton from "./_component/ChatButton";
import ChatRoomList from "./_component/ChatRoomList";
import MindReport from "./_component/MindReport";

interface ChatSession {
  id: number;
  session_id: string;
  session_start_time: Date | null;
  message_count: number | null;
  chat_messages: Array<{
    id: number;
    content: string;
    role: string;
    createdAt: Date;
  }>;
}

const ChatPage = () => {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadChatSessions = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await getUserChatSessions();

        if (result.success && result.sessions) {
          setChatSessions(result.sessions as ChatSession[]);
        } else {
          setError(result.error || "채팅방 목록을 불러올 수 없습니다.");
        }
      } catch (error) {
        console.error("채팅 세션 로딩 오류: ", error);
        setError("채팅방 목록 로딩 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadChatSessions();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header title={"채팅"} />
      <main className="flex-1 px-4 py-6 max-w-md mx-auto my-14 w-full">
        <div className="text-xs text-primary font-bold mb-1">CHAT</div>
        <div className="text-lg font-bold mb-1">무엇이든 다 도와줄게!</div>
        <ChatButton />
        <MindReport />
        <ChatRoomList
          chatSessions={chatSessions}
          loading={loading}
          error={error}
        />
      </main>
      <BottomNavigation />
    </div>
  );
};

export default ChatPage;
