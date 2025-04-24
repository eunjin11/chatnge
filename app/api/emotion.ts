"use server";
import { EmotionData, EmotionResponse } from "@/constants/types";
import { prisma } from "@/lib/prisma";
import { getUserEmail } from "./user";

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
