"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  chapterId: string;
  isCompleted: boolean;
}

export function MarkChapterComplete({ chapterId, isCompleted }: Props) {
  const [completed, setCompleted] = useState(isCompleted);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const toggle = async () => {
    setLoading(true);
    const newValue = !completed;
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chapterId, completed: newValue }),
    });
    setCompleted(newValue);
    setLoading(false);
    router.refresh();
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors disabled:opacity-50 ${
        completed
          ? "bg-green-100 text-green-700 hover:bg-green-200"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {loading ? "Saving..." : completed ? "✓ Completed" : "Mark Complete"}
    </button>
  );
}
