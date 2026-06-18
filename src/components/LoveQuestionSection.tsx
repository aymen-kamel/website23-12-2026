import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { Sparkles } from "lucide-react";

const LoveQuestionSection = () => {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [yesScale, setYesScale] = useState(1);
  const [answered, setAnswered] = useState(false);

  const moveNo = useCallback(() => {
    const x = (Math.random() - 0.5) * 320;
    const y = (Math.random() - 0.5) * 220;
    setNoPos({ x, y });
    setYesScale((s) => Math.min(s + 0.2, 3));
  }, []);

  return (
    <section
      id="love-question"
      className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-24 section-alt relative overflow-hidden"
    >
      {/* Background orb */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      {/* Section label */}
      <motion.div
        className="flex items-center gap-2 mb-6"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Sparkles className="w-4 h-4 text-gold" />
        <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold">A question for you</span>
        <Sparkles className="w-4 h-4 text-gold" />
      </motion.div>

      <motion.h2
        className="font-display text-3xl md:text-5xl text-foreground text-center mb-4 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Ranoummm… are you ready for your{" "}
        <span className="text-gradient-love italic">birthday surprise?</span> 🎁
      </motion.h2>

      <motion.p
        className="text-muted-foreground text-center mb-14 italic font-display"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        There's only one right answer here...
      </motion.p>

      <AnimatePresence mode="wait">
        {!answered ? (
          <motion.div
            key="buttons"
            className="relative flex gap-8 items-center justify-center min-h-[160px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            {/* YES button */}
            <motion.button
              id="love-question-yes"
              className="relative btn-primary text-xl font-bold px-12 py-6 z-10"
              animate={{ scale: yesScale }}
              whileHover={{ scale: yesScale * 1.06 }}
              whileTap={{ scale: yesScale * 0.95 }}
              onClick={() => setAnswered(true)}
            >
              YES! 💖
            </motion.button>

            {/* MAYBE button */}
            <motion.button
              id="love-question-no"
              className="btn-ghost text-base px-7 py-4 text-muted-foreground border-muted-foreground/20"
              animate={{ x: noPos.x, y: noPos.y }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              onMouseEnter={moveNo}
              onTouchStart={moveNo}
            >
              MAYBE... 🤔
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            className="text-center glass-card rounded-3xl p-10 max-w-md"
            initial={{ opacity: 0, scale: 0.6, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.8, repeat: 3 }}
            >
              🎂
            </motion.div>
            <p className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-3">
              Yay! Get ready for the{" "}
              <span className="text-gradient-love italic">best birthday ever</span>... ✨
            </p>
            <p className="text-muted-foreground italic font-display">
              I'm so glad you're mine.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LoveQuestionSection;
