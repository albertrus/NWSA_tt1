"use client";

import { useState } from "react";
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
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-[#2D2D30] rounded-2xl shadow-sm border border-[#4A5568] overflow-hidden">
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

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-[#2D2D30] rounded-2xl shadow-sm border border-[#4A5568] overflow-hidden">
        <div className="bg-[#1E88E5] px-8 py-6">
          <p className="text-blue-200 text-sm font-medium">
            Chapter {chapterOrder} · {chapterTitle}
          </p>
          <h1 className="text-xl font-bold text-white mt-1">Quiz</h1>
          <div className="flex items-center gap-2 mt-3">
            <div className="flex-1 bg-[#1565C0] rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
              />
            </div>
            <span className="text-blue-100 text-sm">
              {currentQuestion + 1}/{questions.length}
            </span>
          </div>
        </div>

        <div className="px-8 py-8">
          <p className="text-lg font-medium text-white mb-6">
            {currentQuestion + 1}. {q.text}
          </p>

          <div className="space-y-3">
            {q.options.map((option, i) => (
              <button
                key={i}
                onClick={() => selectAnswer(i)}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                  answers[currentQuestion] === i
                    ? "border-[#1E88E5] bg-[#1E88E5]/20 text-[#1E88E5] font-medium"
                    : "border-[#4A5568] hover:border-[#1E88E5] text-gray-300"
                }`}
              >
                <span className="font-medium mr-2">
                  {String.fromCharCode(65 + i)}.
                </span>
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-[#4A5568] px-8 py-5 bg-[#1A1A1D] flex justify-between items-center">
          <button
            onClick={() => setCurrentQuestion((c) => Math.max(0, c - 1))}
            disabled={currentQuestion === 0}
            className="text-[#546E7A] border border-[#4A5568] px-4 py-2 rounded-xl text-sm hover:bg-[#3A3A3D] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>

          {currentQuestion < questions.length - 1 ? (
            <button
              onClick={() =>
                setCurrentQuestion((c) => Math.min(questions.length - 1, c + 1))
              }
              disabled={answers[currentQuestion] === null}
              className="bg-[#1E88E5] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#1565C0] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={submitQuiz}
              disabled={!isAllAnswered || submitting}
              className="bg-[#00FF88] text-[#1A1A1D] px-6 py-2 rounded-xl text-sm font-medium hover:bg-neon-green-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting..." : "Submit Quiz"}
            </button>
          )}
        </div>

        {/* Question navigation dots */}
        <div className="px-8 pb-5 flex gap-2 flex-wrap">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentQuestion(i)}
              className={`w-8 h-8 rounded-full text-xs font-medium transition-colors ${
                i === currentQuestion
                  ? "bg-[#1E88E5] text-white"
                  : answers[i] !== null
                    ? "bg-[#1E88E5]/20 text-[#1E88E5]"
                    : "bg-[#3A3A3D] text-[#546E7A]"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
