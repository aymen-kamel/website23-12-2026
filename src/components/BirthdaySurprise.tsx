import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cake, PartyPopper, Heart, Star } from "lucide-react";

const BirthdaySurprise = () => {
  const [isMidnight, setIsMidnight] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const birthday = new Date("2026-05-05T00:00:00");
      
      if (now >= birthday) {
        setIsMidnight(true);
      }
    };

    const timer = setInterval(checkTime, 1000);
    checkTime(); // Initial check

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isMidnight) {
      // Only show if they haven't seen it in this session
      const seen = sessionStorage.getItem("birthday_surprise_seen");
      if (!seen) {
        setShowOverlay(true);
        sessionStorage.setItem("birthday_surprise_seen", "true");
      }
    }
  }, [isMidnight]);

  return (
    <AnimatePresence>
      {showOverlay && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-2xl px-4"
        >
          {/* Confetti-like elements */}
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: 0, 
                y: 0, 
                opacity: 1,
                scale: 0.5
              }}
              animate={{ 
                x: (Math.random() - 0.5) * window.innerWidth * 1.5,
                y: (Math.random() - 0.5) * window.innerHeight * 1.5,
                opacity: 0,
                scale: Math.random() * 2,
                rotate: Math.random() * 360
              }}
              transition={{ 
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 0.5
              }}
              className="absolute pointer-events-none text-3xl"
            >
              {["🎉", "🎂", "🎈", "❤️", "✨", "💖"][Math.floor(Math.random() * 6)]}
            </motion.div>
          ))}

          <motion.div
            initial={{ scale: 0.5, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-card p-10 md:p-16 rounded-[3rem] shadow-[0_0_50px_rgba(255,0,100,0.3)] border-2 border-primary/20 text-center max-w-2xl relative overflow-hidden"
          >
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-romantic/10 rounded-full blur-3xl" />

            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="inline-block mb-8"
            >
              <Cake className="w-20 h-20 text-primary drop-shadow-lg" />
            </motion.div>

            <h1 className="font-romantic text-5xl md:text-7xl text-primary mb-6 drop-shadow-sm">
              IT'S MIDNIGHT! 🕛
            </h1>
            
            <h2 className="font-romantic text-4xl md:text-5xl text-foreground mb-8">
              Happy Birthday, Ranoummm! 🎂❤️
            </h2>

            <p className="text-xl md:text-2xl text-muted-foreground italic mb-10 leading-relaxed">
              The clock finally struck 00:00. This is the start of your most beautiful year yet. I'm so happy I'm here to witness it with you.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowOverlay(false)}
              className="bg-primary text-primary-foreground px-12 py-4 rounded-full text-xl font-bold shadow-2xl flex items-center gap-3 mx-auto"
            >
              Let's keep celebrating! <PartyPopper className="w-6 h-6" />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BirthdaySurprise;
