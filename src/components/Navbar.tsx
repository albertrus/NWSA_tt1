"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#111111] text-white shadow-md border-b border-[#333]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-xl font-bold tracking-tight">
            NWSA TT1 Prep
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="hover:text-[#FF5500] transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/chapters"
                  className="hover:text-[#FF5500] transition-colors"
                >
                  Chapters
                </Link>
                <Link
                  href="/study-guide"
                  className="hover:text-[#FF5500] transition-colors"
                >
                  Study Guide
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="bg-[#FF5500] text-white px-4 py-1.5 rounded-lg font-medium hover:bg-[#e04a00] transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/study-guide"
                  className="hover:text-[#FF5500] transition-colors"
                >
                  Study Guide
                </Link>
                <Link
                  href="/auth/login"
                  className="hover:text-[#FF5500] transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-[#FF5500] text-white px-4 py-1.5 rounded-lg font-medium hover:bg-[#e04a00] transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  menuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="block py-2 hover:text-[#FF5500]"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/chapters"
                  className="block py-2 hover:text-[#FF5500]"
                  onClick={() => setMenuOpen(false)}
                >
                  Chapters
                </Link>
                <Link
                  href="/study-guide"
                  className="block py-2 hover:text-[#FF5500]"
                  onClick={() => setMenuOpen(false)}
                >
                  Study Guide
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="block py-2 hover:text-[#FF5500]"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/study-guide"
                  className="block py-2 hover:text-[#FF5500]"
                  onClick={() => setMenuOpen(false)}
                >
                  Study Guide
                </Link>
                <Link
                  href="/auth/login"
                  className="block py-2 hover:text-[#FF5500]"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="block py-2 hover:text-[#FF5500]"
                  onClick={() => setMenuOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
