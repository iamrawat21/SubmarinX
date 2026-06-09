import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useRef, useEffect } from 'react';
import { WorldMapPaths } from './WorldMapPaths';
import { 
  Shield, 
  Cpu, 
  Server, 
  Activity, 
  Database, 
  Network, 
  ChevronRight, 
  ChevronLeft, 
  Lock, 
  Radio, 
  Globe, 
  Heart, 
  Cloud,
  CheckCircle2,
  Terminal,
  Zap,
  AlertTriangle
} from 'lucide-react';

interface Industry {
  id: string;
  tabTitle: string;
  heading: string;
  description: string;
  accent: string;
  subText: string;
  icon: React.ReactNode;
}

export function CommandCenter() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const tabContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);

  // Defense Map Tracking Coordinate Rotation State
  const [activeCoordIndex, setActiveCoordIndex] = useState(0);
  const coordsList = [
    { name: "NORAD_GRID_WEST", lat: "34.0522° N", lon: "118.2437° W", x: 140, y: 370 },
    { name: "NATO_CYBER_HQ", lat: "59.4370° N", lon: "24.7536° E", x: 455, y: 345 },
    { name: "INDOPAC_COM_NODE", lat: "35.6762° N", lon: "139.6503° E", x: 720, y: 395 }
  ];

  const industries: Industry[] = [
    {
      id: "defense",
      tabTitle: "Defense & Aerospace",
      heading: "Protect sovereign infrastructure and national security assets.",
      description: "Secure defense networks, tactical systems, and sensitive research programs from advanced persistent threats.",
      accent: "cyan",
      subText: "Tactical data links • Satellite telemetry • Autonomous avionics • Classified storage • Mission control systems",
      icon: <Globe className="w-4 h-4 text-cyan-400" />
    },
    {
      id: "finance",
      tabTitle: "Financial Services",
      heading: "Reduce exposure to transaction fraud and account compromise.",
      description: "Protect high-frequency trading platforms, customer data, API gateways, and payment processing pipelines.",
      accent: "emerald",
      subText: "Payment processors • Swift network interfaces • Core banking APIs • Customer portals • High-value vaults",
      icon: <Lock className="w-4 h-4 text-emerald-400" />
    },
    {
      id: "infrastructure",
      tabTitle: "Critical Infrastructure",
      heading: "Defend operational technology and industrial control systems.",
      description: "Ensure uptime, resilience, and safety of power grids, water treatment systems, and logistics centers.",
      accent: "rose",
      subText: "SCADA systems • PLC controller networks • Smart grids • Distributive power nodes • Logistics hubs",
      icon: <Zap className="w-4 h-4 text-rose-400" />
    },
    {
      id: "government",
      tabTitle: "Government & Public",
      heading: "Secure citizen databases and critical agency operations.",
      description: "Ensure high-integrity data handling, prevent leakages, and protect civilian infrastructure.",
      accent: "purple",
      subText: "Public registries • Emergency systems • Municipal grids • State databases • Inter-agency links",
      icon: <Shield className="w-4 h-4 text-purple-400" />
    },
    {
      id: "healthcare",
      tabTitle: "Healthcare & Medtech",
      heading: "Shield patient records and life-critical hospital equipment.",
      description: "Protect surgical robots, diagnostic telemetry systems, and electronic health databases from ransomware.",
      accent: "teal",
      subText: "PACS image databases • Patient telemetry hubs • Surgical control desks • EHR systems • Clinical lab servers",
      icon: <Heart className="w-4 h-4 text-teal-400" />
    },
    {
      id: "saas",
      tabTitle: "Enterprise SaaS",
      heading: "Protect source code repositories and proprietary cloud services.",
      description: "Prevent credential stuffing, supply chain poisoning, and malicious prompt injections on AI pipelines.",
      accent: "amber",
      subText: "CI/CD code builders • API registries • KMS vaults • LLM inference endpoints • Customer databases",
      icon: <Cloud className="w-4 h-4 text-amber-400" />
    }
  ];

  const handleScroll = () => {
    if (tabContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabContainerRef.current;
      setHasOverflow(scrollWidth > clientWidth);
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabContainerRef.current) {
      const scrollAmount = 200;
      tabContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const el = tabContainerRef.current;
    if (el) {
      const resizeObserver = new ResizeObserver(() => {
        handleScroll();
      });
      resizeObserver.observe(el);
      
      el.addEventListener('scroll', handleScroll);
      handleScroll();
      
      return () => {
        resizeObserver.disconnect();
        el.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  // Set interval to rotate coordinates for the defense tracking map simulation
  useEffect(() => {
    if (activeTab === 0) {
      const timer = setInterval(() => {
        setActiveCoordIndex((prev) => (prev + 1) % coordsList.length);
      }, 2500);
      return () => clearInterval(timer);
    }
  }, [activeTab]);

  // SCADA Telemetry State for Critical Infrastructure Simulation
  const [telemetry, setTelemetry] = useState({
    plcVoltage: 24.1,
    plcCpu: 12,
    valveFlow: 45.2,
    valvePos: 82.5,
    feederLoad: 64.2,
    feederFreq: 50.0,
    flowPressure: 98.4
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        plcVoltage: parseFloat((24.0 + Math.random() * 0.4 - 0.2).toFixed(2)),
        plcCpu: Math.floor(8 + Math.random() * 10),
        valveFlow: parseFloat((44.5 + Math.random() * 1.5).toFixed(1)),
        valvePos: parseFloat((82.0 + Math.random() * 1.0).toFixed(1)),
        feederLoad: parseFloat((63.0 + Math.random() * 3.0).toFixed(1)),
        feederFreq: parseFloat((49.9 + Math.random() * 0.2).toFixed(2)),
        flowPressure: parseFloat((97.5 + Math.random() * 1.5).toFixed(1))
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="who-we-help" className="py-20 px-6 md:px-12 relative bg-black select-none overflow-hidden">
      {/* Background Grids */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.02),transparent_75%)] pointer-events-none" />
      
      <div className="max-w-[1536px] mx-auto relative z-10 px-4 md:px-12">
        
        {/* Intro */}
        <div className="text-center mb-10">
          <span className="font-mono text-cyan-400 uppercase tracking-widest text-xs mb-3 block">// WHO WE HELP</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight leading-none mb-4">
            Built for High-Consequence Environments
          </h2>
          <p className="text-base text-zinc-500 max-w-2xl mx-auto font-mono">
            Submarinx protects high-stakes environments where outages or data compromise are unacceptable.
          </p>
        </div>

        {/* Tab Selection Bar (mimics Apple's visual selection slider) */}
        <div className="w-full max-w-5xl mx-auto relative mb-10">
          {hasOverflow && (
            <>
              <button 
                onClick={() => scrollTabs('left')}
                disabled={!canScrollLeft}
                className={`hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 items-center justify-center cursor-pointer z-20 shadow-lg transition-all duration-300
                  ${canScrollLeft 
                    ? 'hover:text-white hover:border-zinc-700 opacity-100' 
                    : 'opacity-20 cursor-not-allowed pointer-events-none'
                  }
                `}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button 
                onClick={() => scrollTabs('right')}
                disabled={!canScrollRight}
                className={`hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 items-center justify-center cursor-pointer z-20 shadow-lg transition-all duration-300
                  ${canScrollRight 
                    ? 'hover:text-white hover:border-zinc-700 opacity-100' 
                    : 'opacity-20 cursor-not-allowed pointer-events-none'
                  }
                `}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <div 
            ref={tabContainerRef}
            className="flex items-center gap-6 md:gap-8 border-b border-zinc-900 overflow-x-auto scrollbar-none pb-0.5 justify-start px-8"
          >
            {industries.map((ind, index) => {
              const isActive = activeTab === index;
              return (
                <button
                  key={ind.id}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-5 py-3 text-xs md:text-sm font-medium border-b-2 transition-all duration-300 whitespace-nowrap cursor-pointer shrink-0
                    ${isActive 
                      ? 'border-white text-white font-bold' 
                      : 'border-transparent text-zinc-500 hover:text-zinc-300'
                    }
                  `}
                >
                  {ind.icon}
                  {ind.tabTitle}
                </button>
              );
            })}
          </div>
        </div>

        {/* Two-Column Layout (Fits preview screen on a single viewport height) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center max-w-6xl mx-auto">
          
          {/* Left Column: Descriptive Information */}
          <div className="col-span-1 lg:col-span-5 space-y-6 text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded font-mono text-[9px] uppercase tracking-wider
                  ${activeTab === 0 ? 'bg-cyan-950/40 text-cyan-400 border border-cyan-800/30' :
                    activeTab === 1 ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/30' :
                    activeTab === 2 ? 'bg-rose-950/40 text-rose-400 border border-rose-800/30' :
                    activeTab === 3 ? 'bg-purple-950/40 text-purple-400 border border-purple-800/30' :
                    activeTab === 4 ? 'bg-teal-950/40 text-teal-400 border border-teal-800/30' :
                    'bg-amber-950/40 text-amber-400 border border-amber-800/30'
                  }
                `}>
                  Active Segment
                </div>
                <h3 className="text-xl md:text-3xl font-display text-white font-semibold leading-tight">
                  {industries[activeTab].heading}
                </h3>
                <p className="text-xs md:text-sm text-zinc-400 font-mono leading-relaxed">
                  {industries[activeTab].description}
                </p>
                
                <div className="pt-4 border-t border-zinc-900">
                  <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest block mb-2">// MONITORED SYSTEMS</span>
                  <p className="text-[10px] text-zinc-500 font-mono leading-relaxed">
                    {industries[activeTab].subText}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Console Simulator Display */}
          <div className="col-span-1 lg:col-span-7">
            <div className="w-full aspect-[16/10] rounded-2xl bg-zinc-950/50 border border-zinc-900 shadow-[0_0_40px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col relative">
              {/* Console Topbar */}
              <div className="h-10 border-b border-zinc-900 flex items-center px-4 gap-2 bg-zinc-950/90 justify-between shrink-0">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-zinc-800" />
                  <div className="w-2 h-2 rounded-full bg-zinc-800" />
                  <div className="w-2 h-2 rounded-full bg-zinc-800" />
                </div>
                <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest">// SUBMARINX_SIMULATOR_V1.4.2</span>
                <div className="w-8 h-1" />
              </div>

              {/* Simulation Display Frame */}
              <div className="flex-1 bg-black/60 relative flex items-center justify-center p-6 overflow-hidden">
                <AnimatePresence mode="wait">
                  {activeTab === 0 && (
                    <motion.div
                      key="defense-sim"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full flex items-center justify-center relative"
                    >
                      {/* Tactical World Map SVG */}
                      <svg viewBox="30.767 241.591 784.077 458.627" className="w-full h-full text-cyan-500/10">
                        {/* Map Grid Lines */}
                        <g stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.3">
                          <line x1="30" y1="300" x2="815" y2="300" />
                          <line x1="30" y1="400" x2="815" y2="400" />
                          <line x1="30" y1="500" x2="815" y2="500" />
                          <line x1="30" y1="600" x2="815" y2="600" />
                          
                          <line x1="130" y1="240" x2="130" y2="700" />
                          <line x1="260" y1="240" x2="260" y2="700" />
                          <line x1="390" y1="240" x2="390" y2="700" />
                          <line x1="520" y1="240" x2="520" y2="700" />
                          <line x1="650" y1="240" x2="650" y2="700" />
                          <line x1="780" y1="240" x2="780" y2="700" />
                        </g>

                        {/* High-Fidelity World Map Country Outline Paths */}
                        <g fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeWidth="0.6" className="text-cyan-600/30">
                          <WorldMapPaths />
                        </g>

                        {/* Scanning Line overlay */}
                        <motion.line
                          x1="30.767"
                          y1="241.591"
                          x2="814.844"
                          y2="241.591"
                          stroke="rgba(6,182,212,0.25)"
                          strokeWidth="2"
                          animate={{ y: [250, 690, 250] }}
                          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                        />

                        {/* Connection Arcs (Tactical Intercept Lines) */}
                        <motion.path
                          d="M 140 370 Q 297 300 455 345 Q 587 310 720 395"
                          fill="none"
                          stroke="#22d3ee"
                          strokeWidth="1.2"
                          strokeDasharray="6 6"
                          animate={{ strokeDashoffset: [0, -30] }}
                          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                          opacity="0.5"
                        />

                        {/* Coordinate points */}
                        {coordsList.map((c, idx) => {
                          const isActive = idx === activeCoordIndex;
                          return (
                            <g key={c.name}>
                              {/* Node Circle */}
                              <circle 
                                cx={c.x} 
                                cy={c.y} 
                                r={isActive ? "5" : "3.5"} 
                                fill={isActive ? "#22d3ee" : "#0891b2"} 
                                className="transition-all duration-300" 
                              />
                              {/* Pulsing ring around active node */}
                              {isActive && (
                                <motion.circle
                                  cx={c.x}
                                  cy={c.y}
                                  r="13"
                                  stroke="#22d3ee"
                                  strokeWidth="1.2"
                                  fill="none"
                                  animate={{ scale: [1, 2.5], opacity: [1, 0] }}
                                  transition={{ repeat: Infinity, duration: 1.5 }}
                                />
                              )}
                            </g>
                          );
                        })}
                      </svg>

                      {/* Coordinates HUD Readout Overlay */}
                      <div className="absolute top-3 left-3 font-mono text-[9px] text-cyan-400 bg-zinc-950/80 border border-zinc-900/60 p-2.5 rounded backdrop-blur space-y-1 z-10 shadow-lg">
                        <div className="flex items-center gap-1.5 border-b border-cyan-950 pb-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                          <span className="font-bold tracking-wider">TRACKING: {coordsList[activeCoordIndex].name}</span>
                        </div>
                        <div className="flex justify-between gap-4 pt-0.5">
                          <span className="text-zinc-500">LATITUDE:</span>
                          <span className="text-cyan-400 font-bold">{coordsList[activeCoordIndex].lat}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-zinc-500">LONGITUDE:</span>
                          <span className="text-cyan-400 font-bold">{coordsList[activeCoordIndex].lon}</span>
                        </div>
                      </div>

                      {/* Status HUD in corner */}
                      <div className="absolute right-3 bottom-3 font-mono text-[8px] text-zinc-500 bg-black/60 px-2 py-1 rounded border border-zinc-900/40">
                        ANTENNA: <span className="text-cyan-400">SAT_LINK_07 [NOMINAL]</span>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 1 && (
                    <motion.div
                      key="finance-sim"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full flex flex-col justify-between font-mono"
                    >
                      <div className="flex justify-between items-center text-[9px] text-emerald-500/70 border-b border-emerald-950 pb-2">
                        <span>TRANSACTIONS_LEDGER_SSE</span>
                        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> STREAMING</span>
                      </div>
                      
                      <div className="flex-1 py-4 text-[10px] text-zinc-500 space-y-2 overflow-hidden">
                        <motion.div
                          animate={{ y: [0, -32] }}
                          transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                          className="space-y-2.5"
                        >
                          <p><span className="text-emerald-500">[0.00s]</span> API_RECV: POST /v1/transfers</p>
                          <p><span className="text-cyan-400">[0.02s]</span> AUTH_VAL: Token cryptographic check</p>
                          <p><span className="text-emerald-500">[0.03s]</span> TX_LOCK: Encrypting payload blocks</p>
                          <p><span className="text-zinc-600">[0.05s]</span> LEDGER: Appended hash _88eB91</p>
                          <p><span className="text-emerald-500">[0.00s]</span> API_RECV: POST /v1/transfers</p>
                          <p><span className="text-cyan-400">[0.02s]</span> AUTH_VAL: Validation token verified</p>
                        </motion.div>
                      </div>

                      <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded text-center text-[9px] font-bold">
                        100% CRYPTOGRAPHIC ISOLATION ENFORCED
                      </div>
                    </motion.div>
                  )}

                   {activeTab === 2 && (
                    <motion.div
                      key="infra-sim"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full flex flex-col justify-between"
                    >
                      <div className="flex justify-between items-center font-mono text-[9px] text-rose-500/70 border-b border-rose-950 pb-2">
                        <span>OT_SCADA_DIAGNOSTICS</span>
                        <span>NODE_SHIELD: ON</span>
                      </div>

                      <div className="flex-1 flex items-center justify-center relative py-1">
                        <svg viewBox="0 0 320 150" className="w-full h-full overflow-visible text-rose-500/25">
                          {/* Pipe Background */}
                          <line x1="30" y1="85" x2="290" y2="85" stroke="currentColor" strokeWidth="4" opacity="0.15" />
                          
                          {/* Flowing animated dash inside pipe */}
                          <motion.line
                            x1="30"
                            y1="85"
                            x2="290"
                            y2="85"
                            stroke="#f43f5e"
                            strokeWidth="2"
                            strokeDasharray="6 12"
                            animate={{ strokeDashoffset: [0, -36] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                          />

                          {/* Dynamic flow pulses */}
                          <motion.circle
                            cx="30"
                            cy="85"
                            r="3"
                            fill="#f43f5e"
                            animate={{ cx: [30, 290] }}
                            transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
                          />
                          <motion.circle
                            cx="30"
                            cy="85"
                            r="3"
                            fill="#f43f5e"
                            animate={{ cx: [30, 290] }}
                            transition={{ repeat: Infinity, duration: 3.5, ease: "linear", delay: 1.75 }}
                          />

                          {/* Diagnostic connection lines for labels */}
                          <line x1="70" y1="85" x2="70" y2="52" stroke="#f43f5e" strokeWidth="0.5" strokeDasharray="1 2" opacity="0.5" />
                          <line x1="160" y1="85" x2="160" y2="52" stroke="#f43f5e" strokeWidth="0.5" strokeDasharray="1 2" opacity="0.5" />
                          <line x1="250" y1="85" x2="250" y2="52" stroke="#f43f5e" strokeWidth="0.5" strokeDasharray="1 2" opacity="0.5" />

                          {/* Outer decorative pulsing circles */}
                          <circle cx="70" cy="85" r="14" fill="none" stroke="#f43f5e" strokeWidth="0.5" opacity="0.3" />
                          <circle cx="160" cy="85" r="14" fill="none" stroke="#f43f5e" strokeWidth="0.5" opacity="0.3" />
                          <circle cx="250" cy="85" r="14" fill="none" stroke="#f43f5e" strokeWidth="0.5" opacity="0.3" />

                          {/* Active protective shield ring on PLC Node (Submarinx Guard) */}
                          <motion.circle
                            cx="70"
                            cy="85"
                            r="18"
                            stroke="#10b981"
                            strokeWidth="1"
                            fill="none"
                            strokeDasharray="4 3"
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                          />

                          {/* Central node circles */}
                          <circle cx="70" cy="85" r="7" fill="#09090b" stroke="#f43f5e" strokeWidth="1.5" />
                          <circle cx="160" cy="85" r="7" fill="#09090b" stroke="#f43f5e" strokeWidth="1.5" />
                          <circle cx="250" cy="85" r="7" fill="#09090b" stroke="#f43f5e" strokeWidth="1.5" />

                          {/* Interactive status indicators */}
                          <circle cx="70" cy="85" r="2" fill="#10b981" />
                          <circle cx="160" cy="85" r="2" fill="#f43f5e" />
                          <circle cx="250" cy="85" r="2" fill="#f43f5e" />

                          {/* HUD Readout Texts (Symmetric coordinates) */}
                          {/* PLC Node */}
                          <text x="70" y="24" fill="#f43f5e" fontSize="7.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">PLC_01</text>
                          <text x="70" y="34" fill="#a1a1aa" fontSize="6.5" fontFamily="monospace" textAnchor="middle">VOLT: {telemetry.plcVoltage}V</text>
                          <text x="70" y="44" fill="#a1a1aa" fontSize="6.5" fontFamily="monospace" textAnchor="middle">CPU: {telemetry.plcCpu}%</text>

                          {/* Valve Node */}
                          <text x="160" y="24" fill="#f43f5e" fontSize="7.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">VALVE_04</text>
                          <text x="160" y="34" fill="#a1a1aa" fontSize="6.5" fontFamily="monospace" textAnchor="middle">FLOW: {telemetry.valveFlow}L/s</text>
                          <text x="160" y="44" fill="#a1a1aa" fontSize="6.5" fontFamily="monospace" textAnchor="middle">POS: {telemetry.valvePos}%</text>

                          {/* Feeder Node */}
                          <text x="250" y="24" fill="#f43f5e" fontSize="7.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">FEEDER_02</text>
                          <text x="250" y="34" fill="#a1a1aa" fontSize="6.5" fontFamily="monospace" textAnchor="middle">LOAD: {telemetry.feederLoad}kW</text>
                          <text x="250" y="44" fill="#a1a1aa" fontSize="6.5" fontFamily="monospace" textAnchor="middle">FREQ: {telemetry.feederFreq}Hz</text>
                        </svg>
                      </div>

                      <div className="flex justify-between items-center font-mono text-[8px] text-zinc-500">
                        <span>FLOW_PRESSURE: {telemetry.flowPressure}%</span>
                        <span className="text-emerald-400">LATERAL_THREAT: DECOYED</span>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 3 && (
                    <motion.div
                      key="gov-sim"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full flex flex-col justify-between font-mono"
                    >
                      <div className="flex justify-between items-center text-[9px] text-purple-500/70 border-b border-purple-950 pb-2">
                        <span>MUTUAL_TLS_AUTH_VALIDATOR</span>
                        <span>CIPHER: TLS_AES_256_GCM</span>
                      </div>

                      <div className="flex-1 py-4 space-y-2 text-[10px] text-zinc-500">
                        <p>&gt; validating client certificate chain...</p>
                        <p>&gt; thumbprint signature: <span className="text-purple-400">SHA256_MATCH</span></p>
                        <p>&gt; identity authority: <span className="text-purple-400">GOV_CA_LEVEL_1</span></p>
                        <p className="text-purple-400 font-bold">&gt; zero-trust verification: TRUSTED</p>
                      </div>

                      <div className="p-2.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded text-center text-[9px] font-bold">
                        ACCESS GRANTED (MUTUAL HANDSHAKE OK)
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 4 && (
                    <motion.div
                      key="health-sim"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full flex flex-col justify-between font-mono"
                    >
                      <div className="flex justify-between items-center text-[9px] text-teal-500/70 border-b border-teal-950 pb-2">
                        <span>PATIENT_VITAL_MONITOR</span>
                        <span>SENSOR_PORT_04: OK</span>
                      </div>

                      <div className="flex-1 flex items-center justify-center py-2">
                        <svg viewBox="0 0 600 50" className="w-full h-16 bg-black rounded-lg border border-zinc-900/40 overflow-hidden relative">
                          <defs>
                            {/* Glow filter */}
                            <filter id="ecg-glow" x="-20%" y="-20%" width="140%" height="140%">
                              <feGaussianBlur stdDeviation="1.2" result="blur" />
                              <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                              </feMerge>
                            </filter>
                            {/* ECG grid pattern */}
                            <pattern id="ecg-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#14b8a6" strokeWidth="0.4" opacity="0.06" />
                            </pattern>
                            <pattern id="ecg-grid-major" width="50" height="50" patternUnits="userSpaceOnUse">
                              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#14b8a6" strokeWidth="0.8" opacity="0.12" />
                            </pattern>
                          </defs>

                          {/* Grid background */}
                          <rect width="100%" height="100%" fill="url(#ecg-grid)" />
                          <rect width="100%" height="100%" fill="url(#ecg-grid-major)" />

                          {/* Scrolling ECG Line */}
                          <motion.path
                            d="M 0 25 L 40 25 L 45 22 L 50 25 L 60 25 L 64 28 L 70 5 L 76 45 L 82 25 L 95 25 L 110 18 L 125 25 L 150 25 L 190 25 L 195 22 L 200 25 L 210 25 L 214 28 L 220 5 L 226 45 L 232 25 L 245 25 L 260 18 L 275 25 L 300 25 L 340 25 L 345 22 L 350 25 L 360 25 L 364 28 L 370 5 L 376 45 L 382 25 L 395 25 L 410 18 L 425 25 L 450 25 L 490 25 L 495 22 L 500 25 L 510 25 L 514 28 L 520 5 L 526 45 L 532 25 L 545 25 L 560 18 L 575 25 L 600 25 L 640 25 L 645 22 L 650 25 L 660 25 L 664 28 L 670 5 L 676 45 L 682 25 L 695 25 L 710 18 L 725 25 L 750 25"
                            stroke="#14b8a6"
                            strokeWidth="1.8"
                            fill="none"
                            filter="url(#ecg-glow)"
                            animate={{ x: [0, -150] }}
                            transition={{ repeat: Infinity, duration: 0.73, ease: "linear" }}
                          />
                        </svg>
                      </div>

                      <div className="flex justify-between text-[9px] text-zinc-500">
                        <span>ECG RATE: 82 BPM</span>
                        <span className="text-emerald-400">RANSOMWARE FILTER: ACTIVE</span>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 5 && (
                    <motion.div
                      key="saas-sim"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full flex flex-col justify-between font-mono text-zinc-400"
                    >
                      <div className="flex justify-between items-center text-[9px] text-amber-500/70 border-b border-amber-950 pb-2">
                        <span>CI_CD_BUILDER_VERIFY</span>
                        <span>STEP: COMPILING</span>
                      </div>

                      <div className="flex-1 py-4 text-[9px] space-y-1.5 text-zinc-500">
                        <p>&gt; parsing imported modules...</p>
                        <p>&gt; checking package signatures...</p>
                        <p className="text-emerald-400">&gt; check passed. No supply poison found.</p>
                      </div>

                      <div className="space-y-2">
                        <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
                          <motion.div
                            className="bg-amber-400 h-full"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                          />
                        </div>
                        <div className="flex justify-between text-[8px] text-zinc-600">
                          <span>PROGRESS: BUILD SUCCESSFUL</span>
                          <span>TIME: 2.1s</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
