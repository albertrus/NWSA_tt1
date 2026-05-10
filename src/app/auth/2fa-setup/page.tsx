"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TwoFactorSetupPage() {
  const router = useRouter();
  const [step, setStep] = useState<"idle" | "scan" | "verify" | "done">("idle");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");
  const [secret, setSecret] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const startSetup = async () => {
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/2fa/setup", { method: "POST" });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Failed to start 2FA setup");
      return;
    }
    setQrCodeDataUrl(data.qrCodeDataUrl);
    setSecret(data.secret);
    setStep("scan");
  };

  const verifyAndEnable = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/2fa/enable", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Failed to verify code");
      return;
    }
    setStep("done");
  };

  return (
    <div className="min-h-screen bg-[#1A1A1D] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-[#1E88E5]">
            NWSA TT1 Prep
          </Link>
          <h1 className="text-3xl font-bold text-white mt-4 mb-2">
            Two-Factor Authentication
          </h1>
          <p className="text-[#546E7A]">
            Add an extra layer of security to your account
          </p>
        </div>

        <div className="bg-[#2D2D30] rounded-2xl shadow-sm border border-[#4A5568] p-8">
          {error && (
            <div className="bg-[#FF5722]/20 text-[#FF5722] rounded-lg p-3 mb-6 text-sm border border-[#FF5722]/30">
              {error}
            </div>
          )}

          {step === "idle" && (
            <div className="text-center space-y-6">
              <div className="bg-[#1E88E5]/10 rounded-full p-6 inline-flex">
                <svg className="w-12 h-12 text-[#1E88E5]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <div>
                <h2 className="text-white font-semibold text-lg mb-2">
                  Protect your account
                </h2>
                <p className="text-[#546E7A] text-sm leading-relaxed">
                  Use an authenticator app (Google Authenticator, Authy, 1Password) to generate
                  time-based one-time codes. You&apos;ll enter one each time you sign in with email
                  and password.
                </p>
              </div>
              <button
                onClick={startSetup}
                disabled={loading}
                className="w-full bg-[#1E88E5] text-white py-3 rounded-xl font-semibold hover:bg-[#1565C0] transition-colors disabled:opacity-50"
              >
                {loading ? "Setting up..." : "Set Up 2FA"}
              </button>
              <Link
                href="/dashboard"
                className="block text-[#546E7A] hover:text-white text-sm transition-colors"
              >
                Not now
              </Link>
            </div>
          )}

          {step === "scan" && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-white font-semibold text-lg mb-2">Scan this QR code</h2>
                <p className="text-[#546E7A] text-sm mb-4">
                  Open your authenticator app and scan the code below
                </p>
                {qrCodeDataUrl && (
                  <div className="flex justify-center mb-4">
                    <div className="bg-white p-3 rounded-xl inline-block">
                      <Image src={qrCodeDataUrl} alt="2FA QR Code" width={180} height={180} />
                    </div>
                  </div>
                )}
                <p className="text-xs text-[#546E7A]">
                  Can&apos;t scan?{" "}
                  <button
                    onClick={() => setStep("verify")}
                    className="text-[#1E88E5] hover:underline"
                  >
                    Enter code manually
                  </button>
                </p>
                {secret && (
                  <div className="mt-3 bg-[#3A3A3D] rounded-lg px-4 py-2 inline-block">
                    <p className="text-xs text-[#546E7A] mb-1">Manual entry key</p>
                    <p className="text-white font-mono text-sm tracking-widest">{secret}</p>
                  </div>
                )}
              </div>
              <button
                onClick={() => setStep("verify")}
                className="w-full bg-[#1E88E5] text-white py-3 rounded-xl font-semibold hover:bg-[#1565C0] transition-colors"
              >
                I&apos;ve scanned the code
              </button>
            </div>
          )}

          {step === "verify" && (
            <form onSubmit={verifyAndEnable} className="space-y-6">
              <div className="text-center">
                <h2 className="text-white font-semibold text-lg mb-2">Enter verification code</h2>
                <p className="text-[#546E7A] text-sm">
                  Enter the 6-digit code from your authenticator app to confirm setup
                </p>
              </div>
              <div>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                  required
                  autoFocus
                  className="w-full bg-[#3A3A3D] border border-[#4A5568] rounded-xl px-4 py-3 text-white placeholder-[#546E7A] focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent text-center text-2xl tracking-[0.5em] font-mono"
                  placeholder="000000"
                />
              </div>
              <button
                type="submit"
                disabled={loading || code.length !== 6}
                className="w-full bg-[#1E88E5] text-white py-3 rounded-xl font-semibold hover:bg-[#1565C0] transition-colors disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Enable 2FA"}
              </button>
              <button
                type="button"
                onClick={() => setStep("scan")}
                className="w-full text-[#546E7A] hover:text-white text-sm transition-colors"
              >
                Back
              </button>
            </form>
          )}

          {step === "done" && (
            <div className="text-center space-y-6">
              <div className="bg-green-500/10 rounded-full p-6 inline-flex">
                <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-white font-semibold text-lg mb-2">
                  2FA is now enabled
                </h2>
                <p className="text-[#546E7A] text-sm">
                  Your account is now protected with two-factor authentication. You&apos;ll be asked
                  for a code each time you sign in with email and password.
                </p>
              </div>
              <button
                onClick={() => router.push("/dashboard")}
                className="w-full bg-[#1E88E5] text-white py-3 rounded-xl font-semibold hover:bg-[#1565C0] transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
