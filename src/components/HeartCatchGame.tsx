import { motion, AnimatePresence } from "framer-motion";
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
      const duration = 2.5 + Math.random() * 2;
      setHearts((h) => [...h, { id, x, duration }]);
    }, 800);
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
    <section className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20 bg-background">
      <motion.h2
        className="font-romantic text-4xl md:text-5xl text-primary text-center mb-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Fix My Broken Heart 🥀
      </motion.h2>
      
      <p className="text-muted-foreground text-center max-w-sm mb-8 italic">
        Catch the broken pieces to help me put my heart back together...
      </p>

      {!playing && !gameOver && (
        <motion.button
          onClick={startGame}
          className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold shadow-lg border border-white/10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Mending ❤️‍🩹
        </motion.button>
      )}

      {playing && (
        <>
          <div className="flex gap-4 items-center mb-4">
            <p className="text-2xl font-bold text-foreground">Pieces Mended: {score}</p>
          </div>
          
          <div className="relative w-full max-w-md h-80 bg-card/20 backdrop-blur-md rounded-3xl overflow-hidden border-2 border-primary/10 shadow-2xl">
            {hearts.map((heart) => (
              <motion.button
                key={heart.id}
                className="absolute text-3xl cursor-pointer select-none"
                style={{ left: `${heart.x}%` }}
                initial={{ top: "-10%", opacity: 0 }}
                animate={{ top: "110%", opacity: 1 }}
                transition={{ duration: heart.duration, ease: "linear" }}
                onAnimationComplete={() => removeHeart(heart.id)}
                onClick={() => catchHeart(heart.id)}
              >
                💔
              </motion.button>
            ))}
          </div>
        </>
      )}

      {gameOver && (
        <motion.div
          className="text-center bg-card/40 p-8 rounded-[2rem] shadow-2xl border border-white/10 backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="text-2xl font-bold text-foreground mb-2">
            Mended Pieces: {score}
          </p>
          <p className="text-lg text-muted-foreground mb-6 max-w-xs mx-auto">
            {score > 5 
              ? "Every piece you catch is a step toward making things right again. 😭❤️" 
              : "I have so much work to do to earn your trust back... 🥀"}
          </p>
          <motion.button
            onClick={startGame}
            className="bg-secondary text-foreground px-8 py-4 rounded-full font-semibold shadow-md hover:shadow-lg transition-shadow border border-primary/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Again 🔁
          </motion.button>
        </motion.div>
      )}
    </section>
  );
};

export default HeartCatchGame;
