import Link from "next/link";
import { Navbar } from "@/components/Navbar";

// SVG icons for each domain module
const moduleIcons: Record<string, React.ReactNode> = {
  "Module 1": (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
    </svg>
  ),
  "Module 2": (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  "Module 3": (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
    </svg>
  ),
  "Module 4": (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
  ),
  "Module 5": (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
    </svg>
  ),
};

const modules = [
  {
    number: "Module 1",
    title: "Planning the Scope of Work and Job Logistics",
    examPercent: 15,
    questions: 13,
    priority: false,
    topics: [
      "Interpret construction drawings and site documentation",
      "Conduct DOT pre-trip inspections",
      "Master job site logistics and inventory management",
      "Understand safety documentation (JHA, EAP, site authorization)",
      "Recognize and respond to changing site conditions",
    ],
    note: "13 questions on your exam will come from this domain",
  },
  {
    number: "Module 2",
    title: "Fall Protection Climber–Rescuer",
    examPercent: 30,
    questions: 26,
    priority: true,
    topics: [
      "Inspect all PPE including harnesses, connecting devices, and helmets",
      "Perform suspension rescue operations",
      "Master proper tool tethering techniques",
      "Learn correct climbing techniques and body positioning",
      "Understand controlled descent equipment and hazards",
      "Follow portable ladder safety requirements",
    ],
    note: "26 questions on your exam will come from this domain - YOUR HIGHEST PRIORITY",
  },
  {
    number: "Module 3",
    title: "Hoisting Equipment and Rigging",
    examPercent: 20,
    questions: 17,
    priority: false,
    topics: [
      "Inspect ropes, slings, and shackles",
      "Master rigging operations and pre-lift procedures",
      "Learn hand signals and load classifications",
      "Tie critical knots: Bowline, Figure 8, Clove hitch",
      "Understand different hoist types (base mount, man-rated, capstan)",
      "Know personnel hoisting operations and crew responsibilities",
    ],
    note: "17 questions on your exam will come from this domain",
  },
  {
    number: "Module 4",
    title: "Structures",
    examPercent: 15,
    questions: 13,
    priority: false,
    topics: [
      "Identify structure types: guyed, self-supporting, monopole",
      "Recognize non-standard structures (utility poles, water tanks, stealth)",
      "Understand rooftop installations",
      "Identify structure deficiencies and maintenance needs",
      "Assist in structural component assembly",
    ],
    note: "13 questions on your exam will come from this domain",
  },
  {
    number: "Module 5",
    title: "Appurtenance Installation and Maintenance",
    examPercent: 20,
    questions: 17,
    priority: false,
    topics: [
      "Install antennas, tower lighting, and remote radio units",
      "Align and position microwave dishes and mounting hardware",
      "Work with fiber optic, coax, RET, and grounding cables",
      "Master weatherproofing techniques",
      "Install grounding systems properly",
      "Perform line sweeps and signal quality tests",
      "Understand FAA lighting obstruction requirements",
    ],
    note: "17 questions on your exam will come from this domain",
  },
];

const bonusMaterials = [
  {
    title: "Complete Reference Library",
    description: "Direct links to all 6 primary standards (ANSI/ASSE A10.48, OSHA, Z359, etc.)",
  },
  {
    title: "Quick Reference Guides",
    description: "Downloadable cheat sheets for knots, hand signals, and equipment specs",
  },
  {
    title: "Exam Day Checklist",
    description: "Everything you need to know before, during, and after your exam",
  },
  {
    title: "Critical Numbers to Memorize",
    description: "Anchorage strengths, minimum requirements, and key calculations",
  },
];

export default function StudyGuidePage() {
  return (
    <div className="min-h-screen bg-[#1A1A1D]">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-10">
        {/* Header */}
        <div className="bg-[#2D2D30] border border-[#4A5568] rounded-2xl p-8 shadow-sm mb-8">
          <p className="text-sm font-semibold text-[#1E88E5] mb-2">Course Overview Section</p>
          <h1 className="text-3xl font-bold text-white mb-3">What You&apos;ll Master in This Course</h1>
          <p className="text-gray-300 max-w-3xl">
            Our curriculum follows the official NWSA exam blueprint, ensuring you&apos;re prepared for every question.
          </p>
        </div>

        {/* Domain Breakdown */}
        <h2 className="text-xl font-bold text-white mb-5">Domain Breakdown</h2>
        <section className="grid gap-5 mb-10">
          {modules.map((mod) => (
            <article
              key={mod.number}
              className={`bg-[#2D2D30] border rounded-2xl p-6 shadow-sm ${
                mod.priority ? "border-[#1E88E5]" : "border-[#4A5568]"
              }`}
            >
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className={`flex items-center justify-center w-12 h-12 rounded-xl flex-shrink-0 ${mod.priority ? "bg-[#1E88E5]/20 text-[#1E88E5]" : "bg-[#4A5568]/30 text-[#546E7A]"}`}>
                  {moduleIcons[mod.number]}
                </span>
                <span className="bg-[#1E88E5]/20 text-[#1E88E5] text-xs font-semibold px-3 py-1 rounded-full">
                  {mod.number}
                </span>
                <span className="bg-[#FF5722]/20 text-[#FF5722] text-xs font-semibold px-3 py-1 rounded-full">
                  {mod.examPercent}% of Exam
                </span>
                {mod.priority && (
                  <span className="bg-[#1E88E5] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    HIGHEST PRIORITY
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{mod.title}</h3>
              <ul className="space-y-2 text-gray-300 mb-4">
                {mod.topics.map((topic) => (
                  <li key={topic} className="flex gap-2">
                    <span className="text-[#1E88E5] mt-0.5">•</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm font-semibold text-[#00FF88]">{mod.note}</p>
            </article>
          ))}
        </section>

        {/* Bonus Materials */}
        <section className="bg-[#2D2D30] border border-[#4A5568] rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Bonus Materials Included</h2>
          <ul className="space-y-3 text-gray-300">
            {bonusMaterials.map((item) => (
              <li key={item.title} className="flex gap-3">
                <span className="text-[#00FF88] font-bold mt-0.5">✓</span>
                <span>
                  <span className="text-white font-semibold">{item.title}</span>{" "}
                  {item.description}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-wrap gap-4 mt-10">
          <Link
            href="/chapters"
            className="bg-[#1E88E5] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[#1565C0] transition-colors"
          >
            Start with Chapters
          </Link>
          <Link
            href="/dashboard"
            className="bg-[#2D2D30] border border-[#4A5568] text-gray-300 px-5 py-2.5 rounded-xl font-medium hover:bg-[#3A3A3D] transition-colors"
          >
            Track Progress
          </Link>
        </div>
      </main>
    </div>
  );
}
