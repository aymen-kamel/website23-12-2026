import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Mail, X } from "lucide-react";

const messages = [
  "Happy Birthday, my love! You make every day feel like a celebration. 🎂❤️",
  "I'm so grateful we're back together. You are my everything. 🥰✨",
  "I promise to love you more and more every single day. Happy Birthday! 💖",
  "You're not just my girlfriend, you're my best friend. I love you, Ranoummm! 🌹",
  "May this birthday be as beautiful and special as you are to me. 🎈✨",
  "I'm the luckiest man to have you by my side again. Happy Birthday! 🎂❤️",
  "Here's to many more birthdays and beautiful memories together. I love you! ✨💖",
];

const DailyMessageSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    setMessage(randomMsg);
  }, []);

  return (
    <section
      id="daily-message"
      className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-24 section-alt relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full bg-primary/6 blur-[120px]" />
        {/* Sparkle particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-gold/30 text-lg"
            style={{ left: `${(i * 9 + 3) % 95}%`, top: `${(i * 11 + 10) % 90}%` }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      {/* Heading */}
      <motion.div
        className="text-center mb-14 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-xs uppercase tracking-[0.3em] text-gold font-semibold mb-4">✨ For you</p>
        <h2 className="font-display text-4xl md:text-5xl text-foreground mb-3">
          Daily Dose of{" "}
          <span className="text-gradient-love italic">Love</span> 💌
        </h2>
        <p className="text-muted-foreground italic font-display">
          Click the envelope for your birthday message...
        </p>
      </motion.div>

      {/* Envelope / Message */}
      <div className="relative z-10 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="envelope"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              whileHover={{ scale: 1.08, rotate: 3 }}
              className="relative flex flex-col items-center"
            >
              {/* Envelope card */}
              <div
                className="w-64 h-44 rounded-2xl shadow-glass relative overflow-hidden flex items-end justify-center pb-6 cursor-pointer"
                style={{
                  background: "linear-gradient(160deg, hsl(258, 25%, 16%) 0%, hsl(258, 20%, 12%) 100%)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {/* Envelope flap */}
                <div
                  className="absolute top-0 left-0 right-0 h-24"
                  style={{
                    background:
                      "linear-gradient(160deg, hsl(340, 80%, 30%) 0%, hsl(340, 80%, 22%) 100%)",
                    clipPath: "polygon(0 0, 100% 0, 50% 65%)",
                  }}
                />

                {/* Wax seal */}
                <motion.div
                  className="absolute top-12 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-rose-lg z-10"
                  style={{
                    background: "linear-gradient(135deg, hsl(340, 80%, 55%), hsl(340, 80%, 40%))",
                  }}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="text-sm">❤️</span>
                </motion.div>

                {/* Bottom envelope body */}
                <Mail className="w-10 h-10 text-primary/40" />
              </div>

              <p className="mt-4 text-sm text-muted-foreground/60 italic">Tap to open ✨</p>
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ scale: 0.5, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
              className="relative max-w-sm w-full"
            >
              {/* Message card */}
              <div
                className="relative p-8 rounded-3xl shadow-glass"
                style={{
                  background:
                    "linear-gradient(160deg, hsl(258, 25%, 14%) 0%, hsl(280, 20%, 11%) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                {/* Close button */}
                <button
                  id="message-close-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-muted-foreground" />
                </button>

                {/* Floating emoji */}
                <motion.span
                  className="absolute -top-5 -right-4 text-4xl drop-shadow-lg"
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  💖
                </motion.span>

                {/* Message text */}
                <p className="font-script text-3xl text-primary leading-relaxed text-center mb-6 mt-2">
                  "{message}"
                </p>

                {/* Divider */}
                <div className="section-divider mb-5" />

                <p className="text-xs text-center text-muted-foreground/50 uppercase tracking-widest">
                  With all my love ❤️
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default DailyMessageSection;
