export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-10 border-t border-slate-100 bg-white">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-sm font-semibold tracking-tight">
          <span className="text-gradient-primary">Taskly</span>
        </span>
        <p className="text-sm text-slate-400">
          &copy; {year} Taskly. Distraction-free task management.
        </p>
      </div>
    </footer>
  );
}
