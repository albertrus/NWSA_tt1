"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [readiness, setReadiness] = useState(0);

  useEffect(() => {
    if (!session) return;
    fetch("/api/progress/summary")
      .then((r) => r.json())
      .then((d) => setReadiness(d.percentage ?? 0))
      .catch((err) => console.error("Failed to fetch progress summary:", err));
  }, [session]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav className="bg-[#111111] text-white shadow-md border-b border-[#333]">
        <div className="max-w-container mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-xl font-bold tracking-tight">
              NWSA TT1 Prep
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              {session ? (
                <>
                  <Link href="/dashboard" className="hover:text-[#FF5500] transition-colors">
                    Dashboard
                  </Link>
                  <Link href="/chapters" className="hover:text-[#FF5500] transition-colors">
                    Chapters
                  </Link>
                  <Link href="/course-overview" className="hover:text-[#FF5500] transition-colors">
                    Course Overview
                  </Link>
                  <Link href="/faq" className="hover:text-[#FF5500] transition-colors">
                    FAQ
                  </Link>
                  <Link href="/practice-exam" className="hover:text-[#FF5500] transition-colors">
                    Practice Exam
                  </Link>
                  <Link href="/start-today" className="hover:text-[#FF5500] transition-colors">
                    Start Today
                  </Link>
                  {/* Exam readiness inline */}
                  <div className="flex items-center gap-2 pl-3 border-l border-white/20">
                    <span className="text-gray-400 text-xs">Readiness</span>
                    <span className="text-[#FF5500] font-semibold text-sm">{readiness}%</span>
                  </div>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex items-center gap-1.5 bg-[#FF5500] text-white px-3 py-1.5 rounded-lg font-medium hover:bg-[#e04a00] transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/course-overview" className="hover:text-[#FF5500] transition-colors">
                    Course Overview
                  </Link>
                  <Link href="/faq" className="hover:text-[#FF5500] transition-colors">
                    FAQ
                  </Link>
                  <Link href="/practice-exam" className="hover:text-[#FF5500] transition-colors">
                    Practice Exam
                  </Link>
                  <Link href="/start-today" className="hover:text-[#FF5500] transition-colors">
                    Start Today
                  </Link>
                  <Link href="/auth/login" className="hover:text-[#FF5500] transition-colors">
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register"
                    className="bg-[#FF5500] text-white px-3 py-1.5 rounded-lg font-medium hover:bg-[#e04a00] transition-colors"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-1 rounded-md hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Progress bar — always visible when logged in */}
        {session && (
          <div className="h-0.5 w-full bg-white/10">
            <div
              className="h-full bg-[#FF5500] transition-all duration-700 ease-out"
              style={{ width: `${readiness}%` }}
            />
          </div>
        )}
      </nav>

      {/* Mobile full-screen overlay — slides in from right */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer panel */}
        <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-[#111111] border-l border-white/10 flex flex-col">
          {/* Header row */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <span className="font-bold text-white">Menu</span>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="p-1 rounded-md hover:bg-white/10 transition-colors"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 px-6 py-6 space-y-1 overflow-y-auto">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-white hover:bg-white/10 transition-colors"
                >
                  <svg className="w-5 h-5 text-[#FF5500]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                  </svg>
                  Dashboard
                </Link>
                <Link
                  href="/chapters"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-white hover:bg-white/10 transition-colors"
                >
                  <svg className="w-5 h-5 text-[#FF5500]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                  Chapters
                </Link>
                <Link
                  href="/course-overview"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-white hover:bg-white/10 transition-colors"
                >
                  <svg className="w-5 h-5 text-[#FF5500]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  Course Overview
                </Link>
                <Link
                  href="/faq"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-white hover:bg-white/10 transition-colors"
                >
                  <svg className="w-5 h-5 text-[#FF5500]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                  </svg>
                  FAQ
                </Link>
                <Link
                  href="/practice-exam"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-white hover:bg-white/10 transition-colors"
                >
                  <svg className="w-5 h-5 text-[#FF5500]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                  </svg>
                  Practice Exam
                </Link>
                <Link
                  href="/start-today"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-white hover:bg-white/10 transition-colors"
                >
                  <svg className="w-5 h-5 text-[#FF5500]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.82m2.56-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  </svg>
                  Start Today
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/course-overview"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-white hover:bg-white/10 transition-colors"
                >
                  <svg className="w-5 h-5 text-[#FF5500]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  Course Overview
                </Link>
                <Link
                  href="/faq"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-white hover:bg-white/10 transition-colors"
                >
                  <svg className="w-5 h-5 text-[#FF5500]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                  </svg>
                  FAQ
                </Link>
                <Link
                  href="/practice-exam"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-white hover:bg-white/10 transition-colors"
                >
                  <svg className="w-5 h-5 text-[#FF5500]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                  </svg>
                  Practice Exam
                </Link>
                <Link
                  href="/start-today"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-white hover:bg-white/10 transition-colors"
                >
                  <svg className="w-5 h-5 text-[#FF5500]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.82m2.56-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  </svg>
                  Start Today
                </Link>
                <Link
                  href="/auth/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-white hover:bg-white/10 transition-colors"
                >
                  <svg className="w-5 h-5 text-[#FF5500]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                  </svg>
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-white hover:bg-white/10 transition-colors"
                >
                  <svg className="w-5 h-5 text-[#FF5500]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                  </svg>
                  Get Started
                </Link>
              </>
            )}
          </nav>

          {/* Footer — exam readiness and sign out */}
          <div className="px-6 py-6 border-t border-white/10 space-y-4">
            {session && (
              <>
                <div>
                  <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                    <span>Exam Readiness</span>
                    <span className="text-[#FF5500] font-semibold">{readiness}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full">
                    <div
                      className="h-full bg-[#FF5500] rounded-full transition-all duration-700"
                      style={{ width: `${readiness}%` }}
                    />
                  </div>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full flex items-center justify-center gap-2 bg-[#FF5500] text-white px-4 py-2.5 rounded-xl font-medium hover:bg-[#e04a00] transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                  </svg>
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
