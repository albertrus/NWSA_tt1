import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { verify as totpVerify } from "otplib/functional";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { code } = await req.json();
  if (!code) {
    return NextResponse.json({ error: "Code is required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user?.twoFactorSecret) {
    return NextResponse.json({ error: "2FA not initialized" }, { status: 400 });
  }

  const result = await totpVerify({ token: code, secret: user.twoFactorSecret });
  const isValid = typeof result === "object" ? result.valid : !!result;
  if (!isValid) {
    return NextResponse.json({ error: "Invalid code" }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { twoFactorEnabled: true },
  });

  return NextResponse.json({ success: true });
}
