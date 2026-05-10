"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [totpCode, setTotpCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [needs2FA, setNeeds2FA] = useState(false);

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      totpCode: needs2FA ? totpCode : undefined,
      redirect: false,
    });

    setLoading(false);

    if (!result?.error) {
      router.push("/dashboard");
      return;
    }

    if (result.error === "2FA_REQUIRED") {
      setNeeds2FA(true);
      return;
    }

    setError(
      result.error === "Invalid 2FA code"
        ? "Invalid authenticator code. Please try again."
        : "Invalid email or password. Please try again."
    );
  };

  const handleBack = () => {
    setNeeds2FA(false);
    setTotpCode("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-[#1A1A1D] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-[#1E88E5]">
            NWSA TT1 Prep
          </Link>
          <h1 className="text-3xl font-bold text-white mt-4 mb-2">
            {needs2FA ? "Two-factor verification" : "Welcome back"}
          </h1>
          <p className="text-[#546E7A]">
            {needs2FA
              ? "Enter the 6-digit code from your authenticator app"
              : "Sign in to continue your learning"}
          </p>
        </div>

        <div className="bg-[#2D2D30] rounded-2xl shadow-sm border border-[#4A5568] p-8">
          {error && (
            <div className="bg-[#FF5722]/20 text-[#FF5722] rounded-lg p-3 mb-6 text-sm border border-[#FF5722]/30">
              {error}
            </div>
          )}

          {!needs2FA ? (
            <>
              {/* OAuth providers */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                  className="w-full flex items-center justify-center gap-3 border border-[#4A5568] rounded-xl py-3 px-4 text-gray-300 font-medium hover:bg-[#3A3A3D] transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>

                <button
                  onClick={() => signIn("apple", { callbackUrl: "/dashboard" })}
                  className="w-full flex items-center justify-center gap-3 bg-white rounded-xl py-3 px-4 text-black font-medium hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  Continue with Apple
                </button>

                <button
                  onClick={() => signIn("facebook", { callbackUrl: "/dashboard" })}
                  className="w-full flex items-center justify-center gap-3 bg-[#1877F2] rounded-xl py-3 px-4 text-white font-medium hover:bg-[#166FE5] transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Continue with Facebook
                </button>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#4A5568]" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#2D2D30] text-[#546E7A]">or sign in with email</span>
                </div>
              </div>

              <form onSubmit={handleCredentialsSubmit} className="space-y-4">
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
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-gray-300">
                      Password
                    </label>
                    <Link
                      href="/auth/forgot-password"
                      className="text-sm text-[#1E88E5] hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-[#3A3A3D] border border-[#4A5568] rounded-xl px-4 py-3 text-white placeholder-[#546E7A] focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1E88E5] text-white py-3 rounded-xl font-semibold hover:bg-[#1565C0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>
            </>
          ) : (
            /* 2FA Step */
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-[#1E88E5]/10 rounded-full p-4">
                  <svg className="w-8 h-8 text-[#1E88E5]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 8.25h3m-3 3h3m-3 3h3" />
                  </svg>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1 text-center">
                  Authenticator Code
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  value={totpCode}
                  onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ""))}
                  required
                  autoFocus
                  className="w-full bg-[#3A3A3D] border border-[#4A5568] rounded-xl px-4 py-3 text-white placeholder-[#546E7A] focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent text-center text-2xl tracking-[0.5em] font-mono"
                  placeholder="000000"
                />
                <p className="text-xs text-[#546E7A] mt-2 text-center">
                  Open your authenticator app to view the code
                </p>
              </div>
              <button
                type="submit"
                disabled={loading || totpCode.length !== 6}
                className="w-full bg-[#1E88E5] text-white py-3 rounded-xl font-semibold hover:bg-[#1565C0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Verifying..." : "Verify Code"}
              </button>
              <button
                type="button"
                onClick={handleBack}
                className="w-full text-[#546E7A] hover:text-white text-sm transition-colors"
              >
                Back to sign in
              </button>
            </form>
          )}

          <p className="text-center text-[#546E7A] mt-6 text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-[#1E88E5] font-medium hover:underline"
            >
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
