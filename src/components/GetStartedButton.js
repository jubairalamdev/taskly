"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";

export default function GetStartedButton() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleClick = () => {
    router.push(session ? "/dashboard" : "/auth/signin");
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-medium text-white bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl hover:from-blue-500 hover:to-blue-600 transition-all shadow-md hover:shadow-lg glow-blue"
    >
      Get Started
      <motion.span
        aria-hidden="true"
        initial={{ x: 0 }}
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        &rarr;
      </motion.span>
    </motion.button>
  );
}
