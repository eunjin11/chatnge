"use server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import {
  ProfileResponse,
  ProfileUpdateData,
  UserData,
  UserResponse,
} from "@/constants/types";

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET_KEY || "your-secret-key"
);

export async function updateProfile(
  profileData: ProfileUpdateData
): Promise<ProfileResponse> {
  try {
    // 현재 로그인된 사용자의 이메일 가져오기
    const token = (await cookies()).get("access-token");
    if (!token) {
      return { error: "로그인이 필요합니다." };
    }

    // JWT 토큰 검증 및 사용자 정보 추출
    const verified = await jwtVerify(token.value, SECRET_KEY);
    const userEmail = verified.payload.email as string;

    // 프로필 정보 업데이트
    const updatedUser = await prisma.user.update({
      where: { email: userEmail },
      data: {
        ...profileData,
        updatedAt: new Date(),
      },
      select: {
        email: true,
        name: true,
        nickname: true,
        birthdate: true,
        status: true,
        motivation: true,
        medicationStatus: true,
      },
    });

    return { user: updatedUser };
  } catch (error) {
    console.error("Profile update error:", error);
    return { error: "프로필 업데이트 중 오류가 발생했습니다." };
  }
}

export async function getCurrentUserProfile(): Promise<ProfileResponse> {
  try {
    // 현재 로그인된 사용자의 이메일 가져오기
    const token = (await cookies()).get("access-token");
    if (!token) {
      return { error: "로그인이 필요합니다." };
    }

    // JWT 토큰 검증 및 사용자 정보 추출
    const verified = await jwtVerify(token.value, SECRET_KEY);
    const userEmail = verified.payload.email as string;

    // 사용자 정보 조회
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      select: {
        email: true,
        name: true,
        nickname: true,
        birthdate: true,
        status: true,
        motivation: true,
        medicationStatus: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return { error: "사용자를 찾을 수 없습니다." };
    }

    return { user };
  } catch (error) {
    console.error("Profile fetch error:", error);
    return { error: "프로필 정보를 가져오는 중 오류가 발생했습니다." };
  }
}
