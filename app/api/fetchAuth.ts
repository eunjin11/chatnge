"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function checkDuplicateEmail(email: string) {
  const response = await prisma.user.findUnique({
    where: { email },
  });
  return response !== null;
}

export async function signup(email: string, name: string, password: string) {
  const isExistingUser = await checkDuplicateEmail(email);
  if (isExistingUser) {
    return new Error("이미 존재하는 이메일입니다.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const response = await prisma.user.create({
    data: { email, name, password: hashedPassword, birthdate: new Date() },
  });
  return response;
}
