import { motion } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";

interface Heart {
  id: number;
  x: number;
  duration: number;
}

const HeartCatchGame = () => {
  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const idRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const gameTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const startGame = () => {
    setPlaying(true);
    setScore(0);
    setHearts([]);
    setGameOver(false);
  };

  useEffect(() => {
    if (!playing) return;
    timerRef.current = setInterval(() => {
      const id = idRef.current++;
      const x = Math.random() * 80 + 10;
      const duration = 2 + Math.random() * 2;
      setHearts((h) => [...h, { id, x, duration }]);
    }, 600);
    gameTimerRef.current = setTimeout(() => {
      setPlaying(false);
      setGameOver(true);
      if (timerRef.current) clearInterval(timerRef.current);
    }, 15000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (gameTimerRef.current) clearTimeout(gameTimerRef.current);
    };
  }, [playing]);

  const catchHeart = useCallback((id: number) => {
    setScore((s) => s + 1);
    setHearts((h) => h.filter((heart) => heart.id !== id));
  }, []);

  const removeHeart = useCallback((id: number) => {
    setHearts((h) => h.filter((heart) => heart.id !== id));
  }, []);

  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20 bg-secondary/30">
      <motion.h2
        className="font-romantic text-4xl md:text-5xl text-gradient-love text-center mb-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Catch the Hearts! 💕
      </motion.h2>

      {!playing && !gameOver && (
        <motion.button
          onClick={startGame}
          className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Play 🎮
        </motion.button>
      )}

      {playing && (
        <>
          <p className="text-2xl font-bold text-foreground mb-4">Score: {score} ❤️</p>
          <div className="relative w-full max-w-md h-72 bg-romantic-light/30 rounded-2xl overflow-hidden border border-border">
            {hearts.map((heart) => (
              <motion.button
                key={heart.id}
                className="absolute text-3xl cursor-pointer select-none"
                style={{ left: `${heart.x}%` }}
                initial={{ top: "-10%" }}
                animate={{ top: "110%" }}
                transition={{ duration: heart.duration, ease: "linear" }}
                onAnimationComplete={() => removeHeart(heart.id)}
                onClick={() => catchHeart(heart.id)}
              >
                ❤️
              </motion.button>
            ))}
          </div>
        </>
      )}

      {gameOver && (
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="text-2xl font-bold text-foreground mb-2">
            You caught {score} hearts! 💕
          </p>
          <p className="text-lg text-muted-foreground mb-6">
            You caught my heart ❤️… no escape now
          </p>
          <motion.button
            onClick={startGame}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Play Again 🔁
          </motion.button>
        </motion.div>
      )}
    </section>
  );
};

export default HeartCatchGame;
