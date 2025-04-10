"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import BottomNaviation from "@/components/BottomNaviation";

export default function DiaryPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "recent" | "emotion" | "medication"
  >("recent");
  const [dateRange, setDateRange] = useState<string>("");
  const [weekDates, setWeekDates] = useState<
    {
      date: string;
      emoji: string;
      fullDate: string;
    }[]
  >([]);

  useEffect(() => {
    // 이번주 일요일 구하기
    const now = new Date();
    const day = now.getDay(); // 0: 일요일, 1: 월요일, ...
    const sunday = new Date(now);
    sunday.setDate(now.getDate() - day); // 이번주 일요일

    const saturday = new Date(sunday);
    saturday.setDate(sunday.getDate() + 6); // 이번주 토요일

    // MM.DD 형식으로 포맷팅
    const formatDate = (date: Date) => {
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${month}.${day}`;
    };

    // YYYY-MM-DD 형식으로 포맷팅 (URL 용)
    const formatFullDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    setDateRange(`${formatDate(sunday)} - ${formatDate(saturday)}`);

    // 이번주 일~토요일까지의 날짜 배열 생성
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(sunday);
      date.setDate(sunday.getDate() + i);
      const formattedDate = formatDate(date);
      const fullDate = formatFullDate(date);
      const emoji = "😄";

      dates.push({ date: formattedDate, emoji, fullDate });
    }

    setWeekDates(dates);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* 헤더 */}
      <header className="flex items-center p-4 border-b">
        <Header title={"기록"} />
        <div className="fixed top-18 left-0 right-0 bg-white border-b border-gray-200 pb-2 flex-1 flex justify-center space-x-6">
          <button
            className={`${
              activeTab === "recent"
                ? "text-black border-b-2 border-black"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("recent")}
          >
            전체
          </button>
          <button
            className={`${
              activeTab === "emotion"
                ? "text-black border-b-2 border-black"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("emotion")}
          >
            감정 기록
          </button>
          <button
            className={`${
              activeTab === "medication"
                ? "text-black border-b-2 border-black"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("medication")}
          >
            복약 기록
          </button>
        </div>
      </header>

      {/* 일기 컨텐츠 */}
      <div className="mt-14 flex-1 overflow-y-auto p-4">
        <div className="text-primary my-2 text-xs">이번 달 다짐</div>
        <h1 className="text-xl font-bold mb-4">프로젝트 무사히 끝내기!</h1>

        {/* 감정 카드 영역 */}
        <div className="flex justify-between mb-4">
          <div className="bg-primary rounded-[20px] p-4 w-[48%] flex flex-col items-center text-white shadow-lg">
            <p className="text-center font-bold mb-2 text-sm">
              오늘의 기분을 기록하고 싶다면?
            </p>
            <p className="text-center text-xs">{`> 챗인지와 함께 기록하기`}</p>
          </div>
          <div className="bg-primary-50 rounded-[20px] p-4 w-[48%] flex flex-col items-center shadow-lg">
            <p className="text-center font-bold mb-2 text-sm">
              하루 한 번, 오늘의 약 점검!
            </p>
            <p className="text-center text-xs text-gray-600">
              {`> 챗인지와 함께 기록하기`}
            </p>
          </div>
        </div>

        {/* 날짜 및 이모지 선택 */}
        <div className="mb-8">
          <div className="text-center mb-2">{dateRange}</div>
          <div className="flex justify-between items-center">
            <div className="text-center w-8">일</div>
            <div className="text-center w-8">월</div>
            <div className="text-center w-8">화</div>
            <div className="text-center w-8">수</div>
            <div className="text-center w-8">목</div>
            <div className="text-center w-8">금</div>
            <div className="text-center w-8">토</div>
          </div>

          <div className="emoji-container mt-2">
            {weekDates.map(({ date, emoji, fullDate }) => (
              <button
                key={fullDate}
                onClick={() => router.push(`/diary/${fullDate}`)}
                className={`emoji-container-item`}
              >
                <div className="flex flex-col items-center">
                  <span className="text-xl">{emoji}</span>
                  <span className="text-xs mt-1">{date}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 마인드 로그 */}
        <div className="m-2 border border-gray-200 rounded-[20px] p-4 shadow-lg">
          <h2 className="font-bold mb-2">마인드 로그</h2>
          <div className="flex space-x-2 my-2">
            <button className="bg-gray-100 px-3 py-1 rounded-full text-sm">
              최근 기록
            </button>
            <button className="bg-gray-100 px-3 py-1 rounded-full text-sm">
              매우 좋아요
            </button>
            <button className="bg-gray-100 px-3 py-1 rounded-full text-sm">
              최근 일주일
            </button>
          </div>
          {/* 리스트 아이템 */}
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center mb-4 border border-gray-200 rounded-lg p-3"
            >
              <div className="bg-gray-200 p-2 rounded-lg mr-3">
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-500">
                  Category • 1.2 miles away
                </div>
                <div className="font-medium">List item</div>
                <div className="text-sm text-gray-500">
                  Supporting line text
                </div>
              </div>
              <button className="ml-2">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
      <BottomNaviation />
    </div>
  );
}
