import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const lines = [
  "At first it was just passing time…",
  "but now, you mean so much more to me.",
  "I didn't plan this…",
  "but I'm really glad it happened ❤️",
];

const LoveMessageSection = () => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    if (visibleLines >= lines.length) return;
    const timer = setTimeout(() => setVisibleLines((v) => v + 1), 1500);
    return () => clearTimeout(timer);
  }, [visibleLines, started]);

  return (
    <section className="min-h-[50vh] flex flex-col items-center justify-center px-4 py-20 bg-secondary/30">
      <motion.h2
        className="font-romantic text-4xl md:text-5xl text-gradient-love text-center mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        onViewportEnter={() => setStarted(true)}
      >
        A Love Message 💌
      </motion.h2>

      <div className="max-w-lg space-y-4 text-center">
        {lines.slice(0, visibleLines).map((line, i) => (
          <motion.p
            key={i}
            className="text-lg md:text-xl text-foreground italic"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {line}
          </motion.p>
        ))}
        {visibleLines < lines.length && started && (
          <span className="inline-block w-2 h-5 bg-primary animate-pulse rounded-sm" />
        )}
      </div>
    </section>
  );
};

export default LoveMessageSection;
