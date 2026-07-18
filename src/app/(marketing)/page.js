"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import GetStartedButton from "@/components/GetStartedButton";

function FadeIn({ children, className, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerChildren({ children, className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren: 0.15 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({ children }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
      }}
    >
      {children}
    </motion.div>
  );
}

function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 400 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-md"
    >
      <rect x="20" y="20" width="360" height="240" rx="16" fill="white" className="drop-shadow-xl" />
      <rect x="20" y="20" width="360" height="48" rx="16" fill="#EFF6FF" />
      <circle cx="48" cy="44" r="6" fill="#60A5FA" />
      <rect x="64" y="38" width="80" height="6" rx="3" fill="#93C5FD" />
      <rect x="310" y="37" width="50" height="14" rx="7" fill="#60A5FA" />
      <rect x="40" y="88" width="320" height="52" rx="10" fill="#F0FDF4" />
      <rect x="56" y="104" width="16" height="16" rx="4" fill="#22C55E" />
      <rect x="80" y="107" width="100" height="6" rx="3" fill="#16A34A" opacity="0.8" />
      <rect x="300" y="105" width="40" height="14" rx="7" fill="#22C55E" opacity="0.3" />
      <rect x="40" y="152" width="320" height="52" rx="10" fill="#FEFCE8" />
      <rect x="56" y="168" width="16" height="16" rx="4" fill="#EAB308" />
      <rect x="80" y="171" width="120" height="6" rx="3" fill="#CA8A04" opacity="0.8" />
      <rect x="280" y="169" width="60" height="14" rx="7" fill="#EAB308" opacity="0.3" />
      <rect x="40" y="216" width="320" height="52" rx="10" fill="#FEF2F2" />
      <rect x="56" y="232" width="16" height="16" rx="4" fill="#EF4444" />
      <rect x="80" y="235" width="130" height="6" rx="3" fill="#DC2626" opacity="0.8" />
      <rect x="260" y="233" width="80" height="14" rx="7" fill="#EF4444" opacity="0.3" />
    </svg>
  );
}

function FeatureIcon({ type }) {
  if (type === "add") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v8" />
        <path d="M8 12h8" />
      </svg>
    );
  }
  if (type === "status") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M7 16l4-8 4 4 4-6" />
      </svg>
    );
  }
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="M22 4L12 14.01l-3-3" />
    </svg>
  );
}

function FloatingBlob({ className }) {
  return (
    <motion.div
      className={`absolute rounded-full opacity-20 blur-3xl ${className}`}
      animate={{
        y: [0, -30, 0],
        x: [0, 20, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export default function Home() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">

      {/* ─── Hero ─── */}
      <section className="relative flex-1 flex flex-col items-center justify-center px-4 pt-20 pb-28 text-center overflow-hidden bg-gradient-hero">
        <FloatingBlob className="w-96 h-96 bg-blue-300 -top-20 -left-20" />
        <FloatingBlob className="w-72 h-72 bg-orange-300 bottom-10 right-10" />
        <FloatingBlob className="w-64 h-64 bg-blue-200 bottom-40 left-1/4" />
        <div className="flex flex-col lg:flex-row justify-center w-300 px-5">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 flex-1"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-blue-50 border border-blue-100 text-sm text-blue-500 font-medium"
          >
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Distraction Free task management
          </motion.div>

          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.1]">
            <span className="text-slate-900">Tasks,</span>
            <br />
            <span className="text-gradient-primary">stripped down.</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 w-[80vw] sm:max-w-xl mx-auto text-lg sm:text-xl text-slate-500 leading-relaxed"
          >
            No boards, no labels, no clutter. Just simple rows with automatic
            color cues so you always know what needs your attention.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10"
          >
            <GetStartedButton />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="relative z-10 mt-16 w-full flex justify-center flex-1"
        >
          <HeroIllustration />
        </motion.div>
        </div>
      </section>

      {/* ─── Problem ─── */}
      <section className="relative bg-orange-50 py-28 px-4 overflow-hidden">
        <FloatingBlob className="w-80 h-80 bg-orange-200 -left-20 top-1/2" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <FadeIn>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1 mb-6 rounded-full bg-orange-200/50 text-orange-600 text-sm font-medium"
            >
              The Problem
            </motion.span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              Project management<br />
              <span className="text-gradient-accent">is overstuffed</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 text-lg sm:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
              Most tools bury your tasks under kanban boards, custom fields,
              labels, automations, and workflows you never asked for. You spend
              more time organising the system than doing the work.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-12 flex justify-center">
              <svg width="320" height="40" viewBox="0 0 320 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-40">
                <rect x="0" y="0" width="320" height="8" rx="4" fill="#FED7AA" />
                <rect x="10" y="16" width="140" height="8" rx="4" fill="#FED7AA" />
                <rect x="170" y="16" width="140" height="8" rx="4" fill="#FED7AA" />
                <rect x="10" y="32" width="80" height="8" rx="4" fill="#FDBA74" />
                <rect x="100" y="32" width="80" height="8" rx="4" fill="#FED7AA" />
                <rect x="190" y="32" width="120" height="8" rx="4" fill="#FDE68A" />
              </svg>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Solution ─── */}
      <section className="relative py-28 px-4 overflow-hidden bg-gradient-hero">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <FadeIn>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1 mb-6 rounded-full bg-blue-50 text-blue-500 text-sm font-medium"
            >
              The Solution
            </motion.span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              What you actually{" "}
              <span className="text-gradient-primary">need</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-4 text-lg text-slate-500">
              A task has a name, a deadline, and a checkbox. That&apos;s it.
            </p>
          </FadeIn>

          <StaggerChildren className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
            <StaggerItem>
              <motion.div
                whileHover={{ y: -8, boxShadow: "0 20px 40px -12px rgba(96, 165, 250, 0.25)" }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 h-full transition-shadow"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-blue-400 mb-5">
                  <FeatureIcon type="add" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Add a task</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Name it, set a deadline, optional description. Done in seconds.
                </p>
              </motion.div>
            </StaggerItem>
            <StaggerItem>
              <motion.div
                whileHover={{ y: -8, boxShadow: "0 20px 40px -12px rgba(251, 146, 60, 0.25)" }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 h-full transition-shadow"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center text-orange-400 mb-5">
                  <FeatureIcon type="status" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">See the status</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Green for done, yellow for active, red for overdue — at a glance.
                </p>
              </motion.div>
            </StaggerItem>
            <StaggerItem>
              <motion.div
                whileHover={{ y: -8, boxShadow: "0 20px 40px -12px rgba(96, 165, 250, 0.25)" }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 h-full transition-shadow"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-blue-400 mb-5">
                  <FeatureIcon type="check" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Check it off</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  One click to mark complete. No extra statuses, no drag-and-drop.
                </p>
              </motion.div>
            </StaggerItem>
          </StaggerChildren>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative py-28 px-4 text-center overflow-hidden bg-gradient-cta">
        <FloatingBlob className="w-96 h-96 bg-blue-200 -bottom-20 -right-20" />
        <FloatingBlob className="w-64 h-64 bg-blue-100 top-10 left-10" />
        <div className="relative z-10">
          <FadeIn>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              Ready to clear the{" "}
              <span className="text-gradient-primary">noise</span>?
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-4 text-lg text-slate-500">
              Start in seconds. No sign-up fees, no onboarding calls.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-10">
              <GetStartedButton />
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
