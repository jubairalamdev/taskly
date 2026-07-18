"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function DashboardLayout({ children }) {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <div className="flex-1 flex flex-col">
      <header className="sticky top-0 z-50 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="text-xl font-bold text-blue-400 tracking-tight">
            Taskly
          </span>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 text-sm text-slate-500 rounded-xl hover:bg-blue-50 hover:text-blue-500 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
