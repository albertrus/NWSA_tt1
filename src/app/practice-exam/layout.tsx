import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Practice Exam — NWSA TTT-1",
};

export default function PracticeExamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
