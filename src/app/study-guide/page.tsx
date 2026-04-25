import Link from "next/link";
import { Navbar } from "@/components/Navbar";

const weeklyPlan = [
  {
    week: "Week 1",
    focus: "Messaging Fundamentals",
    goals: [
      "Complete Chapter 1 and understand queue vs topic deeply",
      "Write summary notes for producer, consumer, and broker roles",
      "Take the Chapter 1 quiz until you score at least 80%",
    ],
  },
  {
    week: "Week 2",
    focus: "Protocols & Standards",
    goals: [
      "Complete Chapter 2 and compare AMQP, MQTT, and JMS",
      "Create a one-page cheatsheet for QoS levels and delivery guarantees",
      "Retake Chapter 2 quiz and review every explanation",
    ],
  },
  {
    week: "Week 3",
    focus: "Patterns & Architecture",
    goals: [
      "Complete Chapter 3 and map each pattern to a real-world use case",
      "Practice identifying when to use P2P vs Pub/Sub",
      "Score at least 80% on Chapter 3 quiz",
    ],
  },
  {
    week: "Week 4",
    focus: "Revision & Exam Readiness",
    goals: [
      "Revisit low-scoring quiz questions from all chapters",
      "Do a timed full review of all chapter notes in one sitting",
      "Aim for three consecutive passing quiz runs (70%+) across chapters",
    ],
  },
];

const examDayChecklist = [
  "Review core messaging patterns (P2P, Pub/Sub, Request/Reply, DLQ)",
  "Memorize key protocol strengths and trade-offs",
  "Practice eliminating wrong answers before selecting the best option",
  "Sleep early and plan exam login/setup at least 20 minutes ahead",
];

export default function StudyGuidePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm mb-8">
          <p className="text-sm font-semibold text-indigo-600 mb-2">Training Guide</p>
          <h1 className="text-3xl font-bold text-slate-900 mb-3">NWSA TT1 4-Week Study Plan</h1>
          <p className="text-slate-600 max-w-3xl">
            Use this roadmap to study consistently, reinforce weak topics, and build exam confidence.
            Pair this plan with chapter quizzes and dashboard progress tracking.
          </p>
        </div>

        <section className="grid gap-4 mb-8">
          {weeklyPlan.map((item) => (
            <article key={item.week} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {item.week}
                </span>
                <h2 className="text-xl font-semibold text-slate-900">{item.focus}</h2>
              </div>
              <ul className="space-y-2 text-slate-700">
                {item.goals.map((goal) => (
                  <li key={goal} className="flex gap-2">
                    <span className="text-indigo-600">•</span>
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Exam Week Checklist</h2>
          <ul className="space-y-2 text-slate-700">
            {examDayChecklist.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-emerald-600">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/chapters"
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors"
          >
            Start with Chapters
          </Link>
          <Link
            href="/dashboard"
            className="bg-white border border-slate-300 text-slate-700 px-5 py-2.5 rounded-xl font-medium hover:bg-slate-100 transition-colors"
          >
            Track Progress
          </Link>
        </div>
      </main>
    </div>
  );
}
