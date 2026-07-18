"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function GetStartedButton() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleClick = () => {
    router.push(session ? "/dashboard" : "/auth/signin");
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-medium text-white bg-blue-400 rounded-xl hover:bg-blue-500 transition-colors shadow-sm"
    >
      Get Started
      <span aria-hidden="true">&rarr;</span>
    </button>
  );
}
