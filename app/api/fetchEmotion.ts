"use server";
import { EmotionData, EmotionResponse } from "@/constants/types";
import { prisma } from "@/lib/prisma";
import { getUserEmail } from "./fetchUser";

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
    const emotionRecord = await prisma.emotionRecord.findFirst({
      where: {
        userEmail: await getUserEmail(),
        date: date,
      },
    });

    return emotionRecord || null;
  } catch (error) {
    console.error("Error fetching emotion record:", error);
    throw new Error("감정 기록을 불러오는 중 오류가 발생했습니다.");
  }
}
