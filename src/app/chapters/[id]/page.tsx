import { prisma } from "@/lib/prisma";
import { seedDatabase } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { MarkChapterComplete } from "@/components/MarkChapterComplete";

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await seedDatabase();
  const session = await getServerSession(authOptions);
  const { id } = await params;

  const chapter = await prisma.chapter.findUnique({
    where: { id },
    include: { quiz: { select: { id: true } } },
  });

  if (!chapter) notFound();

  let isCompleted = false;
  if (session?.user?.id) {
    const prog = await prisma.userProgress.findUnique({
      where: {
        userId_chapterId: { userId: session.user.id, chapterId: chapter.id },
      },
    });
    isCompleted = prog?.completed ?? false;
  }

  const allChapters = await prisma.chapter.findMany({
    orderBy: { order: "asc" },
    select: { id: true, order: true },
  });
  const currentIndex = allChapters.findIndex((c) => c.id === chapter.id);
  const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null;
  const nextChapter =
    currentIndex < allChapters.length - 1
      ? allChapters[currentIndex + 1]
      : null;

  const renderContent = (content: string) =>
    content.split("\n").map((line, i) => {
      if (line.startsWith("# "))
        return <h1 key={i} className="text-2xl font-bold text-white mt-6 mb-4">{line.slice(2)}</h1>;
      if (line.startsWith("## "))
        return <h2 key={i} className="text-xl font-semibold text-white mt-5 mb-3 border-b border-[#4A5568] pb-2">{line.slice(3)}</h2>;
      if (line.startsWith("### "))
        return <h3 key={i} className="text-lg font-semibold text-gray-200 mt-4 mb-2">{line.slice(4)}</h3>;
      if (line.startsWith("- **")) {
        const parts = line.slice(2).split("**: ");
        return (
          <li key={i} className="text-gray-300 ml-4 mb-1 list-disc">
            <strong>{parts[0].slice(2)}</strong>
            {parts[1] ? `: ${parts[1]}` : ""}
          </li>
        );
      }
      if (line.startsWith("- "))
        return <li key={i} className="text-gray-300 ml-4 mb-1 list-disc">{line.slice(2)}</li>;
      if (line === "")
        return <div key={i} className="h-2" />;
      return <p key={i} className="text-gray-300 leading-relaxed mb-2">{line}</p>;
    });

  return (
    <div className="min-h-screen bg-[#1A1A1D]">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav className="text-sm text-[#546E7A] mb-6 flex items-center gap-2">
          <Link href="/chapters" className="hover:text-[#1E88E5]">Chapters</Link>
          <span>/</span>
          <span className="text-white font-medium">{chapter.title}</span>
        </nav>

        <div className="bg-[#2D2D30] rounded-2xl shadow-sm border border-[#4A5568] overflow-hidden">
          <div className="bg-[#1E88E5] px-8 py-6">
            <span className="text-blue-200 text-sm font-medium">
              Chapter {chapter.order}
            </span>
            <h1 className="text-2xl font-bold text-white mt-1">{chapter.title}</h1>
            {isCompleted && (
              <span className="inline-flex items-center gap-1 mt-2 text-sm text-[#00FF88]">
                ✓ Completed
              </span>
            )}
          </div>

          <div className="px-8 py-8">
            <div className="max-w-none">{renderContent(chapter.content)}</div>
          </div>

          <div className="border-t border-[#4A5568] px-8 py-6 bg-[#1A1A1D] flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-3">
              {prevChapter && (
                <Link
                  href={`/chapters/${prevChapter.id}`}
                  className="text-[#546E7A] border border-[#4A5568] px-4 py-2 rounded-xl text-sm hover:bg-[#3A3A3D] transition-colors"
                >
                  ← Previous
                </Link>
              )}
              {nextChapter && (
                <Link
                  href={`/chapters/${nextChapter.id}`}
                  className="text-[#546E7A] border border-[#4A5568] px-4 py-2 rounded-xl text-sm hover:bg-[#3A3A3D] transition-colors"
                >
                  Next →
                </Link>
              )}
            </div>

            <div className="flex gap-3">
              {session?.user && (
                <MarkChapterComplete
                  chapterId={chapter.id}
                  isCompleted={isCompleted}
                />
              )}
              {chapter.quiz && (
                <Link
                  href={`/chapters/${chapter.id}/quiz`}
                  className="bg-[#1E88E5] text-white px-6 py-2 rounded-xl font-medium hover:bg-[#1565C0] transition-colors"
                >
                  Take Quiz →
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
