import { getChatMessages } from "@/services/chat";
import { Message } from "@/types/message";
import DiaryHeader from "../../diary/_component/DiaryHeader";
import { ChatProvider } from "./_component/ChatContext";
import ChatInput from "./_component/ChatInput";
import ChatMessages from "./_component/ChatMessages";

interface ChatSessionPageProps {
  params: Promise<{ sessionId: string }>;
}

const ChatSessionPage = async ({ params }: ChatSessionPageProps) => {
  const { sessionId } = await params;

  // 서버에서 초기 메시지 불러오기
  const result = await getChatMessages(sessionId);

  if (!result.success) {
    return (
      <div className="flex flex-col h-screen bg-white">
        <DiaryHeader />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-500">
            {result.error || "메시지를 불러올 수 없습니다."}
          </p>
        </div>
      </div>
    );
  }

  // 데이터베이스 메시지를 Message 타입으로 변환
  const initialMessages: Message[] =
    result.messages?.map((msg) => ({
      id: msg.id,
      text: msg.content,
      isUser: msg.role === "USER",
    })) || [];

  return (
    <div className="flex flex-col h-screen bg-white">
      <DiaryHeader />
      <ChatProvider initialMessages={initialMessages}>
        <ChatMessages />
        <ChatInput sessionId={sessionId} />
      </ChatProvider>
    </div>
  );
};

export default ChatSessionPage;
