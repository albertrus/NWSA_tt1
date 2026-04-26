import Link from "next/link";
import { Navbar } from "@/components/Navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#111111]">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <span className="inline-block bg-[#FF5500]/20 text-[#FF5500] text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
          MVP Beta — Free Access
        </span>
        <h1 className="text-5xl font-extrabold text-white mb-6 leading-tight">
          Ace the <span className="text-[#FF5500]">Message TT1</span> Exam
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Structured lessons, interactive quizzes, and progress tracking —
          everything you need to prepare and pass.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/auth/register"
            className="bg-[#FF5500] text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-[#e04a00] transition-colors shadow-lg"
          >
            Start Learning Free
          </Link>
          <Link
            href="/chapters"
            className="bg-[#1a1a1a] text-[#FF5500] px-8 py-3 rounded-xl font-semibold text-lg border-2 border-[#FF5500] hover:bg-[#2a2a2a] transition-colors"
          >
            Browse Chapters
          </Link>
          <Link
            href="/study-guide"
            className="bg-[#FF5500]/20 text-[#FF5500] px-8 py-3 rounded-xl font-semibold text-lg hover:bg-[#FF5500]/30 transition-colors"
          >
            View 4-Week Plan
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
              className="bg-[#1a1a1a] rounded-2xl p-8 shadow-sm border border-[#333] hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof / Chapters Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
            <div key={ch.num} className="bg-[#1a1a1a] rounded-2xl p-6 shadow-sm border border-[#333]">
              <span className="text-3xl font-extrabold text-[#FF5500]/30">{ch.num}</span>
              <h3 className="text-lg font-semibold text-white mt-2 mb-3">{ch.title}</h3>
              <ul className="space-y-1">
                {ch.topics.map((t) => (
                  <li key={t} className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="text-[#FF5500]">→</span> {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#FF5500] text-white py-16 mt-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-orange-100 text-lg mb-8">
            Join students already preparing for the TT1 exam. Create your free account today.
          </p>
          <Link
            href="/auth/register"
            className="bg-[#111111] text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-[#1a1a1a] transition-colors"
          >
            Create Free Account
          </Link>
        </div>
      </section>

      <footer className="text-center py-8 text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} NWSA TT1 Prep. All rights reserved.</p>
      </footer>
    </div>
  );
}
