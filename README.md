# NWSA TT1 Exam Prep Platform

An MVP online school platform for preparing and passing the **Message TT1** exam.

## Features

- 🔐 **Authentication** — Google OAuth, email/password (with bcrypt), and password recovery UI
- 📚 **Chapter-based Lessons** — Structured text content for 3 core exam topics
- ✅ **End-of-Chapter Quizzes** — Interactive quizzes with scoring (pass threshold: 70%)
- 📊 **Progress Dashboard** — Visual progress tracking, quiz history, and completion status
- ⚙️ **CI/CD Pipeline** — GitHub Actions for lint, type-check, and build on every push/PR

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Auth | NextAuth.js v4 (Google OAuth + Credentials) |
| Database | Prisma ORM + SQLite (dev) |
| Styling | Tailwind CSS |
| CI/CD | GitHub Actions |

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your values

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | SQLite database path (e.g., `file:./dev.db`) |
| `NEXTAUTH_URL` | App URL (e.g., `http://localhost:3000`) |
| `NEXTAUTH_SECRET` | Random secret (min 32 chars) |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |

## Project Structure

```
src/
├── app/
│   ├── api/              # API routes (auth, chapters, progress, quiz, dashboard)
│   ├── auth/             # Auth pages (login, register, forgot-password, error)
│   ├── chapters/         # Chapter list, detail, and quiz pages
│   ├── dashboard/        # Progress dashboard
│   └── page.tsx          # Landing page
├── components/           # Reusable React components
├── lib/                  # Prisma client, auth config, seed data
└── types/                # TypeScript declarations
prisma/
├── schema.prisma         # Database schema
└── migrations/           # Database migrations
.github/
└── workflows/
    └── ci.yml            # GitHub Actions CI/CD pipeline
```

## Future Premium Features (Planned)

- Timed practice tests
- Advanced question pool
- Gamification (badges, streaks, leaderboards)
- Analytics and reporting
- Apple OAuth integration
- Email notifications
- Multi-language support
