import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cake, PartyPopper } from "lucide-react";

const BirthdaySurprise = () => {
  const [isMidnight, setIsMidnight] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      // Only show the surprise on the actual birthday (May 5th, within 48 hours of midnight)
      const birthdayStart = new Date("2026-05-05T00:00:00");
      const birthdayEnd = new Date("2026-05-06T23:59:59");
      if (now >= birthdayStart && now <= birthdayEnd) {
        setIsMidnight(true);
      }
    };
    const timer = setInterval(checkTime, 1000);
    checkTime();
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isMidnight) {
      const seen = sessionStorage.getItem("birthday_surprise_seen");
      if (!seen) {
        setShowOverlay(true);
        sessionStorage.setItem("birthday_surprise_seen", "true");
      }
    }
  }, [isMidnight]);

  const confettiItems = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    emoji: ["🎉", "🎂", "🎈", "❤️", "✨", "💖", "🌸", "🎊"][i % 8],
    x: (Math.random() - 0.5) * (typeof window !== "undefined" ? window.innerWidth * 1.4 : 600),
    y: (Math.random() - 0.5) * (typeof window !== "undefined" ? window.innerHeight * 1.4 : 800),
    scale: 0.5 + Math.random() * 1.5,
    delay: Math.random() * 0.8,
  }));

  return (
    <AnimatePresence>
      {showOverlay && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          style={{ background: "rgba(8, 5, 18, 0.92)", backdropFilter: "blur(24px)" }}
        >
          {/* Confetti */}
          {confettiItems.map((item) => (
            <motion.div
              key={item.id}
              className="absolute pointer-events-none text-2xl"
              initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
              animate={{
                x: item.x,
                y: item.y,
                opacity: [1, 1, 0],
                scale: item.scale,
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: item.delay,
                ease: "easeOut",
              }}
            >
              {item.emoji}
            </motion.div>
          ))}

          {/* Modal card */}
          <motion.div
            initial={{ scale: 0.5, y: 60, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 160, damping: 20, delay: 0.2 }}
            className="relative max-w-2xl w-full"
          >
            {/* Shimmer border wrapper */}
            <div
              className="relative rounded-[2.5rem] p-px shadow-[0_0_80px_rgba(220,70,100,0.3)]"
              style={{
                background:
                  "linear-gradient(135deg, hsl(340,80%,55%), hsl(42,95%,62%), hsl(340,80%,35%), hsl(42,95%,45%))",
                backgroundSize: "200% 200%",
                animation: "gradient-shift 3s ease infinite",
              }}
            >
              {/* Inner card */}
              <div
                className="relative rounded-[2.4rem] p-10 md:p-16 text-center overflow-hidden"
                style={{
                  background:
                    "linear-gradient(160deg, hsl(258, 30%, 11%) 0%, hsl(280, 25%, 8%) 100%)",
                }}
              >
                {/* Glow orbs */}
                <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-primary/15 blur-[60px]" />
                <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-gold/10 blur-[60px]" />

                {/* Animated cake */}
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                  className="inline-block mb-6 relative z-10"
                >
                  <div
                    className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto shadow-rose-lg"
                    style={{ background: "hsl(340 80% 40% / 0.3)", border: "1px solid hsl(340 80% 55% / 0.3)" }}
                  >
                    <Cake className="w-12 h-12 text-primary drop-shadow-lg" />
                  </div>
                </motion.div>

                {/* Time badge */}
                <div
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.25em] text-gold mb-6 relative z-10"
                  style={{ background: "hsl(42 95% 62% / 0.1)", border: "1px solid hsl(42 95% 62% / 0.25)" }}
                >
                  🕛 IT'S MIDNIGHT!
                </div>

                {/* Headline */}
                <h1 className="font-display text-4xl md:text-6xl text-foreground mb-4 relative z-10 leading-tight">
                  Happy Birthday,{" "}
                  <span className="text-gradient-love italic">Ranoummm!</span>
                </h1>

                {/* Script accent */}
                <p className="font-script text-4xl md:text-5xl text-primary mb-6 relative z-10">
                  🎂❤️
                </p>

                {/* Message */}
                <p className="font-display italic text-muted-foreground text-base md:text-lg mb-10 leading-relaxed max-w-lg mx-auto relative z-10">
                  The clock finally struck 00:00. This is the start of your most beautiful year yet. I'm so happy I'm here to witness it with you.
                </p>

                {/* CTA */}
                <motion.button
                  id="birthday-surprise-close"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowOverlay(false)}
                  className="btn-primary text-lg px-12 py-5 font-bold flex items-center gap-3 mx-auto relative z-10"
                >
                  Let's keep celebrating! <PartyPopper className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BirthdaySurprise;
