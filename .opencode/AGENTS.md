# Taskly Frontend — Agent Instructions

## Project Structure
- Next.js App Router project in `/`
- Hero UI v3 components in `src/components/`
- Pages: `/` (marketing), `/auth/signin`, `/dashboard`
- Use Tailwind CSS for styling (integrated with Hero UI)
- Better Auth for client-side authentication (`auth-client.js` with `createAuthClient`)
- `auth.signIn()`, `auth.signOut()`, `useSession()` hook for auth state

## Commands
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — run ESLint

## Conventions
- Keep components in `src/components/`
- Use `src/lib/` for utility/API functions
- Session cookie sent automatically with API requests (no manual token handling)
- On session expiry, redirect to `/auth/signin`
- Follow existing patterns in the codebase
- Always run lint before marking tasks complete
