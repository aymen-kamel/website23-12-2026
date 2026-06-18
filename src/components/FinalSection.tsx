import { motion } from "framer-motion";
import { useMemo } from "react";
import { Heart, RefreshCw } from "lucide-react";

interface FinalSectionProps {
  onReplay: () => void;
}

const FinalSection = ({ onReplay }: FinalSectionProps) => {
  const floatingElements = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: `${(i * 3.5 + Math.random() * 5) % 98}%`,
        delay: (i * 0.35) % 8,
        duration: 6 + (i % 5) * 1.5,
        size: 14 + (i % 4) * 7,
        emoji: ["🌸", "❤️", "💖", "✨", "🌹", "💌", "🥰"][i % 7],
      })),
    []
  );

  return (
    <section
      id="finale"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-24 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 90% 60% at 50% 0%, hsl(330 60% 16% / 0.7) 0%, transparent 70%), radial-gradient(ellipse 70% 50% at 80% 80%, hsl(280 40% 14% / 0.5) 0%, transparent 70%), hsl(256, 28%, 7%)",
      }}
    >
      {/* Rose petal / emoji rain */}
      {floatingElements.map((h) => (
        <motion.span
          key={h.id}
          className="absolute pointer-events-none select-none"
          style={{ left: h.left, bottom: -40, fontSize: h.size }}
          animate={{
            y: [0, -(typeof window !== "undefined" ? window.innerHeight : 800) - 100],
            opacity: [0, 0.5, 0.5, 0],
            rotate: [0, 360],
            x: [0, h.id % 2 === 0 ? 30 : -30, 0],
          }}
          transition={{
            duration: h.duration,
            repeat: Infinity,
            delay: h.delay,
            ease: "easeOut",
          }}
        >
          {h.emoji}
        </motion.span>
      ))}

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/5 blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-gold/5 blur-[100px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        {/* Animated heart icon */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 0.5 }}
          >
            <Heart className="w-16 h-16 fill-primary text-primary drop-shadow-[0_0_20px_rgba(220,70,100,0.5)]" />
          </motion.div>
        </motion.div>

        {/* Main headline */}
        <motion.h2
          className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-4 leading-tight"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          You Were Always{" "}
          <span className="text-gradient-love italic">Mine, Ranoummm</span>
        </motion.h2>

        {/* Script name */}
        <motion.p
          className="font-script text-5xl md:text-7xl text-primary mb-8 drop-shadow-[0_0_30px_rgba(220,70,100,0.3)]"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          And you always will be. ❤️✨
        </motion.p>

        {/* Subtext */}
        <motion.p
          className="font-display italic text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Before we met, after we parted, and every single moment in between — my heart only ever knew your name. You are mine. I am yours. That’s just how it is.
        </motion.p>

        {/* Poem / quote */}
        <motion.div
          className="mb-12 max-w-sm mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
        >
          <div className="section-divider mb-4" />
          <p className="font-script text-2xl text-primary/60 italic leading-relaxed">
            "You have always been mine. I was just waiting for you to see what I already knew."
          </p>
          <div className="section-divider mt-4" />
        </motion.div>

        {/* CTA Button */}
        <motion.button
          id="finale-replay-btn"
          onClick={onReplay}
          className="btn-primary text-xl px-12 py-6 font-bold flex items-center gap-3 mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.08, boxShadow: "0 0 50px hsl(340 80% 65% / 0.5)" }}
          whileTap={{ scale: 0.95 }}
        >
          <Heart className="w-5 h-5 fill-current" />
          I Love You Forever ✨
          <RefreshCw className="w-4 h-4 opacity-60" />
        </motion.button>
      </div>
    </section>
  );
};

export default FinalSection;
