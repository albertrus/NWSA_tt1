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

      {/* Get Started Section */}
      <section id="get-started" className="bg-[#1E2A3A] text-white py-24 mt-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 text-center">

          {/* H2 Headline */}
          <h2 className="text-4xl font-extrabold mb-6">
            Ready to Earn Your TTT-1 Certification?
          </h2>

          {/* Supporting Text */}
          <p className="text-[#90A4AE] text-lg mb-10 max-w-2xl mx-auto leading-body">
            Don&apos;t risk failing the $274 exam. Don&apos;t waste weeks hunting for study
            materials. Don&apos;t delay your career advancement.
            <br className="hidden sm:block" />
            <span className="block mt-3 text-white font-medium">
              Get instant access to the most comprehensive TTT-1 prep course available. Start
              studying today and pass your exam with confidence.
            </span>
          </p>

          {/* Stats Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-10 text-sm font-semibold text-[#1E88E5] bg-[#111827] rounded-2xl px-8 py-4">
            <span>85 Total Exam Questions</span>
            <span className="hidden sm:inline text-[#4A5568]">|</span>
            <span>5 Critical Domains</span>
            <span className="hidden sm:inline text-[#4A5568]">|</span>
            <span>90 Minutes to Pass</span>
          </div>

          {/* Primary CTA */}
          <Link
            href="/auth/register"
            className="inline-block bg-[#FF5500] text-white px-12 py-5 rounded-2xl font-bold text-xl hover:bg-[#e04a00] transition-colors shadow-lg mb-6"
          >
            Get Instant Access — Start Your Free Trial
          </Link>

          {/* Money-Back Guarantee */}
          <p className="text-[#90A4AE] text-sm mb-8">
            🛡️ <span className="text-white font-semibold">30-Day Money-Back Guarantee</span> — If
            you&apos;re not satisfied, get a full refund. No questions asked.
          </p>

          {/* Secondary Info */}
          <ul className="flex flex-col sm:flex-row flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-[#90A4AE] mb-12">
            {[
              "Instant access to all modules",
              "No subscription — one-time payment",
              "Lifetime updates included",
              "Study on any device",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="text-[#4CAF50]">✓</span> {item}
              </li>
            ))}
          </ul>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-3 text-xs font-medium text-[#90A4AE] mb-14">
            {[
              "Based on ANSI/ASSE A10.48-2023",
              "Aligned with OSHA 1910 & 1926",
              "Follows Z359 Fall Protection Code",
              "Updated for 2025 Exam Standards",
              "Covers All Official Reference Materials",
            ].map((badge) => (
              <span
                key={badge}
                className="bg-[#111827] border border-[#2D3748] rounded-full px-4 py-1.5"
              >
                ✓ {badge}
              </span>
            ))}
          </div>

          {/* Scarcity / Urgency */}
          <div className="bg-[#111827] border border-[#FF5500]/30 rounded-2xl p-6 mb-14 text-left space-y-2">
            <p className="text-[#FF5500] font-semibold text-sm">
              🔥 Early Access Pricing — Lock in your rate before launch
            </p>
            <p className="text-[#90A4AE] text-sm">
              ⏰ First 100 students get bonus study materials
            </p>
            <p className="text-[#90A4AE] text-sm">
              📅 Exam coming up? Get certified faster with our 2-week crash course
            </p>
          </div>

          {/* Email Capture */}
          <div className="bg-[#111827] rounded-2xl p-8 text-left">
            <h3 className="text-2xl font-bold text-white mb-2">Get Notified When We Launch</h3>
            <p className="text-[#90A4AE] text-sm mb-4">Join our waitlist and receive:</p>
            <ul className="text-sm text-[#90A4AE] space-y-1 mb-6">
              {[
                "Free sample practice questions",
                "TTT-1 exam tips and strategies",
                "Early bird access and special pricing",
                "Downloadable knot-tying guide",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-[#1E88E5]">→</span> {item}
                </li>
              ))}
            </ul>
            <form
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="flex-1 bg-[#1E2A3A] border border-[#2D3748] text-white placeholder-[#546E7A] rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-[#1E88E5]"
              />
              <button
                type="submit"
                className="bg-[#1E88E5] text-white px-8 py-3 rounded-xl font-semibold text-sm hover:bg-[#1565C0] transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>
      </section>

      <footer className="text-center py-8 text-[#546E7A] text-sm">
        <p>© {new Date().getFullYear()} NWSA TT1 Prep. All rights reserved.</p>
      </footer>
    </div>
  );
}
