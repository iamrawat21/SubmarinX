import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from 'motion/react';
import { useRef, useState, useEffect, ReactNode } from 'react';
import { Target, ServerIcon, LocateFixed, EyeOff, KeyRound, Network, Radio, Cpu, Lock, Shield, Play, Pause } from 'lucide-react';

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

function SonarRadar() {
  return (
    <div className="w-full h-full flex items-center justify-between px-6 md:px-12 pointer-events-none select-none">
      {/* Left Telemetry Column */}
      <div className="hidden lg:flex flex-col gap-2 font-mono text-[9px] text-cyan-400/40 w-1/4">
        <div className="border-b border-cyan-500/10 pb-1 font-bold text-cyan-400/60">// EDGE SENSOR TELEMETRY</div>
        <span>SYS_STATUS: ACTIVE</span>
        <span>AGENT_VER: 1.4.2-RUST</span>
        <span>MEM_USAGE: 8.42 MB</span>
        <span>HEARTBEAT: 200ms</span>
        <span>INTEGRITY: VALID</span>
      </div>

      {/* Center Radar Circle */}
      <div className="relative w-56 h-56 flex items-center justify-center flex-shrink-0 mx-auto">
        <div className="absolute w-52 h-52 rounded-full border border-cyan-500/5 animate-[spin_180s_linear_infinite]" />
        <div className="absolute w-44 h-44 rounded-full border border-cyan-500/10" />
        <div className="absolute w-32 h-32 rounded-full border border-cyan-500/15" />
        <div className="absolute w-16 h-16 rounded-full border border-cyan-500/25" />

        {/* Radar Crosshairs */}
        <div className="absolute w-44 h-px bg-cyan-500/10" />
        <div className="absolute h-44 w-px bg-cyan-500/10" />

        {/* Sweep */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className="absolute w-44 h-44 rounded-full origin-center"
          style={{
            background: "conic-gradient(from 0deg, rgba(6, 182, 212, 0.35) 0deg, rgba(6, 182, 212, 0) 90deg)"
          }}
        />

        {/* Pulse target nodes */}
        <motion.div
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute top-12 left-16 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
        />
        <motion.div
          animate={{ opacity: [0.1, 0.8, 0.1], scale: [1, 0.7, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-16 right-12 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
        />
      </div>

      {/* Right Monitored Paths Column */}
      <div className="hidden lg:flex flex-col gap-2 font-mono text-[9px] text-cyan-400/40 w-1/4 text-right">
        <div className="border-b border-cyan-500/10 pb-1 font-bold text-cyan-400/60">// PATH MONITORS</div>
        <span>[ OK ] /etc/passwd</span>
        <span>[ OK ] /bin/systemd</span>
        <span>[ OK ] /usr/local/bin</span>
        <span>[ OK ] /var/log/auth.log</span>
        <span>[ OK ] /lib/security</span>
      </div>
    </div>
  );
}

function FintechChips() {
  return (
    <div className="w-full h-full flex items-center justify-center gap-4 md:gap-8 px-4 pointer-events-none select-none">
      {[
        {
          name: "PIPELINE",
          sub: "Telemetry Engine",
          border: "border-cyan-500/20 group-hover:border-cyan-500/40",
          glow: "shadow-[0_0_30px_rgba(6,182,212,0.1)]",
          icon: <Cpu className="w-6 h-6 md:w-8 md:h-8 text-cyan-400" />,
          accent: "cyan"
        },
        {
          name: "CORRELATION",
          sub: "Heuristic Analyzer",
          border: "border-emerald-500/20 group-hover:border-emerald-500/40",
          glow: "shadow-[0_0_30px_rgba(16,185,129,0.1)]",
          icon: <Network className="w-6 h-6 md:w-8 md:h-8 text-emerald-400" />,
          accent: "emerald"
        },
        {
          name: "DECISION",
          sub: "Automated Action",
          border: "border-rose-500/20 group-hover:border-rose-500/40",
          glow: "shadow-[0_0_30px_rgba(244,63,94,0.1)]",
          icon: <Target className="w-6 h-6 md:w-8 md:h-8 text-rose-400" />,
          accent: "rose"
        }
      ].map((chip, i) => (
        <motion.div
          key={i}
          animate={{ y: [-4, 4, -4] }}
          transition={{ repeat: Infinity, duration: 4, delay: i * 0.3, ease: "easeInOut" }}
          className={`w-24 md:w-32 h-24 md:h-32 rounded-2xl bg-zinc-950 border ${chip.border} relative flex flex-col items-center justify-center p-2 text-center transition-all duration-500 ${chip.glow}`}
        >
          {/* Subtle inside gradient background */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#09090b] to-[#18181b] opacity-90 -z-10" />
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-tr ${chip.accent === 'cyan' ? 'from-cyan-500/10' : chip.accent === 'emerald' ? 'from-emerald-500/10' : 'from-rose-500/10'} to-transparent opacity-30`} />

          {/* Status pulsing indicator */}
          <div className="absolute top-2 right-2">
            <span className={`w-1 h-1 rounded-full ${chip.accent === 'cyan' ? 'bg-cyan-500' : chip.accent === 'emerald' ? 'bg-emerald-500' : 'bg-rose-500'} animate-pulse`} />
          </div>

          <div className="mb-2">{chip.icon}</div>
          <div className="font-mono text-[8px] md:text-[9px] text-white tracking-wider font-bold">{chip.name}</div>
          <div className="font-mono text-[6px] text-zinc-500 mt-0.5">{chip.sub}</div>
        </motion.div>
      ))}
    </div>
  );
}

function AirGapBarrier() {
  return (
    <div className="w-full h-full flex items-center justify-between px-6 md:px-12 pointer-events-none select-none">
      {/* Left Safe Zone Stats */}
      <div className="hidden lg:flex flex-col gap-2 font-mono text-[9px] text-rose-400/40 w-1/4">
        <div className="border-b border-rose-500/10 pb-1 font-bold text-rose-400/60">// ACTIVE ENGAGEMENT</div>
        <span>ENG_STATE: ACTIVE</span>
        <span className="text-emerald-400/80">SAFE_ZONE: SECURED</span>
        <span>HOSTS_ISOLATED: 0</span>
        <span>TARPITS: 2 ACTIVE</span>
        <span>INTELLIGENCE: LOGGED</span>
      </div>

      {/* Center Interactive Barrier */}
      <div className="relative w-64 h-44 flex items-center justify-center mx-auto flex-shrink-0">
        {/* Left internal grid node group */}
        <div className="absolute left-6 flex flex-col gap-6">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse" />
        </div>

        {/* Active Defense Shield Wall */}
        <div className="absolute left-24 w-1.5 h-36 bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden shadow-[0_0_15px_rgba(244,63,94,0.2)]">
          <motion.div
            animate={{ y: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-full h-1/2 bg-gradient-to-b from-transparent via-rose-500 to-transparent"
          />
        </div>

        {/* Dynamic connection lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Safe connections */}
          <path d="M 32 44 L 92 44" stroke="rgba(16, 185, 129, 0.25)" strokeWidth="1.5" />
          <path d="M 32 88 L 92 88" stroke="rgba(16, 185, 129, 0.25)" strokeWidth="1.5" />
          <path d="M 32 132 L 92 132" stroke="rgba(16, 185, 129, 0.25)" strokeWidth="1.5" />

          {/* Attacking blocked paths */}
          <path d="M 104 44 L 210 44" stroke="rgba(244, 63, 94, 0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M 104 88 L 210 88" stroke="rgba(244, 63, 94, 0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M 104 132 L 210 132" stroke="rgba(244, 63, 94, 0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
        </svg>

        {/* Right external node group (Threat Zone) */}
        <div className="absolute right-12 flex flex-col gap-6">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/20 animate-pulse" />
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/20" />
        </div>

        {/* Signals getting blocked/deflected at the barrier */}
        <motion.div
          animate={{
            x: [190, 102, 190],
            opacity: [0.1, 1, 0.1],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut" }}
          className="absolute left-0 top-[38px] w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]"
        />
        <motion.div
          animate={{
            x: [190, 102, 190],
            opacity: [0.1, 1, 0.1],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut", delay: 0.6 }}
          className="absolute left-0 top-[128px] w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]"
        />
      </div>

      {/* Right Isolated Threat Info */}
      <div className="hidden lg:flex flex-col gap-2 font-mono text-[9px] text-rose-400/40 w-1/4 text-right">
        <div className="border-b border-rose-500/10 pb-1 font-bold text-rose-400/60">// DECEPTION LOG</div>
        <span className="text-rose-500/70">TRAPPED_IP: 192.168.1.104</span>
        <span>TARPIT_PORT: 445 (SMB)</span>
        <span>LATENCY_ADD: +15,000ms</span>
        <span className="text-rose-500/70">THREAT: CONTAINED</span>
      </div>
    </div>
  );
}

function SovereignBoundary() {
  return (
    <div className="w-full h-full flex items-center justify-between px-6 md:px-12 pointer-events-none select-none">
      {/* Left Certificates list */}
      <div className="hidden lg:flex flex-col gap-2 font-mono text-[9px] text-purple-400/40 w-1/4">
        <div className="border-b border-purple-500/10 pb-1 font-bold text-purple-400/60">// IDENTITY VERIFICATION</div>
        <span className="text-emerald-400/70">[ CERT_01 ] dev-endpoint-01</span>
        <span className="text-emerald-400/70">[ CERT_02 ] k8s-node-03</span>
        <span className="text-emerald-400/70">[ CERT_03 ] db-primary</span>
        <span className="text-emerald-400/70">[ CERT_04 ] backup-service</span>
      </div>

      {/* Center Shield Vault */}
      <div className="relative w-56 h-56 flex items-center justify-center flex-shrink-0 mx-auto">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
          className="absolute w-52 h-52 rounded-full border border-dashed border-purple-500/10"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
          className="absolute w-40 h-40 rounded-full border border-dashed border-purple-500/15"
        />

        {/* Shield and Lock */}
        <motion.div
          animate={{ scale: [0.96, 1.04, 0.96], boxShadow: ["0 0 20px rgba(168,85,247,0.1)", "0 0 40px rgba(168,85,247,0.25)", "0 0 20px rgba(168,85,247,0.1)"] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute w-28 h-28 rounded-full bg-purple-950/20 border border-purple-500/30 flex items-center justify-center backdrop-blur-sm"
        >
          <div className="relative flex items-center justify-center">
            <Shield className="w-12 h-12 text-purple-400/20" />
            <Lock className="w-5 h-5 text-purple-400 absolute" />
          </div>
        </motion.div>

        {/* Orbiting key nodes */}
        {[0, 120, 240].map((angle, i) => (
          <motion.div
            key={i}
            animate={{
              rotate: [angle, angle + 360]
            }}
            transition={{
              repeat: Infinity,
              duration: 12,
              ease: "linear"
            }}
            className="absolute w-36 h-36 origin-center flex items-start justify-center"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_10px_#c084fc] border border-white/20" />
          </motion.div>
        ))}
      </div>

      {/* Right Handshake metrics */}
      <div className="hidden lg:flex flex-col gap-2 font-mono text-[9px] text-purple-400/40 w-1/4 text-right">
        <div className="border-b border-purple-500/10 pb-1 font-bold text-purple-400/60">// CIPHER SUITE</div>
        <span>PROTO: mTLS v1.3</span>
        <span>CIPHER: AES_256_GCM</span>
        <span>KEX: ECDHE-X25519</span>
        <span>AUTH: ECDSA-SHA384</span>
        <span>TRUST_LEVEL: 100%</span>
      </div>
    </div>
  );
}

function AppleCardGallery() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const cards = [
    {
      category: "SENSOR FABRIC",
      headline: "AUTONOMOUS EDGE SENSORS",
      desc: "Submarinx continuously monitors endpoint activity through lightweight, memory-safe sensors engineered for performance, resilience, and deep operational visibility. Behavioral indicators, system activity, and security-relevant events are transformed into actionable telemetry, enabling rapid threat detection and continuous visibility across the environment.",
      illustration: <SonarRadar />,
      accent: "cyan",
      badgeIcon: <Radio className="w-5 h-5 text-cyan-400" />,
      topRightTelemetry: (
        <>
          <span className="text-cyan-500/80 font-bold">// SYSTEM MONITOR</span>
          <span>SENSORS: 1,482 ONLINE</span>
          <span>RATE: 2.4K EVENTS/S</span>
          <span>THREAT_LEVEL: NOMINAL</span>
        </>
      )
    },
    {
      category: "COGNITIVE ANALYTICS",
      headline: "AUTONOMOUS AI SOC ANALYST",
      desc: "At the center of the platform is an AI-powered security analyst operating directly within the detection pipeline. Every heuristic alert, behavioral anomaly, and system metric is continuously evaluated, correlated, and prioritized to produce actionable security decisions in real time. Instead of overwhelming analysts with alerts, Submarinx delivers clear outcomes: Monitor. Quarantine. Tarpit. From signal to decision without analyst bottlenecks.",
      illustration: <FintechChips />,
      accent: "emerald",
      badgeIcon: <Cpu className="w-5 h-5 text-emerald-400" />,
      topRightTelemetry: (
        <>
          <span className="text-emerald-500/80 font-bold">// AI_ANALYST_STATUS</span>
          <span>MODEL: COGNITIVE_v2</span>
          <span>LATENCY: 0.12s</span>
          <span>CONFIDENCE: 99.8%</span>
        </>
      )
    },
    {
      category: "CRYPTOGRAPHIC IDENTITY",
      headline: "ZERO-TRUST mTLS VAULT",
      desc: "Every endpoint is assigned a unique cryptographic identity. Telemetry, response actions, and operational communications are secured through mutual authentication and encrypted channels, ensuring that trust is continuously verified and never assumed. Protecting both visibility and control.",
      illustration: <SovereignBoundary />,
      accent: "purple",
      badgeIcon: <Lock className="w-5 h-5 text-purple-400" />,
      topRightTelemetry: (
        <>
          <span className="text-purple-500/80 font-bold">// CRYPTO_VAULT_TUNNEL</span>
          <span>SHIELD: 100% OPERATIONAL</span>
          <span>IDENTITY: MUTUAL_TLS</span>
          <span>KEY_ROTATION: 12m REMAINING</span>
        </>
      )
    },
    {
      category: "ACTIVE CONTAINMENT",
      headline: "ACTIVE DEFENSE ENGINE",
      desc: "Detection alone is no longer enough. Submarinx extends beyond passive monitoring by enabling automated containment, endpoint isolation, and deception-driven response mechanisms designed to disrupt attacker activity before it escalates. Rather than simply observing intrusions, the platform actively slows, contains, and neutralizes threats while preserving valuable intelligence for investigation.",
      illustration: <AirGapBarrier />,
      accent: "rose",
      badgeIcon: <Shield className="w-5 h-5 text-rose-400" />,
      topRightTelemetry: (
        <>
          <span className="text-rose-500/80 font-bold">// ACTIVE_DEFENSE_MODE</span>
          <span>CONTAINMENT: READY</span>
          <span>TARPIT_QUEUE: 0 INTRUSIONS</span>
          <span>STATE: FULLY_ARMED</span>
        </>
      )
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % cards.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying, cards.length]);

  // Translate calculation to center the active card in the viewport using CSS min() bounds
  const getTranslateX = () => {
    if (isMobile) {
      return `calc(-${activeIdx} * (min(88vw, 1194px) + 16px))`;
    } else {
      return `calc(-${activeIdx} * (min(90vw, 1194px) + 24px))`;
    }
  };

  return (
    <div className="w-full">
      {/* Cards Track Container - Bleed to full screen width by canceling section padding */}
      <div className="w-screen -ml-6 md:-ml-12 overflow-hidden select-none pb-3">
        <motion.div
          className="flex gap-4 md:gap-6 py-2"
          animate={{ x: getTranslateX() }}
          transition={{ type: "spring", stiffness: 150, damping: 22 }}
          style={{ width: "max-content" }}
        >
          {cards.map((card, idx) => {
            const isActive = activeIdx === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveIdx(idx)}
                style={{
                  width: isMobile ? "min(88vw, 1194px)" : "min(90vw, 1194px)",
                  ...(idx === 0 ? {
                    marginLeft: isMobile
                      ? "calc(50vw - 0.5 * min(88vw, 1194px))"
                      : "calc(50vw - 0.5 * min(90vw, 1194px))"
                  } : {})
                }}
                className={`h-[340px] md:h-[540px] flex-shrink-0 rounded-[2rem] bg-[#000000] border transition-all duration-700 relative overflow-hidden flex flex-col justify-between pt-8 px-8 pb-4 md:pt-10 md:px-12 md:pb-5 cursor-pointer group
                  ${isActive
                    ? card.accent === 'cyan' ? 'border-cyan-500/30'
                      : card.accent === 'emerald' ? 'border-emerald-500/30'
                        : card.accent === 'purple' ? 'border-purple-500/30'
                          : 'border-rose-500/30'
                    : 'border-zinc-950/40 opacity-30 hover:opacity-55 scale-[0.97]'
                  }
                  ${card.accent === 'cyan' ? 'hover:border-cyan-500/20' : card.accent === 'emerald' ? 'hover:border-emerald-500/20' : card.accent === 'purple' ? 'hover:border-purple-500/20' : 'hover:border-rose-500/20'}
                `}
              >
                {/* Accent Background Glow */}
                <div className={`absolute -top-10 -right-10 w-[300px] h-[300px] rounded-full filter blur-[100px] opacity-10 pointer-events-none transition-opacity duration-700
                  ${card.accent === 'cyan' ? 'bg-cyan-500' : card.accent === 'emerald' ? 'bg-emerald-500' : card.accent === 'purple' ? 'bg-purple-500' : 'bg-rose-500'}
                  ${isActive ? 'opacity-15' : 'opacity-0'}
                `} />

                {/* Header Content */}
                <div className="z-10 flex flex-col md:flex-row md:items-start md:justify-between w-full gap-4 mb-4">
                  {/* Left Column (Text Content) */}
                  <div className="max-w-3xl">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center border
                        ${card.accent === 'cyan' ? 'bg-cyan-950/20 border-cyan-500/20' : card.accent === 'emerald' ? 'bg-emerald-950/20 border-emerald-500/20' : card.accent === 'purple' ? 'bg-purple-950/20 border-purple-500/20' : 'bg-rose-950/20 border-rose-500/20'}
                      `}>
                        {card.badgeIcon}
                      </span>
                      <span className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">{card.category}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-white tracking-tight leading-tight mb-2">
                      {card.headline}
                    </h3>
                    <p className="text-zinc-400 text-[11px] md:text-xs font-sans leading-relaxed max-w-2xl">
                      {card.desc}
                    </p>
                  </div>

                  {/* Right Column (Top Right Telemetry info) */}
                  <div className="hidden md:flex flex-col gap-1 font-mono text-[9px] text-right text-zinc-500 uppercase flex-shrink-0 pt-1">
                    {card.topRightTelemetry}
                  </div>
                </div>

                {/* Visual Illustration Panel */}
                <div className="w-full flex-grow flex items-center justify-center relative min-h-[160px] md:min-h-[250px] z-10 overflow-hidden">
                  {card.illustration}
                </div>

                {/* Bottom status bar indicator */}
                <div className={`flex items-center justify-between border-t pt-3 mt-3 font-mono text-[8px] md:text-[9px] text-zinc-600 transition-colors duration-700
                  ${isActive
                    ? card.accent === 'cyan' ? 'border-cyan-500/15'
                      : card.accent === 'emerald' ? 'border-emerald-500/15'
                        : card.accent === 'purple' ? 'border-purple-500/15'
                          : 'border-rose-500/15'
                    : 'border-zinc-900/80'
                  }
                `}>
                  <span>SECURE CHANNEL STATUS</span>
                  <span className={`${card.accent === 'cyan' ? 'text-cyan-500/80' : card.accent === 'emerald' ? 'text-emerald-500/80' : card.accent === 'purple' ? 'text-purple-500/80' : 'text-rose-500/80'}`}>[ ONLINE ]</span>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Pagination & Controls */}
      <div className="flex justify-center mt-3">
        <div className="w-[177px] h-[49px] bg-zinc-950/90 border border-zinc-900 backdrop-blur-md rounded-full pl-4 pr-3.5 flex items-center justify-between shadow-2xl">
          {/* Navigation Dots */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            {cards.map((_, idx) => {
              const isActive = activeIdx === idx;
              return (
                <motion.button
                  layout
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  animate={{
                    width: isActive ? 36 : 8,
                    backgroundColor: "#3f3f46"
                  }}
                  whileHover={{
                    backgroundColor: isActive ? "#3f3f46" : "#71717a"
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="h-2 rounded-full focus:outline-none cursor-pointer flex-shrink-0 relative overflow-hidden"
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  {/* Progress filler inside the active indicator */}
                  {isActive && (
                    <motion.div
                      key={activeIdx + "_" + isPlaying}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: isPlaying ? 6 : 0.2,
                        ease: "linear"
                      }}
                      className="absolute top-0 left-0 bottom-0 bg-white rounded-full"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Separator Line */}
          <div className="w-px h-4 bg-zinc-800 flex-shrink-0 mx-1.5" />

          {/* Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-zinc-400 hover:text-white transition-colors cursor-pointer flex-shrink-0 p-1"
            aria-label={isPlaying ? "Pause auto-rotation" : "Start auto-rotation"}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 text-zinc-400" />
            ) : (
              <Play className="w-3.5 h-3.5 text-zinc-400 fill-zinc-400" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}





export function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="architecture"
      ref={containerRef}
      className="pt-16 pb-8 px-6 md:px-12 relative bg-black"
    >
      <div className="max-w-[1536px] mx-auto px-4 md:px-12">
        {/* Intro */}
        <ScrollTypewriter />

        {/* Core Architecture Header */}
        <div className="mb-6">
          <div className="border-b border-white/10 pb-4">
            <h2 className="font-mono text-cyan-400 uppercase tracking-widest text-sm mb-4">
              CORE ARCHITECTURE
            </h2>
            <p className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              HOW SUBMARINX WORKS
            </p>
            <p className="text-lg md:text-xl font-mono mt-4">
              <span className="text-cyan-400">Designed to Detect.</span>{" "}
              <span className="text-emerald-400 font-semibold">Built to Respond.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Full-width Carousel outside the max-w-7xl container to allow screen-edge bleed */}
      <div className="mb-4">
        <AppleCardGallery />
      </div>
    </section>
  );
}
