import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const storyLines = [
  "It all started with one question…",
  "Real Madrid or Barcelona? ⚽",
  "(Of course I said Barca 😎)",
  "And somehow… that simple conversation",
  "turned into something real ❤️",
];

const StorySection = () => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    if (visibleLines >= storyLines.length) return;
    const timer = setTimeout(() => setVisibleLines((v) => v + 1), 1200);
    return () => clearTimeout(timer);
  }, [visibleLines, started]);

  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20 bg-secondary/30">
      <motion.h2
        className="font-romantic text-4xl md:text-5xl text-gradient-love text-center mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        onViewportEnter={() => setStarted(true)}
      >
        Our Beginning ⚽❤️
      </motion.h2>

      <div className="max-w-lg space-y-4 text-center">
        {storyLines.slice(0, visibleLines).map((line, i) => (
          <motion.p
            key={i}
            className="text-lg md:text-xl text-foreground"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {line}
          </motion.p>
        ))}
        {visibleLines < storyLines.length && started && (
          <span className="inline-block w-2 h-5 bg-primary animate-pulse rounded-sm" />
        )}
      </div>
    </section>
  );
};

export default StorySection;
