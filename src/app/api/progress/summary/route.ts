import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ percentage: 0, completed: 0, total: 0 });
    }

    const [total, completed] = await Promise.all([
      prisma.chapter.count(),
      prisma.userProgress.count({
        where: { userId: session.user.id, completed: true },
      }),
    ]);

    const percentage = total ? Math.round((completed / total) * 100) : 0;
    return NextResponse.json({ percentage, completed, total });
  } catch {
    return NextResponse.json({ percentage: 0, completed: 0, total: 0 });
  }
}
