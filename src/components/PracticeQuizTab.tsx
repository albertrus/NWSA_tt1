"use client";

import { useState } from "react";
import { QUESTIONS } from "@/components/PracticeExamClient";

// 4 questions from each of the 5 domains = 20 questions
// Domain 1: indices 0–3, Domain 2: 15–18, Domain 3: 45–48, Domain 4: 65–68, Domain 5: 80–83
const DOMAIN_SLICES: [number, number][] = [
  [0, 4],
  [15, 19],
  [45, 49],
  [65, 69],
  [80, 84],
];

const QUIZ_QUESTIONS = DOMAIN_SLICES.flatMap(([start, end]) =>
  QUESTIONS.slice(start, end)
);

const TOTAL = QUIZ_QUESTIONS.length; // 20

const DOMAIN_COLORS: Record<number, string> = {
  1: "#1E88E5",
  2: "#FF5722",
  3: "#00FF88",
  4: "#FFB300",
  5: "#AB47BC",
};

export function PracticeQuizTab() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(TOTAL).fill(null)
  );
  const [submitted, setSubmitted] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const q = QUIZ_QUESTIONS[current];
  const selectedAnswer = answers[current];
  const answeredCount = answers.filter((a) => a !== null).length;

  const selectAnswer = (i: number) => {
    if (submitted) return;
    const next = [...answers];
    next[current] = i;
    setAnswers(next);
  };

  const handleRetake = () => {
    setAnswers(new Array(TOTAL).fill(null));
    setCurrent(0);
    setSubmitted(false);
  };

  if (submitted) {
    const correctCount = answers.filter(
      (a, i) => a === QUIZ_QUESTIONS[i].correctIndex
    ).length;
    const percentage = Math.round((correctCount / TOTAL) * 100);
    const passed = percentage >= 70;

    const byDomain = [1, 2, 3, 4, 5].map((dn) => {
      const domainQs = QUIZ_QUESTIONS.map((q, i) => ({ q, i })).filter(
        ({ q }) => q.domainNumber === dn
      );
      const correct = domainQs.filter(
        ({ i }) => answers[i] === QUIZ_QUESTIONS[i].correctIndex
      ).length;
      return {
        dn,
        name: domainQs[0]?.q.domain ?? "",
        total: domainQs.length,
        correct,
      };
    });

    return (
      <div className="space-y-6">
        {/* Result banner */}
        <div
          className={`rounded-2xl p-8 text-center border ${
            passed
              ? "bg-[#00FF88]/10 border-[#00FF88]/40"
              : "bg-[#FF5722]/10 border-[#FF5722]/40"
          }`}
        >
          <div className="text-5xl mb-3">{passed ? "🎉" : "📋"}</div>
          <h2
            className={`text-2xl font-extrabold mb-2 ${
              passed ? "text-[#00FF88]" : "text-[#FF5722]"
            }`}
          >
            {passed ? "Quiz Passed!" : "Quiz Complete"}
          </h2>
          <p className="text-white text-xl font-semibold mb-1">
            {correctCount}/{TOTAL} &mdash; {percentage}%
          </p>
          <p className="text-[#546E7A] text-sm">
            {correctCount} correct · {TOTAL - correctCount} incorrect
          </p>
        </div>

        {/* Domain breakdown */}
        <div className="bg-[#2D2D30] border border-[#4A5568] rounded-2xl p-6">
          <h3 className="text-base font-bold text-white mb-4">
            Score by Domain
          </h3>
          <div className="space-y-3">
            {byDomain
              .filter((d) => d.total > 0)
              .map((d) => {
                const pct = Math.round((d.correct / d.total) * 100);
                return (
                  <div key={d.dn}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-white flex items-center gap-2">
                        <span
                          className="inline-flex items-center justify-center w-5 h-5 rounded-full text-white text-xs font-bold shrink-0"
                          style={{ backgroundColor: DOMAIN_COLORS[d.dn] }}
                        >
                          {d.dn}
                        </span>
                        {d.name}
                      </span>
                      <span className="text-sm font-semibold text-white shrink-0 ml-2">
                        {d.correct}/{d.total} ({pct}%)
                      </span>
                    </div>
                    <div className="w-full bg-[#4A5568] rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: DOMAIN_COLORS[d.dn],
                        }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleRetake}
            className="bg-[#1E88E5] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-[#1565C0] transition-colors"
          >
            Retake Quiz
          </button>
        </div>

        {/* Answer review */}
        <button
          onClick={() => setShowReview((v) => !v)}
          className="w-full text-left bg-[#2D2D30] border border-[#4A5568] rounded-2xl px-6 py-4 text-white font-semibold flex justify-between items-center hover:bg-[#3A3A3D] transition-colors"
        >
          <span>Review All Answers ({TOTAL} questions)</span>
          <span className="text-[#546E7A]">{showReview ? "▲" : "▼"}</span>
        </button>

        {showReview && (
          <div className="space-y-4">
            {QUIZ_QUESTIONS.map((q, i) => {
              const userAnswer = answers[i];
              const isCorrect = userAnswer === q.correctIndex;
              return (
                <div
                  key={i}
                  className={`rounded-2xl p-5 border ${
                    isCorrect
                      ? "border-[#00FF88]/30 bg-[#00FF88]/5"
                      : "border-[#FF5722]/30 bg-[#FF5722]/5"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="inline-flex items-center justify-center w-5 h-5 rounded-full text-white text-xs font-bold shrink-0"
                      style={{ backgroundColor: DOMAIN_COLORS[q.domainNumber] }}
                    >
                      {q.domainNumber}
                    </span>
                    <p className="text-xs font-semibold text-[#546E7A] uppercase tracking-wide">
                      Q{i + 1} · {q.domain}
                    </p>
                  </div>
                  <p className="font-medium text-white mb-3">{q.text}</p>
                  <div className="space-y-1.5 mb-3">
                    {q.options.map((opt, j) => (
                      <div
                        key={j}
                        className={`text-sm px-3 py-1.5 rounded-lg ${
                          j === q.correctIndex
                            ? "bg-[#00FF88]/20 text-[#00FF88] font-medium"
                            : j === userAnswer && !isCorrect
                              ? "bg-[#FF5722]/20 text-[#FF5722]"
                              : "text-[#546E7A]"
                        }`}
                      >
                        {j === q.correctIndex && "✓ "}
                        {j === userAnswer && !isCorrect && "✗ "}
                        {String.fromCharCode(65 + j)}. {opt}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-[#546E7A] italic leading-relaxed">
                    {q.explanation}
                  </p>
                  <p className="text-xs text-[#4A5568] mt-1">
                    Ref: {q.reference}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress dots */}
      <div className="bg-[#2D2D30] border border-[#4A5568] rounded-2xl p-4">
        <div className="flex justify-between items-center mb-3 text-xs">
          <span className="text-[#00FF88] font-semibold">
            {answeredCount} answered
          </span>
          <span className="text-[#546E7A]">
            {TOTAL - answeredCount} remaining
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {QUIZ_QUESTIONS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              title={`Question ${i + 1}`}
              className={`w-7 h-7 rounded-full text-xs font-medium transition-colors ${
                i === current
                  ? "bg-[#1E88E5] text-white"
                  : answers[i] !== null
                    ? "bg-[#1E88E5]/30 text-[#1E88E5]"
                    : "bg-[#4A5568] text-[#546E7A] hover:bg-[#546E7A] hover:text-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Question card */}
      <div className="bg-[#2D2D30] border border-[#4A5568] rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <span
            className="inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold shrink-0"
            style={{ backgroundColor: DOMAIN_COLORS[q.domainNumber] }}
          >
            {q.domainNumber}
          </span>
          <p className="text-xs font-semibold text-[#546E7A] uppercase tracking-wide">
            Domain {q.domainNumber} · {q.domain}
          </p>
          <span className="ml-auto text-xs text-[#546E7A]">
            Q{current + 1}/{TOTAL}
          </span>
        </div>
        <p className="text-white font-medium text-lg mb-6">{q.text}</p>
        <div className="space-y-3">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => selectAnswer(i)}
              className={`w-full text-left px-5 py-3.5 rounded-xl border text-sm font-medium transition-colors ${
                selectedAnswer === i
                  ? "bg-[#1E88E5]/20 border-[#1E88E5] text-white"
                  : "bg-[#1A1A1D] border-[#4A5568] text-[#90A4AE] hover:border-[#546E7A] hover:text-white"
              }`}
            >
              <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
          className="bg-[#2D2D30] border border-[#4A5568] text-gray-300 px-5 py-2.5 rounded-xl font-medium hover:bg-[#3A3A3D] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ← Prev
        </button>

        {current < TOTAL - 1 ? (
          <button
            onClick={() => setCurrent((c) => Math.min(TOTAL - 1, c + 1))}
            className="bg-[#1E88E5] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[#1565C0] transition-colors"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={() => setSubmitted(true)}
            className="bg-[#FF5722] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#e04a00] transition-colors"
          >
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
}
