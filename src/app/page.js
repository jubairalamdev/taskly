import GetStartedButton from "@/components/GetStartedButton";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
          Tasks, stripped down.
        </h1>
        <p className="mt-6 max-w-lg text-lg text-slate-500 leading-relaxed">
          No boards, no labels, no clutter. Just simple rows with automatic
          color cues so you always know what needs your attention.
        </p>
        <div className="mt-10">
          <GetStartedButton />
        </div>
      </section>

      {/* Problem */}
      <section className="bg-orange-50 py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Project management is overstuffed
          </h2>
          <p className="mt-6 text-lg text-slate-500 leading-relaxed">
            Most tools bury your tasks under kanban boards, custom fields,
            labels, automations, and workflows you never asked for. You spend
            more time organising the system than doing the work.
          </p>
        </div>
      </section>

      {/* Solution */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            What you actually need
          </h2>
          <p className="mt-6 text-lg text-slate-500 leading-relaxed">
            A task has a name, a deadline, and a checkbox. That&apos;s it.
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-400 font-bold text-lg mb-4">
                1
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Add a task</h3>
              <p className="text-sm text-slate-500">
                Name it, set a deadline, optional description. Done in seconds.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-500 font-bold text-lg mb-4">
                2
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">See the status</h3>
              <p className="text-sm text-slate-500">
                Green for done, yellow for active, red for overdue — at a glance.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-400 font-bold text-lg mb-4">
                3
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Check it off</h3>
              <p className="text-sm text-slate-500">
                One click to mark complete. No extra statuses, no drag-and-drop.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-50 py-24 px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          Ready to clear the noise?
        </h2>
        <p className="mt-4 text-lg text-slate-500">
          Start in seconds. No sign-up fees, no onboarding calls.
        </p>
        <div className="mt-8">
          <GetStartedButton />
        </div>
      </section>
    </div>
  );
}
