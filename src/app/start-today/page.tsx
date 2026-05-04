"use client";

import Link from "next/link";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";

export default function StartTodayPage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email) setSubscribed(true);
  }

  return (
    <div className="min-h-screen bg-[#1A1A1D]">
      <Navbar />

      {/* Hero / CTA Section */}
      <section className="bg-[#1E2A3A] text-white py-24">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 text-center">

          {/* H1 */}
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            Pass Your NWSA{" "}
            <span className="text-[#FF5500]">TTT-1 Exam</span> on the First Try
          </h1>
          <p className="text-xl font-semibold text-[#1E88E5] mb-6">
            Complete NWSA TTT-1 Certification Study Guide
          </p>

          {/* Supporting Text */}
          <p className="text-[#90A4AE] text-lg mb-4 max-w-2xl mx-auto leading-relaxed">
            Don&apos;t risk failing the $274 exam. Don&apos;t waste weeks hunting for study
            materials. Don&apos;t delay your career advancement.
          </p>
          <p className="text-white font-medium text-lg mb-10 max-w-2xl mx-auto">
            Get instant access to the most comprehensive TTT-1 prep course available.
            Start studying today and pass your exam with confidence.
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
            🛡️{" "}
            <span className="text-white font-semibold">
              30-Day Money-Back Guarantee
            </span>{" "}
            — If you&apos;re not satisfied, get a full refund. No questions asked.
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
            <h3 className="text-2xl font-bold text-white mb-2">
              Get Notified When We Launch
            </h3>
            <p className="text-[#90A4AE] text-sm mb-4">
              Join our waitlist and receive:
            </p>
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
            {subscribed ? (
              <p className="text-[#4CAF50] font-semibold">
                ✓ You&apos;re on the list! We&apos;ll notify you at launch.
              </p>
            ) : (
              <form
                className="flex flex-col sm:flex-row gap-3"
                onSubmit={handleSubscribe}
              >
                <label htmlFor="waitlist-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
            )}
          </div>
        </div>
      </section>

      {/* Key Messaging Points */}
      <section className="max-w-container mx-auto px-6 sm:px-10 lg:px-16 py-20">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Master the Telecommunications Tower Technician 1 Exam
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Comprehensive",
              desc: "Most comprehensive TTT-1 study guide online",
            },
            {
              title: "Efficient",
              desc: "Study smarter, not harder with prioritized content",
            },
            {
              title: "Proven",
              desc: "Based on official NWSA exam blueprint",
            },
            {
              title: "Practical",
              desc: "Real-world scenarios and hands-on knowledge",
            },
            {
              title: "Risk-Free",
              desc: "Pass on your first try or keep studying free",
            },
            {
              title: "Updated",
              desc: "Current with 2025 exam standards",
            },
            {
              title: "Accessible",
              desc: "Study anywhere on any device",
            },
            {
              title: "Complete",
              desc: "Everything you need in one place",
            },
          ].map((point) => (
            <div
              key={point.title}
              className="bg-[#2D2D30] rounded-2xl p-6 border border-[#4A5568]"
            >
              <p className="text-[#FF5500] font-bold text-sm uppercase tracking-wide mb-2">
                {point.title}
              </p>
              <p className="text-[#90A4AE] text-sm leading-relaxed">
                {point.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center py-8 text-[#546E7A] text-sm">
        <p>© {new Date().getFullYear()} NWSA TT1 Prep. All rights reserved.</p>
      </footer>
    </div>
  );
}
