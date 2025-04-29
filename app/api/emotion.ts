"use server";
import { EmotionData, EmotionResponse } from "@/constants/types";
import { prisma } from "@/lib/prisma";
import { getUserEmail } from "./user";
import { WEEK_DAYS } from "@/constants/week";
import { formatDateMMDD, formatDateYYYYMMDD } from "@/utils/formatDate";
import { WeeklyEmotionSummary } from "@/types/emotion.dto";
import { getStartAndEndOfDay } from "@/utils/date";

interface EmotionRecord {
  date: Date;
  emotion: string | null;
  userEmail?: string;
}

export async function findEmotionRecordsInRange(
  userEmail: string,
  start: Date,
  end: Date
) {
  return prisma.emotionRecord.findMany({
    where: {
      userEmail,
      date: {
        gte: start,
        lte: end,
      },
    },
  });
}

export async function findEmotionRecordByDate(
  userEmail: string,
  date: Date
): Promise<EmotionRecord | null> {
  const { start, end } = getStartAndEndOfDay(date);
  return prisma.emotionRecord.findFirst({
    where: {
      userEmail,
      date: {
        gte: start,
        lte: end,
      },
    },
  });
}

export async function createEmotionRecord(
  emotionData: EmotionData
): Promise<EmotionResponse> {
  try {
    const userEmail = await getUserEmail();
    const date = emotionData.date || new Date();

    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    // 기존 기록이 있는지 확인
    const existingRecord = await prisma.emotionRecord.findFirst({
      where: {
        userEmail,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    if (existingRecord) {
      // 기록이 있으면 업데이트
      const updatedRecord = await prisma.emotionRecord.update({
        where: {
          id: existingRecord.id,
        },
        data: {
          emotion: emotionData.emotion || "",
          reason: emotionData.reason || "",
          feeling: emotionData.feeling || "",
          detailedEmotions: emotionData.detailedEmotions || [],
          oneLineRecord: emotionData.oneLineRecord || "",
          aiSummary: emotionData.aiSummary || "",
        },
      });

      return updatedRecord;
    } else {
      // 없으면 새로 생성
      const newRecord = await prisma.emotionRecord.create({
        data: {
          userEmail,
          emotion: emotionData.emotion || "",
          date: date,
          reason: emotionData.reason || "",
          feeling: emotionData.feeling || "",
          detailedEmotions: emotionData.detailedEmotions || [],
          oneLineRecord: emotionData.oneLineRecord || "",
          aiSummary: emotionData.aiSummary || "",
        },
      });

      return newRecord;
    }
  } catch (error) {
    console.error("Error creating or updating emotion record:", error);
    throw new Error("감정 기록 처리 중 오류가 발생했습니다.");
  }
}

export async function getAiSummary(emotionData: EmotionData): Promise<string> {
  try {
    console.log("emotionData", emotionData);
    return "ai summary";
  } catch (error) {
    console.error("Error creating emotion record:", error);
    throw new Error("ai 요약을 생성하는 중 오류가 발생했습니다.");
  }
}

export async function getEmotionRecordByDate(
  date: Date
): Promise<EmotionRecord | null> {
  try {
    const userEmail = await getUserEmail();
    return await findEmotionRecordByDate(userEmail, date);
  } catch (error) {
    console.error("Error fetching emotion record:", error);
    throw new Error("감정 기록을 불러오는 중 오류가 발생했습니다.");
  }
}

export async function getWeeklyEmotionSummary(
  date: Date
): Promise<WeeklyEmotionSummary> {
  // 날짜 계산 함수
  const calculateWeekDates = (currentDate: Date) => {
    const day = currentDate.getDay(); // 0 = Sunday

    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - day);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return { startOfWeek, endOfWeek };
  };

  // 주간 데이터 생성 함수
  const generateWeekData = (startDate: Date, records: EmotionRecord[] = []) => {
    return Array.from({ length: 7 }).map((_, i) => {
      const dateObj = new Date(startDate);
      dateObj.setDate(startDate.getDate() + i);
      const dateKey = dateObj.toISOString().split("T")[0];

      const record = records.find(
        (r) => r.date.toISOString().split("T")[0] === dateKey
      );

      return {
        dayOfWeek: WEEK_DAYS[i],
        date: formatDateMMDD(dateObj),
        fullDate: formatDateYYYYMMDD(dateObj),
        emotion: record?.emotion || null,
      };
    });
  };

  // 날짜 계산 실행
  const { startOfWeek, endOfWeek } = calculateWeekDates(new Date(date));

  // 주간 범위 정보
  const weekRange = {
    sunday: formatDateMMDD(startOfWeek),
    saturday: formatDateMMDD(endOfWeek),
  };

  try {
    const userEmail = await getUserEmail();

    // 감정 기록 조회
    const records = await findEmotionRecordsInRange(
      userEmail,
      startOfWeek,
      endOfWeek
    );

    // 사용자 데이터로 주간 데이터 생성
    const weekData = generateWeekData(startOfWeek, records);

    return { weekRange, weekData };
  } catch (error) {
    console.error("Error fetching weekly emotion summary:", error);

    // 오류 발생 시 빈 데이터로 주간 데이터 생성
    const weekData = generateWeekData(startOfWeek);

    return { weekRange, weekData };
  }
}
