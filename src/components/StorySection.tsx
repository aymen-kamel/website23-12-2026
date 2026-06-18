import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { MessageCircleHeart } from "lucide-react";

const chatMessages = [
  { sender: "him", text: "I need to tell you something I’ve believed for a long time... 💖", delay: 1000 },
  { sender: "her", text: "What is it? Tell me... 🥰", delay: 2500 },
  { sender: "him", text: "You were always mine. Even before we were together. ✨", delay: 4000 },
  { sender: "her", text: "I think I’ve always known that too... 🌹", delay: 5500 },
  { sender: "him", text: "And nothing in this world will ever change that. I love you, Ranoummm. ❤️", delay: 7000 },
];

const StorySection = () => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    if (currentIndex < chatMessages.length - 1) {
      const nextDelay =
        chatMessages[currentIndex + 1]?.delay -
        (currentIndex >= 0 ? chatMessages[currentIndex].delay : 0) || 1500;
      const timer = setTimeout(() => setCurrentIndex((prev) => prev + 1), nextDelay);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, started]);

  return (
    <section
      id="story"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-24 section-dark relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-primary/6 blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/4 w-60 h-60 rounded-full bg-gold/5 blur-[80px]" />
      </div>

      {/* Heading */}
      <motion.div
        className="text-center mb-14 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onViewportEnter={() => setStarted(true)}
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <MessageCircleHeart className="w-5 h-5 text-primary" />
          <span className="text-xs uppercase tracking-[0.3em] text-primary/70 font-semibold">Our Story</span>
        </div>
        <h2 className="font-display text-4xl md:text-6xl text-foreground mb-3">
          Our Story{" "}
          <span className="text-gradient-love italic">Continues...</span>
        </h2>
        <p className="text-muted-foreground italic font-display text-base md:text-lg max-w-sm mx-auto">
          The best chapters are the ones we're writing right now.
        </p>
      </motion.div>

      {/* Phone frame */}
      <motion.div
        className="relative w-full max-w-sm"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        {/* Phone shell */}
        <div
          className="relative rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
          style={{
            background: "linear-gradient(135deg, hsl(258, 25%, 13%) 0%, hsl(258, 20%, 9%) 100%)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {/* Phone top bar */}
          <div className="flex items-center justify-between px-6 pt-5 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-romantic-dark flex items-center justify-center text-sm font-bold text-white shadow-rose">
                R
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground leading-tight">Ranoummm 💖</p>
                <p className="text-[10px] text-primary/60">Online</p>
              </div>
            </div>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-primary/40" />
              <div className="w-2 h-2 rounded-full bg-primary/20" />
              <div className="w-2 h-2 rounded-full bg-primary/10" />
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/5 mx-4" />

          {/* Chat area */}
          <div className="p-5 min-h-[380px] flex flex-col">
            <div className="space-y-4 flex-grow">
              <AnimatePresence>
                {chatMessages.slice(0, currentIndex + 1).map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.85, x: msg.sender === "him" ? -30 : 30 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 120, damping: 15 }}
                    className={`flex ${msg.sender === "him" ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                        msg.sender === "him"
                          ? "text-foreground rounded-bl-sm"
                          : "text-foreground rounded-br-sm"
                      }`}
                      style={
                        msg.sender === "him"
                          ? {
                              background: "rgba(255,255,255,0.07)",
                              border: "1px solid rgba(255,255,255,0.1)",
                            }
                          : {
                              background:
                                "linear-gradient(135deg, hsl(340, 80%, 55%) 0%, hsl(340, 80%, 45%) 100%)",
                            }
                      }
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              {currentIndex < chatMessages.length - 1 && started && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div
                    className="flex gap-1.5 items-center px-4 py-3 rounded-2xl rounded-bl-sm"
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    {[0, 0.2, 0.4].map((d) => (
                      <motion.div
                        key={d}
                        className="w-1.5 h-1.5 rounded-full bg-primary/50"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.7, repeat: Infinity, delay: d }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Final message */}
            {currentIndex === chatMessages.length - 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 pt-5 border-t border-white/5 text-center"
              >
                <p className="font-script text-2xl text-primary">
                  You were always mine. You always will be. 🌹❤️
                </p>
              </motion.div>
            )}
          </div>

          {/* Phone bottom bar */}
          <div className="px-5 pb-5 pt-2">
            <div
              className="flex items-center gap-3 px-4 py-2.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <span className="text-sm text-muted-foreground/40 flex-1">Type a message...</span>
              <span className="text-primary text-lg">❤️</span>
            </div>
          </div>
        </div>

        {/* Phone glow */}
        <div className="absolute -inset-4 rounded-[3rem] bg-primary/8 blur-[40px] -z-10" />
      </motion.div>
    </section>
  );
};

export default StorySection;
