import { motion } from "framer-motion";
import { useMemo } from "react";

interface FinalSectionProps {
  onReplay: () => void;
}

const FinalSection = ({ onReplay }: FinalSectionProps) => {
  const floatingElements = useMemo(
    () =>
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 7,
        duration: 5 + Math.random() * 5,
        size: 14 + Math.random() * 20,
        emoji: ["❤️", "🎂", "🎉", "🎈", "💖"][Math.floor(Math.random() * 5)],
      })),
    []
  );

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden bg-background">
      {/* Floating elements */}
      {floatingElements.map((h) => (
        <motion.span
          key={h.id}
          className="absolute pointer-events-none opacity-20"
          style={{ left: h.left, bottom: -30, fontSize: h.size }}
          animate={{
            y: [0, -window.innerHeight - 100],
            opacity: [0, 0.4, 0.4, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: h.duration,
            repeat: Infinity,
            delay: h.delay,
            ease: "linear",
          }}
        >
          {h.emoji}
        </motion.span>
      ))}

      <motion.h2
        className="font-romantic text-5xl md:text-7xl lg:text-8xl text-primary text-center mb-8 z-10 drop-shadow-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Happy Birthday to the Love of my Life, Ranoummm! 🎂❤️
      </motion.h2>

      <motion.p
        className="text-xl md:text-2xl text-muted-foreground text-center mb-12 z-10 italic max-w-md"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        You are my forever, and I'm so happy we are together today. I love you! ✨💖
      </motion.p>

      <motion.button
        onClick={onReplay}
        className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-5 rounded-full text-xl font-bold shadow-2xl z-10 border-2 border-white/10"
        whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(185, 28, 28, 0.5)" }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
      >
        I Love You Forever! ❤️✨
      </motion.button>
    </section>
  );
};

export default FinalSection;
