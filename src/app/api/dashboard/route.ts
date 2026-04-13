import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { seedDatabase } from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await seedDatabase();

    const [chapters, progress, quizAttempts] = await Promise.all([
      prisma.chapter.findMany({ orderBy: { order: "asc" } }),
      prisma.userProgress.findMany({
        where: { userId: session.user.id },
      }),
      prisma.quizAttempt.findMany({
        where: { userId: session.user.id },
        include: { quiz: { select: { chapterId: true, title: true } } },
        orderBy: { completedAt: "desc" },
      }),
    ]);

    const completedChapters = progress.filter((p) => p.completed).length;
    const totalChapters = chapters.length;

    const bestScores = quizAttempts.reduce(
      (acc, attempt) => {
        const key = attempt.quizId;
        if (
          !acc[key] ||
          attempt.score / attempt.totalQuestions >
            acc[key].score / acc[key].totalQuestions
        ) {
          acc[key] = attempt;
        }
        return acc;
      },
      {} as Record<string, (typeof quizAttempts)[0]>
    );

    return NextResponse.json({
      totalChapters,
      completedChapters,
      progressPercentage: totalChapters
        ? Math.round((completedChapters / totalChapters) * 100)
        : 0,
      chapters: chapters.map((chapter) => ({
        ...chapter,
        completed: progress.some(
          (p) => p.chapterId === chapter.id && p.completed
        ),
      })),
      recentAttempts: quizAttempts.slice(0, 5),
      bestScores: Object.values(bestScores),
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
