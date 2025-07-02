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

interface ChatMessage {
  id: number;
  content: string;
  role: "USER" | "ASSISTANT";
  date: Date;
  session_id: string | null;
}

interface ChatMessageResponse {
  success: boolean;
  userMessage: ChatMessage;
  aiResponse: ChatMessage;
  aiMessage: string;
}

export async function sendMessageAndGetAIResponse(
  sessionId: string,
  userMessage: string,
): Promise<
  | ChatMessageResponse
  | {
      success: boolean;
      error: string;
    }
> {
  try {
    const userEmail = await getUserEmail();

    // 트랜잭션을 사용하여 원자성 보장
    return await prisma.$transaction(async (tx) => {
      // 1. 사용자 메시지 저장
      const userMessageResult = await tx.chat_messages.create({
        data: {
          userEmail,
          role: "USER",
          content: userMessage,
          date: new Date(),
          session_id: sessionId,
          updatedAt: new Date(),
        },
      });

      // 2. AI 응답 받기
      const aiResponse = await fetchAIResponse(userMessage, sessionId);
      if (!aiResponse.success) {
        throw new Error("AI 응답을 받지 못했습니다.");
      }

      // 3. AI 응답 저장
      const aiMessageResult = await tx.chat_messages.create({
        data: {
          userEmail,
          role: "ASSISTANT",
          content: aiResponse.message,
          date: new Date(),
          session_id: sessionId,
          updatedAt: new Date(),
        },
      });

      // 4. 메시지 카운트 업데이트
      await tx.conversation_sessions.update({
        where: { session_id: sessionId },
        data: { message_count: { increment: 2 } },
      });

      return {
        success: true,
        userMessage: userMessageResult,
        aiResponse: aiMessageResult,
        aiMessage: aiResponse.message,
      };
    });
  } catch (error) {
    console.error("메시지 전송 및 AI 응답 처리 오류:", error);
    return { success: false, error: "메시지 전송 중 오류가 발생했습니다." };
  }
}

async function fetchAIResponse(message: string, sessionId: string) {
  return { success: true, message: "AI 응답 예시" };
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
