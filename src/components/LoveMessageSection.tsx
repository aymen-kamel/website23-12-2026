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
    <section className="min-h-[50vh] flex flex-col items-center justify-center px-4 py-20 bg-background">
      <motion.h2
        className="font-romantic text-4xl md:text-5xl text-primary text-center mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        onViewportEnter={() => setStarted(true)}
      >
        A Special Birthday Message 🎂✨
      </motion.h2>

      <div className="max-w-lg space-y-6 text-center">
        {lines.slice(0, visibleLines).map((line, i) => (
          <motion.p
            key={i}
            className="text-lg md:text-2xl text-foreground italic font-medium leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {line}
          </motion.p>
        ))}
        {visibleLines < lines.length && started && (
          <motion.span 
            className="inline-block w-3 h-6 bg-primary animate-pulse rounded-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        )}
      </div>
    </section>
  );
};

export default LoveMessageSection;
