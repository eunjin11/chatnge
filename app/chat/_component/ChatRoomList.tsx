import ChatRoomItem from "./ChatRoomItem";

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

interface ChatRoomListProps {
  chatSessions: ChatSession[];
  loading: boolean;
  error: string | null;
}

const ChatRoomList = ({ chatSessions, loading, error }: ChatRoomListProps) => {
  const formatDate = (date: Date | null) => {
    if (!date) return "날짜 없음";
    return new Date(date).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="mb-2">
        <div className="font-bold">이전 대화 기록</div>
        <div className="text-gray-500 text-sm mt-2">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-2">
        <div className="font-bold">이전 대화 기록</div>
        <div className="text-red-500 text-sm mt-2">{error}</div>
      </div>
    );
  }

  if (chatSessions.length === 0) {
    return (
      <div className="mb-2">
        <div className="font-bold">이전 대화 기록</div>
        <div className="text-gray-500 text-sm mt-2">
          아직 대화 기록이 없습니다.
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-2 flex justify-between items-center">
        <div className="font-bold">이전 대화 기록</div>
        <button className="text-xs text-gray-400">최근 1개월</button>
      </div>
      <div className="flex flex-col gap-3">
        {chatSessions.map((session) => {
          const lastMessage = session.chat_messages[0];
          return (
            <ChatRoomItem
              key={session.id}
              type="대화"
              date={formatDate(session.session_start_time)}
              text={lastMessage ? lastMessage.content : "메시지 없음"}
              sessionId={session.session_id}
            />
          );
        })}
      </div>
    </>
  );
};

export default ChatRoomList;
