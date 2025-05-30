"use client";

import { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
import BottomNavigation from "@/components/BottomNavigation";
import { EmotionResponse } from "@/constants/types";
import { getEmotionRecordByDate } from "@/services/emotion";
import { formatKoreanDate } from "@/utils/formatDate";
import DiaryDate from "../_component/DiaryDate";
import DiaryHeader from "../_component/DiaryHeader";
import ChatBubble from "./_component/ChatBubble";
import { Message } from "./create/page";

const DiaryViewPage = () => {
  const params = useParams();
  const { date } = params;
  const [emotionRecord, setEmotionRecord] = useState<EmotionResponse | null>(
    null,
  );
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (typeof date === "string") {
        const record = await getEmotionRecordByDate(new Date(date));
        if (!record) redirect("/diary");
        setEmotionRecord(record);

        if (record) {
          // 감정 기록을 채팅 메시지 배열로 변환
          const chatMessages = [
            { id: 1, text: "오늘 하루 어땠나요?", isUser: false },
            { id: 2, text: record.emotion, isUser: true, emoji: "" },
            {
              id: 3,
              text: "그렇게 느낀 이유가 있다면,\n들려줄 수 있을까요?",
              isUser: false,
            },
            { id: 4, text: record.reason, isUser: true },
            {
              id: 5,
              text: "감정이 계속 이어졌나요,\n아니면 중간에 바뀌었나요?",
              isUser: false,
            },
            { id: 6, text: record.feeling, isUser: true },
            {
              id: 7,
              text: "함께 느낀 감정들을 모두 골라볼까요?\n최대 3개까지 선택 가능해요!",
              isUser: false,
            },
            ...record.detailedEmotions.map((d, idx) => ({
              id: 8 + idx,
              text: `#${d}`,
              isUser: true,
            })),
            { id: 20, text: "오늘 하루를 한 줄로 남긴다면?", isUser: false },
            { id: 21, text: record.oneLineRecord, isUser: true },
            {
              id: 22,
              text: "오늘 하루도 고생많았어요!\n오늘의 감정일기를 보여줄게요",
              isUser: false,
            },
            // MindReport 등 추가 메시지 필요시 추가
          ];
          setMessages(chatMessages as Message[]);
        }
      }
    }
    fetchData();
  }, [date]);

  if (!emotionRecord) return <div>로딩 중...</div>;

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

export default DiaryViewPage;
