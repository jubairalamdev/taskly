"use client";

import { Card, Input, Button } from "@heroui/react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

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
    <div className="flex flex-1 items-center justify-center p-4">
      <Card className="w-full max-w-sm p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            name="email"
            label="Email"
            type="email"
            isRequired
          />
          <Input
            name="password"
            label="Password"
            type="password"
            isRequired
          />
          <Button type="submit" color="primary">
            Sign In
          </Button>
        </form>
      </Card>
    </div>
  );
}
