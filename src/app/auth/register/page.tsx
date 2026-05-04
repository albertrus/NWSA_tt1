"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        setLoading(false);
        return;
      }

      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/dashboard",
      });
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A1D]">
      <Navbar />

      {/* Get Started Section */}
      <section id="get-started" className="bg-[#1E2A3A] text-white py-24">
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
            {waitlistSubmitted ? (
              <p className="text-[#4CAF50] font-semibold text-sm">
                ✓ You&apos;re on the list! We&apos;ll notify you when we launch.
              </p>
            ) : (
              <form
                className="flex flex-col sm:flex-row gap-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (waitlistEmail) setWaitlistSubmitted(true);
                }}
              >
                <input
                  type="email"
                  required
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
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

      {/* Registration Form Section */}
      <div className="flex items-center justify-center px-4 py-16 bg-[#1A1A1D]">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Create your account
            </h1>
            <p className="text-[#546E7A]">Start preparing for the TT1 exam today</p>
          </div>

          <div className="bg-[#2D2D30] rounded-2xl shadow-sm border border-[#4A5568] p-8">
            {error && (
              <div className="bg-[#FF5722]/20 text-[#FF5722] rounded-lg p-3 mb-6 text-sm border border-[#FF5722]/30">
                {error}
              </div>
            )}

            <button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="w-full flex items-center justify-center gap-3 border border-[#4A5568] rounded-xl py-3 px-4 text-gray-300 font-medium hover:bg-[#3A3A3D] transition-colors mb-6"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#4A5568]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#2D2D30] text-[#546E7A]">or</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-[#3A3A3D] border border-[#4A5568] rounded-xl px-4 py-3 text-white placeholder-[#546E7A] focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#3A3A3D] border border-[#4A5568] rounded-xl px-4 py-3 text-white placeholder-[#546E7A] focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full bg-[#3A3A3D] border border-[#4A5568] rounded-xl px-4 py-3 text-white placeholder-[#546E7A] focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent"
                  placeholder="At least 8 characters"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1E88E5] text-white py-3 rounded-xl font-semibold hover:bg-[#1565C0] transition-colors disabled:opacity-50"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <p className="text-center text-[#546E7A] mt-6 text-sm">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-[#1E88E5] font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <footer className="text-center py-8 text-[#546E7A] text-sm bg-[#1A1A1D]">
        <p>© {new Date().getFullYear()} NWSA TT1 Prep. All rights reserved.</p>
      </footer>
    </div>
  );
}
