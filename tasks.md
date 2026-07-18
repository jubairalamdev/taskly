# Taskly — Frontend Tasks

> Tracking status: `[ ]` pending · `[~]` in progress · `[X]` completed

---

## Phase 1: Project Scaffolding & Tooling

- [X] **1.1** Initialize Next.js project (App Router, JavaScript), install Tailwind CSS, Hero Ui v3 and Ract Toastify
- [X] **1.2** Integrate Hero UI v3 with Tailwind
- [X] **1.3** Set up React Toastify and project folder structure (layouts, lib, components, app routes)
- [X] **1.4** Create root layout with global providers (Hero UI, Toastify)

## Phase 2: Authentication (Better Auth — server on frontend origin)

> Better Auth runs on the Next.js server itself (not the Express backend). See [better-auth.com/docs](https://www.better-auth.com/docs/installation).

- [X] **2.1** Create server auth instance (`src/lib/auth.js`) — `betterAuth()` with `emailAndPassword`, database adapter, and `nextCookies()` plugin
- [X] **2.2** Set up environment variables (`.env.local`) — `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL=http://localhost:3000`
- [X] **2.3** Create API route handler (`src/app/api/auth/[...all]/route.js`) — mount auth via `toNextJsHandler()`
- [X] **2.4** Rework client (`src/lib/auth-client.js`) — `createAuthClient` from `better-auth/react`, no `baseURL` needed (same origin)
- [X] **2.5** Build sign-in page (`/auth/signin`) with Hero UI card + email/password form wired to `authClient.signIn.email()` with callback pattern (`onSuccess`, `onError`)
- [X] **2.6** Build sign-up page (`/auth/signup`) with Hero UI card + name/email/password form wired to `authClient.signUp.email()` with callback pattern
- [X] **2.7** Update proxy (`src/proxy.js`) — use `getSessionCookie` from `better-auth/cookies` for fast cookie check

## Phase 2.5: Shared Layout & Design System

- [X] **2.5.1** Create `system-design.md` — document theme (lighter blue + light orange), typography, spacing, component styles
- [X] **2.5.2** Build Header component — sticky top, logo + nav links, modern minimalist
- [X] **2.5.3** Build Footer component — centered, muted, minimal copyright line
- [X] **2.5.4** Wire Header & Footer into root layout — full-height flex shell

- [X] **3.1** Hero section — headline + subtitle describing distraction-free workflow
- [X] **3.2** "The Problem" section — overcomplicated PM tools
- [X] **3.3** "The Solution" section — simple rows, colors, zero setup
- [X] **3.4** "Get Started" CTA button — session-aware routing (session → `/dashboard`, else → `/auth/signin`)

## Phase 4: Dashboard — Empty State

- [X] **4.1** Dashboard layout shell with header (logout action calls `auth.signOut()`)
- [X] **4.2** Empty state UI — placeholder graphic + "Your slate is clean" prompt
- [X] **4.3** Floating/centered "+" icon button to trigger Add Task modal

## Phase 5: Task Modal (Create & Edit)

- [X] **5.1** Build reusable Hero UI Modal component with form fields (name, deadline, description)
- [X] **5.2** Implement Task Creation flow (POST /api/tasks via fetch with session cookie)
- [X] **5.3** Implement Task Editing flow — open modal pre-populated with current task data (PUT /api/tasks/:id)

## Phase 6: Dashboard — Active Task Board

- [X] **6.1** Fetch and display task list from GET /api/tasks (session cookie sent automatically)
- [X] **6.2** Build task row component (name, description, deadline date)
- [X] **6.3** Implement color-coded badge logic:
  - 🟢 Green = `isCompleted === true`
  - 🟡 Yellow = `!isCompleted && now <= deadline`
  - 🔴 Red = `!isCompleted && now > deadline` (red border/text on row)
- [X] **6.4** Completion checkbox — toggle `isCompleted` with PUT call
- [X] **6.5** Edit button per row → opens modal (Phase 5)
- [X] **6.6** Delete task action with confirmation (DELETE /api/tasks/:id)

## Phase 7: UX & Optimistic Updates

- [X] **7.1** Implement optimistic UI for completion checkbox toggle (instant visual rollback on failure)
- [X] **7.2** Wire React Toastify toasts on every mutation success/failure
- [X] **7.3** Handle edge cases: expired session → redirect to sign-in, network error → rollback + toast

## Phase 8: Polish & Deployment Prep

- [ ] **8.1** Responsive design pass (mobile-first)
- [ ] **8.2** Loading states (skeleton/spinner during data fetch)
- [ ] **8.3** Final error boundary and 404 page
- [ ] **8.4** Build and verify production build
