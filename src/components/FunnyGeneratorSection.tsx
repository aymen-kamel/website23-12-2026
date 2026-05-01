import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const reasons = [
  "Because I risked everything for a momentary mistake. 🤡",
  "Because I hurt the most beautiful soul I've ever known. 💔",
  "Because I forgot that you are my entire world. 🌎",
  "Because I thought I could live without you, and I was so wrong. 😔",
  "Because I broke a promise I meant to keep forever. 🥀",
  "Because I'm a fool who doesn't deserve you, but wants to. 🙏",
  "Because I let my ego get in the way of our happiness. 🤦‍♂️",
  "Because I took your love for granted. Never again. 🕯️",
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
    <section className="min-h-[50vh] flex flex-col items-center justify-center px-4 py-20 bg-background">
      <motion.h2
        className="font-romantic text-4xl md:text-5xl text-primary text-center mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Reasons I'm an Idiot... 🤡
      </motion.h2>

      <motion.button
        onClick={generate}
        className="bg-secondary text-foreground border border-primary/20 px-8 py-4 rounded-full text-lg font-semibold shadow-lg mb-8 hover:bg-primary/10 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Tell me more 🥀
      </motion.button>

      <div className="h-20 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {reason && (
            <motion.p
              key={key}
              className="text-xl md:text-2xl text-foreground text-center max-w-md font-medium italic"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              "{reason}"
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FunnyGeneratorSection;
