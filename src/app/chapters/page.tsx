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
    <div className="min-h-screen bg-[#1A1A1D]">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 py-10">
        <h1 className="text-3xl font-bold text-white mb-2">Course Chapters</h1>
        <p className="text-[#546E7A] mb-8">
          Work through each chapter and take the quiz to track your progress.
        </p>

        <div className="space-y-5">
          {chapters.map((chapter) => {
            const isCompleted = progress.some(
              (p) => p.chapterId === chapter.id && p.completed
            );

            return (
              <div
                key={chapter.id}
                className={`bg-[#2D2D30] rounded-2xl p-6 shadow-sm border ${isCompleted ? "border-[#00FF88]/40" : "border-[#4A5568]"} hover:bg-[#3A3A3D] transition-colors`}
              >
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold flex-shrink-0 ${isCompleted ? "bg-[#00FF88]/20 text-[#00FF88]" : "bg-[#FF5722]/20 text-[#FF5722]"}`}
                    >
                      {isCompleted ? "✓" : chapter.order}
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-white">
                        {chapter.title}
                      </h2>
                      <p className="text-sm text-[#546E7A]">{chapter.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Link
                      href={`/chapters/${chapter.id}`}
                      className="bg-[#1E88E5] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#1565C0] transition-colors whitespace-nowrap"
                    >
                      {isCompleted ? "Review" : "Study"}
                    </Link>
                    {chapter.quiz && (
                      <Link
                        href={`/chapters/${chapter.id}/quiz`}
                        className="bg-[#2D2D30] text-[#1E88E5] border border-[#1E88E5]/50 px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#1E88E5]/10 transition-colors whitespace-nowrap"
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
