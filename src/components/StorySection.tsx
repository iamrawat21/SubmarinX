import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from 'motion/react';
import { useRef, useState } from 'react';
import { Target, ServerIcon, LocateFixed, EyeOff, KeyRound, Network } from 'lucide-react';

function ScrollTypewriter() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "start 25%"]
  });

  const texts = [
    { text: "Legacy security tools act like passive alarms they only alert you once your network is already burning.", className: "mb-8" },
    { text: "submarinx operates like an invisible immune system within your infrastructure.", className: "mb-8 text-cyan-400" },
    { text: "Built with memory safe Rust sensors and a completely localized containerized AI brain, submarinx shifts the battlefield turning your local file systems and network routing into lethal traps for lateral movers, ransomware, and insider threats.", className: "text-2xl md:text-3xl text-slate-500 font-light" }
  ];

  const totalChars = texts.reduce((acc, t) => acc + t.text.length, 0);
  const charCount = useTransform(scrollYProgress, [0, 1], [0, totalChars]);
  const [displayedCount, setDisplayedCount] = useState(0);

  useMotionValueEvent(charCount, "change", (latest) => {
    setDisplayedCount(Math.floor(latest));
  });

  let remaining = displayedCount;

  return (
    <div ref={ref} className="max-w-4xl font-display text-3xl md:text-5xl leading-tight mb-40 text-slate-300 min-h-[450px]">
      {texts.map((t, idx) => {
        const take = Math.min(remaining, t.text.length);
        remaining -= take;
        const displayedText = t.text.slice(0, Math.max(0, take));

        // Show cursor if this paragraph is actively typing, or if it's the last paragraph and we're at the end
        const isActivelyTyping = remaining === 0 && take > 0 && take < t.text.length;
        const isFinished = idx === texts.length - 1 && take === t.text.length;
        const showCursor = isActivelyTyping || isFinished;

        return (
          <p key={idx} className={t.className}>
            {displayedText}
            {showCursor && (
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-[0.4em] h-[1em] bg-cyan-500 ml-1 align-middle"
              />
            )}
          </p>
        );
      })}
    </div>
  );
}

function AppleGrid({ profiles }: { profiles: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "start 30%"]
  });

  return (
    <div ref={containerRef} className="grid md:grid-cols-3 gap-8" style={{ perspective: 1000 }}>
      {profiles.map((profile, i) => {
        const start = i * 0.2;
        const end = start + 0.5;
        
        const rawScale = useTransform(scrollYProgress, [start, end], [0.85, 1]);
        const rawOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);
        const rawY = useTransform(scrollYProgress, [start, end], [100, 0]);
        const rawRotateX = useTransform(scrollYProgress, [start, end], [20, 0]);

        const scale = useSpring(rawScale, { stiffness: 100, damping: 30 });
        const opacity = useSpring(rawOpacity, { stiffness: 100, damping: 30 });
        const y = useSpring(rawY, { stiffness: 100, damping: 30 });
        const rotateX = useSpring(rawRotateX, { stiffness: 100, damping: 30 });

        return (
          <motion.div
            key={i}
            style={{ 
              scale, opacity, y, rotateX,
              transformOrigin: "bottom center"
            }}
            className="bg-black/80 border border-slate-800 rounded-lg hover:border-cyan-500/50 transition-colors overflow-hidden backdrop-blur-sm shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col h-full"
          >
            <div className="bg-slate-900/80 border-b border-slate-800 px-4 py-2 flex items-center gap-2 shrink-0">
              <div className="w-2 h-2 rounded-full bg-slate-700" />
              <div className="w-2 h-2 rounded-full bg-slate-700" />
              <div className="w-2 h-2 rounded-full bg-slate-700" />
              <span className="ml-2 font-mono text-[10px] text-slate-500 uppercase tracking-widest">root@submarinx:~/profile_{i}</span>
            </div>
            <div className="p-6 flex-grow">
              <div className="text-cyan-400 mb-6 bg-cyan-950/30 w-10 h-10 rounded border border-cyan-500/20 flex items-center justify-center">
                {profile.icon}
              </div>
              <h3 className="text-lg font-mono font-medium mb-3 text-white">{profile.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm font-mono">&gt; {profile.desc}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function CoreArchitecture() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 50%"] 
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div ref={containerRef}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-16 md:text-center"
      >
        <h2 className="font-mono text-cyan-400 uppercase tracking-widest text-sm mb-4">Core Architecture</h2>
        <p className="text-4xl md:text-6xl font-display font-bold text-white mb-6">How We Fight.</p>
      </motion.div>

      <div className="flex flex-col gap-12 relative pb-12">
        {/* Background faint line */}
        <div className="absolute inset-y-0 left-[27px] md:left-1/2 md:-ml-px w-px bg-slate-800" />
        
        {/* Animated timeline line */}
        <motion.div 
          style={{ scaleY, originY: 0 }}
          className="absolute inset-y-0 left-[27px] md:left-1/2 md:-ml-[1.5px] w-[3px] bg-gradient-to-b from-cyan-500 via-emerald-500 to-cyan-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] z-0" 
        />

        {[
          {
            title: "1. Stealth Sensors (Rust-Powered Edge)",
            desc: "Memory-safe, ultra-lightweight endpoint agents designed to execute silently without draining local hardware resources. Every sensor communicates back to the local platform through dynamically minted, 90-day mTLS tunnels.",
            icon: <EyeOff className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
          },
          {
            title: "2. The CyberDefense Pro AI Brain",
            desc: "A centralized, locally hosted LLM (Llama 3.2 orchestrated via LangChain) acting as an autonomous, 24/7 Tier-2 SOC Analyst. Processes threat logic using Static YARA, Heuristic Entropy, and Generative AI to eliminate false positives.",
            icon: <Network className="w-5 h-5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
          },
          {
            title: "3. The Shadow Mutator (Active Deception)",
            desc: "Our ultimate defensive weapon. When a threat breaches a system, submarinx weaponizes the endpoint's file system and network sockets to feed attackers infinite loops and poisoned data. We don't just block IPs, we trap them.",
            icon: <KeyRound className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
          }
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-150px" }}
            className={`relative flex flex-col md:flex-row items-center gap-8 group ${i % 2 === 0 ? '' : 'md:flex-row-reverse'} z-10`}
          >
            <div className="absolute left-[8px] md:left-1/2 md:-ml-[19px] w-[38px] h-[38px] rounded-full bg-black border-2 border-slate-700 group-hover:border-emerald-500 shadow-[0_0_15px_rgba(0,0,0,1)] group-hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] flex items-center justify-center transition-all duration-500 z-20">
              {feature.icon}
            </div>
            <div className="ml-16 md:ml-0 md:w-1/2 p-6 bg-black/80 border border-slate-800 rounded-lg group-hover:border-emerald-500/50 transition-colors backdrop-blur-md shadow-xl">
              <div className="font-mono text-[10px] text-emerald-500 mb-3 uppercase tracking-widest">[ Module {i + 1} Executing ]</div>
              <h3 className="text-xl font-mono text-white mb-4 group-hover:text-emerald-400 transition-colors">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm font-mono md:text-base">&gt; {feature.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="architecture" ref={containerRef} className="py-32 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto">

        {/* Intro */}
        <ScrollTypewriter />

        {/* Who We Help */}
        <div className="mb-40">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16 border-b border-white/10 pb-8"
          >
            <h2 className="font-mono text-cyan-400 uppercase tracking-widest text-sm mb-4">Who We Help</h2>
            <p className="text-3xl md:text-4xl font-display text-white max-w-3xl">
              We support high-consequence, resource-constrained organizations that require ironclad data sovereignty.
            </p>
          </motion.div>

          <AppleGrid profiles={[
            {
              icon: <Target className="w-6 h-6" />,
              title: "Defense Tech & Aerospace",
              desc: "Suppliers handling sensitive blueprints who must strictly align with national security mandates without leaking telemetry to public clouds."
            },
            {
              icon: <ServerIcon className="w-6 h-6" />,
              title: "Fintech & Financial Labs",
              desc: "Teams heavily exposed to backend credential stuffing, API data exfiltration, and malicious database dumping."
            },
            {
              icon: <LocateFixed className="w-6 h-6" />,
              title: "Critical Infrastructure & OT",
              desc: "Operations running highly sensitive, isolated networks that must remain 100% air-gapped from the external internet."
            }
          ]} />
        </div>

        {/* Core Architecture */}
        <CoreArchitecture />

      </div>
    </section>
  );
}
