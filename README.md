# Taskly

A distraction-free task management tool. No boards, no labels, no clutter — just simple rows with automatic color cues.

## Features

- **Email/password authentication** powered by Better Auth
- **Full CRUD** — create, edit, complete, and delete tasks
- **Color-coded status** — green (done), yellow (active), red (overdue)
- **Detail modal** — view full task info, toggle completion, edit, or delete
- **Optimistic updates** — instant UI feedback with rollback on failure
- **Responsive design** — mobile hamburger menu, adaptive card layout
- **Secure** — session-based auth, route protection via proxy middleware

## Tech Stack

| Layer     | Technology |
|-----------|------------|
| Frontend  | Next.js 16, Tailwind CSS, Hero UI v3, Better Auth |
| Backend   | Express 5, MongoDB driver v6 |
| Auth      | Better Auth (server-side, on frontend origin) |

---

## Getting Started (Frontend)

### Prerequisites

- Node.js 20+
- A running instance of the [Taskly backend](https://github.com/your-org/taskly-server)

### Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `BETTER_AUTH_SECRET` | Must match the backend's secret |
| `BETTER_AUTH_URL` | Frontend URL (e.g. `http://localhost:3000`) |
| `NEXT_PUBLIC_API_URL` | Backend API URL (e.g. `http://localhost:5000`) |
| `MONGODB_URI` | MongoDB Atlas connection string |

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm start
```

## Deploy on Vercel

1. Push this repo to GitHub
2. Import it into Vercel
3. Set the environment variables listed above
4. Deploy
