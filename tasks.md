# Taskly — Frontend Tasks

> Tracking status: `[ ]` pending · `[~]` in progress · `[X]` completed

---

## Phase 1: Project Scaffolding & Tooling

- [X] **1.1** Initialize Next.js project (App Router, JavaScript), install Tailwind CSS, Hero Ui v3 and Ract Toastify
- [X] **1.2** Integrate Hero UI v3 with Tailwind
- [X] **1.3** Set up React Toastify and project folder structure (layouts, lib, components, app routes)
- [X] **1.4** Create root layout with global providers (Hero UI, Toastify)

## Phase 2: Authentication (Better Auth)

- [X] **2.1** Install & configure Better Auth client SDK (`auth-client.js` with `createAuthClient`)
- [X] **2.2** Build sign-in page (`/auth/signin`) with centered Hero UI card + email/password form
- [X] **2.3** Wire form submission to `auth.signIn()` with toast feedback on success/failure
- [X] **2.4** Create route middleware (Next.js Middleware) to guard `/dashboard` — check session cookie, redirect to `/auth/signin` if no session
- [X] **2.5** Build sign-up / register page (`/auth/signup`) with centered Hero UI card + name/email/password form + wire to `auth.signUp()`

## Phase 3: Marketing Page

- [ ] **3.1** Hero section — headline + subtitle describing distraction-free workflow
- [ ] **3.2** "The Problem" section — overcomplicated PM tools
- [ ] **3.3** "The Solution" section — simple rows, colors, zero setup
- [ ] **3.4** "Get Started" CTA button — session-aware routing (session → `/dashboard`, else → `/auth/signin`)

## Phase 4: Dashboard — Empty State

- [ ] **4.1** Dashboard layout shell with header (logout action calls `auth.signOut()`)
- [ ] **4.2** Empty state UI — placeholder graphic + "Your slate is clean" prompt
- [ ] **4.3** Floating/centered "+" icon button to trigger Add Task modal

## Phase 5: Task Modal (Create & Edit)

- [ ] **5.1** Build reusable Hero UI Modal component with form fields (name, deadline, description)
- [ ] **5.2** Implement Task Creation flow (POST /api/tasks via fetch with session cookie)
- [ ] **5.3** Implement Task Editing flow — open modal pre-populated with current task data (PUT /api/tasks/:id)

## Phase 6: Dashboard — Active Task Board

- [ ] **6.1** Fetch and display task list from GET /api/tasks (session cookie sent automatically)
- [ ] **6.2** Build task row component (name, description, deadline date)
- [ ] **6.3** Implement color-coded badge logic:
  - 🟢 Green = `isCompleted === true`
  - 🟡 Yellow = `!isCompleted && now <= deadline`
  - 🔴 Red = `!isCompleted && now > deadline` (red border/text on row)
- [ ] **6.4** Completion checkbox — toggle `isCompleted` with PUT call
- [ ] **6.5** Edit button per row → opens modal (Phase 5)
- [ ] **6.6** Delete task action with confirmation (DELETE /api/tasks/:id)

## Phase 7: UX & Optimistic Updates

- [ ] **7.1** Implement optimistic UI for completion checkbox toggle (instant visual rollback on failure)
- [ ] **7.2** Wire React Toastify toasts on every mutation success/failure
- [ ] **7.3** Handle edge cases: expired session → redirect to sign-in, network error → rollback + toast

## Phase 8: Polish & Deployment Prep

- [ ] **8.1** Responsive design pass (mobile-first)
- [ ] **8.2** Loading states (skeleton/spinner during data fetch)
- [ ] **8.3** Final error boundary and 404 page
- [ ] **8.4** Build and verify production build
