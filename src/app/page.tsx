import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { EmailSubscribeForm } from "@/components/EmailSubscribeForm";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#1A1A1D]">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-container mx-auto px-6 sm:px-10 lg:px-16 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-5xl font-extrabold text-white mb-4 leading-tight">
              Pass Your NWSA TTT-1 Exam on the{" "}
              <span className="text-[#FF5722]">First Try</span>
            </h1>
            <p className="text-xl font-semibold text-[#1E88E5] mb-6">
              The Most Comprehensive Online Study Guide for Telecommunications Tower
              Technician 1 Certification
            </p>
            <p className="text-lg text-[#546E7A] mb-10 max-w-2xl lg:max-w-none leading-body">
              Stop wasting time with incomplete study materials. Our expert-developed
              course covers 100% of the exam domains with practice questions,
              detailed explanations, and proven test-taking strategies. Join hundreds
              of technicians who&apos;ve passed their TTT-1 certification using our
              complete preparation system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Link
                href="https://nwsa-tt1.vercel.app/auth/register"
                className="bg-[#1E88E5] text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-[#1565C0] transition-colors shadow-lg"
              >
                Start Studying Now
              </Link>
              <Link
                href="#course-overview"
                className="bg-[#2D2D30] text-[#1E88E5] px-8 py-3 rounded-xl font-semibold text-lg border-2 border-[#1E88E5] hover:bg-[#3A3A3D] transition-colors"
              >
                See What&apos;s Included
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start text-sm text-[#546E7A]">
              <span>✓ Used by 500+ successful TTT-1 candidates</span>
              <span className="hidden sm:inline text-[#4A5568]">|</span>
              <span>✓ Based on official NWSA exam blueprint</span>
              <span className="hidden sm:inline text-[#4A5568]">|</span>
              <span>✓ Updated for 2025 exam standards</span>
            </div>
          </div>

          {/* Tower illustration */}
          <div className="flex-shrink-0 w-64 lg:w-72 xl:w-80 opacity-90">
            <Image
              src="/images/tower-hero.svg"
              alt="Telecommunications lattice tower"
              width={320}
              height={640}
              priority
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="max-w-container mx-auto px-6 sm:px-10 lg:px-16 py-16">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Why Most Tower Technicians Struggle with the TTT-1 Exam
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Incomplete Materials",
              items: [
                "Most study guides miss critical exam topics",
                "Generic safety training doesn't cover TTT-1 specifics",
                "YouTube videos lack structured learning paths",
                "You waste time hunting for the right information",
              ],
            },
            {
              title: "Expensive Mistakes",
              items: [
                "Exam fee: $274 per attempt",
                "Lost work time for retakes",
                "Delayed career advancement",
                "Missing job opportunities requiring certification",
              ],
            },
            {
              title: "Information Overload",
              items: [
                "6 primary reference standards to study",
                "85 questions covering 5 complex domains",
                "Technical terminology and calculations",
                "No clear guidance on what to prioritize",
              ],
            },
          ].map((col) => (
            <div
              key={col.title}
              className="bg-[#2D2D30] rounded-2xl p-8 border border-[#4A5568]"
            >
              <h3 className="text-xl font-semibold text-[#FF5722] mb-4">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[#546E7A] leading-body"
                  >
                    <span className="mt-1 text-[#FF5722] shrink-0">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-center text-white text-xl font-semibold mt-12">
          There&apos;s a better way to prepare.
        </p>
      </section>

      {/* Solution Section */}
      <section
        id="course-overview"
        className="max-w-container mx-auto px-6 sm:px-10 lg:px-16 py-16"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-4">
          The Only TTT-1 Study Guide You&apos;ll Ever Need
        </h2>
        <p className="text-center text-[#1E88E5] text-lg font-semibold mb-12">
          Comprehensive. Structured. Proven. Everything you need to pass your
          exam in one place.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: (
                <svg className="w-10 h-10 text-[#1E88E5]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              ),
              title: "Complete Exam Coverage",
              description:
                "Every topic from all 5 domains covered in detail. No surprises on test day.",
            },
            {
              icon: (
                <svg className="w-10 h-10 text-[#1E88E5]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: "Practice Like the Real Thing",
              description:
                "Hundreds of practice questions formatted exactly like the NWSA exam.",
            },
            {
              icon: (
                <svg className="w-10 h-10 text-[#1E88E5]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33" />
                </svg>
              ),
              title: "Focus on What Matters",
              description:
                "Study efficiently with our priority ranking system based on exam weights.",
            },
            {
              icon: (
                <svg className="w-10 h-10 text-[#1E88E5]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              ),
              title: "Learn Through Repetition",
              description:
                "Spaced repetition flashcards ensure you remember critical information.",
            },
            {
              icon: (
                <svg className="w-10 h-10 text-[#1E88E5]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              ),
              title: "Track Your Progress",
              description:
                "Real-time performance analytics show your strengths and weaknesses.",
            },
            {
              icon: (
                <svg className="w-10 h-10 text-[#1E88E5]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 8.25h3m-3 3h3m-3 3h3" />
                </svg>
              ),
              title: "Study Anywhere",
              description:
                "Mobile-optimized platform lets you prepare on your schedule.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="bg-[#2D2D30] rounded-2xl p-8 border border-[#4A5568] hover:border-[#1E88E5] transition-colors"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-[#546E7A] leading-body">{feature.description}</p>
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
            <EmailSubscribeForm />
          </div>

        </div>
      </section>

      <footer className="text-center py-8 text-[#546E7A] text-sm">
        <p>© {new Date().getFullYear()} NWSA TT1 Prep. All rights reserved.</p>
      </footer>
    </div>
  );
}
