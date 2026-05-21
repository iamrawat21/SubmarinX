import { motion, useScroll, useTransform, useMotionValue, AnimatePresence } from 'motion/react';
import { Shield, Terminal, X } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';
import { supabase } from '../supabase';

function NavLink({ name, href, id, scrollY }: any) {
  const widthMV = useMotionValue(0);
  const width = useTransform(widthMV, v => `${v}%`);

  useEffect(() => {
    const update = () => {
      const el = document.getElementById(id);
      if (!el) {
        widthMV.set(0);
        return;
      }

      const currentY = scrollY.get();
      const rect = el.getBoundingClientRect();
      const elementTop = rect.top + currentY;
      const elementHeight = el.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Start filling when the element's top reaches the middle of the viewport
      const start = elementTop - viewportHeight / 1.5;
      // Finish filling when the element's bottom reaches the middle of the viewport
      const end = elementTop + elementHeight - viewportHeight / 1.5;

      if (currentY < start) {
        widthMV.set(0);
      } else if (currentY > end) {
        widthMV.set(100);
      } else {
        widthMV.set(((currentY - start) / (end - start)) * 100);
      }
    };

    const unsubscribe = scrollY.on('change', update);
    window.addEventListener('resize', update);
    setTimeout(update, 100); // Initial check

    return () => {
      unsubscribe();
      window.removeEventListener('resize', update);
    };
  }, [id, scrollY, widthMV]);

  return (
    <a href={href} className="relative px-3 py-1.5 hover:text-cyan-400 transition-colors inline-block rounded overflow-hidden">
      <motion.div
        className="absolute left-0 top-0 bottom-0 bg-cyan-500/25 z-0"
        style={{ width }}
      />
      <span className="relative z-10">{name}</span>
    </a>
  );
}

function Navbar({ navBg, navBorder, textColor, isReady, linksX, scrollY }: any) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [isContactSuccess, setIsContactSuccess] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsContactSubmitting(true);
    try {
      const { error } = await supabase.from('contact_us').insert([{ email: contactEmail, message: contactMessage }]);
      if (error) throw error;
      setIsContactSuccess(true);
      setTimeout(() => {
        setIsContactOpen(false);
        setTimeout(() => {
          setIsContactSuccess(false);
          setContactEmail('');
          setContactMessage('');
        }, 300);
      }, 2000);
    } catch (error: any) {
      console.error(error);
      alert('Failed to send transmission: ' + (error.message || JSON.stringify(error)));
    } finally {
      setIsContactSubmitting(false);
    }
  };

  if (!isReady) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ backgroundColor: navBg, borderColor: navBorder, color: textColor }}
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 md:px-12 backdrop-blur-md border-b"
      >
        <div className="flex items-center gap-12">
          {/* Invisible placeholder for the floating logo */}
          <div className="h-8 w-[100px] md:h-10 md:w-[120px] shrink-0 invisible" />

          <motion.div
            style={{ x: linksX }}
            className="hidden md:flex items-center gap-8 font-mono text-[11px] uppercase tracking-widest"
          >
            {[
              { name: "Architecture", href: "#architecture", id: "architecture" },
              { name: "Threat Matrix", href: "#threat-matrix", id: "threat-matrix" },
              { name: "Command Center", href: "#command-center", id: "command-center" }
            ].map((link) => (
              <NavLink key={link.id} {...link} scrollY={scrollY} />
            ))}
          </motion.div>
        </div>
        <motion.button
          onClick={() => setIsContactOpen(true)}
          style={{ borderColor: navBorder }}
          className="group relative hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full border transition-colors duration-300 font-mono text-[11px] uppercase tracking-widest overflow-hidden hover:text-cyan-400"
        >
          <div className="absolute inset-0 bg-cyan-500/25 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
          <span className="relative z-10 transition-colors duration-300">Contact Us</span>
        </motion.button>
        <button className="md:hidden p-2">
          <Terminal className="w-6 h-6 text-cyan-500" />
        </button>
      </motion.nav>

      <AnimatePresence>
        {isContactOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#00040a] border border-white/10 p-8 rounded-2xl max-w-md w-full relative shadow-2xl"
            >
              <button
                onClick={() => setIsContactOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              {isContactSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-8 text-center"
                >
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                    <Shield className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold mb-2 text-white">Transmission Secured</h3>
                  <p className="text-slate-400 font-mono text-sm">We will be in touch shortly.</p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="font-display text-2xl font-semibold mb-2 text-white">Contact Us</h3>
                  <p className="text-slate-400 mb-6 font-mono text-sm">Send us a secure transmission.</p>
                  <form className="space-y-4 flex flex-col" onSubmit={handleContactSubmit}>
                    <div>
                      <label className="block text-slate-300 font-mono text-xs mb-1 uppercase tracking-wider">Email</label>
                      <input type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50 transition-colors" placeholder="hq@enterprise.com" />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-mono text-xs mb-1 uppercase tracking-wider">Message</label>
                      <textarea rows={4} value={contactMessage} onChange={e => setContactMessage(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50 transition-colors resize-none" placeholder="Enter your transmission..."></textarea>
                    </div>
                    <button type="submit" disabled={isContactSubmitting} className="w-full bg-white text-slate-950 font-medium py-3 rounded-lg hover:bg-cyan-400 transition-colors duration-300 mt-2 disabled:opacity-50">
                      {isContactSubmitting ? 'Sending...' : 'Send Transmission'}
                    </button>
                  </form>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Footer() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistOrg, setWaitlistOrg] = useState('');
  const [isWaitlistSubmitting, setIsWaitlistSubmitting] = useState(false);
  const [isWaitlistSuccess, setIsWaitlistSuccess] = useState(false);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsWaitlistSubmitting(true);
    try {
      const { error } = await supabase.from('waitlist').insert([{ email: waitlistEmail, organization_name: waitlistOrg }]);
      if (error) throw error;
      setIsWaitlistSuccess(true);
      setTimeout(() => {
        setIsWaitlistOpen(false);
        setTimeout(() => {
          setIsWaitlistSuccess(false);
          setWaitlistEmail('');
          setWaitlistOrg('');
        }, 300);
      }, 2000);
    } catch (error: any) {
      console.error(error);
      alert('Failed to join waitlist: ' + (error.message || JSON.stringify(error)));
    } finally {
      setIsWaitlistSubmitting(false);
    }
  };

  return (
    <>
    <footer className="relative bg-[#00040a] border-t border-white/5 pt-24 pb-12 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_center,rgba(6,182,212,0.1)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-end mb-24">
          <div>
            <h2 className="font-display text-5xl md:text-7xl font-semibold tracking-tighter mb-6 text-white">
              Build an Unbreakable, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                Offline Defense.
              </span>
            </h2>
            <p className="text-slate-400 max-w-lg mb-8 text-lg">
              submarinx is currently rolling out early-access deployment windows for qualified high-security enterprises, MSMEs, and financial labs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setIsWaitlistOpen(true)}
                className="group relative overflow-hidden px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:text-cyan-400 transition-colors duration-300"
              >
                <div className="absolute inset-0 bg-cyan-500/25 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
                <span className="relative z-10 transition-colors duration-300">Join Early Access Waitlist</span>
              </button>
            </div>
          </div>

          <div className="md:text-right">
            <h3 className="font-mono text-emerald-400 mb-2 mt-0">Security & Privacy Commitment</h3>
            <p className="text-slate-500 max-w-md ml-auto text-sm">
              Because our platform is deployed entirely on your own local infrastructure, submarinx never transmits telemetry, application logs, or files outside your secure network boundary. Your intelligence remains yours.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-sm text-slate-500 font-mono">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Shield className="w-4 h-4" />
            <span>Autonomous Active Defense. Completely Submerged.</span>
          </div>
        </div>
      </div>
    </footer>
    <AnimatePresence>
      {isWaitlistOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-[#00040a] border border-white/10 p-8 rounded-2xl max-w-md w-full relative shadow-2xl"
          >
            <button
              onClick={() => setIsWaitlistOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            {isWaitlistSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-8 text-center"
              >
                <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                  <Shield className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="font-display text-2xl font-semibold mb-2 text-white">Waitlist Joined</h3>
                <p className="text-slate-400 font-mono text-sm">We will be in touch shortly.</p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h3 className="font-display text-2xl font-semibold mb-2 text-white">Join Waitlist</h3>
                <p className="text-slate-400 mb-6 font-mono text-sm">Request a deployment window for your infrastructure.</p>
                <form className="space-y-4 flex flex-col" onSubmit={handleWaitlistSubmit}>
                  <div>
                    <label className="block text-slate-300 font-mono text-xs mb-1 uppercase tracking-wider">Work Email</label>
                    <input type="email" value={waitlistEmail} onChange={e => setWaitlistEmail(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50 transition-colors" placeholder="admin@enterprise.com" />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-mono text-xs mb-1 uppercase tracking-wider">Organization Name</label>
                    <input type="text" value={waitlistOrg} onChange={e => setWaitlistOrg(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50 transition-colors" placeholder="Acme Corp" />
                  </div>
                  <button type="submit" disabled={isWaitlistSubmitting} className="w-full bg-white text-slate-950 font-medium py-3 rounded-lg hover:bg-cyan-400 transition-colors duration-300 mt-2 disabled:opacity-50">
                    {isWaitlistSubmitting ? 'Submitting...' : 'Submit Request'}
                  </button>
                </form>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const { scrollY, scrollYProgress } = useScroll();
  const [isReady, setIsReady] = useState(false);
  const [vw, setVw] = useState(1000);
  const [vh, setVh] = useState(800);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setVw(window.innerWidth);
      setVh(window.innerHeight);
      setIsMobile(window.innerWidth < 768);
      setIsReady(true);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Floating Logo Logic
  const navPaddingLeft = isMobile ? 24 : 48; // px-6 vs px-12
  const navCenterY = isMobile ? 32 : 36; // Navbar py-4 (16px) + half of h-8/h-10 (16/20) = 32/36

  const heroCenterY = vh * 0.45;
  const heroWidth = Math.min(vw * 0.95, 1600);
  const navLogoWidth = isMobile ? 100 : 120;

  const scrollDistance = vh * 0.8; // Animate over 80% of the viewport height
  const logoWidth = useTransform(scrollY, [0, scrollDistance], [heroWidth, navLogoWidth]);
  const logoTop = useTransform(scrollY, [0, scrollDistance], [heroCenterY, navCenterY]);
  const logoLeft = useTransform(scrollY, [0, scrollDistance], [vw / 2, navPaddingLeft]);

  const logoX = useTransform(scrollY, [0, scrollDistance], ["-50%", "0%"]);
  const logoY = useTransform(scrollY, [0, scrollDistance], ["-50%", "-50%"]);

  // Calculate links shift: placeholder width + gap (48px for gap-12)
  const linksOffset = navLogoWidth + 48;
  const linksX = useTransform(scrollY, [0, scrollDistance], [-linksOffset, 0]); return (
    <div className="bg-[#000000] text-slate-50 min-h-screen font-sans selection:bg-cyan-500 selection:text-black relative">

      <Navbar
        navBg="rgba(0, 0, 0, 0.85)"
        navBorder="rgba(6, 182, 212, 0.15)"
        textColor="#f8fafc"
        isReady={isReady}
        linksX={linksX}
        scrollY={scrollY}
      />

      {isReady && (
        <motion.img
          src="/submarinX.svg"
          alt="Submarinx"
          className="fixed z-50 object-contain pointer-events-none invert"
          style={{
            width: logoWidth,
            top: logoTop,
            left: logoLeft,
            x: logoX,
            y: logoY,
          }}
        />
      )}
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </div>
  );
}
