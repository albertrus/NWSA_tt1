"use client";

import { useState } from "react";
import { PracticeQuizTab } from "@/components/PracticeQuizTab";

type Tab = "overview" | "quiz";

export function DashboardTabs({
  overviewContent,
}: {
  overviewContent: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 border-b border-[#2D2D30] mb-8">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-5 py-2.5 text-sm font-semibold rounded-t-lg transition-colors ${
            activeTab === "overview"
              ? "bg-[#2D2D30] text-white border-b-2 border-[#1E88E5]"
              : "text-[#546E7A] hover:text-white"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("quiz")}
          className={`px-5 py-2.5 text-sm font-semibold rounded-t-lg transition-colors ${
            activeTab === "quiz"
              ? "bg-[#2D2D30] text-white border-b-2 border-[#1E88E5]"
              : "text-[#546E7A] hover:text-white"
          }`}
        >
          Practice Quiz
        </button>
      </div>

      {/* Tab content */}
      {activeTab === "overview" ? (
        overviewContent
      ) : (
        <PracticeQuizTab />
      )}
    </div>
  );
}
