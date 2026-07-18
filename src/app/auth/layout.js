import Link from "next/link";

export default function AuthLayout({ children }) {
  return (
    <div className="flex flex-col min-h-full bg-gradient-auth">
      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>
    </div>
  );
}
