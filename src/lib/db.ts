import { prisma } from "./prisma";
import { seedChapters } from "./seed-data";

export async function seedDatabase() {
  const chapterCount = await prisma.chapter.count();
  if (chapterCount > 0) return;

  for (const chapterData of seedChapters) {
    const { quiz, ...chapter } = chapterData;
    const created = await prisma.chapter.create({
      data: chapter,
    });

    await prisma.quiz.create({
      data: {
        chapterId: created.id,
        title: quiz.title,
        questions: {
          create: quiz.questions,
        },
      },
    });
  }
}
