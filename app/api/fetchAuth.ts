"use server";
import "server-only";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { SignJWT } from "jose";

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET_KEY || "your-secret-key"
);

interface UserData {
  email: string;
  name: string;
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

export async function signup(email: string, name: string, password: string) {
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
    return await createSessionToken({ email: user.email, name: user.name });
  } catch (error) {
    console.error("Signup error:", error);
    return { error: "회원가입 중 오류가 발생했습니다." };
  }
}

export async function login(email: string, password: string) {
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
      return { error: "이메일이 존재하지 않습니다." };
    }

    // 2. 비밀번호 확인
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { error: "비밀번호가 일치하지 않습니다." };
    }

    // 3. 로그인 성공 후 세션 생성
    return await createSessionToken({ email: user.email, name: user.name });
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
