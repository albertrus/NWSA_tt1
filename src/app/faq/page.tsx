import { Navbar } from "@/components/Navbar";

const faqs = [
  {
    q: "How long does it take to complete the course?",
    a: "Most students complete the full course in 2-4 weeks studying 1-2 hours per day. However, you have unlimited access and can study at your own pace.",
  },
  {
    q: "Is this course officially endorsed by NWSA?",
    a: "While we're not officially affiliated with NWSA, our course is built entirely on the official NWSA exam blueprint and reference materials. We teach exactly what NWSA tests.",
  },
  {
    q: "What if I fail my exam?",
    a: "Our course includes lifetime access with free updates. You can continue studying and retake practice exams as many times as needed.",
  },
  {
    q: "Do I need the reference books to use this course?",
    a: "No. We've distilled the essential information from all 6 primary references into our course content. However, we do provide links if you want to dive deeper.",
  },
  {
    q: "How is this different from my company's training?",
    a: "Company training often focuses on job-specific tasks. Our course specifically targets the NWSA exam format, question types, and all 5 tested domains—including areas your job might not cover regularly.",
  },
  {
    q: "Can I study on my phone?",
    a: "Absolutely! Our platform is fully mobile-optimized so you can study during breaks, commutes, or downtime on job sites.",
  },
  {
    q: "What's the pass rate for students who use this course?",
    a: "[Add actual data when available] Students who complete all modules and score 80%+ on practice exams have a [X]% first-time pass rate.",
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#1A1A1D]">
      <Navbar />

      <section className="max-w-container mx-auto px-6 sm:px-10 lg:px-16 py-24">
        <h2 className="text-4xl font-extrabold text-white text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6 max-w-3xl mx-auto">
          {faqs.map((item) => (
            <div
              key={item.q}
              className="bg-[#2D2D30] rounded-2xl p-8 border border-[#4A5568]"
            >
              <p className="text-lg font-semibold text-white mb-3">
                Q: {item.q}
              </p>
              <p className="text-[#546E7A] leading-body">A: {item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center py-8 text-[#546E7A] text-sm">
        <p>© {new Date().getFullYear()} NWSA TT1 Prep. All rights reserved.</p>
      </footer>
    </div>
  );
}
