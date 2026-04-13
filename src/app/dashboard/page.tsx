import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { seedDatabase } from "@/lib/db";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";

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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {session.user.name?.split(" ")[0] ?? "Learner"}! 👋
        </h1>
        <p className="text-gray-500 mb-8">
          Here&apos;s your learning progress overview.
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Overall Progress</p>
            <p className="text-4xl font-bold text-indigo-600">{progressPercent}%</p>
            <p className="text-gray-600 text-sm mt-1">
              {completedChapters} of {totalChapters} chapters
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Chapters Completed</p>
            <p className="text-4xl font-bold text-green-600">{completedChapters}</p>
            <p className="text-gray-600 text-sm mt-1">chapters finished</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Quiz Attempts</p>
            <p className="text-4xl font-bold text-purple-600">
              {quizAttempts.length}
            </p>
            <p className="text-gray-600 text-sm mt-1">recent attempts shown</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-10">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-900">Course Progress</h2>
            <span className="text-sm font-medium text-indigo-600">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-indigo-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {totalChapters - completedChapters} chapter{totalChapters - completedChapters !== 1 ? "s" : ""} remaining
          </p>
        </div>

        {/* Chapters Grid */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Chapters</h2>
          <Link href="/chapters" className="text-sm text-indigo-600 hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {chapters.map((chapter) => {
            const isCompleted = progress.some(
              (p) => p.chapterId === chapter.id && p.completed
            );
            return (
              <Link
                key={chapter.id}
                href={`/chapters/${chapter.id}`}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-indigo-50 text-indigo-600 text-xs font-semibold px-2 py-1 rounded-lg">
                    Chapter {chapter.order}
                  </span>
                  {isCompleted && (
                    <span className="text-green-500 text-sm font-medium flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Done
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {chapter.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {chapter.description}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Recent Quiz Attempts */}
        {quizAttempts.length > 0 && (
          <>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Quiz Attempts</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Quiz</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Score</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Result</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {quizAttempts.map((attempt) => {
                    const pct = Math.round((attempt.score / attempt.totalQuestions) * 100);
                    const passed = pct >= 70;
                    return (
                      <tr key={attempt.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{attempt.quiz.title}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {attempt.score}/{attempt.totalQuestions} ({pct}%)
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${passed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                            {passed ? "Passed" : "Failed"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
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
      </main>
    </div>
  );
}
