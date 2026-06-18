import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { Play, RotateCcw } from "lucide-react";

interface Heart {
  id: number;
  x: number;
  duration: number;
  emoji: string;
}

const HEART_EMOJIS = ["💔", "💔", "💔", "❤️‍🩹", "💔"];

const HeartCatchGame = () => {
  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const idRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const gameTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const countdownRef = useRef<ReturnType<typeof setInterval>>();

  const startGame = () => {
    setPlaying(true);
    setScore(0);
    setHearts([]);
    setGameOver(false);
    setTimeLeft(15);
  };

  useEffect(() => {
    if (!playing) return;
    timerRef.current = setInterval(() => {
      const id = idRef.current++;
      const x = Math.random() * 78 + 5;
      const duration = 2.2 + Math.random() * 2;
      const emoji = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];
      setHearts((h) => [...h, { id, x, duration, emoji }]);
    }, 750);

    gameTimerRef.current = setTimeout(() => {
      setPlaying(false);
      setGameOver(true);
      if (timerRef.current) clearInterval(timerRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    }, 15000);

    countdownRef.current = setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1));
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (gameTimerRef.current) clearTimeout(gameTimerRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [playing]);

  const catchHeart = useCallback((id: number) => {
    setScore((s) => s + 1);
    setHearts((h) => h.filter((heart) => heart.id !== id));
  }, []);

  const removeHeart = useCallback((id: number) => {
    setHearts((h) => h.filter((heart) => heart.id !== id));
  }, []);

  const getScoreMessage = (s: number) => {
    if (s >= 12) return { msg: "You mended my heart completely! 💖", emoji: "🥹" };
    if (s >= 7) return { msg: "Every piece you catch is a step toward making things right again.", emoji: "❤️‍🩹" };
    return { msg: "I have so much work to do to earn your love back... 🥀", emoji: "💔" };
  };

  const result = getScoreMessage(score);

  return (
    <section
      id="heart-game"
      className="min-h-[65vh] flex flex-col items-center justify-center px-4 py-24 section-alt relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      {/* Heading */}
      <motion.div
        className="text-center mb-10 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-xs uppercase tracking-[0.3em] text-primary/60 font-semibold mb-4">Mini Game</p>
        <h2 className="font-display text-4xl md:text-5xl text-foreground mb-3">
          Fix My{" "}
          <span className="text-gradient-love italic">Broken Heart</span> 🥀
        </h2>
        <p className="text-muted-foreground italic font-display max-w-xs mx-auto">
          Catch the broken pieces to help me put my heart back together...
        </p>
      </motion.div>

      {/* Start Screen */}
      {!playing && !gameOver && (
        <motion.button
          id="heart-game-start"
          onClick={startGame}
          className="btn-primary flex items-center gap-2.5 text-lg px-10 py-5 font-bold z-10 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
        >
          <Play className="w-5 h-5" />
          Start Mending ❤️‍🩹
        </motion.button>
      )}

      {/* Game Area */}
      {playing && (
        <div className="relative z-10 w-full max-w-sm flex flex-col items-center gap-4">
          {/* Score bar */}
          <div className="flex items-center justify-between w-full px-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">❤️‍🩹 Mended:</span>
              <motion.span
                key={score}
                className="text-xl font-bold text-primary"
                initial={{ scale: 1.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {score}
              </motion.span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm text-muted-foreground">⏱</span>
              <span
                className={`text-lg font-bold tabular-nums ${timeLeft <= 5 ? "text-primary animate-pulse" : "text-foreground"}`}
              >
                {timeLeft}s
              </span>
            </div>
          </div>

          {/* Game box */}
          <div
            className="relative w-full h-80 rounded-3xl overflow-hidden shadow-glass"
            style={{
              background: "linear-gradient(160deg, hsl(258, 25%, 10%) 0%, hsl(280, 20%, 8%) 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* Bokeh background dots */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-primary/5"
                style={{
                  width: 20 + i * 10,
                  height: 20 + i * 10,
                  left: `${(i * 13 + 5) % 90}%`,
                  top: `${(i * 17 + 10) % 80}%`,
                  filter: "blur(8px)",
                }}
              />
            ))}

            <AnimatePresence>
              {hearts.map((heart) => (
                <motion.button
                  key={heart.id}
                  className="absolute text-2xl cursor-pointer select-none hover:scale-125 transition-transform"
                  style={{ left: `${heart.x}%` }}
                  initial={{ top: "-8%", opacity: 0 }}
                  animate={{ top: "108%", opacity: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: heart.duration, ease: "linear" }}
                  onAnimationComplete={() => removeHeart(heart.id)}
                  onClick={() => catchHeart(heart.id)}
                  aria-label="Catch heart"
                >
                  {heart.emoji}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Game Over Screen */}
      {gameOver && (
        <motion.div
          className="relative z-10 text-center max-w-sm w-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 180 }}
        >
          <div
            className="p-8 rounded-3xl shadow-glass"
            style={{
              background: "linear-gradient(160deg, hsl(258, 25%, 13%) 0%, hsl(280, 20%, 10%) 100%)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div className="text-5xl mb-4">{result.emoji}</div>
            <p className="font-display text-3xl font-bold text-primary mb-2">
              {score} pieces mended!
            </p>
            <p className="text-muted-foreground italic font-display text-sm mb-7 max-w-xs mx-auto leading-relaxed">
              {result.msg}
            </p>
            <motion.button
              id="heart-game-retry"
              onClick={startGame}
              className="btn-ghost flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </motion.button>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default HeartCatchGame;
