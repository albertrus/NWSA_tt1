import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { seedDatabase } from "@/lib/db";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { DashboardTabs } from "@/components/DashboardTabs";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  await seedDatabase();

  const [chapters, progress, quizAttempts] = await Promise.all([
    prisma.chapter.findMany({ orderBy: { order: "asc" } }),
    prisma.userProgress.findMany({ where: { userId: session.user.id } }),
    prisma.quizAttempt.findMany({
      where: { userId: session.user.id },
      include: { quiz: { select: { chapterId: true, title: true } } },
      orderBy: { completedAt: "desc" },
      take: 5,
    }),
  ]);

  const completedChapters = progress.filter((p) => p.completed).length;
  const totalChapters = chapters.length;
  const progressPercent = totalChapters
    ? Math.round((completedChapters / totalChapters) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-[#1A1A1D]">
      <Navbar />
      <main className="max-w-container mx-auto px-6 sm:px-10 lg:px-16 py-10">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {session.user.name?.split(" ")[0] ?? "Learner"}! 👋
        </h1>
        <p className="text-[#546E7A] mb-8">
          Here&apos;s your learning progress overview.
        </p>

        <DashboardTabs overviewContent={<>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#2D2D30] rounded-2xl p-6 shadow-sm border border-[#4A5568]">
            <p className="text-sm text-[#546E7A] mb-1">Overall Progress</p>
            <p className="text-4xl font-bold text-[#FF5722]">{progressPercent}%</p>
            <p className="text-[#546E7A] text-sm mt-1">
              {completedChapters} of {totalChapters} chapters
            </p>
          </div>
          <div className="bg-[#2D2D30] rounded-2xl p-6 shadow-sm border border-[#4A5568]">
            <p className="text-sm text-[#546E7A] mb-1">Chapters Completed</p>
            <p className="text-4xl font-bold text-[#00FF88]">{completedChapters}</p>
            <p className="text-[#546E7A] text-sm mt-1">chapters finished</p>
          </div>
          <div className="bg-[#2D2D30] rounded-2xl p-6 shadow-sm border border-[#4A5568]">
            <p className="text-sm text-[#546E7A] mb-1">Quiz Attempts</p>
            <p className="text-4xl font-bold text-[#1E88E5]">
              {quizAttempts.length}
            </p>
            <p className="text-[#546E7A] text-sm mt-1">recent attempts shown</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-[#2D2D30] rounded-2xl p-6 shadow-sm border border-[#4A5568] mb-10">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-white">Course Progress</h2>
            <span className="text-sm font-medium text-[#FF5722]">{progressPercent}%</span>
          </div>
          <div className="w-full bg-[#4A5568] rounded-full h-4">
            <div
              className="bg-[#FF5722] h-4 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-sm text-[#546E7A] mt-2">
            {totalChapters - completedChapters} chapter{totalChapters - completedChapters !== 1 ? "s" : ""} remaining
          </p>
        </div>

        {/* Chapters Grid */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Chapters</h2>
          <Link href="/chapters" className="text-sm text-[#1E88E5] hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {chapters.map((chapter) => {
            const isCompleted = progress.some(
              (p) => p.chapterId === chapter.id && p.completed
            );
            return (
              <Link
                key={chapter.id}
                href={`/chapters/${chapter.id}`}
                className="bg-[#2D2D30] rounded-2xl p-6 shadow-sm border border-[#4A5568] hover:bg-[#3A3A3D] transition-colors group"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-[#FF5722]/20 text-[#FF5722] text-xs font-semibold px-2 py-1 rounded-lg">
                    Chapter {chapter.order}
                  </span>
                  {isCompleted && (
                    <span className="text-[#00FF88] text-sm font-medium flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Done
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-white group-hover:text-[#1E88E5] transition-colors">
                  {chapter.title}
                </h3>
                <p className="text-sm text-[#546E7A] mt-1 line-clamp-2">
                  {chapter.description}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Recent Quiz Attempts */}
        {quizAttempts.length > 0 && (
          <>
            <h2 className="text-xl font-bold text-white mb-4">Recent Quiz Attempts</h2>
            <div className="bg-[#2D2D30] rounded-2xl shadow-sm border border-[#4A5568] overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#1A1A1D] border-b border-[#4A5568]">
                  <tr>
                    <th className="text-left px-6 py-3 text-sm font-medium text-[#546E7A]">Quiz</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-[#546E7A]">Score</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-[#546E7A]">Result</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-[#546E7A]">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#4A5568]">
                  {quizAttempts.map((attempt) => {
                    const pct = Math.round((attempt.score / attempt.totalQuestions) * 100);
                    const passed = pct >= 70;
                    return (
                      <tr key={attempt.id} className="hover:bg-[#3A3A3D]">
                        <td className="px-6 py-4 text-sm text-white">{attempt.quiz.title}</td>
                        <td className="px-6 py-4 text-sm text-[#546E7A]">
                          {attempt.score}/{attempt.totalQuestions} ({pct}%)
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${passed ? "bg-[#00FF88]/20 text-[#00FF88]" : "bg-[#FF5722]/20 text-[#FF5722]"}`}>
                            {passed ? "Passed" : "Failed"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#546E7A]">
                          {new Date(attempt.completedAt).toLocaleDateString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
        </>} />
      </main>
    </div>
  );
}
