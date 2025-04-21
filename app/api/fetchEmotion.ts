"use server";
import { EmotionData, EmotionResponse } from "@/constants/types";
import { prisma } from "@/lib/prisma";

async function createEmotionRecord(
  emotionData: EmotionData
): Promise<EmotionResponse> {
  const newEmotionRecord = await prisma.emotionRecord.create({
    data: {
      userEmail: emotionData.userEmail,
      emotion: emotionData.emotion || "",
      date: emotionData.date || new Date(),
      reason: emotionData.reason || "",
      feeling: emotionData.feeling || "",
      detailedEmotions: emotionData.detailedEmotions || [],
      aiSummary: emotionData.aiSummary || "",
    },
  });

  return newEmotionRecord;
}
