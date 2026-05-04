import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const reasons = [
  "Because your smile lights up my whole world. ✨",
  "Because you have the kindest heart I've ever known. ❤️",
  "Because you're my best friend and my soulmate. 👩‍❤️‍👨",
  "Because you always know how to make me laugh. 😂",
  "Because you're incredibly beautiful, inside and out. 😍",
  "Because you never gave up on us. Thank you. 🙏❤️",
  "Because you're the smartest person I know. 🧠✨",
  "Because I can't imagine my life without you. 🌍❤️",
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
        Reasons Why I Love You... ❤️
      </motion.h2>

      <motion.button
        onClick={generate}
        className="bg-secondary text-foreground border border-primary/20 px-8 py-4 rounded-full text-lg font-semibold shadow-lg mb-8 hover:bg-primary/10 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Tell me more ❤️
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
