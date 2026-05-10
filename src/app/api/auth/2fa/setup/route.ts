import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { generateSecret, generateURI } from "otplib/functional";
import QRCode from "qrcode";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const secret = generateSecret();
  const otpauthUrl = generateURI({
    label: session.user.email ?? session.user.id,
    issuer: "NWSA TT1 Prep",
    secret,
  });
  const qrCodeDataUrl = await QRCode.toDataURL(otpauthUrl);

  await prisma.user.update({
    where: { id: session.user.id },
    data: { twoFactorSecret: secret, twoFactorEnabled: false },
  });

  return NextResponse.json({ secret, qrCodeDataUrl });
}
