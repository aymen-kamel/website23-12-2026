import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const reasons = [
  "Because I chose Barca… and you chose me 😌",
  "Because I make your days less boring 💅",
  "Because you're already too attached 😂",
  "Because I'm your favorite distraction 😏",
  "Because deep down… you love me more 😎",
  "Because no one else gets your weird humor 🤭",
  "Because we're basically a Netflix series now 🎬",
  "Because who else would tolerate you? 😂❤️",
];

const FunnyGeneratorSection = () => {
  const [reason, setReason] = useState<string | null>(null);
  const [key, setKey] = useState(0);

  const generate = () => {
    let next: string;
    do {
      next = reasons[Math.floor(Math.random() * reasons.length)];
    } while (next === reason && reasons.length > 1);
    setReason(next);
    setKey((k) => k + 1);
  };

  return (
    <section className="min-h-[50vh] flex flex-col items-center justify-center px-4 py-20">
      <motion.h2
        className="font-romantic text-4xl md:text-5xl text-gradient-love text-center mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Why you can't leave me 😏
      </motion.h2>

      <motion.button
        onClick={generate}
        className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold shadow-lg mb-8"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Tell me why 💕
      </motion.button>

      <div className="h-20 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {reason && (
            <motion.p
              key={key}
              className="text-xl md:text-2xl text-foreground text-center max-w-md font-medium"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {reason}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FunnyGeneratorSection;
