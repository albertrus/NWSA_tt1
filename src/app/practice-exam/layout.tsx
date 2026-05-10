import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quick Quiz",
};

export default function PracticeExamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
