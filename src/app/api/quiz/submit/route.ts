import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { quizId, answers } = await request.json();

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: { orderBy: { order: "asc" } } },
    });

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    let score = 0;
    const results = quiz.questions.map((question, index) => {
      const userAnswer = answers[index] as number | null;
      const isCorrect = userAnswer === question.correctAnswer;
      if (isCorrect) score++;
      return {
        questionId: question.id,
        userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        explanation: question.explanation,
      };
    });

    const attempt = await prisma.quizAttempt.create({
      data: {
        userId: session.user.id,
        quizId,
        score,
        totalQuestions: quiz.questions.length,
        answers: JSON.stringify(answers),
      },
    });

    // Mark chapter as completed if score >= 70%
    if (score / quiz.questions.length >= 0.7) {
      await prisma.userProgress.upsert({
        where: {
          userId_chapterId: {
            userId: session.user.id,
            chapterId: quiz.chapterId,
          },
        },
        update: { completed: true, completedAt: new Date() },
        create: {
          userId: session.user.id,
          chapterId: quiz.chapterId,
          completed: true,
          completedAt: new Date(),
        },
      });
    }

    return NextResponse.json({
      attemptId: attempt.id,
      score,
      totalQuestions: quiz.questions.length,
      percentage: Math.round((score / quiz.questions.length) * 100),
      results,
      passed: score / quiz.questions.length >= 0.7,
    });
  } catch (error) {
    console.error("[quiz/submit] Error:", error);
    return NextResponse.json(
      { error: "Failed to submit quiz" },
      { status: 500 }
    );
  }
}
