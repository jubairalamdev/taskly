"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

function NavLink({ href, label, isActive }) {
  return (
    <Link
      href={href}
      className={`px-3 py-2 text-sm rounded-xl transition-all ${
        isActive
          ? "text-blue-500 bg-blue-50 font-medium"
          : "text-slate-500 hover:text-blue-500 hover:bg-blue-50"
      }`}
    >
      {label}
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className="text-gradient-primary">Taskly</span>
        </Link>

        <nav className="flex items-center gap-1">
          <NavLink href="/" label="Home" isActive={pathname === "/"} />
          <NavLink href="/dashboard" label="Dashboard" isActive={pathname === "/dashboard"} />

          {isPending ? null : user ? (
            <>
              <span className="flex items-center gap-2 ml-2 px-3 py-1.5 text-sm text-slate-600">
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.image}
                    alt=""
                    className="w-7 h-7 rounded-full object-cover"
                  />
                ) : (
                  <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold flex items-center justify-center">
                    {initials}
                  </span>
                )}
                <span className="hidden sm:inline">Hi, {user.name?.split(" ")[0]}</span>
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-2 text-sm text-slate-500 rounded-xl hover:text-red-500 hover:bg-red-50 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/auth/signin"
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl hover:from-blue-500 hover:to-blue-600 transition-all shadow-sm hover:shadow-md"
            >
              Get Started
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
