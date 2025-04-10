"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Search, ChevronRight } from "lucide-react";

// 감정 타입 정의
interface Emotion {
  id: number;
  text: string;
  emoji: string;
}

// 메시지 타입 정의
interface Message {
  id: number;
  text: string;
  isUser: boolean;
  emotion: string;
}

export default function DiaryDatePage() {
  const params = useParams();
  const router = useRouter();
  const { date } = params;

  const [formattedDate, setFormattedDate] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "오늘 하루 어땠나요?",
      isUser: false,
      emotion: "🙂",
    },
  ]);

  const [userEmotions] = useState<Emotion[]>([
    { id: 1, text: "매우 좋아요", emoji: "😊" },
    { id: 2, text: "좋아요", emoji: "🙂" },
    { id: 3, text: "그저 그래요", emoji: "😐" },
    { id: 4, text: "속상해요", emoji: "😔" },
    { id: 5, text: "화가나요", emoji: "😠" },
  ]);

  useEffect(() => {
    if (typeof date === "string") {
      // YYYY-MM-DD 형식에서 YYYY년 M월 D일 형식으로 변환
      const dateObj = new Date(date);
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;
      const day = dateObj.getDate();
      setFormattedDate(`${year}년 ${month}월 ${day}일`);
    }
  }, [date]);

  const handleEmotionSelect = (emotion: Emotion) => {
    // 사용자가 감정을 선택하면 메시지 추가
    setMessages([
      ...messages,
      {
        id: Date.now(),
        text: emotion.text,
        isUser: true,
        emotion: emotion.emoji,
      },
    ]);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* 헤더 */}
      <header className="flex items-center p-4 border-gray-200 shadow-xs">
        <button onClick={() => router.back()} className="mr-auto">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold flex-1 text-center">감정기록</h1>
        <button className="ml-auto">
          <Search size={24} />
        </button>
      </header>

      {/* 날짜 표시 */}
      <div className="text-center py-4 border-b border-gray-200 shadow-xs">
        <p className="text-sm">{formattedDate}</p>
      </div>

      {/* 채팅 영역 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.isUser ? "justify-end" : "justify-start"
            }`}
          >
            {!message.isUser && (
              <div className="chat-bubble chat-bubble-bot">
                <p className="text-sm">{message.text}</p>
              </div>
            )}

            {message.isUser && (
              <div className="chat-bubble chat-bubble-user">
                <div className="flex items-center">
                  <p className="text-sm">{message.text}</p>
                  <span className="ml-2 text-xl">{message.emotion}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 감정 선택 영역 */}
      <div className="p-4 bg-gray-50">
        <div className="flex flex-col space-y-2">
          {userEmotions.map((emotion) => (
            <button
              key={emotion.id}
              onClick={() => handleEmotionSelect(emotion)}
              className="emotion-button"
            >
              <span className="mr-2 text-xl">{emotion.emoji}</span>
              <span className="text-sm">{emotion.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 하단 네비게이션 */}
      <div className="flex justify-between p-4 rounded-t-[20px] border-t border-gray-200 shadow-lg">
        <button className="text-primary">
          <ChevronLeft size={24} />
        </button>
        <button className="text-primary">
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
