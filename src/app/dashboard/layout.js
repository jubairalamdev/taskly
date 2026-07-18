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
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
