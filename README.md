# NWSA TT1 Exam Prep Platform

An MVP online school platform for preparing and passing the **Message TT1** exam.

## Features

- 🔐 **Authentication** — Google OAuth, email/password (with bcrypt), and password recovery UI
- 📚 **Chapter-based Lessons** — Structured text content for 3 core exam topics
- ✅ **End-of-Chapter Quizzes** — Interactive quizzes with scoring (pass threshold: 70%)
- 📊 **Progress Dashboard** — Visual progress tracking, quiz history, and completion status
- 🗓️ **4-Week Study Guide** — Structured weekly training roadmap and exam-week checklist
- ⚙️ **CI/CD Pipeline** — GitHub Actions for lint, type-check, and build on every push/PR

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Auth | NextAuth.js v4 (Google OAuth + Credentials) |
| Database | Prisma ORM + PostgreSQL |
| Styling | Tailwind CSS |
| CI/CD | GitHub Actions |

## Getting Started

### Prerequisites
- Node.js 18+
- npm
- A PostgreSQL database (see [Neon](https://neon.tech) for a free hosted option)

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

> **Note:** The app auto-seeds chapters and quizzes on the first request — no manual seed step required.

### Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (e.g., from Neon) |
| `NEXTAUTH_URL` | App URL (e.g., `http://localhost:3000` or your Vercel URL) |
| `NEXTAUTH_SECRET` | Random secret (min 32 chars) |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |

## Deploying to Vercel (Demo)

### 1. Create a free PostgreSQL database on Neon
1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project → copy the **Connection string** as `DATABASE_URL`

### 2. Set up Google OAuth
1. Go to [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials)
2. Create an **OAuth 2.0 Client ID** (Web application)
3. Add your Vercel URL as an **Authorized redirect URI**: `https://YOUR-APP.vercel.app/api/auth/callback/google`
4. Copy the **Client ID** and **Client Secret**

### 3. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) → **New Project** → import `albertrus/NWSA_tt1`
2. Add the following **Environment Variables** in the Vercel dashboard:

| Variable | Value |
|---|---|
| `DATABASE_URL` | Your Neon connection string |
| `NEXTAUTH_URL` | `https://YOUR-APP.vercel.app` |
| `NEXTAUTH_SECRET` | Generate with: `openssl rand -base64 32` or [generate-secret.vercel.app/32](https://generate-secret.vercel.app/32) |
| `GOOGLE_CLIENT_ID` | Your Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Your Google OAuth client secret |

3. Click **Deploy** — Vercel will run `next build` automatically
4. The app auto-seeds content on the first page visit

## Project Structure

```
src/
├── app/
│   ├── api/              # API routes (auth, chapters, progress, quiz, dashboard)
│   ├── auth/             # Auth pages (login, register, forgot-password, error)
│   ├── chapters/         # Chapter list, detail, and quiz pages
│   ├── dashboard/        # Progress dashboard
│   ├── study-guide/      # 4-week training plan and checklist
│   └── page.tsx          # Landing page
├── components/           # Reusable React components
├── lib/                  # Prisma client, auth config, seed data
└── types/                # TypeScript declarations
prisma/
├── schema.prisma         # Database schema
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
