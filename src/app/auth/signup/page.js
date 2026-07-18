"use client";

import { useState } from "react";
import { Card, Input, Button } from "@heroui/react";
import { toast } from "react-toastify";
import { auth } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await auth.signUp.email({ email, password, name });
      if (error) {
        toast.error(error.message || "Sign up failed");
      } else {
        toast.success("Account created! You can now sign in.");
        router.push("/auth/signin");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <Card className="w-full max-w-sm p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Name"
            type="text"
            value={name}
            onValueChange={setName}
            isRequired
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onValueChange={setEmail}
            isRequired
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onValueChange={setPassword}
            isRequired
          />
          <Button type="submit" color="primary" isLoading={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
