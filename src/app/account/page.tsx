import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { PaymentButtons } from "@/components/PaymentButtons";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  const [user, progress, quizAttempts] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
        twoFactorEnabled: true,
        hasPurchased: true,
        purchasedAt: true,
      },
    }),
    prisma.userProgress.findMany({
      where: { userId: session.user.id },
    }),
    prisma.quizAttempt.findMany({
      where: { userId: session.user.id },
      orderBy: { completedAt: "desc" },
    }),
  ]);

  if (!user) {
    redirect("/auth/login");
  }

  const totalChapters = await prisma.chapter.count();
  const completedChapters = progress.filter((p) => p.completed).length;
  const progressPercent = totalChapters
    ? Math.round((completedChapters / totalChapters) * 100)
    : 0;

  const bestScore =
    quizAttempts.length > 0
      ? Math.max(
          ...quizAttempts.map((a) =>
            Math.round((a.score / a.totalQuestions) * 100)
          )
        )
      : null;

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : (user.email?.[0] ?? "?").toUpperCase();

  const memberSince = user.createdAt.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#1A1A1D]">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 py-10 space-y-8">

        {/* Profile header */}
        <div className="bg-[#2D2D30] rounded-2xl border border-[#4A5568] p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name ?? "Avatar"}
              width={80}
              height={80}
              className="rounded-full ring-4 ring-[#FF5500]/30 shrink-0"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-[#FF5500]/20 ring-4 ring-[#FF5500]/30 flex items-center justify-center shrink-0">
              <span className="text-2xl font-bold text-[#FF5500]">{initials}</span>
            </div>
          )}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-white">
              {user.name ?? "Your Account"}
            </h1>
            <p className="text-[#546E7A] mt-1">{user.email}</p>
            <p className="text-xs text-[#546E7A] mt-1">Member since {memberSince}</p>
            <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
              {user.hasPurchased && (
                <span className="bg-green-500/15 text-green-400 text-xs font-semibold px-3 py-1 rounded-full border border-green-500/20">
                  Exam Access Active
                </span>
              )}
              {user.twoFactorEnabled && (
                <span className="bg-[#1E88E5]/15 text-[#1E88E5] text-xs font-semibold px-3 py-1 rounded-full border border-[#1E88E5]/20">
                  2FA Enabled
                </span>
              )}
            </div>
          </div>
          <Link
            href="/auth/2fa-setup"
            className="shrink-0 text-sm text-[#546E7A] hover:text-white border border-[#4A5568] hover:border-white/30 px-4 py-2 rounded-xl transition-colors"
          >
            Security settings
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Chapters done", value: `${completedChapters}/${totalChapters}`, color: "text-[#FF5500]" },
            { label: "Readiness", value: `${progressPercent}%`, color: "text-[#00FF88]" },
            { label: "Quiz attempts", value: quizAttempts.length, color: "text-[#1E88E5]" },
            { label: "Best score", value: bestScore !== null ? `${bestScore}%` : "—", color: "text-yellow-400" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-[#2D2D30] rounded-2xl border border-[#4A5568] p-5 text-center">
              <p className={`text-3xl font-bold ${color}`}>{value}</p>
              <p className="text-xs text-[#546E7A] mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="bg-[#2D2D30] rounded-2xl border border-[#4A5568] p-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-white font-semibold">Exam readiness</h2>
            <span className="text-[#FF5500] font-semibold text-sm">{progressPercent}%</span>
          </div>
          <div className="w-full bg-[#4A5568] rounded-full h-3">
            <div
              className="bg-gradient-to-r from-[#FF5500] to-[#FF8C00] h-3 rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-xs text-[#546E7A] mt-2">
            {totalChapters - completedChapters === 0
              ? "All chapters complete — ready for the exam!"
              : `${totalChapters - completedChapters} chapter${totalChapters - completedChapters !== 1 ? "s" : ""} remaining`}
          </p>
        </div>

        {/* Purchase / Access section */}
        <div className="bg-[#2D2D30] rounded-2xl border border-[#4A5568] overflow-hidden">
          <div className="px-8 pt-8 pb-6 border-b border-[#4A5568]">
            <div className="flex items-center gap-2 mb-1">
              <svg className="w-5 h-5 text-[#FF5500]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-white font-bold text-xl">Practice Exam Access</h2>
            </div>
            <p className="text-[#546E7A] text-sm">
              Full-length, 85-question timed exam — formatted exactly like the real NWSA TTT-1.
            </p>
          </div>

          {user.hasPurchased ? (
            <div className="px-8 py-8 space-y-4">
              <div className="flex items-center gap-3 text-green-400">
                <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="font-semibold">
                  You have full access
                  {user.purchasedAt
                    ? ` · purchased ${user.purchasedAt.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`
                    : ""}
                </p>
              </div>
              <Link
                href="/practice-exam"
                className="inline-block bg-[#FF5500] hover:bg-[#e04a00] text-white px-8 py-3 rounded-xl font-semibold transition-colors"
              >
                Launch Practice Exam →
              </Link>
            </div>
          ) : (
            <div className="px-8 py-8">
              {/* What you get */}
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 mb-8 text-sm text-[#90A4AE]">
                {[
                  "85 full-length practice questions",
                  "Timed exam simulation (90 min)",
                  "Detailed answer explanations",
                  "Covers all 5 NWSA exam domains",
                  "Instant results & score breakdown",
                  "Unlimited retakes — lifetime access",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-[#FF5500] shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Payment buttons */}
              <PaymentButtons
                userEmail={user.email ?? ""}
                userName={user.name ?? "Student"}
              />
            </div>
          )}
        </div>

        {/* Quick links */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { href: "/dashboard", label: "Study Dashboard", icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>
            )},
            { href: "/chapters", label: "Study Chapters", icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            )},
            { href: "/auth/2fa-setup", label: "Security & 2FA", icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            )},
          ].map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 bg-[#2D2D30] hover:bg-[#3A3A3D] border border-[#4A5568] rounded-2xl px-5 py-4 text-white text-sm font-medium transition-colors group"
            >
              <span className="text-[#FF5500] group-hover:scale-110 transition-transform">{icon}</span>
              {label}
              <svg className="w-4 h-4 text-[#546E7A] ml-auto" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          ))}
        </div>

      </main>
    </div>
  );
}
