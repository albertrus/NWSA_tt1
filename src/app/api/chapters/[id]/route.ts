import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { seedDatabase } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await seedDatabase();
    const { id } = await params;
    const chapter = await prisma.chapter.findUnique({
      where: { id },
      include: {
        quiz: {
          include: { questions: { orderBy: { order: "asc" } } },
        },
        lessons: { orderBy: { order: "asc" } },
      },
    });

    if (!chapter) {
      return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
    }

    return NextResponse.json(chapter);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch chapter" },
      { status: 500 }
    );
  }
}
