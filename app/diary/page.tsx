"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import BottomNaviation from "@/components/BottomNaviation";
import { formatDate } from "@/utils/formatDate";
import { formatFullDate } from "@/utils/formatFullDate";
import TabNavigation from "@/app/diary/_component/TabNavigation";
import DiaryCard from "@/app/diary/_component/DiaryCard";
import MindLog from "@/app/diary/_component/MindLog";
import MonthResolution from "@/app/diary/_component/MonthResolution";
import { getEmotionRecordByDate } from "../api/emotion";

export default function DiaryPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "recent" | "emotion" | "medication"
  >("recent");
  const [dateRange, setDateRange] = useState<string>("");
  const [weekDates, setWeekDates] = useState<
    {
      date: string;
      emotion: string;
      fullDate: string;
      dayOfWeek: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchEmotionRecords = async () => {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      const day = now.getDay();
      const sunday = new Date(now);
      sunday.setDate(now.getDate() - day);

      const saturday = new Date(sunday);
      saturday.setDate(sunday.getDate() + 6);

      setDateRange(`${formatDate(sunday)} - ${formatDate(saturday)}`);

      const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
      const dates = [];

      for (let i = 0; i < 7; i++) {
        const date = new Date(sunday);
        date.setDate(sunday.getDate() + i);

        const formattedDate = formatDate(date);
        const fullDate = formatFullDate(date);
        const dayOfWeek = daysOfWeek[i];

        try {
          const data = await getEmotionRecordByDate(date);

          const emotion = data?.emotion || "None";
          console.log("emotion", date, emotion);
          dates.push({ date: formattedDate, emotion, fullDate, dayOfWeek });
        } catch (err) {
          console.error("감정 데이터 요청 실패:", err);
          dates.push({
            date: formattedDate,
            emotion: "None",
            fullDate,
            dayOfWeek,
          });
        }
      }

      setWeekDates(dates);
    };

    fetchEmotionRecords();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        title={"기록"}
        subHeader={
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        }
      />

      {/* 일기 컨텐츠 */}
      <div className="flex-1 overflow-y-auto p-4 pb-20 mt-28">
        <MonthResolution />
        {/* 감정 카드 영역 */}
        <div className="flex justify-between mb-4">
          <DiaryCard
            type="emotion"
            title={`오늘의 기분을\n기록하고 싶다면?`}
            description="> 챗인지와 함께 기록하기"
          />
          <DiaryCard
            type="medication"
            title={`하루 한 번,\n오늘의 약 점검!`}
            description="> 챗인지와 함께 기록하기"
          />
        </div>

        {/* 날짜 및 이모지 선택 */}
        <div className="mb-8">
          <div className="mx-2 text-sm flex items-center gap-1">
            <div>{dateRange}</div>
            <Image
              src="/ArrowRight.svg"
              alt="full diary"
              width={8}
              height={10}
              className="w-[8px] h-[10px] align-middle"
            />
          </div>
          <div className="emoji-container mx-auto flex justify-between items-center mt-2">
            {weekDates.map(({ date, emotion, fullDate, dayOfWeek }) => (
              <button
                key={fullDate}
                onClick={() => {
                  if (emotion === "None") {
                    router.push(`/diary/${fullDate}/create`);
                  } else {
                    router.push(`/diary/${fullDate}`);
                  }
                }}
                className={`emoji-container-item`}
              >
                <div className="flex flex-col items-center">
                  <span className="text-sm my-1">{dayOfWeek}</span>
                  {emotion === "None" ? (
                    <div className="w-[35px] h-[35px] bg-[#D9D9D9] rounded-[10px] text-2xl flex items-center justify-center font-extrabold text-gray-600">
                      <div>+</div>
                    </div>
                  ) : (
                    <Image
                      src={`/Happy.png`}
                      alt="{happy}"
                      width={40}
                      height={34}
                      className="w-[40px] h-[34px]"
                    />
                  )}

                  <span className="text-[10px] mt-1 text-gray-500">{date}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 마인드 로그 */}
        <MindLog />
      </div>
      <BottomNaviation />
    </div>
  );
}
