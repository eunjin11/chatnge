"use server";

import { prisma } from "@/lib/prisma";
import { getUserEmail } from "./user";

export async function createChatSession(sessionId: string) {
  try {
    const userEmail = await getUserEmail();

    const newSession = await prisma.conversation_sessions.create({
      data: {
        session_id: sessionId,
        user_email: userEmail,
        session_start_time: new Date(),
        message_count: 0,
      },
    });

    return { success: true, session: newSession };
  } catch (error) {
    console.error("채팅 세션 생성 오류:", error);
    return { success: false, error: "채팅 세션 생성 중 오류가 발생했습니다." };
  }
}

export async function addChatMessage(
  sessionId: string,
  content: string,
  role: "USER" | "ASSISTANT",
) {
  try {
    const userEmail = await getUserEmail();

    const newMessage = await prisma.chat_messages.create({
      data: {
        userEmail: userEmail,
        role: role,
        content: content,
        date: new Date(),
        session_id: sessionId,
        updatedAt: new Date(),
      },
    });

    // conversation_sessions의 message_count 업데이트
    await prisma.conversation_sessions.update({
      where: { session_id: sessionId },
      data: {
        message_count: {
          increment: 1,
        },
      },
    });

    return { success: true, message: newMessage };
  } catch (error) {
    console.error("채팅 메시지 추가 오류:", error);
    return {
      success: false,
      error: "채팅 메시지 추가 중 오류가 발생했습니다.",
    };
  }
}

export async function getChatMessages(sessionId: string) {
  try {
    const userEmail = await getUserEmail();

    // 세션이 해당 사용자의 것인지 확인
    const session = await prisma.conversation_sessions.findFirst({
      where: {
        session_id: sessionId,
        user_email: userEmail,
      },
    });

    if (!session) {
      return { success: false, error: "세션을 찾을 수 없습니다." };
    }

    // 해당 세션의 모든 메시지를 시간순으로 가져오기
    const messages = await prisma.chat_messages.findMany({
      where: {
        session_id: sessionId,
        userEmail: userEmail,
      },
      orderBy: {
        createdAt: "asc",
      },
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

export async function getUserChatSessions() {
  try {
    const userEmail = await getUserEmail();

    // 사용자의 모든 채팅 세션을 최신순으로 가져오기
    const sessions = await prisma.conversation_sessions.findMany({
      where: {
        user_email: userEmail,
      },
      orderBy: {
        session_start_time: "desc",
      },
      include: {
        chat_messages: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1, // 가장 최근 메시지만 가져오기
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
