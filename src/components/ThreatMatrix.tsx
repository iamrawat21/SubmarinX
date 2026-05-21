"use client";

import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Skull, Database, Users, ChevronRight, ShieldAlert, Key, Cpu, Terminal } from 'lucide-react';

const scenarios = [
  {
    title: "Scenario 1: Zero-Day Ransomware",
    subtitle: "(The Hash Breaker)",
    threat: "Polymorphic malware evades traditional signature scanners and begins encrypting an endpoint's local drives.",
    reaction: "The Rust sensor detects the sudden spike in file-system entropy. The instant the ransomware attempts to read the next document, the Shadow Mutator alters a single byte of the file in memory. The malware's internal hash validation corrupts, causing the entire malicious process to instantly crash.",
    icon: <Skull className="w-24 h-24" />,
    color: "from-red-500/20 to-red-900/5",
    borderColor: "border-red-500/30"
  },
  {
    title: "Scenario 2: SQL Injection & Exfiltration",
    subtitle: "(The Poison Pill)",
    threat: "A threat actor targets a web application, aiming to dump a critical database structure to an external command-and-control server.",
    reaction: "submarinx flags the outbound exfiltration. Instead of severing the connection and tipping off the hacker, the platform intercepts the read request and feeds them a dynamically generated database packed with thousands of fake, tracked AWS API keys. The hacker steals useless data while we map their infrastructure.",
    icon: <Database className="w-24 h-24" />,
    color: "from-amber-500/20 to-amber-900/5",
    borderColor: "border-amber-500/30"
  },
  {
    title: "Scenario 3: Insider Threats & Lateral Movement",
    subtitle: "(The Infinite Black Hole)",
    threat: "A compromised internal account or rogue employee performs malicious network scans to jump laterally onto executive servers.",
    reaction: "The AI Brain identifies the reconnaissance signatures and rewrites the machine’s routing tables. The attacker believes they have successfully SSH'd into the target server, but they are actually trapped inside a highly isolated, 'ghost-town' Docker container on their own machine, wasting days of operational time.",
    icon: <Users className="w-24 h-24" />,
    color: "from-indigo-500/20 to-indigo-900/5",
    borderColor: "border-indigo-500/30"
  },
  {
    title: "Scenario 4: Man-in-the-Middle & Sniffing",
    subtitle: "(The mTLS Vault)",
    threat: "A hacker compromises a local network router to sniff streaming telemetry data or inject spoofed commands into your endpoints.",
    reaction: "The attack fails at the threshold. Because every edge sensor routes data through a dynamically minted, 90-day cryptographically signed tunnel, the platform drops any unauthenticated request lacking the exact agent signature. The attacker intercepts nothing but unbreakable AES-256 static.",
    icon: <ShieldAlert className="w-24 h-24" />,
    color: "from-blue-500/20 to-blue-900/5",
    borderColor: "border-blue-500/30"
  },
  {
    title: "Scenario 5: API Credential Stuffing",
    subtitle: "(The Token Mirage)",
    threat: "An automated botnet launches a brute-force credential attack against your gateway APIs, attempting to hijack administrative keys.",
    reaction: "The Local AI Brain flags the geometric rate of requests as an active stuffing tactic. Instead of returning HTTP 401 errors, our reverse proxy switches to active deception—serving valid-looking, decoy authorization tokens that continuously shift configuration parameters, causing the botnet's scrapers to desynchronize and fail.",
    icon: <Key className="w-24 h-24" />,
    color: "from-emerald-500/20 to-emerald-900/5",
    borderColor: "border-emerald-500/30"
  },
  {
    title: "Scenario 6: Supply Chain & Malicious Dependency",
    subtitle: "(The Sandbox Quarantine)",
    threat: "A compromised open-source package or malicious build dependency bypasses standard source controls and attempts to execute unauthorized background tasks.",
    reaction: "The memory-safe Rust edge sensor immediately detects the unusual child-process spawning behavior. The AI Brain evaluates the baseline divergence and issues an unblockable local quarantine—instantly tearing down the process's runtime execution privileges before a single block of code can contact an external server.",
    icon: <Cpu className="w-24 h-24" />,
    color: "from-purple-500/20 to-purple-900/5",
    borderColor: "border-purple-500/30"
  },
  {
    title: "Scenario 7: Hostile AI Prompt Injection",
    subtitle: "(The Logic De-Fanger)",
    threat: "An adversary embeds adversarial payload strings directly into system system logs, hoping to exploit the LangChain orchestration layer and blind the AI brain.",
    reaction: "Before telemetry is fed to the centralized Llama 3.2 instance, a regex-based sanitization wrapper catches and de-fangs the adversarial payload strings. The platform automatically forces strict schema enforcement on the output, isolating the poisoned log event while generating an incident payload archive for deep-dive forensics.",
    icon: <Terminal className="w-24 h-24" />,
    color: "from-cyan-500/20 to-cyan-900/5",
    borderColor: "border-cyan-500/30"
  }
];

export function ThreatMatrix() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="threat-matrix" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-display font-bold text-white mb-6"
          >
            The Threat Matrix
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-400 font-light"
          >
            Real-world autonomous responses to critical attacks.
          </motion.p>
        </div>

        <div className="bg-black/80 border border-slate-800 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-xl overflow-hidden grid grid-cols-1 lg:grid-cols-5 h-[850px] lg:h-[750px]">
          
          {/* Left Sidebar (20%) */}
          <div className="col-span-1 lg:col-span-1 border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-900/30 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible z-20">
            {scenarios.map((scenario, i) => {
              const isActive = activeTab === i;
              return (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`flex items-center justify-between p-5 text-left transition-all duration-300 border-l-2 lg:border-l-4 whitespace-nowrap lg:whitespace-normal group ${
                    isActive 
                      ? 'border-cyan-500 bg-cyan-950/20 text-white' 
                      : 'border-transparent text-slate-500 hover:bg-slate-800/50 hover:text-slate-300'
                  }`}
                >
                  <div className="flex flex-col gap-1.5 pointer-events-none">
                    <span className="font-mono text-[10px] tracking-widest uppercase">
                      THREAT_LOG_0{i+1}.sys
                    </span>
                    <span className="font-medium text-sm lg:text-base group-hover:text-cyan-400 transition-colors">
                      {scenario.title.split(':')[0]}
                    </span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-cyan-500 hidden lg:block opacity-50" />}
                </button>
              );
            })}
          </div>

          {/* Right Content (80%) */}
          <div className="col-span-1 lg:col-span-4 relative bg-black/40 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 p-8 md:p-12 lg:p-16 flex flex-col justify-center overflow-y-auto overflow-x-hidden z-10"
              >
                <div className="absolute top-1/2 right-0 -translate-y-1/2 text-white/5 pointer-events-none blur-sm scale-150 -mr-10">
                  {scenarios[activeTab].icon}
                </div>
                
                <h3 className="text-3xl md:text-5xl font-display font-semibold text-white mb-2 relative z-10">
                  {scenarios[activeTab].title}
                </h3>
                <p className="font-mono text-cyan-400 text-sm md:text-lg uppercase tracking-wider mb-12 relative z-10">
                  {scenarios[activeTab].subtitle}
                </p>

                <div className="space-y-8 max-w-4xl relative z-10">
                  <div>
                    <h4 className="flex items-center gap-2 font-mono text-slate-500 uppercase tracking-widest text-xs mb-3">
                      <span className="w-1.5 h-1.5 bg-red-500 animate-pulse" /> TARGET ACQUIRED
                    </h4>
                    <p className="font-mono text-slate-300 text-sm md:text-base leading-relaxed bg-red-950/20 p-6 border-l-2 border-red-500/50">
                      {scenarios[activeTab].threat}
                    </p>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-2 font-mono text-slate-500 uppercase tracking-widest text-xs mb-3">
                      <span className="w-1.5 h-1.5 bg-emerald-500" /> AUTONOMOUS RESPONSE
                    </h4>
                    <p className="font-mono text-emerald-400 text-sm md:text-base leading-relaxed bg-emerald-950/20 p-6 border-l-2 border-emerald-500/50 font-medium">
                      {scenarios[activeTab].reaction}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
