import Link from "next/link";
import { Navbar } from "@/components/Navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#1A1A1D]">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-container mx-auto px-6 sm:px-10 lg:px-16 py-24 text-center">
        <span className="inline-block bg-[#FF5500]/20 text-[#FF5500] text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
          MVP Beta — Free Access
        </span>
        <h1 className="text-5xl font-extrabold text-white mb-6 leading-tight">
          Ace the <span className="text-[#FF5722]">Message TT1</span> Exam
        </h1>
        <p className="text-xl text-[#546E7A] mb-10 max-w-2xl mx-auto">
          Structured lessons, interactive quizzes, and progress tracking —
          everything you need to prepare and pass.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/auth/register"
            className="bg-[#1E88E5] text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-[#1565C0] transition-colors shadow-lg"
          >
            Start Learning Free
          </Link>
          <Link
            href="/chapters"
            className="bg-[#2D2D30] text-[#1E88E5] px-8 py-3 rounded-xl font-semibold text-lg border-2 border-[#1E88E5] hover:bg-[#3A3A3D] transition-colors"
          >
            Browse Chapters
          </Link>
          <Link
            href="/study-guide"
            className="bg-[#1E88E5]/20 text-[#1E88E5] px-8 py-3 rounded-xl font-semibold text-lg hover:bg-[#1E88E5]/30 transition-colors"
          >
            View 4-Week Plan
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-container mx-auto px-6 sm:px-10 lg:px-16 py-16">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Everything You Need to Pass
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: "📚",
              title: "Structured Lessons",
              description:
                "Chapter-based content covering all TT1 exam topics with clear explanations and examples.",
            },
            {
              icon: "✅",
              title: "Practice Quizzes",
              description:
                "Test your knowledge after each chapter with curated questions that mirror the actual exam.",
            },
            {
              icon: "📊",
              title: "Progress Tracking",
              description:
                "Visualize your learning journey, track completed chapters, and monitor quiz scores.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="bg-[#2D2D30] rounded-2xl p-8 shadow-sm border border-[#4A5568] hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-[#546E7A]">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof / Chapters Preview */}
      <section className="max-w-container mx-auto px-6 sm:px-10 lg:px-16 py-16">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Course Overview
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              num: "01",
              title: "Introduction to Message Systems",
              topics: ["Message fundamentals", "Queues & Topics", "Producers & Consumers"],
            },
            {
              num: "02",
              title: "Message Protocols and Standards",
              topics: ["AMQP", "MQTT", "JMS & Message Formats"],
            },
            {
              num: "03",
              title: "Message Patterns and Architecture",
              topics: ["EIP Patterns", "Pub/Sub & P2P", "Event-Driven Architecture"],
            },
          ].map((ch) => (
            <div key={ch.num} className="bg-[#2D2D30] rounded-2xl p-6 shadow-sm border border-[#4A5568]">
              <span className="text-3xl font-extrabold text-[#FF5722]/30">{ch.num}</span>
              <h3 className="text-lg font-semibold text-white mt-2 mb-3">{ch.title}</h3>
              <ul className="space-y-1">
                {ch.topics.map((t) => (
                  <li key={t} className="flex items-center gap-2 text-sm text-[#546E7A]">
                    <span className="text-[#1E88E5]">→</span> {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Chart Section */}
      <section className="max-w-container mx-auto px-6 sm:px-10 lg:px-16 py-16">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Why This is the Best TTT-1 Prep Course Online
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#2D2D30] text-white">
                <th className="text-left px-6 py-4 rounded-tl-2xl font-semibold text-base">Feature</th>
                <th className="px-6 py-4 font-semibold text-base text-[#1E88E5]">Our Course</th>
                <th className="px-6 py-4 font-semibold text-base text-[#546E7A]">Other Study Guides</th>
                <th className="px-6 py-4 font-semibold text-base text-[#546E7A] rounded-tr-2xl">Self-Study</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  feature: "Complete Domain Coverage",
                  our: { icon: "✅", label: "All 5 domains" },
                  others: { icon: "⚠️", label: "Incomplete" },
                  self: { icon: "❌", label: "Hit or miss" },
                },
                {
                  feature: "Practice Questions",
                  our: { icon: "✅", label: "Hundreds" },
                  others: { icon: "⚠️", label: "Limited" },
                  self: { icon: "❌", label: "None" },
                },
                {
                  feature: "Exam-Weighted Focus",
                  our: { icon: "✅", label: "Yes" },
                  others: { icon: "❌", label: "No" },
                  self: { icon: "❌", label: "No" },
                },
                {
                  feature: "Mobile Accessible",
                  our: { icon: "✅", label: "Yes" },
                  others: { icon: "⚠️", label: "Sometimes" },
                  self: { icon: "❌", label: "PDF only" },
                },
                {
                  feature: "Progress Tracking",
                  our: { icon: "✅", label: "Advanced" },
                  others: { icon: "❌", label: "No" },
                  self: { icon: "❌", label: "No" },
                },
                {
                  feature: "Updated Standards",
                  our: { icon: "✅", label: "2025" },
                  others: { icon: "⚠️", label: "Outdated" },
                  self: { icon: "⚠️", label: "Maybe" },
                },
                {
                  feature: "Flashcard System",
                  our: { icon: "✅", label: "Yes" },
                  others: { icon: "❌", label: "No" },
                  self: { icon: "❌", label: "No" },
                },
                {
                  feature: "Official Exam Format",
                  our: { icon: "✅", label: "Yes" },
                  others: { icon: "⚠️", label: "Close" },
                  self: { icon: "❌", label: "No" },
                },
              ].map((row, i) => (
                <tr
                  key={row.feature}
                  className={i % 2 === 0 ? "bg-[#222225]" : "bg-[#2D2D30]"}
                >
                  <td className="px-6 py-4 text-white font-medium">{row.feature}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-lg">{row.our.icon}</span>{" "}
                    <span className="text-[#1E88E5] font-semibold">{row.our.label}</span>
                  </td>
                  <td className="px-6 py-4 text-center text-[#546E7A]">
                    <span className="text-lg">{row.others.icon}</span>{" "}
                    <span>{row.others.label}</span>
                  </td>
                  <td className="px-6 py-4 text-center text-[#546E7A]">
                    <span className="text-lg">{row.self.icon}</span>{" "}
                    <span>{row.self.label}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#FF5500] text-white py-20 mt-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-orange-100 text-lg mb-10 max-w-xl mx-auto">
            Join students already preparing for the TT1 exam. Create your free account today.
          </p>
          <Link
            href="/auth/register"
            className="inline-block bg-[#111111] text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-[#1a1a1a] transition-colors"
          >
            Create Free Account
          </Link>
        </div>
      </section>

      <footer className="text-center py-8 text-[#546E7A] text-sm">
        <p>© {new Date().getFullYear()} NWSA TT1 Prep. All rights reserved.</p>
      </footer>
    </div>
  );
}
