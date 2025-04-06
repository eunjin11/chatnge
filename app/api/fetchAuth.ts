"use server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET_KEY || "your-secret-key"
);

interface UserData {
  email: string;
  name: string;
}

interface ProfileUpdateData {
  nickname?: string;
  birthdate?: Date;
  motivation?: string[];
  medicationStatus?: "YES" | "NO" | "UNKNOWN";
}

async function createSessionToken(userData: UserData) {
  try {
    // JWT 토큰 생성
    const token = await new SignJWT({
      email: userData.email,
      name: userData.name,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(SECRET_KEY);

    // 쿠키에 토큰 저장
    (await cookies()).set("access-token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24시간
    });

    return {
      user: {
        email: userData.email,
        name: userData.name,
      },
    };
  } catch (error) {
    console.error("Token creation error:", error);
    throw new Error("세션 생성 중 오류가 발생했습니다.");
  }
}

export async function checkDuplicateEmail(email: string) {
  const response = await prisma.user.findUnique({
    where: { email },
  });
  return response !== null;
}

interface UserResponse {
  user?: { email: string; name: string };
  error?: string;
}

// 회원가입
export async function signup(
  email: string,
  name: string,
  password: string
): Promise<UserResponse> {
  try {
    const isExistingUser = await checkDuplicateEmail(email);
    if (isExistingUser) {
      return { error: "이미 존재하는 이메일입니다." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword, birthdate: new Date() },
    });

    // 회원가입 성공 후 세션 생성
    await createSessionToken({
      email: user.email,
      name: user.name,
    });

    return { user: { email: user.email, name: user.name } };
  } catch (error) {
    console.error("Signup error:", error);
    return { error: "회원가입 중 오류가 발생했습니다." };
  }
}

// 로그인
export async function login(
  email: string,
  password: string
): Promise<UserResponse> {
  try {
    // 1. 사용자 찾기
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        email: true,
        password: true,
        name: true,
      },
    });

    if (!user) {
      return { error: "이메일 혹은 비밀번호가 틀렸어요. 다시 확인해주세요" };
    }

    // 2. 비밀번호 확인
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { error: "이메일 혹은 비밀번호가 틀렸어요. 다시 확인해주세요" };
    }

    // 3. 로그인 성공 후 세션 생성
    await createSessionToken({
      email: user.email,
      name: user.name,
    });

    return { user: { email: user.email, name: user.name } };
  } catch (error) {
    console.error("Login error:", error);
    return { error: "로그인 중 오류가 발생했습니다." };
  }
}

export async function verifySession() {
  try {
    const token = (await cookies()).get("access-token");
    if (!token) {
      return null;
    }

    // JWT 토큰 검증 로직 추가 필요

    return token;
  } catch (error) {
    console.error("Session verification error:", error);
    return null;
  }
}

export async function updateProfile(profileData: ProfileUpdateData) {
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
