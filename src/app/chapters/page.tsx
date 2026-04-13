import { prisma } from "@/lib/prisma";
import { seedDatabase } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";

export default async function ChaptersPage() {
  const session = await getServerSession(authOptions);
  await seedDatabase();

  const chapters = await prisma.chapter.findMany({
    orderBy: { order: "asc" },
    include: { quiz: { select: { id: true } } },
  });

  let progress: { chapterId: string; completed: boolean }[] = [];
  if (session?.user?.id) {
    progress = await prisma.userProgress.findMany({
      where: { userId: session.user.id },
      select: { chapterId: true, completed: true },
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Chapters</h1>
        <p className="text-gray-500 mb-8">
          Work through each chapter and take the quiz to track your progress.
        </p>

        <div className="space-y-4">
          {chapters.map((chapter) => {
            const isCompleted = progress.some(
              (p) => p.chapterId === chapter.id && p.completed
            );

            return (
              <div
                key={chapter.id}
                className={`bg-white rounded-2xl p-6 shadow-sm border ${isCompleted ? "border-green-200" : "border-gray-100"} hover:shadow-md transition-shadow`}
              >
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold flex-shrink-0 ${isCompleted ? "bg-green-100 text-green-600" : "bg-indigo-50 text-indigo-600"}`}
                    >
                      {isCompleted ? "✓" : chapter.order}
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        {chapter.title}
                      </h2>
                      <p className="text-sm text-gray-500">{chapter.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Link
                      href={`/chapters/${chapter.id}`}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors whitespace-nowrap"
                    >
                      {isCompleted ? "Review" : "Study"}
                    </Link>
                    {chapter.quiz && (
                      <Link
                        href={`/chapters/${chapter.id}/quiz`}
                        className="bg-white text-indigo-600 border border-indigo-200 px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-50 transition-colors whitespace-nowrap"
                      >
                        Quiz
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
