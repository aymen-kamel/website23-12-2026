import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const lines = [
  "Happy Birthday, my beautiful Ranoummm! 🎂",
  "Today is all about you, and I'm so happy I get to spend it with you.",
  "You are the most amazing person I've ever met...",
  "and having you back in my life is the best birthday gift I could ever ask for.",
  "I promise to cherish you, respect you, and love you forever.",
  "You deserve the world, and I'll spend my life trying to give it to you.",
  "Happy Birthday, my love! ❤️🎉",
];

const LoveMessageSection = () => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    if (visibleLines >= lines.length) return;
    const timer = setTimeout(() => setVisibleLines((v) => v + 1), 2000);
    return () => clearTimeout(timer);
  }, [visibleLines, started]);

  return (
    <section
      id="love-letter"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-24 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 100%, hsl(330 50% 12% / 0.8) 0%, transparent 70%), hsl(256, 28%, 7%)",
      }}
    >
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-primary/6 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-60 h-60 rounded-full bg-gold/5 blur-[100px]" />
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 50%, rgba(10,6,20,0.7) 100%)",
          }}
        />
      </div>

      {/* Section label */}
      <motion.div
        className="text-center mb-12 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onViewportEnter={() => setStarted(true)}
      >
        <p className="text-xs uppercase tracking-[0.35em] text-gold font-semibold mb-4">💌 A Letter to You</p>
        <h2 className="font-display text-4xl md:text-5xl text-foreground mb-3">
          A Special{" "}
          <span className="text-gradient-love italic">Birthday Message</span> ✨
        </h2>
        <div className="section-divider mt-6" />
      </motion.div>

      {/* Lines */}
      <div className="relative z-10 max-w-xl w-full text-center space-y-7">
        {lines.slice(0, visibleLines).map((line, i) => (
          <motion.p
            key={i}
            className={`leading-relaxed ${
              i === 0 || i === lines.length - 1
                ? "font-script text-3xl md:text-4xl text-primary"
                : "font-display italic text-lg md:text-xl text-foreground/80"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {line}
          </motion.p>
        ))}

        {/* Animated heart cursor */}
        {visibleLines < lines.length && started && (
          <motion.span
            className="inline-block text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ❤️
          </motion.span>
        )}

        {/* Final decoration */}
        {visibleLines >= lines.length && (
          <motion.div
            className="pt-8 flex flex-col items-center gap-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <div className="section-divider w-48" />
            <p className="font-script text-4xl text-primary/80 mt-4">
              Forever yours ❤️
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default LoveMessageSection;
