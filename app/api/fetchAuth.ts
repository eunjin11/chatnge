"use server";

import { prisma } from "@/lib/prisma";

export async function checkDuplicateEmail(email: string) {
  const response = await prisma.user.findUnique({
    where: { email },
  });

  return response !== null;
}
