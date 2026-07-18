import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-400 tracking-tight">
          Taskly
        </Link>
        <nav className="flex items-center gap-1">
          <Link
            href="/"
            className="px-3 py-2 text-sm text-slate-500 rounded-xl hover:bg-blue-50 hover:text-blue-500 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/auth/signin"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-400 rounded-xl hover:bg-blue-500 transition-colors"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}
