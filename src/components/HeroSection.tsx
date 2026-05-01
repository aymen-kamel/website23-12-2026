import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface HeroSectionProps {
  onStart: () => void;
}

const FloatingHeart = ({ delay, left, size }: { delay: number; left: string; size: number }) => (
  <motion.span
    className="absolute text-romantic opacity-30 pointer-events-none"
    style={{ left, fontSize: size, bottom: -20 }}
    animate={{ y: [0, -40, 0], rotate: [0, 15, -15, 0] }}
    transition={{ duration: 5, repeat: Infinity, delay }}
  >
    💔
  </motion.span>
);

const HeroSection = ({ onStart }: HeroSectionProps) => {
  const startDate = new Date("2024-10-26T00:00:00"); // Original start date
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeTogether({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 bg-background">
      {/* Floating hearts background */}
      <FloatingHeart delay={0} left="10%" size={24} />
      <FloatingHeart delay={1} left="25%" size={18} />
      <FloatingHeart delay={2} left="75%" size={28} />
      <FloatingHeart delay={0.5} left="85%" size={20} />
      <FloatingHeart delay={1.5} left="50%" size={16} />

      <motion.div
        className="mb-8 bg-card/20 backdrop-blur-md px-6 py-3 rounded-2xl shadow-lg border border-white/10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-sm font-semibold text-primary uppercase tracking-[0.2em] text-center mb-2">
          Time since my biggest mistake
        </p>
        <div className="flex gap-4 justify-center font-mono text-2xl font-bold text-foreground">
          <div className="flex flex-col items-center leading-none">
            <span>{timeTogether.days}</span>
            <span className="text-[10px] uppercase font-sans mt-1">Days</span>
          </div>
          <span className="opacity-50">:</span>
          <div className="flex flex-col items-center leading-none">
            <span>{timeTogether.hours}</span>
            <span className="text-[10px] uppercase font-sans mt-1">Hrs</span>
          </div>
          <span className="opacity-50">:</span>
          <div className="flex flex-col items-center leading-none">
            <span>{timeTogether.minutes}</span>
            <span className="text-[10px] uppercase font-sans mt-1">Min</span>
          </div>
          <span className="opacity-50">:</span>
          <div className="flex flex-col items-center leading-none text-primary">
            <span>{timeTogether.seconds}</span>
            <span className="text-[10px] uppercase font-sans mt-1">Sec</span>
          </div>
        </div>
      </motion.div>

      <motion.h1
        className="font-romantic text-5xl md:text-7xl lg:text-8xl text-primary text-center mb-6 drop-shadow-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        I'm so sorry, Ranoummm... 💔
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl text-muted-foreground text-center max-w-md mb-10 italic"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        I know I messed up. I know I hurt you. But I want you to know how much I regret it and how much I want you back.
      </motion.p>

      <motion.button
        onClick={onStart}
        className="bg-primary hover:bg-primary/80 text-primary-foreground px-10 py-5 rounded-full text-xl font-bold shadow-2xl transition-all border-2 border-primary/20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(185, 28, 28, 0.4)" }}
        whileTap={{ scale: 0.95 }}
      >
        Please hear me out... 🕯️
      </motion.button>
    </section>
  );
};

export default HeroSection;
