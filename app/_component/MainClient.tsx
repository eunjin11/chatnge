"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DiaryCard from "@/app/diary/_component/DiaryCard";
import MindLog from "@/app/diary/_component/MindLog";
import MonthResolution from "@/app/diary/_component/MonthResolution";
import TabNavigation from "@/app/diary/_component/TabNavigation";
import Header from "@/components/Header";
import { WeeklyEmotionItem } from "@/types/emotion.dto";

interface MainClientProps {
  weekRange: string;
  weekData: WeeklyEmotionItem[];
}

export default function MainClient({ weekRange, weekData }: MainClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "recent" | "emotion" | "medication"
  >("recent");

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        title={"기록"}
        subHeader={
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        }
      />

      <div className="flex-1 overflow-y-auto p-4 pb-20 mt-28">
        <MonthResolution />

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

        <div className="mb-8">
          <div className="mx-2 text-sm flex items-center gap-1">
            <div>{weekRange}</div>
            <Image
              src="/ArrowRight.svg"
              alt="full diary"
              width={8}
              height={10}
              className="w-[8px] h-[10px] align-middle"
            />
          </div>
          <div className="emoji-container mx-auto flex justify-between items-center mt-2">
            {weekData.length === 0 ? (
              <div className="text-center text-gray-500 w-full">
                데이터를 불러오는 중...
              </div>
            ) : (
              <>
            {weekData.map(({ date, emotion, fullDate, dayOfWeek }) => (
              <button
                key={fullDate}
                onClick={() => {
                  if (emotion === null) {
                    router.push(`/diary/${fullDate}/create`);
                  } else {
                    router.push(`/diary/${fullDate}`);
                  }
                }}
                className={`emoji-container-item cursor-pointer`}
              >
                <div className="flex flex-col items-center">
                  <span className="text-sm my-1">{dayOfWeek}</span>
                  {!emotion ? (
                    <div className="w-[35px] h-[35px] bg-[#D9D9D9] rounded-[10px] text-2xl flex items-center justify-center font-extrabold text-gray-600">
                      <div>+</div>
                    </div>
                  ) : (
                    <Image
                      src={`/images/${emotion}.png`}
                      alt={emotion}
                      width={35}
                      height={35}
                      className="w-[35px] h-[35px]"
                    />
                  )}

                  <span className="text-[10px] mt-1 text-gray-500">{date}</span>
                </div>
                </button>
              ))}
            </>
          )}
        </div>
        <MindLog />
      </div>
    </div>
  );
}
