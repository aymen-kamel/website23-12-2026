import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";

interface HeroSectionProps {
  onStart: () => void;
}

// Rose petal particle
const RosePetal = ({ delay, left, duration, size }: { delay: number; left: string; duration: number; size: number }) => (
  <motion.span
    className="absolute pointer-events-none select-none"
    style={{ left, top: -40, fontSize: size }}
    initial={{ y: -40, opacity: 0, rotate: 0 }}
    animate={{ y: "110vh", opacity: [0, 0.8, 0.8, 0], rotate: 720, x: [0, 30, -20, 40] }}
    transition={{ duration, repeat: Infinity, delay, ease: "easeIn" }}
  >
    🌸
  </motion.span>
);

// Floating sparkle dot
const SparkDot = ({ x, y, delay }: { x: string; y: string; delay: number }) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full bg-gold/60 pointer-events-none"
    style={{ left: x, top: y }}
    animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
    transition={{ duration: 2.5, repeat: Infinity, delay }}
  />
);

const HeroSection = ({ onStart }: HeroSectionProps) => {
  const startDate = new Date("2026-05-04T00:00:00");

  const [timeTogether, setTimeTogether] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const petals = useMemo(
    () => Array.from({ length: 12 }, (_, i) => ({
      id: i,
      delay: (i * 0.9) % 8,
      left: `${(i * 8.5 + 2) % 98}%`,
      duration: 7 + (i % 4) * 1.5,
      size: 14 + (i % 3) * 6,
    })),
    []
  );

  const sparks = useMemo(
    () => Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      delay: Math.random() * 4,
    })),
    []
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();
      setTimeTogether({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeEntries = [
    { value: timeTogether.days, label: "Days" },
    { value: timeTogether.hours, label: "Hours" },
    { value: timeTogether.minutes, label: "Min" },
    { value: timeTogether.seconds, label: "Sec" },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, hsl(330 60% 15% / 0.8) 0%, transparent 70%), radial-gradient(ellipse 60% 80% at 80% 50%, hsl(280 40% 12% / 0.6) 0%, transparent 70%), hsl(256, 28%, 7%)",
      }}
    >
      {/* Animated rose petals */}
      {petals.map((p) => (
        <RosePetal key={p.id} delay={p.delay} left={p.left} duration={p.duration} size={p.size} />
      ))}

      {/* Sparkle dots */}
      {sparks.map((s) => (
        <SparkDot key={s.id} x={s.x} y={s.y} delay={s.delay} />
      ))}

      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-gold/6 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/4 blur-[150px] pointer-events-none" />

      {/* Timer / Countdown widget */}
      <motion.div
        className="relative mb-10 glass-strong px-7 py-4 rounded-2xl shimmer-border"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <p className="text-xs font-semibold text-primary/80 uppercase tracking-[0.25em] text-center mb-3 flex items-center justify-center gap-2">
          <Sparkles className="w-3 h-3" />
          Time We've Been Together — Forever 💖
          <Sparkles className="w-3 h-3" />
        </p>
        <div className="flex gap-5 justify-center font-body">
          {timeEntries.map((entry, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <motion.span
                key={entry.value}
                className="text-3xl md:text-4xl font-bold text-foreground tabular-nums leading-none"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {String(entry.value).padStart(2, "0")}
              </motion.span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                {entry.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Main headline */}
      <motion.div
        className="text-center mb-6 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
      >
        <p className="font-display text-sm md:text-base uppercase tracking-[0.35em] text-primary/70 mb-3 font-medium">
          You Were Always Mine
        </p>
        <h1 className="font-script text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-gradient-love leading-none mb-2">
          Ranoummm
        </h1>
        <div className="flex items-center justify-center gap-3 mt-2">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
          <span className="text-primary/60 text-lg">❤️</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
        </div>
      </motion.div>

      {/* Subtext */}
      <motion.p
        className="font-display italic text-muted-foreground text-center max-w-md mb-12 text-base md:text-lg leading-relaxed relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5 }}
      >
        You were mine before you even knew it. You are mine now. And you will be mine every single day for the rest of time. That is a promise I will never break.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row items-center gap-4 relative z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <motion.button
          id="hero-start-btn"
          onClick={onStart}
          className="btn-primary text-lg px-10 py-5 font-bold"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
        >
          ❤️ Always Yours, Always Mine
        </motion.button>

        <motion.button
          onClick={onStart}
          className="btn-ghost text-base px-8 py-4"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          Watch Our Story ↓
        </motion.button>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
