export default function Footer() {
  return (
    <footer className="py-8 text-center text-sm text-slate-400">
      <div className="max-w-6xl mx-auto px-4">
        &copy; {new Date().getFullYear()} Taskly. Distraction-free task management.
      </div>
    </footer>
  );
}
