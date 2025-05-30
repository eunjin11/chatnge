"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import MindLog from "@/app/diary/_component/MindLog";
import Header from "@/components/Header";
import { WEEK_DAYS } from "@/constants/week";
import { MonthlyEmotionItem } from "@/types/emotion.dto";

interface DiaryClientProps {
  monthRange: string;
  monthData: MonthlyEmotionItem[];
}

// monthData를 week 단위 2차원 배열로 변환
function getWeeks(monthData: MonthlyEmotionItem[]) {
  const firstDay = new Date(monthData[0].fullDate).getDay();
  const weeks: MonthlyEmotionItem[][] = [];
  let week: (MonthlyEmotionItem | null)[] = Array(firstDay).fill(null);

  monthData.forEach((item) => {
    week.push(item);
    if (week.length === 7) {
      weeks.push(week as MonthlyEmotionItem[]);
      week = [];
    }
  });
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week as MonthlyEmotionItem[]);
  }
  return weeks;
}

export default function DiaryClient({
  monthRange,
  monthData,
}: DiaryClientProps) {
  const router = useRouter();
  const weeks = getWeeks(monthData);

  return (
    <div className="flex flex-col min-h-screen">
      <Header title={"기록"} />

      <div className="flex-1 overflow-y-auto p-4 pb-20 mt-14">
        <div className="mb-8">
          <div className="mx-2 text-sm flex items-center gap-1">
            <div>{monthRange}</div>
            <Image
              src="/ArrowRight.svg"
              alt="full diary"
              width={8}
              height={10}
              className="w-[8px] h-[10px] align-middle"
            />
          </div>
          {/* 달력 헤더 */}
          <div className="flex justify-between mt-4 mb-2 text-xs text-gray-500">
            {WEEK_DAYS.map((d) => (
              <div key={d} className="w-8 text-center">
                {d}
              </div>
            ))}
          </div>
          {/* 달력 본문 */}
          <div className="flex flex-col gap-1">
            {weeks.map((week, i) => (
              <div className="flex justify-between" key={i}>
                {week.map((day, j) =>
                  day ? (
                    <button
                      key={day.fullDate}
                      onClick={() => {
                        if (day.emotion === null) {
                          router.push(`/diary/${day.fullDate}/create`);
                        } else {
                          router.push(`/diary/${day.fullDate}`);
                        }
                      }}
                      className="flex flex-col items-center justify-center cursor-pointer"
                    >
                      {!day.emotion ? (
                        <div className="w-[35px] h-[35px] bg-[#D9D9D9] rounded-[10px] text-2xl flex items-center justify-center font-extrabold text-gray-600">
                          <div>+</div>
                        </div>
                      ) : (
                        <Image
                          src={`/images/${day.emotion}.png`}
                          alt={day.emotion}
                          width={35}
                          height={35}
                          className="w-[35px] h-[35px]"
                        />
                      )}
                      <span className="text-[10px] w-8 text-center mt-1 text-gray-500">
                        {day.day}
                      </span>
                    </button>
                  ) : (
                    <div key={j} className="w-8 h-16" />
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
        <MindLog />
      </div>
    </div>
  );
}
