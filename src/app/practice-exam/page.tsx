"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";

// ---------------------------------------------------------------------------
// Intro / Overview Screen
// ---------------------------------------------------------------------------

const DOMAIN_TABLE = [
  { num: 1, name: "Planning the Scope of Work and Job Logistics", pct: "15%", questions: 15, range: "Q1–Q15" },
  { num: 2, name: "Fall Protection Climber-Rescuer", pct: "30%", questions: 30, range: "Q16–Q45" },
  { num: 3, name: "Hoisting Equipment and Rigging", pct: "20%", questions: 20, range: "Q46–Q65" },
  { num: 4, name: "Structures", pct: "15%", questions: 15, range: "Q66–Q80" },
  { num: 5, name: "Appurtenance Installation and Maintenance", pct: "20%", questions: 20, range: "Q81–Q100" },
];

const EXAM_PARAMS = [
  { label: "Total Questions", value: "85 multiple-choice questions (this practice exam uses 100 questions for broader coverage)" },
  { label: "Time Allowed", value: "90 minutes" },
  { label: "Format", value: "Multiple choice (4 options per question)" },
  { label: "Passing Score", value: "Criterion-referenced (determined by psychometric analysis)" },
  { label: "Delivery", value: "Online Remote Proctoring (ORP)" },
  { label: "Exam Fee", value: "$274" },
  { label: "Certification Validity", value: "5 years" },
];

const REFERENCES = [
  "ANSI/ASSE A10.48-2023 — Criteria for Safety Practices with the Construction, Demolition, Modification and Maintenance of Communication Structures",
  "29 CFR Parts 1910 and 1926 — OSHA Safety and Health Regulations",
  "ANSI/ASSE Z359 Series — Fall Protection Code",
  "ANSI/TIA-222-G — Structural Standard for Antenna Supporting Structures and Antennas",
  "FCC OET Bulletin 65 — Evaluating Compliance with FCC Guidelines for Human Exposure to Radiofrequency Electromagnetic Fields",
  "Motorola R56 — Standards and Guidelines for Communication Sites",
  "FAA Regulations — Tower Lighting and Obstruction Marking",
];

const DOMAIN_DETAILS = [
  {
    num: 1,
    name: "Planning the Scope of Work and Job Logistics",
    pct: "15%",
    range: "Questions 1–15",
    topics: [
      "Construction drawings and documentation",
      "Pre-trip DOT inspections",
      "Daily meetings and safety forms (JHA, Emergency Action Plan)",
      "Site conditions and hazard recognition",
      "Scope of Work (SOW) interpretation",
      "Regulatory compliance (OSHA regulations vs industry standards)",
      "Work site logistics and planning",
    ],
    objectives: [
      "Interpret site-related documentation",
      "Recognize requirements for daily safety meetings",
      "Understand permit requirements",
      "Differentiate between regulations and standards",
    ],
  },
  {
    num: 2,
    name: "Fall Protection Climber-Rescuer",
    pct: "30%",
    range: "Questions 16–45",
    topics: [
      "PPE inspection requirements",
      "Fall protection systems (arrest, restraint, positioning)",
      "Rescue operations (suspension rescue)",
      "Tool tethering techniques",
      "Proper climbing techniques",
      "Ladder safety",
      "RF exposure awareness",
      "Anchorage requirements and strengths",
      "Electrical safety (GFCI, power line clearances)",
    ],
    objectives: [
      "Inspect all fall protection equipment before use",
      "Understand fall arrest system components",
      "Know minimum anchor strengths (5,000 lbs for non-engineered)",
      "Perform suspension rescue",
      "Identify RF hazards and exposure limits",
      "Maintain proper clearances from power lines",
    ],
  },
  {
    num: 3,
    name: "Hoisting Equipment and Rigging",
    pct: "20%",
    range: "Questions 46–65",
    topics: [
      "Factors of Safety (Rigging: 5:1, Synthetic Rope: 10:1, Blocks: 4:1)",
      "Daily inspection requirements",
      "Load calculations",
      "Knot tying (Bowline, Figure 8, Clove hitch)",
      "Rigging equipment (ropes, slings, shackles)",
      "Capstan operations",
      "Hand signals",
      "Hoist operations",
    ],
    objectives: [
      "Calculate maximum safe loads using proper safety factors",
      "Perform daily rigging inspections",
      "Tie required knots correctly",
      "Understand capstan positioning and operation",
      "Know proper inspection frequencies",
    ],
  },
  {
    num: 4,
    name: "Structures",
    pct: "15%",
    range: "Questions 66–80",
    topics: [
      "Types of structures (guyed, self-supporting, monopole)",
      "Structure components identification",
      "Foundation inspections",
      "Bolt installation procedures",
      "Gin pole operations",
      "Guy wire tension measurement",
      "Structural loading considerations",
    ],
    objectives: [
      "Identify different tower types and their components",
      "Recognize structure deficiencies",
      "Understand proper bolt installation (up and out)",
      "Know attachment points for rigging equipment",
      "Conduct visual inspections",
    ],
  },
  {
    num: 5,
    name: "Appurtenance Installation and Maintenance",
    pct: "20%",
    range: "Questions 81–100",
    topics: [
      "Antenna types (omni-directional, directional, microwave)",
      "Cable types (fiber optic, coax, RET, grounding, transmission lines)",
      "Weatherproofing techniques",
      "FAA lighting requirements",
      "Equipment installation (antennas, tower lighting, RRUs, surge arresters, mounts)",
      "Hoist inspection and operation",
      "Load charts",
      "Tag lines and tag person operations",
      "Hand signals",
    ],
    objectives: [
      "Identify antenna types and their applications",
      "Install and weatherproof various cable types",
      "Understand FAA lighting obstruction requirements",
      "Operate hoisting equipment safely",
      "Use proper hand signals for crane/hoist operations",
    ],
  },
];

const STUDY_STEPS = [
  { step: "First Pass", desc: "Take the exam without references to assess baseline knowledge" },
  { step: "Review", desc: "Study all explanations, especially for incorrect answers" },
  { step: "Domain Focus", desc: "Concentrate on domains where you scored lowest" },
  { step: "Reference Study", desc: "Read the primary reference materials cited" },
  { step: "Second Pass", desc: "Retake the exam after studying" },
  { step: "Timed Practice", desc: "Simulate exam conditions (85 questions in 90 minutes)" },
];

function PracticeExamIntro({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-[#1A1A1D]">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 py-10">

        {/* Hero header */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">📝</div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            NWSA TTT-1 Complete Practice Examination
          </h1>
          <p className="text-[#1E88E5] text-lg font-semibold">
            100 Questions Organized by Domain
          </p>
        </div>

        {/* Overview */}
        <section className="bg-[#2D2D30] border border-[#4A5568] rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <span>📋</span> Overview
          </h2>
          <p className="text-[#90A4AE] leading-body">
            This is a comprehensive 100-question practice examination for the NWSA Telecommunications
            Tower Technician 1 (TTT-1) certification. All questions are organized according to the
            official NWSA exam structure and domain distribution.
          </p>
        </section>

        {/* Exam Structure */}
        <section className="bg-[#2D2D30] border border-[#4A5568] rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span>📊</span> Exam Structure
          </h2>
          <p className="text-[#90A4AE] mb-4 leading-body">
            The practice exam contains 100 questions distributed across 5 domains according to the
            official NWSA TTT-1 exam outline:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#1A1A1D] text-[#1E88E5]">
                  <th className="text-center px-3 py-2 font-semibold rounded-tl-lg">Domain</th>
                  <th className="text-left px-3 py-2 font-semibold">Name</th>
                  <th className="text-center px-3 py-2 font-semibold">%</th>
                  <th className="text-center px-3 py-2 font-semibold">Questions</th>
                  <th className="text-center px-3 py-2 font-semibold rounded-tr-lg">Range</th>
                </tr>
              </thead>
              <tbody>
                {DOMAIN_TABLE.map((d, i) => (
                  <tr key={d.num} className={i % 2 === 0 ? "bg-[#222225]" : "bg-[#2D2D30]"}>
                    <td className="text-center px-3 py-2.5 text-[#1E88E5] font-bold">{d.num}</td>
                    <td className="px-3 py-2.5 text-white">{d.name}</td>
                    <td className="text-center px-3 py-2.5 text-[#FF5722] font-semibold">{d.pct}</td>
                    <td className="text-center px-3 py-2.5 text-white">{d.questions}</td>
                    <td className="text-center px-3 py-2.5 text-[#546E7A]">{d.range}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Actual Exam Parameters */}
        <section className="bg-[#2D2D30] border border-[#4A5568] rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span>🎯</span> Actual NWSA TTT-1 Exam Parameters
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {EXAM_PARAMS.map((p) => (
              <div key={p.label} className="bg-[#1A1A1D] rounded-xl px-4 py-3">
                <p className="text-xs font-semibold text-[#1E88E5] uppercase tracking-wide mb-0.5">{p.label}</p>
                <p className="text-white text-sm">{p.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Reference Materials */}
        <section className="bg-[#2D2D30] border border-[#4A5568] rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span>📚</span> Primary Reference Materials
          </h2>
          <p className="text-[#90A4AE] text-sm mb-4">All questions are based on these official standards and documents:</p>
          <ul className="space-y-2">
            {REFERENCES.map((ref) => (
              <li key={ref} className="flex items-start gap-2 text-[#90A4AE] text-sm leading-body">
                <span className="text-[#1E88E5] mt-0.5 shrink-0">•</span>
                {ref}
              </li>
            ))}
          </ul>
        </section>

        {/* Domain Breakdown */}
        <section className="mb-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span>🔍</span> Domain Breakdown
          </h2>
          <div className="space-y-4">
            {DOMAIN_DETAILS.map((d) => (
              <div key={d.num} className="bg-[#2D2D30] border border-[#4A5568] rounded-2xl p-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-[#1E88E5] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    Domain {d.num}
                  </span>
                  <span className="bg-[#FF5722]/20 text-[#FF5722] text-xs font-semibold px-2.5 py-1 rounded-full">
                    {d.pct}
                  </span>
                  <span className="text-[#546E7A] text-xs">{d.range}</span>
                </div>
                <h3 className="text-white font-bold mb-4">{d.name}</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-[#1E88E5] uppercase tracking-wide mb-2">Topics Covered</p>
                    <ul className="space-y-1">
                      {d.topics.map((t) => (
                        <li key={t} className="text-sm text-[#90A4AE] flex items-start gap-1.5">
                          <span className="text-[#546E7A] mt-0.5 shrink-0">›</span>{t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#1E88E5] uppercase tracking-wide mb-2">Key Learning Objectives</p>
                    <ul className="space-y-1">
                      {d.objectives.map((o) => (
                        <li key={o} className="text-sm text-[#90A4AE] flex items-start gap-1.5">
                          <span className="text-[#00FF88] mt-0.5 shrink-0">✓</span>{o}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Study Tips */}
        <section className="bg-[#2D2D30] border border-[#4A5568] rounded-2xl p-6 mb-10">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span>💡</span> Using This Practice Exam
          </h2>
          <p className="text-[#90A4AE] text-sm font-semibold mb-3">Study Approach</p>
          <ol className="space-y-2">
            {STUDY_STEPS.map((s, i) => (
              <li key={s.step} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-[#1E88E5] text-white text-xs font-bold rounded-full flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span className="text-[#90A4AE] text-sm leading-body">
                  <span className="text-white font-semibold">{s.step}</span> — {s.desc}
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={onStart}
            className="inline-block bg-[#1E88E5] text-white px-12 py-4 rounded-2xl font-bold text-xl hover:bg-[#1565C0] transition-colors shadow-lg"
          >
            Begin Practice Exam →
          </button>
          <p className="text-[#546E7A] text-sm mt-3">
            100 questions · Multiple choice · No time limit on this practice version
          </p>
        </div>
      </main>
    </div>
  );
}

interface Question {
  section: string;
  text: string;
  options: string[];
  correctIndex: number;
}

const QUESTIONS: Question[] = [
  // Section 1: Rigging and Hoisting
  {
    section: "Section 1: Rigging and Hoisting",
    text: "Once the lifting path is determined, where should a vehicle-mounted capstan be positioned?",
    options: [
      "As close as possible to the Signal Person",
      "As close as possible to the Load",
      "As close as possible to the Lifting Staging Area",
      "Position does not matter",
    ],
    correctIndex: 2,
  },
  {
    section: "Section 1: Rigging and Hoisting",
    text: "What is the required Factor of Safety (FS) for general rigging equipment?",
    options: ["3 to 1", "4 to 1", "5 to 1", "10 to 1"],
    correctIndex: 1,
  },
  {
    section: "Section 1: Rigging and Hoisting",
    text: "For daily overhead lifting, how often must synthetic rope be inspected?",
    options: ["Weekly", "Monthly", "Daily", "Before every individual lift"],
    correctIndex: 2,
  },
  {
    section: "Section 1: Rigging and Hoisting",
    text: "What is the specific Factor of Safety required for synthetic rope?",
    options: ["5 to 1", "10 to 1", "4 to 1", "9 to 1"],
    correctIndex: 1,
  },
  {
    section: "Section 1: Rigging and Hoisting",
    text: "If a synthetic rope has a breaking strength of 7,600 lbs., what is its Maximum Working Load Limit (WLL)?",
    options: ["760 lbs.", "1,250 lbs.", "1,520 lbs.", "1,900 lbs."],
    correctIndex: 0,
  },
  // Section 2: Fall Protection and PPE
  {
    section: "Section 2: Fall Protection and PPE",
    text: "At what minimum height is fall protection mandatory according to industry standards?",
    options: ["4 feet", "6 feet", "10 feet", "12 feet"],
    correctIndex: 1,
  },
  {
    section: "Section 2: Fall Protection and PPE",
    text: "What are the three essential components of a Personal Fall Arrest System (PFAS)?",
    options: [
      "Anchorage, Body Belt, and Connectors",
      "Lanyard, Full Body Harness, and Connectors",
      "Anchorage, Full Body Harness, and Connectors",
      "Lifeline, Harness, and Shock Absorber",
    ],
    correctIndex: 2,
  },
  {
    section: "Section 2: Fall Protection and PPE",
    text: "What is the minimum force a non-engineered anchor must withstand for fall protection?",
    options: ["3,600 lbs.", "5,000 lbs.", "4,000 lbs.", "2,500 lbs."],
    correctIndex: 1,
  },
  {
    section: "Section 2: Fall Protection and PPE",
    text: "A double-locking latch on a fall protection component must withstand how many pounds of force?",
    options: ["1,600 lbs.", "2,600 lbs.", "3,600 lbs.", "5,000 lbs."],
    correctIndex: 2,
  },
  {
    section: "Section 2: Fall Protection and PPE",
    text: "If you discover a deployed impact indicator during a harness inspection, what is the correct action?",
    options: [
      "Report it to the Supervisor for a second opinion",
      "Take it out of service immediately",
      "Use it only for low-height work",
      'Mark it with "Caution" tape but continue use',
    ],
    correctIndex: 1,
  },
  // Section 3: Site Safety and Regulations
  {
    section: "Section 3: Site Safety and Regulations",
    text: "What does the acronym JHA stand for?",
    options: [
      "Job Hazard Analysis",
      "Job Hazard Assessment",
      "Joint Hazard Assessment",
      "Job Health Analysis",
    ],
    correctIndex: 1,
  },
  {
    section: "Section 3: Site Safety and Regulations",
    text: "Which government organization is responsible for regulating tower lighting?",
    options: ["OSHA", "FAA", "FCC", "EPA"],
    correctIndex: 1,
  },
  {
    section: "Section 3: Site Safety and Regulations",
    text: "What is the primary effect of ionizing radiation on the human body?",
    options: [
      "It only affects surface skin cells",
      "It does not permanently change cells",
      "It permanently changes cells",
      "It has no measurable effect",
    ],
    correctIndex: 2,
  },
  {
    section: "Section 3: Site Safety and Regulations",
    text: "How often must a Competent Rescuer undergo refresher training?",
    options: ["Every year", "Every 2 years", "Every 3 years", "Every 5 years"],
    correctIndex: 1,
  },
  // Section 4: Equipment and Installation
  {
    section: "Section 4: Equipment and Installation",
    text: "What is the correct procedure for installing bolts in tower members and leg splices?",
    options: ["Up and In", "Down and In", "Down and Out", "Up and Out"],
    correctIndex: 0,
  },
  {
    section: "Section 4: Equipment and Installation",
    text: "When using an extension ladder, how far must it extend past the landing platform?",
    options: ["1 foot", "2 feet", "3 feet", "4 feet"],
    correctIndex: 2,
  },
  {
    section: "Section 4: Equipment and Installation",
    text: "What type of antenna is characterized by its ability to transmit a signal 360 degrees?",
    options: ["Directional", "Microwave", "Omni-directional", "Parabolic"],
    correctIndex: 2,
  },
  {
    section: "Section 4: Equipment and Installation",
    text: "Using the 4-to-1 rule, if a ladder is leaning against a 16-foot wall, how far should the base be from the wall?",
    options: ["2 feet", "3 feet", "4 feet", "5 feet"],
    correctIndex: 2,
  },
  {
    section: "Section 4: Equipment and Installation",
    text: 'What is the purpose of a "tag line" in lifting operations?',
    options: [
      "To provide a secondary lifting point",
      "To identify the owner of the equipment",
      "To control the load during the lift",
      "To measure the height of the tower",
    ],
    correctIndex: 2,
  },
  {
    section: "Section 4: Equipment and Installation",
    text: 'Which device allows a tower technician to work "hands-free" while at height?',
    options: [
      "Self-retracting lifeline",
      "Vertical rope grab",
      "Positioning device",
      "Shock-absorbing lanyard",
    ],
    correctIndex: 2,
  },
];

const TOTAL = QUESTIONS.length;

export default function PracticeExamPage() {
  const [showIntro, setShowIntro] = useState(true);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(TOTAL).fill(null)
  );
  const [submitted, setSubmitted] = useState(false);

  const resetExam = (returnToIntro = false) => {
    setAnswers(new Array(TOTAL).fill(null));
    setSubmitted(false);
    setCurrent(0);
    if (returnToIntro) setShowIntro(true);
  };

  if (showIntro) {
    return <PracticeExamIntro onStart={() => setShowIntro(false)} />;
  }

  const answeredCount = answers.filter((a) => a !== null).length;
  const remainingCount = TOTAL - answeredCount;

  const selectAnswer = (optionIndex: number) => {
    if (submitted) return;
    const next = [...answers];
    next[current] = optionIndex;
    setAnswers(next);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    const correctCount = answers.filter(
      (a, i) => a === QUESTIONS[i].correctIndex
    ).length;
    const percentage = Math.round((correctCount / TOTAL) * 100);
    const passed = percentage >= 70;

    return (
      <div className="min-h-screen bg-[#1A1A1D]">
        <Navbar />
        <main className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 py-10">
          {/* Result banner */}
          <div
            className={`rounded-2xl p-8 mb-8 text-center border ${
              passed
                ? "bg-[#00FF88]/10 border-[#00FF88]/40"
                : "bg-[#FF5722]/10 border-[#FF5722]/40"
            }`}
          >
            <div className="text-5xl mb-3">{passed ? "🎉" : "📋"}</div>
            <h1
              className={`text-3xl font-extrabold mb-2 ${
                passed ? "text-[#00FF88]" : "text-[#FF5722]"
              }`}
            >
              {passed ? "You Passed!" : "Failed Quiz."}
            </h1>
            <p className="text-white text-xl font-semibold mb-1">
              Score: {correctCount}/{TOTAL} &mdash; {percentage}%
            </p>
            <p className="text-[#546E7A] mb-6">
              {correctCount} correct &bull; {TOTAL - correctCount} incorrect
            </p>

            {passed ? (
              <>
                <p className="text-white font-medium mb-4">
                  Prepare fully for the exam and register today.
                </p>
                <Link
                  href="/auth/register"
                  className="inline-block bg-[#1E88E5] text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-[#1565C0] transition-colors shadow-lg"
                >
                  Sign Up for Full Course
                </Link>
              </>
            ) : (
              <>
                <p className="text-white font-medium mb-4">
                  Register today to access full material and courses to prepare
                  for NWSA TT1.
                </p>
                <Link
                  href="/auth/register"
                  className="inline-block bg-[#FF5722] text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-[#F4511E] transition-colors shadow-lg"
                >
                  Register Today
                </Link>
              </>
            )}
          </div>

          {/* Answer review */}
          <h2 className="text-xl font-bold text-white mb-4">Answer Review</h2>
          <div className="space-y-4">
            {QUESTIONS.map((q, i) => {
              const userAnswer = answers[i];
              const isCorrect = userAnswer === q.correctIndex;
              return (
                <div
                  key={i}
                  className={`rounded-2xl p-5 border ${
                    isCorrect
                      ? "border-[#00FF88]/30 bg-[#00FF88]/10"
                      : "border-[#FF5722]/30 bg-[#FF5722]/10"
                  }`}
                >
                  <p className="text-xs font-semibold text-[#546E7A] uppercase tracking-wide mb-1">
                    {q.section} &bull; Q{i + 1}
                  </p>
                  <p className="font-medium text-white mb-3">{q.text}</p>
                  <div className="space-y-1.5">
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
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => resetExam()}
              className="bg-[#2D2D30] border border-[#4A5568] text-gray-300 px-6 py-2.5 rounded-xl font-medium hover:bg-[#3A3A3D] transition-colors"
            >
              Retake Quiz
            </button>
            <button
              onClick={() => resetExam(true)}
              className="bg-[#2D2D30] border border-[#4A5568] text-gray-300 px-6 py-2.5 rounded-xl font-medium hover:bg-[#3A3A3D] transition-colors"
            >
              ← Back to Overview
            </button>
          </div>
        </main>
      </div>
    );
  }

  const q = QUESTIONS[current];
  const selectedAnswer = answers[current];
  const progressPct = (answeredCount / TOTAL) * 100;

  return (
    <div className="min-h-screen bg-[#1A1A1D]">
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 py-8">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-white">
            Practice Preview Exam
          </h1>
          <p className="text-[#546E7A] text-sm mt-1">
            Telecom Tower Technician I Assessment Quiz
          </p>
        </div>

        {/* Tracking bar */}
        <div className="bg-[#2D2D30] border border-[#4A5568] rounded-2xl p-5 mb-6">
          <div className="flex justify-between items-center mb-2 text-sm">
            <span className="text-[#00FF88] font-semibold">
              {answeredCount} answered
            </span>
            <span className="text-white font-bold">
              Question {current + 1} / {TOTAL}
            </span>
            <span className="text-[#FF5722] font-semibold">
              {remainingCount} remaining
            </span>
          </div>
          <div className="w-full bg-[#4A5568] rounded-full h-3">
            <div
              className="bg-[#1E88E5] h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          {/* Question number dots */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {QUESTIONS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                title={`Question ${i + 1}`}
                className={`w-7 h-7 rounded-full text-xs font-medium transition-colors ${
                  i === current
                    ? "bg-[#1E88E5] text-white"
                    : answers[i] !== null
                      ? "bg-[#1E88E5]/30 text-[#1E88E5]"
                      : "bg-[#4A5568] text-[#546E7A] hover:bg-[#546E7A]"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Question card */}
        <div className="bg-[#2D2D30] border border-[#4A5568] rounded-2xl p-6 mb-4">
          <p className="text-xs font-semibold text-[#1E88E5] uppercase tracking-wide mb-3">
            {q.section}
          </p>
          <p className="text-lg font-semibold text-white mb-6 leading-relaxed">
            {current + 1}. {q.text}
          </p>

          <div className="space-y-3">
            {q.options.map((option, i) => {
              const isSelected = selectedAnswer === i;
              return (
                <button
                  key={i}
                  onClick={() => selectAnswer(i)}
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                    isSelected
                      ? "border-[#1E88E5] bg-[#1E88E5]/10 text-white font-medium"
                      : "border-[#4A5568] hover:border-[#1E88E5]/60 text-[#546E7A] hover:text-white"
                  }`}
                >
                  <span className="font-semibold mr-2 text-sm text-[#1E88E5]">
                    {String.fromCharCode(65 + i)}.
                  </span>
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            className="flex items-center gap-1.5 border border-[#4A5568] text-gray-300 px-4 py-2 rounded-xl text-sm hover:bg-[#3A3A3D] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>

          {current < TOTAL - 1 ? (
            <button
              onClick={() => setCurrent((c) => Math.min(TOTAL - 1, c + 1))}
              className="flex items-center gap-1.5 bg-[#1E88E5] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#1565C0] transition-colors"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={answeredCount < TOTAL}
              className="flex items-center gap-1.5 bg-[#00FF88] text-[#1A1A1D] px-6 py-2 rounded-xl text-sm font-bold hover:bg-[#00e07a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Submit Quiz
              {answeredCount < TOTAL && (
                <span className="ml-1 text-xs font-normal">
                  ({TOTAL - answeredCount} left)
                </span>
              )}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
