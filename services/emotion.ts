"use server";

import { EmotionData, EmotionResponse } from "@/constants/types";
import { prisma } from "@/lib/prisma";
import { WeeklyEmotionSummary } from "@/types/emotion.dto";
import { MonthlyEmotionSummary } from "@/types/emotion.dto";
import {
  calculateWeekDates,
  generateWeekData,
  getStartAndEndOfDay,
  calculateMonthDates,
  generateMonthData,
} from "@/utils/date";
import { formatDateMMDD } from "@/utils/formatDate";
import { getUserEmail } from "./user";

export async function findEmotionRecordsInRange(
  userEmail: string,
  start: Date,
  end: Date,
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
  date: Date,
): Promise<EmotionResponse | null> {
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

export async function getEmotionRecordByDate(
  date: Date,
): Promise<EmotionResponse | null> {
  try {
    const userEmail = await getUserEmail();
    const emotionRecord = await findEmotionRecordByDate(
      userEmail,
      new Date(date),
    );
    return emotionRecord;
  } catch (error) {
    console.error("Error fetching emotion record:", error);
    throw new Error("감정 기록 조회 중 오류가 발생했습니다.");
  }
}

export async function createEmotionRecord(
  emotionData: EmotionData,
): Promise<EmotionResponse> {
  try {
    const userEmail = await getUserEmail();
    const date = emotionData.date || new Date();

    // 기존 기록이 있는지 확인
    const existingRecord = await findEmotionRecordByDate(userEmail, date);

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

export async function getWeeklyEmotionSummary(
  date: Date,
): Promise<WeeklyEmotionSummary> {
  // 날짜 계산
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
      endOfWeek,
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

export async function getMonthlyEmotionSummary(
  date: Date,
): Promise<MonthlyEmotionSummary> {
  // 날짜 계산
  const { startOfMonth, endOfMonth } = calculateMonthDates(new Date(date));

  // 월간 범위 정보
  const monthRange = {
    firstDay: formatDateMMDD(startOfMonth),
    lastDay: formatDateMMDD(endOfMonth),
  };

  try {
    const userEmail = await getUserEmail();

    // 감정 기록 조회
    const records = await findEmotionRecordsInRange(
      userEmail,
      startOfMonth,
      endOfMonth,
    );

    // 사용자 데이터로 월간 데이터 생성
    const monthData = generateMonthData(startOfMonth, records);

    return { monthRange, monthData };
  } catch (error) {
    console.error("Error fetching monthly emotion summary:", error);

    // 오류 발생 시 빈 데이터로 월간 데이터 생성
    const monthData = generateMonthData(startOfMonth);

    return { monthRange, monthData };
  }
}
