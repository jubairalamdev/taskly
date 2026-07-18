"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

function NavLink({ href, label, isActive, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
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
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const user = session?.user;
  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <Image src="/logo-wide.png" alt="Taskly Logo" width={100} height={50} className="h-7.5" />
        </Link>

        <nav className="hidden sm:flex items-center sm:gap-1">

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
              href="/auth/signup"
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl hover:from-blue-500 hover:to-blue-600 transition-all shadow-sm hover:shadow-md"
            >
              Get Started
            </Link>
          )}
        </nav>

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="sm:hidden p-2 text-slate-500 hover:text-blue-500 transition-colors"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="sm:hidden border-t border-slate-100 bg-slate-50 px-4 py-4 space-y-1">
          <NavLink href="/" label="Home" isActive={pathname === "/"} onClick={closeMenu} />
          <NavLink href="/dashboard" label="Dashboard" isActive={pathname === "/dashboard"} onClick={closeMenu} />

          {isPending ? null : user ? (
            <>
              <div className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600">
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
                Hi, {user.name?.split(" ")[0]}
              </div>
              <button
                onClick={() => { handleLogout(); closeMenu(); }}
                className="w-full text-left px-3 py-2 text-sm text-slate-500 rounded-xl hover:text-red-500 hover:bg-red-50 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/auth/signin"
              onClick={closeMenu}
              className="block px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl hover:from-blue-500 hover:to-blue-600 transition-all shadow-sm"
            >
              Get Started
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
