import { motion } from "framer-motion";
import { useState, useCallback } from "react";

const LoveQuestionSection = () => {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [yesScale, setYesScale] = useState(1);
  const [answered, setAnswered] = useState(false);

  const moveNo = useCallback(() => {
    const x = (Math.random() - 0.5) * 300;
    const y = (Math.random() - 0.5) * 200;
    setNoPos({ x, y });
    setYesScale((s) => Math.min(s + 0.2, 3));
  }, []);

  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 bg-background">
      <motion.h2
        className="font-romantic text-4xl md:text-5xl text-primary text-center mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Ranoummm… can you ever forgive me? 🕯️
      </motion.h2>

      {!answered ? (
        <div className="relative flex gap-8 items-center justify-center min-h-[150px]">
          <motion.button
            className="bg-primary text-primary-foreground px-10 py-5 rounded-full font-bold shadow-2xl z-10 border-2 border-white/10"
            animate={{ scale: yesScale }}
            whileHover={{ scale: yesScale * 1.05 }}
            whileTap={{ scale: yesScale * 0.95 }}
            onClick={() => setAnswered(true)}
          >
            I FORGIVE YOU ❤️
          </motion.button>

          <motion.button
            className="bg-secondary text-muted-foreground px-8 py-4 rounded-full font-semibold shadow-md border border-white/5"
            animate={{ x: noPos.x, y: noPos.y }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            onMouseEnter={moveNo}
            onTouchStart={moveNo}
          >
            NEVER 🥀
          </motion.button>
        </div>
      ) : (
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <p className="text-2xl md:text-3xl font-semibold text-foreground">
            Thank you for being so big-hearted... 😭❤️
          </p>
          <p className="text-xl text-muted-foreground mt-4 italic">
            I promise I will never let you down again.
          </p>
        </motion.div>
      )}
    </section>
  );
};

export default LoveQuestionSection;
