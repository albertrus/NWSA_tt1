import { prisma } from "@/lib/prisma";
import { seedDatabase } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { QuizClient } from "@/components/QuizClient";

export default async function QuizPage({
  params,
}: {
  params: { id: string };
}) {
  await seedDatabase();
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  const chapter = await prisma.chapter.findUnique({
    where: { id: params.id },
    include: {
      quiz: {
        include: { questions: { orderBy: { order: "asc" } } },
      },
    },
  });

  if (!chapter?.quiz) notFound();

  const questions = chapter.quiz.questions.map((q) => ({
    id: q.id,
    text: q.text,
    options: JSON.parse(q.options) as string[],
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <QuizClient
        quizId={chapter.quiz.id}
        chapterId={chapter.id}
        chapterTitle={chapter.title}
        chapterOrder={chapter.order}
        questions={questions}
      />
    </div>
  );
}
