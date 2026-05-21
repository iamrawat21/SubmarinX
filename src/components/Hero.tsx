import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Activity } from 'lucide-react';

function DeepWaterParticles() {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 4 + 1.5, // 1.5px to 5.5px
      duration: Math.random() * 25 + 15,
      delay: Math.random() * -40,
      opacity: Math.random() * 0.4 + 0.2, // 0.2 to 0.6 opacity
      drift: (Math.random() - 0.5) * 40,
    }));
    setParticles(newParticles);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-cyan-400 blur-[1px]"
          style={{
            left: `${p.left}vw`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          initial={{ y: "110vh", x: 0 }}
          animate={{
            y: "-10vh",
            x: [0, p.drift, -p.drift, 0]
          }}
          transition={{
            y: { duration: p.duration, repeat: Infinity, ease: "linear", delay: p.delay },
            x: { duration: p.duration * 0.4, repeat: Infinity, ease: "easeInOut", delay: p.delay }
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  // Create a scroll observer specifically for this section's parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section
      ref={ref}
      // Removed hardcoded bg-[#020617] so it inherits the global layout background
      className="relative min-h-[120vh] flex flex-col items-center overflow-hidden pt-20 pb-32"
    >
      <DeepWaterParticles />
      <motion.div
        style={{ y: y1, opacity, scale }}
        className="relative z-10 text-center px-6 w-full max-w-5xl mx-auto flex flex-col items-center mt-[25vh]"
      >


        {/* Spacer for the huge floating logo */}
        <div className="h-[45vh] w-full mb-8" />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="font-mono text-cyan-600 mb-8 uppercase tracking-widest text-sm md:text-base flex items-center gap-4"
        >
          <span className="hidden md:inline-block w-12 h-px bg-cyan-500/50" />
          Run Silent. Strike First.
          <span className="hidden md:inline-block w-12 h-px bg-cyan-500/50" />
        </motion.p>


        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="flex flex-col items-center gap-2 text-slate-400 mt-12"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest">Submerge</span>
          <div className="w-px h-16 bg-gradient-to-b from-cyan-500/20 to-transparent overflow-hidden object-left-top relative">
            <motion.div
              className="w-full h-1/2 bg-cyan-500"
              animate={{ y: ['-100%', '200%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </motion.div>

      </motion.div>


    </section>
  );
}
