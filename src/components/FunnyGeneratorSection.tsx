import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { RefreshCw, Sparkles } from "lucide-react";

const reasons = [
  "Because even when we were apart, you never left my heart. 💖",
  "Because the moment I saw you, I knew you were mine. ✨",
  "Because no matter what happens, my heart always finds its way back to you. 🌹",
  "Because loving you has never been a choice — it's just who I am. ❤️",
  "Because you were written into my story before I even knew it. 💫",
  "Because distance, time, and the whole world couldn't keep me from you. 🌍",
  "Because I could search forever and never find someone more perfect for me. 💌",
  "Because you were always mine. You just needed time to see it too. 💖",
];

const FunnyGeneratorSection = () => {
  const [reason, setReason] = useState<string | null>(null);
  const [key, setKey] = useState(0);
  const [count, setCount] = useState(0);

  const generate = () => {
    let next: string;
    do {
      next = reasons[Math.floor(Math.random() * reasons.length)];
    } while (next === reason && reasons.length > 1);
    setReason(next);
    setKey((k) => k + 1);
    setCount((c) => c + 1);
  };

  return (
    <section
      id="love-reasons"
      className="min-h-[55vh] flex flex-col items-center justify-center px-4 py-24 section-dark relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-gold/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-primary/6 blur-[80px]" />
      </div>

      {/* Heading */}
      <motion.div
        className="text-center mb-12 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-gold" />
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold">
            Reason #{count === 0 ? "?" : count} of ∞
          </span>
          <Sparkles className="w-4 h-4 text-gold" />
        </div>
        <h2 className="font-display text-4xl md:text-5xl text-foreground mb-3">
          Why You Were{" "}
          <span className="text-gradient-love italic">Always Mine</span>... 💖
        </h2>
        <p className="text-muted-foreground italic font-display">
          The universe had reasons. Here's one of them...
        </p>
      </motion.div>

      {/* Generator card */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center gap-6">
        {/* Button */}
        <motion.button
          id="love-reason-btn"
          onClick={generate}
          className="btn-primary flex items-center gap-2.5 text-base px-9 py-4 font-bold"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
        >
          <RefreshCw className="w-4 h-4" />
          Tell me more ❤️
        </motion.button>

        {/* Reason display */}
        <div className="relative min-h-[140px] w-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            {reason ? (
              <motion.div
                key={key}
                className="w-full"
                initial={{ opacity: 0, y: 25, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -25, scale: 0.95 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 150 }}
              >
                <div
                  className="relative p-8 rounded-3xl text-center shadow-glass"
                  style={{
                    background:
                      "linear-gradient(160deg, hsl(258, 25%, 14%) 0%, hsl(280, 20%, 11%) 100%)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {/* Corner decorations */}
                  <span className="absolute top-3 left-4 text-primary/30 text-2xl">❝</span>
                  <span className="absolute bottom-3 right-4 text-primary/30 text-2xl">❞</span>

                  <p className="font-script text-2xl md:text-3xl text-primary leading-relaxed px-4">
                    {reason}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.p
                className="text-muted-foreground/40 italic font-display text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Press the button to reveal a reason...
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default FunnyGeneratorSection;
