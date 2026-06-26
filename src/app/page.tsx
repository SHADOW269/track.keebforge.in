"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "mailto:contact@keebforge.in" },
];

// Simulated live order activity for the terminal animation
const TERMINAL_LINES = [
  { prefix: "→", text: "KF000041  Work Started", color: "text-[var(--acc)]" },
  { prefix: "✓", text: "KF000038  Delivered", color: "text-emerald-400" },
  { prefix: "→", text: "KF000045  Parts Received", color: "text-[var(--acc)]" },
  { prefix: "·", text: "KF000040  In Transit", color: "text-[var(--t2)]" },
  { prefix: "→", text: "KF000043  Testing", color: "text-[var(--acc)]" },
  { prefix: "✓", text: "KF000036  Order Completed", color: "text-emerald-400" },
  { prefix: "·", text: "KF000047  Order Received", color: "text-[var(--t2)]" },
  { prefix: "→", text: "KF000044  Packing", color: "text-[var(--acc)]" },
];

export default function Home() {
  const [orderNumber, setOrderNumber] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true") setShowSuccess(true);
  }, []);

  // Stagger terminal lines appearing
  useEffect(() => {
    if (visibleLines >= TERMINAL_LINES.length) return;
    const timer = setTimeout(
      () => setVisibleLines((v) => v + 1),
      visibleLines === 0 ? 600 : 280
    );
    return () => clearTimeout(timer);
  }, [visibleLines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = orderNumber.trim().toUpperCase();
    if (!clean) return;
    router.push(`/track/${clean}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--t1)] relative overflow-hidden">

      {/* Moving dot-grid background */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          animation: "gridDrift 8s linear infinite",
        }}
      />

      {/* Top accent glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-[var(--acc)] opacity-20 blur-sm pointer-events-none z-0" />

      {/* ─── Nav ─── */}
      <nav className="w-full h-16 border-b border-[var(--bdr)] bg-[var(--bg)]/80 backdrop-blur-md z-50 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 flex items-center justify-between">
          <a
            href="/"
            className="text-sm font-bold tracking-wider text-[var(--t1)] uppercase"
            style={{ fontFamily: "var(--ff-d)" }}
          >
            KeebForge<span className="text-[var(--acc)]">.</span>in
          </a>

          <div className="hidden md:flex items-center gap-8 text-[11px] font-medium tracking-[0.16em] uppercase text-[var(--t3)]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[var(--acc)] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => document.getElementById("order-input")?.focus()}
            className="text-[10px] font-bold tracking-[0.15em] uppercase border border-[var(--acc)]/40 text-[var(--acc)] px-4 py-2 rounded hover:bg-[var(--acc)] hover:text-black transition-all duration-200"
          >
            Track Order
          </button>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16 relative z-10">

        {/* Left — Terminal panel */}
        <div className="animate-fade-up order-2 lg:order-1">
          <div className="rounded-2xl border border-[var(--bdr)] bg-[var(--bg1)] overflow-hidden shadow-2xl">

            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--bdr)] bg-[var(--bg2)]">
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
              <span
                className="ml-3 text-[10px] tracking-widest uppercase text-[var(--t3)]"
                style={{ fontFamily: "var(--ff-d)" }}
              >
                keebforge — live order feed
              </span>
              <span className="ml-auto flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--acc)] animate-[glowPulse_2s_infinite]" />
                <span className="text-[9px] text-[var(--acc)] tracking-widest uppercase font-mono">
                  live
                </span>
              </span>
            </div>

            {/* Terminal body */}
            <div className="p-5 space-y-2.5 min-h-[280px] font-mono text-xs">
              <div className="text-[var(--t3)] text-[10px] mb-4 tracking-wider">
                $ tail -f orders.log
              </div>

              {TERMINAL_LINES.map((line, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 transition-all duration-300 ${
                    i < visibleLines
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-1"
                  }`}
                  style={{ transitionDelay: `${i * 20}ms` }}
                >
                  <span className={`${line.color} w-3 shrink-0`}>
                    {line.prefix}
                  </span>
                  <span className="text-[var(--t2)]">{line.text}</span>
                </div>
              ))}

              {visibleLines >= TERMINAL_LINES.length && (
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[var(--t3)]">$</span>
                  <span className="text-[var(--t2)] terminal-cursor" />
                </div>
              )}
            </div>

            {/* Footer strip */}
            <div className="border-t border-[var(--bdr)] px-5 py-2.5 flex items-center justify-between">
              <span className="text-[9px] text-[var(--t3)] tracking-widest uppercase font-mono">
                {TERMINAL_LINES.length} active orders
              </span>
              <span className="text-[9px] text-[var(--t3)] font-mono">
                KeebForge Node · MK.01
              </span>
            </div>
          </div>
        </div>

        {/* Right — Search */}
        <div className="space-y-7 order-1 lg:order-2">

          {showSuccess && (
            <div className="animate-fade-up rounded-xl border border-[var(--acc)]/30 bg-[var(--acc-glow2)] p-4">
              <p
                className="text-xs font-bold uppercase tracking-wider text-[var(--acc)] mb-1"
                style={{ fontFamily: "var(--ff-d)" }}
              >
                Order placed
              </p>
              <p className="text-xs text-[var(--t2)] leading-relaxed">
                Your order is confirmed. Use the number from your confirmation
                email below to follow its progress.
              </p>
            </div>
          )}

          <div className="animate-fade-up-delay-1 space-y-3">
            <p
              className="text-[10px] font-bold tracking-[0.25em] uppercase text-[var(--acc)]"
              style={{ fontFamily: "var(--ff-d)" }}
            >
              Order Tracking
            </p>
            <h1
              className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05] text-[var(--t1)]"
              style={{ fontFamily: "var(--ff-d)" }}
            >
              Where is
              <br />
              your build?
            </h1>
            <p className="text-sm text-[var(--t2)] leading-relaxed max-w-sm">
              Enter your order number to see real-time progress on your
              keyboard build, switch mod, or repair.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="animate-fade-up-delay-2 flex flex-col sm:flex-row gap-2 max-w-md"
          >
            <div className="flex-1 flex items-center bg-[var(--bg2)] border border-[var(--bdr)] rounded-xl px-4 focus-within:border-[var(--acc)]/50 transition-colors">
              <input
                id="order-input"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="e.g. KF000042"
                className="w-full bg-transparent py-4 text-sm font-mono text-[var(--t1)] outline-none placeholder-[var(--t3)] uppercase tracking-widest"
              />
            </div>
            <button
              type="submit"
              className="font-bold text-xs uppercase tracking-widest text-black px-8 py-4 rounded-xl bg-[var(--acc)] hover:brightness-110 active:scale-[0.98] transition-all duration-150 whitespace-nowrap"
              style={{ boxShadow: "0 4px 20px var(--acc-glow2)" }}
            >
              Track
            </button>
          </form>

          <p className="animate-fade-up-delay-3 text-[11px] text-[var(--t3)] leading-relaxed max-w-xs">
            Your order number is at the top of the confirmation email we sent
            you. It starts with{" "}
            <span className="font-mono text-[var(--t2)]">KF</span>.
          </p>
        </div>
      </main>
    </div>
  );
}