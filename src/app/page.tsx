"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [orderNumber, setOrderNumber] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("success") === "true") {
        setShowThankYou(true);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanOrderNumber = orderNumber.trim();
    if (!cleanOrderNumber) return;
    router.push(`/track/${cleanOrderNumber.toUpperCase()}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0c10] text-[#f0f0f5] relative overflow-hidden font-sans">
      
      {/* ─── IMAGE_DA4D0A.JPG EXACT CSS LAYERS ─── */}
      <style jsx global>{`
        @keyframes subtleGlobeRotation {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes livePulse {
          0%, 100% { transform: scale(1); opacity: 0.8; box-shadow: 0 0 12px #d4f700, 0 0 24px #d4f700; }
          50% { transform: scale(1.25); opacity: 1; box-shadow: 0 0 28px #d4f700, 0 0 45px #d4f700; }
        }
        .globe-horizon-mask {
          mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0.8) 65%, rgba(0,0,0,0) 95%);
          -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0.8) 65%, rgba(0,0,0,0) 95%);
        }
      `}</style>

      {/* ─── BACKGROUND STARSCAPE FIELD ─── */}
      <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
        <div className="absolute w-[1px] h-[1px] bg-white rounded-full top-[12%] left-[10%]" />
        <div className="absolute w-[2px] h-[2px] bg-white rounded-full top-[8%] left-[38%] opacity-80" />
        <div className="absolute w-[1px] h-[1px] bg-white rounded-full top-[15%] left-[66%]" />
        <div className="absolute w-[2px] h-[2px] bg-white rounded-full top-[5%] left-[88%] opacity-90" />
        <div className="absolute w-[1px] h-[1px] bg-white rounded-full top-[32%] left-[15%]" />
        <div className="absolute w-[1px] h-[1px] bg-white rounded-full top-[28%] left-[92%]" />
        <div className="absolute w-[2px] h-[2px] bg-white rounded-full top-[42%] left-[5%] opacity-50" />
      </div>

      {/* ─── TOP HEADER NAVIGATION ─── */}
      <nav className="w-full h-20 border-b border-white/[0.06] bg-[#0b0c10]/40 backdrop-blur-md z-50 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 flex items-center justify-between">
          <a href="/" className="text-sm font-bold tracking-wider text-white uppercase font-mono">
            KeebForge<span className="text-[#d4f700]">.</span>in
          </a>
          
          <div className="hidden md:flex items-center gap-10 text-[11px] font-medium tracking-[0.18em] uppercase text-[#9a9aa8]">
            <a href="/" className="text-white hover:text-[#d4f700] transition-colors">Home</a>
            <a href="#about" className="hover:text-[#d4f700] transition-colors">About Us</a>
            <a href="#services" className="hover:text-[#d4f700] transition-colors">Our Services</a>
            <a href="mailto:contact@keebforge.in" className="hover:text-[#d4f700] transition-colors">Contact</a>
          </div>

          <button 
            onClick={() => document.getElementById("tracking-input")?.focus()}
            className="text-[10px] font-bold tracking-[0.15em] uppercase border border-[#d4f700]/40 text-[#d4f700] px-4 py-2 rounded hover:bg-[#d4f700] hover:text-black transition-all duration-300"
          >
            Track Order
          </button>
        </div>
      </nav>

      {/* ─── HERO INTERACTIVE WORKSPACE GRID ─── */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-8 relative z-10">
        
        {/* LEFT COLUMN: THE ACCURATE GLOBE VISUAL FROM IMAGE_DA4D0A.JPG */}
        <div className="lg:col-span-6 flex items-center justify-center relative min-h-[420px] lg:min-h-[520px] overflow-visible">
          
          {/* Main Massive Earth Sphere Container */}
          <div className="absolute top-12 lg:top-24 w-[460px] sm:w-[560px] lg:w-[680px] h-[460px] sm:h-[560px] lg:h-[680px] rounded-full border border-white/[0.08] bg-gradient-to-b from-[#161920] via-[#090a0d] to-[#0b0c10] shadow-[0_0_120px_rgba(255,255,255,0.02)] overflow-hidden globe-horizon-mask">
            
            {/* Outward White-Glow Atmosphere Halo Ring */}
            <div className="absolute inset-0 rounded-full border-[5px] border-white/[0.04] blur-[3px] pointer-events-none" />
            <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none opacity-90 shadow-[0_0_40px_rgba(255,255,255,0.15)_inset]" />

            {/* Concentric Outer Halo Shading */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-b from-white/[0.03] to-transparent blur-xl pointer-events-none" />

            {/* Dynamic Dot Grid Matrix Texture */}
            <div 
              className="absolute inset-[-40px] opacity-[0.35] pointer-events-none bg-[radial-gradient(rgba(255,255,255,0.6)_1px,transparent_1px)] bg-[size:11px_11px]"
              style={{ animation: "subtleGlobeRotation 180s linear infinite" }}
            />

            {/* ─── HOTSPOT LOCATIONS ALONG THE HORIZON ─── */}
            {/* Big Main Core Hotspot (Lower Center) */}
            <div className="absolute top-[46%] left-[45%] z-20">
              <div className="w-5 h-5 rounded-full bg-[#d4f700] shadow-[0_0_25px_#d4f700] animate-[livePulse_1.8s_infinite_ease-in-out]" />
              <div className="w-1.5 h-1.5 rounded-full bg-black absolute inset-0 m-auto shadow-[0_0_2px_black]" />
            </div>

            {/* Left Wing Node 1 */}
            <div className="absolute top-[34%] left-[24%] z-20">
              <div className="w-3.5 h-3.5 rounded-full bg-[#d4f700] shadow-[0_0_15px_#d4f700] opacity-90 animate-[livePulse_2.2s_infinite_ease-in-out]" />
              <div className="w-1 h-1 rounded-full bg-black absolute inset-0 m-auto" />
            </div>

            {/* Left Wing Node 2 */}
            <div className="absolute top-[48%] left-[19%] z-20">
              <div className="w-3 h-3 rounded-full bg-[#d4f700] shadow-[0_0_12px_#d4f700] opacity-75" />
              <div className="w-0.5 h-0.5 rounded-full bg-black absolute inset-0 m-auto" />
            </div>

            {/* Right Wing Node 1 */}
            <div className="absolute top-[35%] left-[70%] z-20">
              <div className="w-3.5 h-3.5 rounded-full bg-[#d4f700] shadow-[0_0_15px_#d4f700] opacity-90 animate-[livePulse_2.5s_infinite_ease-in-out]" />
              <div className="w-1 h-1 rounded-full bg-black absolute inset-0 m-auto" />
            </div>

            {/* Right Wing Node 2 */}
            <div className="absolute top-[42%] left-[81%] z-20">
              <div className="w-3 h-3 rounded-full bg-[#d4f700] shadow-[0_0_12px_#d4f700] opacity-80" />
            </div>

            {/* Deep Southern Node */}
            <div className="absolute top-[58%] left-[58%] z-20">
              <div className="w-3 h-3 rounded-full bg-[#d4f700] shadow-[0_0_12px_#d4f700] opacity-70" />
            </div>

            {/* Deep Eastern Node */}
            <div className="absolute top-[54%] left-[80%] z-20">
              <div className="w-2 h-2 rounded-full bg-[#d4f700] opacity-50" />
            </div>

          </div>

          {/* Micro HUD Metadata Badge */}
          <div className="absolute bottom-2 lg:bottom-10 z-30 text-[9px] font-mono tracking-[0.25em] text-[#5a5a68] uppercase bg-[#0b0c10]/95 px-4 py-1.5 border border-white/[0.06] rounded shadow-2xl backdrop-blur-md">
            Logistics Orbit Active
          </div>
        </div>

        {/* RIGHT COLUMN: SEARCH INTERACTION ENGINE */}
        <div className="lg:col-span-6 space-y-6 lg:pl-6 z-20">
          
          {/* Optional Post-Checkout Success Banner */}
          {showThankYou && (
            <div 
              className="rounded-xl border border-[#d4f700]/30 bg-[#d4f700]/5 p-4 max-w-xl animate-[fadeIn_0.3s_ease-out_both] shadow-[0_0_15px_rgba(212,247,0,0.05)]"
            >
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4f700] flex items-center gap-2 font-mono">
                <span>⚡</span> Order Identity Initialized
              </h3>
              <p className="text-xs text-[#9a9aa8] mt-1 leading-relaxed">
                Your build records are synced into the node mesh. Pass your tracking sequence key code below to begin diagnostics pipeline tracing.
              </p>
            </div>
          )}

          {/* Typography Directives */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-[#d4f700] font-mono">
              Fulfillment Search Engine
            </h2>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.1] uppercase text-white font-mono">
              Enter Your Docket / AWB / <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9a9aa8] to-[#5a5a68]">
                Shipment Serial No.
              </span>
            </h1>
          </div>

          {/* Inline Form Bar Component Layout */}
          <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col sm:flex-row items-stretch gap-2 pt-2">
            <div className="flex-1 relative flex items-center bg-[#12151a] border border-white/[0.08] rounded-xl px-4 transition-all focus-within:border-[#d4f700]/50">
              <span className="text-sm select-none mr-3 opacity-30">🔎</span>
              <input
                id="tracking-input"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="PROMPT MATRIX CODE — E.G. KF-2601"
                className="w-full bg-transparent py-4.5 text-xs font-bold tracking-widest text-white outline-none placeholder-[#5a5a68] uppercase font-mono"
              />
            </div>
            
            <button
              type="submit"
              className="font-bold text-[11px] uppercase tracking-widest text-black px-9 py-4.5 rounded-xl transition-all duration-200 cursor-pointer whitespace-nowrap bg-[#d4f700] font-mono hover:brightness-110 active:scale-[0.99]"
              style={{ boxShadow: "0 4px 20px rgba(212, 247, 0, 0.15)" }}
            >
              Track Now
            </button>
          </form>

          {/* Footer Footprint Guidance Text */}
          <p className="text-xs text-[#5a5a68] leading-relaxed max-w-md font-medium">
            Your tracking identification array can be uncovered near the top header of the confirmation sheet delivered right to your electronic mail container.
          </p>
        </div>
      </main>

    </div>
  );
}