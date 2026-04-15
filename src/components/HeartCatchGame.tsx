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
  const [showCelebration, setShowCelebration] = useState(false);
  const idRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const gameTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const startGame = () => {
    setPlaying(true);
    setScore(0);
    setHearts([]);
    setGameOver(false);
    setShowCelebration(false);
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
    setScore((s) => {
      const newScore = s + 1;
      if (newScore === 4) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 2500);
      }
      return newScore;
    });
    setHearts((h) => h.filter((heart) => heart.id !== id));
  }, []);

  const removeHeart = useCallback((id: number) => {
    setHearts((h) => h.filter((heart) => heart.id !== id));
  }, []);

  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20 bg-gradient-to-t from-romantic/10 to-transparent">
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
          <div className="flex gap-4 items-center mb-4">
            <p className="text-2xl font-bold text-foreground">Score: {score}</p>
            {score >= 4 && <span className="text-blue-600 font-bold">💙</span>}
            {score >= 4 && <span className="text-red-600 font-bold">❤️</span>}
          </div>
          
          <div className="relative w-full max-w-md h-80 bg-white/40 backdrop-blur-md rounded-3xl overflow-hidden border-2 border-primary/20 shadow-inner">
            <AnimatePresence>
              {showCelebration && (
                <motion.div
                  initial={{ scale: 0, opacity: 0, rotate: -10 }}
                  animate={{ scale: 1.2, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
                >
                  <div className="bg-yellow-400 text-blue-900 font-black px-6 py-2 rounded-xl text-3xl shadow-xl border-4 border-red-600 animate-bounce">
                    4-0! GOLAZO!
                  </div>
                  <div className="text-red-600 font-bold text-xl mt-2 drop-shadow-md bg-white/80 px-4 py-1 rounded-full">
                    Visca Barca! 💙❤️
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

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
                {score >= 4 ? "⚽" : "❤️"}
              </motion.button>
            ))}
          </div>
        </>
      )}

      {gameOver && (
        <motion.div
          className="text-center bg-white/60 p-8 rounded-[2rem] shadow-xl border border-white/80 backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="text-2xl font-bold text-foreground mb-2">
            Final Score: {score} 
            {score >= 4 ? " 🏆" : " 💕"}
          </p>
          <p className="text-lg text-muted-foreground mb-6">
            {score >= 4 
              ? "A champion's score! Just like that Clásico win... ❤️" 
              : "You caught my heart ❤️… no escape now"}
          </p>
          <motion.button
            onClick={startGame}
            className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold shadow-md hover:shadow-lg transition-shadow"
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
