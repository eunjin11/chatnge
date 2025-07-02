"use server";

import { prisma } from "@/lib/prisma";
import { getUserEmail } from "./user";

type Role = "USER" | "ASSISTANT";

async function saveMessage(
  tx: typeof prisma | typeof prisma.$transaction,
  sessionId: string,
  content: string,
  role: Role,
  userEmail: string,
) {
  return tx.chat_messages.create({
    data: {
      userEmail,
      role,
      content,
      date: new Date(),
      session_id: sessionId,
      updatedAt: new Date(),
    },
  });
}

async function incrementMessageCount(
  tx: typeof prisma | typeof prisma.$transaction,
  sessionId: string,
  count: number = 1,
) {
  return tx.conversation_sessions.update({
    where: { session_id: sessionId },
    data: {
      message_count: {
        increment: count,
      },
    },
  });
}

async function fetchAIResponse(message: string, sessionId: string) {
  // TODO: 실제 AI 호출 로직으로 교체
  return { success: true, message: "AI 응답 예시" };
}

// 채팅 세션 생성
export async function createChatSession(sessionId: string) {
  try {
    const userEmail = await getUserEmail();

    const session = await prisma.conversation_sessions.create({
      data: {
        session_id: sessionId,
        user_email: userEmail,
        session_start_time: new Date(),
        message_count: 0,
      },
    });

    return { success: true, session };
  } catch (error) {
    console.error("채팅 세션 생성 오류:", error);
    return { success: false, error: "채팅 세션 생성 중 오류가 발생했습니다." };
  }
}

// 채팅 메시지 추가 (단일 메시지)
export async function addChatMessage(
  sessionId: string,
  content: string,
  role: Role,
) {
  try {
    const userEmail = await getUserEmail();

    const result = await prisma.$transaction(async (tx) => {
      const message = await saveMessage(
        tx,
        sessionId,
        content,
        role,
        userEmail,
      );
      await incrementMessageCount(tx, sessionId);
      return message;
    });

    return { success: true, message: result };
  } catch (error) {
    console.error("채팅 메시지 추가 오류:", error);
    return {
      success: false,
      error: "채팅 메시지 추가 중 오류가 발생했습니다.",
    };
  }
}

// 사용자 메시지 + AI 응답 동시 처리
export async function sendMessageAndGetAIResponse(
  sessionId: string,
  userMessage: string,
) {
  try {
    const userEmail = await getUserEmail();

    return await prisma.$transaction(async (tx) => {
      // 1. 사용자 메시지 저장
      const userMsg = await saveMessage(
        tx,
        sessionId,
        userMessage,
        "USER",
        userEmail,
      );

      // 2. AI 응답 받기
      const aiResponse = await fetchAIResponse(userMessage, sessionId);
      if (!aiResponse.success) throw new Error("AI 응답을 받지 못했습니다.");

      // 3. AI 메시지 저장
      const aiMsg = await saveMessage(
        tx,
        sessionId,
        aiResponse.message,
        "ASSISTANT",
        userEmail,
      );

      // 4. 메시지 카운트 증가
      await incrementMessageCount(tx, sessionId, 2);

      return {
        success: true,
        userMessage: userMsg,
        aiResponse: aiMsg,
        aiMessage: aiResponse.message,
      };
    });
  } catch (error) {
    console.error("메시지 전송 및 AI 응답 처리 오류:", error);
    return { success: false, error: "메시지 전송 중 오류가 발생했습니다." };
  }
}

// 채팅 메시지 목록 조회
export async function getChatMessages(sessionId: string) {
  try {
    const userEmail = await getUserEmail();

    const session = await prisma.conversation_sessions.findFirst({
      where: { session_id: sessionId, user_email: userEmail },
    });

    if (!session) {
      return { success: false, error: "세션을 찾을 수 없습니다." };
    }

    const messages = await prisma.chat_messages.findMany({
      where: { session_id: sessionId, userEmail },
      orderBy: { createdAt: "asc" },
    });

    return { success: true, messages, session };
  } catch (error) {
    console.error("채팅 메시지 조회 오류:", error);
    return {
      success: false,
      error: "채팅 메시지 조회 중 오류가 발생했습니다.",
    };
  }
}

// 사용자의 모든 채팅 세션 조회
export async function getUserChatSessions() {
  try {
    const userEmail = await getUserEmail();

    const sessions = await prisma.conversation_sessions.findMany({
      where: { user_email: userEmail },
      orderBy: { session_start_time: "desc" },
      include: {
        chat_messages: {
          orderBy: { createdAt: "desc" },
          take: 1, // 가장 최근 메시지
        },
      },
    });

    return { success: true, sessions };
  } catch (error) {
    console.error("채팅 세션 목록 조회 오류:", error);
    return {
      success: false,
      error: "채팅 세션 목록 조회 중 오류가 발생했습니다.",
    };
  }
}
