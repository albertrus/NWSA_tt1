import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { seedDatabase } from "@/lib/db";

export async function GET() {
  try {
    await seedDatabase();
    const chapters = await prisma.chapter.findMany({
      orderBy: { order: "asc" },
      include: {
        quiz: {
          select: { id: true, title: true },
        },
      },
    });
    return NextResponse.json(chapters);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch chapters" },
      { status: 500 }
    );
  }
}
