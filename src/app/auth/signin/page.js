"use client";

import { Card, Button, TextField, Label, Input, FieldError } from "@heroui/react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SignInPage() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    authClient.signIn.email(
      {
        email: form.get("email"),
        password: form.get("password"),
      },
      {
        onRequest: () => {
          toast.loading("Signing in...");
        },
        onSuccess: () => {
          toast.dismiss();
          toast.success("Signed in successfully");
          router.push("/dashboard");
        },
        onError: (ctx) => {
          toast.dismiss();
          toast.error(ctx.error.message || "Sign in failed");
        },
      },
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-sm h-[85vh] flex items-center justify-center"
    >

        <Card className="w-full p-8 shadow-xl border border-slate-100 rounded-2xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
            <p className="mt-2 text-sm text-slate-500">
              Sign in to get back to your tasks
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <TextField isRequired className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-slate-700">Email</Label>
              <Input name="email" type="email" placeholder="you@example.com" className="px-3 py-2 rounded-xl border border-slate-200 focus:border-blue-400 transition-colors" />
              <FieldError />
            </TextField>
            <TextField isRequired className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-slate-700">Password</Label>
              <Input name="password" type="password" placeholder="Enter your password" className="px-3 py-2 rounded-xl border border-slate-200 focus:border-blue-400 transition-colors" />
              <FieldError />
            </TextField>
            <Button
              type="submit"
              color="primary"
              className="w-full h-11 text-base font-medium rounded-xl bg-blue-400 hover:bg-blue-500 transition-all"
            >
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-blue-400 hover:text-blue-500 font-medium transition-colors"
            >
              Sign up
            </Link>
          </p>
        </Card>
    </motion.div>
  );
}
