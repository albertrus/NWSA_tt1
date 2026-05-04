"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const errorMessages: Record<string, string> = {
    Configuration: "There is a problem with the server configuration.",
    AccessDenied: "You do not have permission to sign in.",
    Verification: "The sign-in link is no longer valid.",
    Default: "An error occurred during authentication.",
  };

  return (
    <div className="text-center">
      <div className="text-5xl mb-4">⚠️</div>
      <h2 className="text-xl font-semibold text-white mb-2">
        Authentication Error
      </h2>
      <p className="text-[#546E7A] mb-6">
        {errorMessages[error ?? "Default"] ?? errorMessages.Default}
      </p>
      <Link
        href="/auth/login"
        className="bg-[#1E88E5] text-white px-6 py-2 rounded-xl font-medium hover:bg-[#1565C0] transition-colors"
      >
        Back to Sign In
      </Link>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-[#1A1A1D] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-[#1E88E5]">
            NWSA TT1 Prep
          </Link>
        </div>
        <div className="bg-[#2D2D30] rounded-2xl shadow-sm border border-[#4A5568] p-8">
          <Suspense fallback={<div className="text-center text-[#546E7A]">Loading...</div>}>
            <ErrorContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
