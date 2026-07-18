# Product Requirement Document (PRD) - Frontend
## Project: taskly

### 1. Project Overview & Objectives
The frontend of the Task Management application is a highly responsive, minimalist single-page dashboard experience built on Next.js. It aims to give users an immediate, friction-free way to track tasks with clear, automatic status cues (Green/Yellow/Red) based on active deadlines.

### 2. Tech Stack & Dependencies
*   **Framework:** Next.js (App Router, JavaScript)
*   **UI Components:** Hero UI v3
*   **Authentication:** Better Auth (Client-side SDK hooks — `auth.signIn()`, `auth.signOut()`, `useSession()`)
*   **Notifications:** React Toastify
*   **Styling:** Tailwind CSS (Integrated with Hero UI)

---

### 3. Core Pages & Navigation Flow

#### A. Story-Driven Marketing Page (`/`)
*   **Purpose:** Introduce the product philosophy via structured "story sections".
*   **Content Sections:**
    *   **Section 1 (Hero):** Catchy headline describing a distraction-free workflow.
    *   **Section 2 (The Problem):** Overcomplicated project management tools that cause friction.
    *   **Section 3 (The Solution):** Simple rows, clear colors, zero setup time.
*   **CTA Behavior:**
    *   A prominent **"Get Started"** button.
    *   *Routing Logic:* If Better Auth detects an active session (`useSession()` returns user), route directly to `/dashboard`. Otherwise, redirect to `/auth/signin`.

#### B. Authentication Page (`/auth/signin`)
*   **UI Layout:** Centered, elegant login card utilizing Hero UI inputs.
*   **Functionality:**
    *   Standard Email/Password configuration handled via Better Auth's `auth.signIn()` client method.
    *   Session cookie is set automatically by Better Auth upon success.
    *   Visual alerts provided by React Toastify upon success or authentication failure.

#### C. Task Dashboard (`/dashboard`)
*   **State 1: Empty State (Default initial state for new users)**
    *   No tasks exist in the database.
    *   The UI displays a minimalist placeholder graphic or a gentle text prompt ("Your slate is clean").
    *   A highly accessible **Plus (+) Icon Button** sits prominently in the center to trigger the "Add Task" action.
*   **State 2: Active Task Board**
    *   Displays a clean list layout of task rows.
    *   Each row is constrained to key information: **Task Name**, **Description**, **Deadline Date**, and an **Expressive Status Badge**.
    *   **Actions per Row:**
        *   Checkbox for immediate completion/uncompletion toggles.
        *   Edit button (opens modal populated with current task details).

---

### 4. Detailed Component & UI Behavior

#### A. Task Modal (Creation & Modification)
*   A single, reusable Hero UI Modal component serves both creation and editing flows.
*   **Form Fields:**
    1.  *Task Name:* Text input (Required).
    2.  *Deadline Date:* Date picker or structured native date input (Required).
    3.  *Task Description:* Textarea (Optional).

#### B. Color-Coded Badge Logic
The UI evaluates statuses in real-time based on the current machine timestamp compared to the task's configured deadline:
*   🟢 **Green Badge ("Done"):** Rendered immediately if the task's complete checkbox evaluates to `true` (overrides deadline status).
*   🟡 **Yellow Badge ("Ongoing"):** Rendered if complete checkbox is `false` AND `Current Date <= Deadline Date`.
*   🔴 **Red Badge ("Deadline Passed"):** Rendered if complete checkbox is `false` AND `Current Date > Deadline Date`. The task row layout should apply subtle red text or border modifications to draw instant focus.

---

### 5. Frontend-Backend Synchronization & UX Rules
*   **Optimistic UI Updates:** To achieve an instantaneous feel, mutating a task state (like checking/unchecking a checkbox) must visually reflect on the screen immediately. If the underlying API call fails, the UI rolls back to its original state and displays an error toast.
*   **Real-time Mutation Feedback:** Every network payload resolution triggers a distinct React Toastify notice (`toast.success("Task updated successfully")`, etc.).
*   **Session Guarding:** Router middleware strictly blocks unauthorized access to `/dashboard`. If a session vanishes or a user logs out via the header action, they are instantly booted to `/auth/signin`.

(End of file - total 68 lines)
