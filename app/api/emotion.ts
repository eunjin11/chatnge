"use server";
import { EmotionData, EmotionResponse } from "@/constants/types";
import { prisma } from "@/lib/prisma";
import { getUserEmail } from "./user";
import { WEEK_DAYS } from "@/constants/week";
import { formatDateMMDD } from "@/utils/formatDate";
import { WeeklyEmotionSummary } from "@/types/emotion.dto";

export async function createEmotionRecord(
  emotionData: EmotionData
): Promise<EmotionResponse> {
  try {
    const newEmotionRecord = await prisma.emotionRecord.create({
      data: {
        userEmail: await getUserEmail(),
        emotion: emotionData.emotion || "",
        date: emotionData.date || new Date(),
        reason: emotionData.reason || "",
        feeling: emotionData.feeling || "",
        detailedEmotions: emotionData.detailedEmotions || [],
        oneLineRecord: emotionData.oneLineRecord || "",
        aiSummary: emotionData.aiSummary || "",
      },
    });

    return newEmotionRecord;
  } catch (error) {
    console.error("Error creating emotion record:", error);
    throw new Error("감정 기록을 생성하는 중 오류가 발생했습니다.");
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
): Promise<EmotionResponse | null> {
  try {
    const userEmail = await getUserEmail();
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));
    const emotionRecord = await prisma.emotionRecord.findFirst({
      where: {
        userEmail,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    return emotionRecord || null;
  } catch (error) {
    console.error("Error fetching emotion record:", error);
    throw new Error("감정 기록을 불러오는 중 오류가 발생했습니다.");
  }
}

export async function getWeeklyEmotionSummary(
  date: Date
): Promise<WeeklyEmotionSummary> {
  try {
    const userEmail = await getUserEmail();

    const current = new Date(date);
    const day = current.getDay(); // 0 = Sunday

    const startOfWeek = new Date(current);
    startOfWeek.setDate(current.getDate() - day);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const records = await prisma.emotionRecord.findMany({
      where: {
        userEmail,
        date: {
          gte: startOfWeek,
          lte: endOfWeek,
        },
      },
    });

    const summary = Array.from({ length: 7 }).map((_, i) => {
      const dateObj = new Date(startOfWeek);
      dateObj.setDate(startOfWeek.getDate() + i);
      const dateKey = dateObj.toISOString().split("T")[0];

      const record = records.find(
        (r) => r.date.toISOString().split("T")[0] === dateKey
      );

      return {
        day: WEEK_DAYS[i],
        date: formatDateMMDD(dateObj),
        emotion: record?.emotion || null,
      };
    });

    return {
      weekRange: {
        sunday: formatDateMMDD(startOfWeek),
        saturday: formatDateMMDD(endOfWeek),
      },
      summary,
    };
  } catch (error) {
    console.error("Error fetching weekly emotion summary:", error);
    throw new Error("주간 감정 요약을 불러오는 중 오류가 발생했습니다.");
  }
}
