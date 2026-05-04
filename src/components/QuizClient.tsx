"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string | null;
}

interface QuizResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  results: {
    questionId: string;
    userAnswer: number | null;
    correctAnswer: number;
    isCorrect: boolean;
    explanation: string | null;
  }[];
}

interface Props {
  quizId: string;
  chapterId: string;
  chapterTitle: string;
  chapterOrder: number;
  questions: Question[];
}

export function QuizClient({
  quizId,
  chapterId,
  chapterTitle,
  chapterOrder,
  questions,
}: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [result, setResult] = useState<QuizResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    // Minimum pixel distance to recognise a swipe gesture
    const SWIPE_THRESHOLD_PX = 60;
    if (delta < -SWIPE_THRESHOLD_PX && currentQuestion < questions.length - 1) {
      // Swipe left → next
      setCurrentQuestion((c) => c + 1);
    } else if (delta > SWIPE_THRESHOLD_PX && currentQuestion > 0) {
      // Swipe right → previous
      setCurrentQuestion((c) => c - 1);
    }
  };

  const selectAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const submitQuiz = async () => {
    setSubmitting(true);
    const res = await fetch("/api/quiz/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quizId, answers }),
    });
    const data = await res.json();
    setResult(data);
    setSubmitting(false);
    router.refresh();
  };

  const isAllAnswered = answers.every((a) => a !== null);
  const q = questions[currentQuestion];

  if (result) {
    return (
      <main className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div
            className={`px-8 py-6 ${result.passed ? "bg-[#00FF88]/20 border-b border-[#00FF88]/30" : "bg-[#FF5722]/20 border-b border-[#FF5722]/30"}`}
          >
            <p className="text-[#546E7A] text-sm font-medium">
              Chapter {chapterOrder} Quiz
            </p>
            <h1 className={`text-2xl font-bold mt-1 ${result.passed ? "text-[#00FF88]" : "text-white"}`}>
              {result.passed ? "🎉 Quiz Passed!" : "Quiz Complete"}
            </h1>
            <p className="text-gray-300 mt-1">
              You scored {result.score}/{result.totalQuestions} ({result.percentage}%)
            </p>
            {result.passed && (
              <p className="text-[#00FF88]/80 text-sm mt-1">
                Chapter marked as completed!
              </p>
            )}
          </div>

          <div className="px-8 py-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              Review Your Answers
            </h2>
            <div className="space-y-6">
              {questions.map((question, i) => {
                const r = result.results[i];
                return (
                  <div
                    key={question.id}
                    className={`rounded-xl p-4 border ${r.isCorrect ? "border-[#00FF88]/30 bg-[#00FF88]/10" : "border-[#FF5722]/30 bg-[#FF5722]/10"}`}
                  >
                    <p className="font-medium text-white mb-2">
                      {i + 1}. {question.text}
                    </p>
                    <div className="space-y-1 mb-2">
                      {question.options.map((opt, j) => (
                        <div
                          key={j}
                          className={`text-sm px-3 py-1.5 rounded-lg ${
                            j === question.correctAnswer
                              ? "bg-[#00FF88]/20 text-[#00FF88] font-medium"
                              : j === r.userAnswer && !r.isCorrect
                                ? "bg-[#FF5722]/20 text-[#FF5722]"
                                : "text-gray-400"
                          }`}
                        >
                          {j === question.correctAnswer && "✓ "}
                          {j === r.userAnswer && !r.isCorrect && "✗ "}
                          {opt}
                        </div>
                      ))}
                    </div>
                    {question.explanation && (
                      <p className="text-sm text-[#546E7A] italic">
                        {question.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t border-[#4A5568] px-8 py-5 bg-[#1A1A1D] flex gap-3 justify-end">
            <Link
              href={`/chapters/${chapterId}`}
              className="text-[#546E7A] border border-[#4A5568] px-4 py-2 rounded-xl text-sm hover:bg-[#3A3A3D] transition-colors"
            >
              Back to Chapter
            </Link>
            <Link
              href="/dashboard"
              className="bg-[#1E88E5] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#1565C0] transition-colors"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const selectedAnswer = answers[currentQuestion];


  return (
    <main
      className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Quiz header bar */}
      <div className="bg-indigo-600 rounded-2xl px-6 py-4 mb-4 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-indigo-200 text-xs font-medium">
            Chapter {chapterOrder} · {chapterTitle}
          </p>
          <h1 className="text-base font-bold text-white mt-0.5 truncate">Quiz</h1>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-32 bg-indigo-500 rounded-full h-1.5">
            <div
              className="bg-white h-1.5 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
          <span className="text-indigo-100 text-sm whitespace-nowrap">
            {currentQuestion + 1}/{questions.length}
          </span>
        </div>
      </div>

      {/* Split-screen layout */}
      <div className="lg:flex lg:gap-4">
        {/* LEFT PANEL — 40% — Question + reference */}
        <div className="lg:w-2/5 flex flex-col gap-4 mb-4 lg:mb-0">
          {/* Question card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold shrink-0">
                {currentQuestion + 1}
              </span>
              <span className="text-xs text-gray-400 font-medium">of {questions.length}</span>
            </div>
            <p className="text-base font-medium text-gray-900 leading-relaxed">
              {q.text}
            </p>

            {/* Swipe hint on mobile */}
            <p className="mt-6 text-xs text-gray-400 flex items-center gap-1 lg:hidden">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 3M21 7.5H7.5" />
              </svg>
              Swipe left/right to navigate questions
            </p>
          </div>

          {/* Reference / explanation panel */}
          {selectedAnswer !== null && q.explanation ? (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-amber-600 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
                <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Reference</span>
              </div>
              <p className="text-sm text-amber-900 leading-relaxed">{q.explanation}</p>
            </div>
          ) : selectedAnswer !== null ? (
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
              <p className="text-xs text-gray-400 italic">No additional reference for this question.</p>
            </div>
          ) : null}

          {/* Question navigation dots — desktop only */}
          <div className="hidden lg:flex gap-1.5 flex-wrap">
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentQuestion(i)}
                title={`Question ${i + 1}`}
                className={`w-7 h-7 rounded-full text-xs font-medium transition-colors ${
                  i === currentQuestion
                    ? "bg-indigo-600 text-white"
                    : answers[i] !== null
                      ? "bg-indigo-100 text-indigo-700"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL — 60% — Answer options */}
        <div className="lg:w-3/5 flex flex-col gap-4">
          {/* Answer options card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Choose an answer</p>
            <div className="space-y-3">
              {q.options.map((option, i) => {
                const isSelected = selectedAnswer === i;
                return (
                  <button
                    key={i}
                    onClick={() => selectAnswer(i)}
                    className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                      isSelected
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700 font-medium"
                        : "border-gray-200 hover:border-indigo-300 text-gray-700"
                    }`}
                  >
                    <span className="font-semibold mr-2 text-sm">
                      {String.fromCharCode(65 + i)}.
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation footer */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-4 flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentQuestion((c) => Math.max(0, c - 1))}
          disabled={currentQuestion === 0}
          className="flex items-center gap-1.5 text-gray-600 border border-gray-300 px-4 py-2 rounded-xl text-sm hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>

        {/* Question nav dots — mobile only */}
        <div className="flex gap-1.5 lg:hidden flex-wrap justify-center flex-1 mx-3">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentQuestion(i)}
              title={`Question ${i + 1}`}
              className={`w-6 h-6 rounded-full text-xs font-medium transition-colors ${
                i === currentQuestion
                  ? "bg-indigo-600 text-white"
                  : answers[i] !== null
                    ? "bg-indigo-100 text-indigo-700"
                    : "bg-gray-100 text-gray-500"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {currentQuestion < questions.length - 1 ? (
          <button
            onClick={() =>
              setCurrentQuestion((c) => Math.min(questions.length - 1, c + 1))
            }
            disabled={selectedAnswer === null}
            className="flex items-center gap-1.5 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        ) : (
          <button
            onClick={submitQuiz}
            disabled={!isAllAnswered || submitting}
            className="flex items-center gap-1.5 bg-green-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {submitting ? "Submitting…" : "Submit Quiz"}
          </button>
        )}
      </div>
    </main>
  );
}
