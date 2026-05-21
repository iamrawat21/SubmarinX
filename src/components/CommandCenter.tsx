import { motion } from 'motion/react';
import { Lock, Cpu, Radar } from 'lucide-react';

export function CommandCenter() {
  return (
    <section id="command-center" className="py-32 px-6 md:px-12 relative border-t border-slate-900/50">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
              Command Center UI
            </h2>
            <p className="text-xl text-slate-400 font-light mb-12 leading-relaxed">
              The entire platform is managed through a real-time, zero-latency web interface streaming live edge decisions via Server-Sent Events (SSE).
            </p>

            <ul className="space-y-6 mb-12">
              {[
                {
                  icon: <Radar className="w-5 h-5 text-emerald-400" />,
                  title: "Live Radar View",
                  desc: "A topology graph showing all connected endpoints, currently active threats, and total attacks neutralized."
                },
                {
                  icon: <Cpu className="w-5 h-5 text-cyan-400" />,
                  title: "Live AI Stream",
                  desc: "A scrolling ledger displaying the Llama 3.2 brain's human-readable reasoning and immediate autonomous actions."
                },
                {
                  icon: <Lock className="w-5 h-5 text-rose-400" />,
                  title: "The mTLS Vault",
                  desc: "Complete cryptographic control allowing instant revocation of a compromised machine's certificate."
                }
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="mt-1 bg-slate-900 w-10 h-10 rounded flex items-center justify-center shrink-0 border border-slate-800">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="p-6 bg-black/50 border border-slate-800 rounded-2xl backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)]">
              <h4 className="font-mono text-cyan-400 text-xs tracking-widest uppercase mb-4">Enterprise RBAC</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-cyan-500/10">
                  <div className="text-sm font-mono text-white">&gt; Global Admin</div>
                  <div className="text-xs text-slate-500">Root trust, AI model config</div>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-cyan-500/10">
                  <div className="text-sm font-mono text-white">&gt; SOC Manager</div>
                  <div className="text-xs text-slate-500">Weapon controls, Rule overrides</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm font-mono text-white">&gt; Junior Analyst</div>
                  <div className="text-xs text-slate-500">Glass-only radar & streams</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="aspect-[4/3] rounded-2xl bg-[#000] border border-slate-800 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Fake Window Chrome */}
            <div className="h-10 border-b border-slate-800 flex items-center px-4 gap-2 bg-slate-900/80">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <div className="ml-4 font-mono text-[10px] uppercase tracking-widest text-slate-500">root@submarinx // C2_NODE_01</div>
            </div>

            {/* Fake Dashboard Body */}
            <div className="flex-1 p-6 grid grid-cols-3 gap-6 relative">
              <div className="col-span-2 space-y-6">
                {/* Live Radar */}
                <div className="h-48 border border-cyan-500/30 bg-[#00040a] rounded-xl relative overflow-hidden flex items-center justify-center shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]">

                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0%,transparent_70%)]" />

                  {/* Grid Lines (Crosshairs) */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <div className="absolute w-full h-[1px] bg-cyan-500" />
                    <div className="absolute h-full w-[1px] bg-cyan-500" />
                  </div>

                  {/* Concentric Radar Rings */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <div className="absolute w-[180px] h-[180px] border border-cyan-500 rounded-full" />
                    <div className="absolute w-[120px] h-[120px] border border-cyan-500 rounded-full" />
                    <div className="absolute w-[60px] h-[60px] border border-cyan-500 rounded-full" />
                  </div>

                  {/* Sweeping Beam */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div
                      className="w-[180px] h-[180px] rounded-full"
                      style={{ background: 'conic-gradient(from 0deg, transparent 75%, rgba(6,182,212,0.4) 100%)' }}
                    />
                  </motion.div>

                  {/* Detected Threat Blips (synced with the sweeping beam!) */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 1] }}
                      transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
                      className="absolute w-2 h-2 bg-red-500 rounded-full top-[30%] left-[70%] shadow-[0_0_8px_rgba(239,68,68,1)]"
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 1] }}
                      transition={{ repeat: Infinity, duration: 4, delay: 1.4 }}
                      className="absolute w-2 h-2 bg-cyan-400 rounded-full top-[70%] left-[60%] shadow-[0_0_8px_rgba(6,182,212,1)]"
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 1] }}
                      transition={{ repeat: Infinity, duration: 4, delay: 2.5 }}
                      className="absolute w-1.5 h-1.5 bg-emerald-400 rounded-full top-[65%] left-[35%] shadow-[0_0_8px_rgba(52,211,153,1)]"
                    />
                  </div>

                  <div className="absolute bottom-4 left-4 font-mono text-[10px] text-cyan-500 uppercase tracking-widest bg-black/80 px-2 py-1 rounded border border-cyan-500/20 backdrop-blur-md">Live Radar Scan</div>
                </div>

                {/* Stream Placeholder */}
                <div className="h-full border border-emerald-500/30 bg-black/60 rounded-xl p-4 font-mono text-xs text-slate-500 space-y-2 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black to-transparent z-10" />
                  <motion.div
                    animate={{ y: [0, -20] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="space-y-3"
                  >
                    <p><span className="text-emerald-500">[+0.00s]</span> Sensor_Auth: Validating mTLS...</p>
                    <p><span className="text-cyan-500">[+0.04s]</span> Llama3.2: Parsing Entropy Spikes...</p>
                    <p><span className="text-red-500">[+0.12s]</span> Mutator: Trapping threat actor inside ghost container.</p>
                    <p><span className="text-slate-600">[+0.15s]</span> Routing table rewritten successfully.</p>
                    <p><span className="text-emerald-500">[+0.00s]</span> Sensor_Auth: Validating mTLS...</p>
                    <p><span className="text-cyan-500">[+0.04s]</span> Llama3.2: Awaiting telemetry...</p>
                  </motion.div>
                </div>
              </div>

              <div className="col-span-1 space-y-4">
                {/* Status Blocks */}
                <div className="p-4 bg-emerald-950/30 border border-emerald-900/50 rounded-xl backdrop-blur-sm">
                  <div className="font-mono text-[10px] text-emerald-500 mb-1 uppercase tracking-widest">Defense Status</div>
                  <div className="text-xl text-emerald-400 font-mono font-semibold">ACTIVE</div>
                </div>
                <div className="p-4 bg-black/60 border border-slate-800 rounded-xl backdrop-blur-sm">
                  <div className="font-mono text-[10px] text-cyan-500 mb-1 uppercase tracking-widest">Threats Trapped</div>
                  <div className="text-xl text-white font-mono font-semibold">1,204</div>
                </div>
                <div className="p-4 bg-black/60 border border-slate-800 rounded-xl backdrop-blur-sm">
                  <div className="font-mono text-[10px] text-slate-500 mb-1 uppercase tracking-widest">Active Tunnels</div>
                  <div className="text-xl text-white font-mono font-semibold flex items-center justify-between">
                    24 <Lock className="w-4 h-4 text-slate-600" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
