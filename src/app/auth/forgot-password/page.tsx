"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In production: send password reset email via your email provider
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#1A1A1D] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-[#1E88E5]">
            NWSA TT1 Prep
          </Link>
          <h1 className="text-3xl font-bold text-white mt-4 mb-2">
            Reset your password
          </h1>
          <p className="text-[#546E7A]">
            Enter your email to receive reset instructions
          </p>
        </div>

        <div className="bg-[#2D2D30] rounded-2xl shadow-sm border border-[#4A5568] p-8">
          {submitted ? (
            <div className="text-center">
              <div className="text-5xl mb-4">✉️</div>
              <h2 className="text-xl font-semibold text-white mb-2">
                Check your email
              </h2>
              <p className="text-[#546E7A] mb-6">
                If an account exists for <strong className="text-white">{email}</strong>, we&apos;ve
                sent password reset instructions.
              </p>
              <Link
                href="/auth/login"
                className="text-[#1E88E5] font-medium hover:underline"
              >
                Back to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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
              <button
                type="submit"
                className="w-full bg-[#1E88E5] text-white py-3 rounded-xl font-semibold hover:bg-[#1565C0] transition-colors"
              >
                Send Reset Link
              </button>
              <p className="text-center text-[#546E7A] text-sm">
                <Link
                  href="/auth/login"
                  className="text-[#1E88E5] hover:underline"
                >
                  Back to Sign In
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
