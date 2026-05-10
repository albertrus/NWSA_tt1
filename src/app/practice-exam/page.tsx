import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { PracticeExamClient } from "@/components/PracticeExamClient";

export default async function PracticeExamPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/auth/login?callbackUrl=/practice-exam");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { practiceExamAccess: true, name: true },
  });

  if (!user?.practiceExamAccess) {
    return (
      <div className="min-h-screen bg-[#1A1A1D]">
        <Navbar />
        <main className="max-w-2xl mx-auto px-6 sm:px-10 py-20 text-center">
          <div className="text-6xl mb-6">🔒</div>
          <h1 className="text-3xl font-extrabold text-white mb-4">
            Practice Exam Access Required
          </h1>
          <p className="text-[#90A4AE] text-lg mb-8 leading-relaxed">
            The full 100-question NWSA TTT-1 practice exam with timed simulation
            is available as a premium add-on. Unlock it to test your readiness
            under real exam conditions.
          </p>

          <div className="bg-[#2D2D30] border border-[#4A5568] rounded-2xl p-8 mb-8 text-left">
            <h2 className="text-xl font-bold text-white mb-4">What you get:</h2>
            <ul className="space-y-3">
              {[
                "100 questions across all 5 exam domains",
                "90-minute countdown timer (same as the real NWSA exam)",
                "Detailed explanations with official references for every question",
                "Domain-by-domain score breakdown after submission",
                "Unlimited retakes",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[#90A4AE]">
                  <span className="text-[#00FF88] shrink-0 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/start-today"
            className="inline-block bg-[#FF5500] text-white px-12 py-4 rounded-2xl font-bold text-xl hover:bg-[#e04a00] transition-colors shadow-lg mb-4"
          >
            Unlock Practice Exam
          </Link>
          <p className="text-[#546E7A] text-sm">
            Already purchased?{" "}
            <a href="mailto:support@nwsa-tt1.com" className="text-[#1E88E5] hover:underline">
              Contact support
            </a>
          </p>

          <div className="mt-8">
            <Link href="/dashboard" className="text-[#546E7A] hover:text-white text-sm transition-colors">
              ← Back to Dashboard
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return <PracticeExamClient />;
}
