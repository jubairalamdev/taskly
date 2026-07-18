import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-10 border-t border-slate-100 bg-white">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-sm font-semibold tracking-tight">
          <Image src="/logo-wide.png" alt="Taskly Logo" width={100} height={50} className="h-7.5" />
        </span>
        <p className="text-sm text-slate-400">
          &copy; {year} Taskly. Distraction Free task manager by Jubair Alam.
        </p>
      </div>
    </footer>
  );
}
