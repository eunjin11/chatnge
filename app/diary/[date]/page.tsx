"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Search, ChevronRight } from "lucide-react";

// 감정 타입 정의
interface Emotion {
  id: number;
  text: string;
  emoji: string;
  details?: string[];
}

// 메시지 타입 정의
interface Message {
  id: number;
  text: string;
  isUser: boolean;
  emoji?: string;
}

// 감정 선택 상태 정의
enum EmotionSelectionState {
  BEFORE_SELECTION = "BEFORE_SELECTION",
  SELECTING_EMOTION = "SELECTING_EMOTION",
  SELECTING_DETAIL = "SELECTING_DETAIL",
  SELECTING_DURATION = "SELECTING_DURATION",
  SELECTING_EMOTIONS = "SELECTING_EMOTIONS",
}

export default function DiaryDatePage() {
  const params = useParams();
  const router = useRouter();
  const { date } = params;
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [formattedDate, setFormattedDate] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "오늘 하루 어땠나요?",
      isUser: false,
    },
  ]);

  // 메시지가 추가될 때마다 스크롤을 맨 아래로 내리기
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const [selectionState, setSelectionState] = useState<EmotionSelectionState>(
    EmotionSelectionState.BEFORE_SELECTION
  );
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);

  const [userEmotions] = useState<Emotion[]>([
    {
      id: 1,
      text: "매우 좋아요",
      emoji: "😊",
      details: [
        "친구랑 너무 즐거운 시간을 보냈어요",
        "좋은 일이 연달아 생겼어요",
        "하고 싶은 걸 마음껏 했어요",
        "기대했던 일이 잘 풀렸어요",
        "오늘 하루가 그냥 완벽했어요",
        "🖊️ 직접 쓸래요",
      ],
    },
    {
      id: 2,
      text: "좋아요",
      emoji: "🙂",
      details: [
        "소소하지만 기분 좋은 일이 있었어요",
        "마음이 편안했어요",
        "하고 싶었던 걸 해냈어요",
        "주변 사람들 덕분에 기분이 좋았어요",
        "오늘은 별일 없지만 괜찮았어요",
        "🖊️ 직접 쓸래요",
      ],
    },
    {
      id: 3,
      text: "그저 그래요",
      emoji: "😐",
      details: [
        "별다른 일 없이 지나갔어요",
        "뭔가 애매한 기분이었어요",
        "나쁘진 않은데 딱히 좋지도 않았어요",
        "하루가 너무 빨리 지나갔어요",
        "몸은 괜찮은데 마음이 심심했어요",
        "🖊️ 직접 쓸래요",
      ],
    },
    {
      id: 4,
      text: "속상해요",
      emoji: "😔",
      details: [
        "해야 할 일이 너무 많았어요",
        "몸이 지치고 피곤했어요",
        "마음이 복잡했어요",
        "누군가와의 관계에서 힘들었어요",
        "스스로에게 실망했어요",
        "🖊️ 직접 쓸래요",
      ],
    },
    {
      id: 5,
      text: "힘들어요",
      emoji: "😔",
      details: [
        "친구랑 다퉜어요",
        "혼자 있는 시간이 힘들었어요",
        "기대했던 일이 어긋났어요",
        "내가 뭘 잘못했는지 모르겠어요",
        "작은 말에 상처받았어요",
        "🖊️ 직접 쓸래요",
      ],
    },
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
    setSelectedEmotion(emotion);
    setMessages([
      ...messages,
      {
        id: Date.now(),
        text: emotion.text,
        isUser: true,
        emoji: emotion.emoji || "",
      },
      {
        id: Date.now() + 1,
        text: "그렇게 느낀 이유가 있다면,\n들려줄 수 있을까요?",
        isUser: false,
      },
    ]);
    setSelectionState(EmotionSelectionState.SELECTING_DETAIL);
  };

  const handleDetailSelect = (detail: string) => {
    setMessages([
      ...messages,
      {
        id: Date.now(),
        text: detail,
        isUser: true,
        emoji: "",
      },
      {
        id: Date.now() + 1,
        text: "감정이 계속 이어졌나요,\n아니면 중간에 바뀌었나요?",
        isUser: false,
      },
    ]);
    setSelectionState(EmotionSelectionState.SELECTING_DURATION);
    setSelectedEmotion({
      id: 0,
      text: "감정 상태",
      emoji: "",
      details: [
        "하루 종일 비슷했어요",
        "중간에 감정이 바뀌었어요",
        "다양한 감정이 섞였어요",
        "잘 모르겠어요",
      ],
    });
  };

  const handleDurationSelect = (detail: string) => {
    setMessages([
      ...messages,
      {
        id: Date.now(),
        text: detail,
        isUser: true,
        emoji: "",
      },
      {
        id: Date.now() + 1,
        text: "함께 느낀 감정들을 모두 골라볼까요?\n최대 3개까지 선택 가능해요!",
        isUser: false,
      },
      {
        id: Date.now() + 2,
        text: "1개 이상 선택해주세요!",
        isUser: false,
      },
    ]);
    setSelectionState(EmotionSelectionState.SELECTING_EMOTIONS);
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
      <div className="text-center py-4 border-b border-gray-200">
        <p className="text-sm">{formattedDate}</p>
      </div>

      {/* 메인 컨텐츠 영역 */}
      <div className="flex-1 flex flex-col">
        {/* 채팅 영역 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.isUser ? "justify-end" : "justify-start"
              }`}
            >
              {!message.isUser && (
                <div className="chat-bubble chat-bubble-bot">
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                </div>
              )}

              {message.isUser && (
                <div className="chat-bubble chat-bubble-user">
                  <div className="flex items-center">
                    <p className="text-sm">{message.text}</p>
                    <span className="ml-2 text-sm">{message.emoji}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 감정 선택 영역 */}
        <div className="p-4 mb-14" ref={chatContainerRef}>
          {selectionState === EmotionSelectionState.BEFORE_SELECTION && (
            <div className="flex flex-col items-end space-y-2">
              {userEmotions.map((emotion) => (
                <button
                  key={emotion.id}
                  onClick={() => handleEmotionSelect(emotion)}
                  className="border border-gray-200 rounded-[15px] rounded-br-none px-4 py-2 shadow-sm"
                >
                  <span className="mr-2 text-sm">{emotion.emoji}</span>
                  <span className="text-sm">{emotion.text}</span>
                </button>
              ))}
            </div>
          )}
          {selectionState === EmotionSelectionState.SELECTING_DETAIL && (
            <div className="flex flex-col items-end space-y-2">
              {selectedEmotion?.details?.map((detail, index) => (
                <button
                  key={index}
                  onClick={() => handleDetailSelect(detail)}
                  className="border border-gray-200 rounded-[15px] rounded-br-none px-4 py-2 shadow-sm"
                >
                  <span className="text-sm">{detail}</span>
                </button>
              ))}
            </div>
          )}
          {selectionState === EmotionSelectionState.SELECTING_DURATION && (
            <div className="flex flex-col items-end space-y-2">
              {selectedEmotion?.details?.map((detail, index) => (
                <button
                  key={index}
                  onClick={() => handleDurationSelect(detail)}
                  className="border border-gray-200 rounded-[15px] rounded-br-none px-4 py-2 shadow-sm"
                >
                  <span className="text-sm">{detail}</span>
                </button>
              ))}
            </div>
          )}
          {selectionState === EmotionSelectionState.SELECTING_EMOTIONS && (
            <div></div>
          )}
        </div>
      </div>

      {/* 하단 네비게이션 */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-between p-4 rounded-t-[20px] border-t border-gray-200 bg-white shadow-lg">
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
