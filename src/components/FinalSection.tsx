import { motion } from "framer-motion";
import { useMemo } from "react";

interface FinalSectionProps {
  onReplay: () => void;
}

const FinalSection = ({ onReplay }: FinalSectionProps) => {
  const floatingHearts = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 5,
        duration: 4 + Math.random() * 4,
        size: 14 + Math.random() * 20,
      })),
    []
  );

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
      {/* Floating hearts */}
      {floatingHearts.map((h) => (
        <motion.span
          key={h.id}
          className="absolute pointer-events-none"
          style={{ left: h.left, bottom: -30, fontSize: h.size }}
          animate={{
            y: [0, -window.innerHeight - 50],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: h.duration,
            repeat: Infinity,
            delay: h.delay,
            ease: "linear",
          }}
        >
          ❤️
        </motion.span>
      ))}

      <motion.h2
        className="font-romantic text-5xl md:text-7xl text-gradient-love text-center mb-8 z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        I love you Ranoummm ❤️
      </motion.h2>

      <motion.p
        className="text-lg text-muted-foreground text-center mb-10 z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        Forever and always 💕
      </motion.p>

      <motion.button
        onClick={onReplay}
        className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold shadow-lg z-10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
      >
        Replay our story 🔄
      </motion.button>
    </section>
  );
};

export default FinalSection;
