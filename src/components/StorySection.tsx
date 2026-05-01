import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const chatMessages = [
  { sender: "him", text: "Everything started so perfectly that night of El Clásico... ⚽", delay: 1000 },
  { sender: "her", text: "It really did. I thought we were forever. ❤️", delay: 2500 },
  { sender: "him", text: "But then I did the unthinkable. I betrayed your trust. 💔", delay: 4000 },
  { sender: "her", text: "I can't believe you did that to us... 😔", delay: 5500 },
  { sender: "him", text: "I'm a fool, and I'd give anything to go back and change it.", delay: 7000 },
];

const StorySection = () => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    if (currentIndex < chatMessages.length - 1) {
      const timer = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, chatMessages[currentIndex + 1]?.delay - (currentIndex >= 0 ? chatMessages[currentIndex].delay : 0) || 1500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, started]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-gradient-to-b from-background to-primary/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onViewportEnter={() => setStarted(true)}
        className="text-center mb-16"
      >
        <h2 className="font-romantic text-4xl md:text-6xl text-primary mb-4">
          How I Ruined Our Story...
        </h2>
        <p className="text-muted-foreground italic">My biggest regret began where our best memories were made.</p>
      </motion.div>

      <div className="max-w-md w-full relative bg-card/40 backdrop-blur-xl rounded-[2rem] p-8 shadow-2xl border border-white/10 min-h-[450px] flex flex-col">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-romantic to-primary rounded-t-[2rem] opacity-50" />
        
        <div className="space-y-6 flex-grow overflow-hidden">
          <AnimatePresence>
            {chatMessages.slice(0, currentIndex + 1).map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8, x: msg.sender === "him" ? -50 : 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                className={`flex ${msg.sender === "him" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[80%] px-5 py-3 rounded-2xl text-sm md:text-base shadow-lg ${
                    msg.sender === "him"
                      ? "bg-primary/20 text-foreground border border-primary/20 rounded-bl-none"
                      : "bg-secondary text-foreground rounded-br-none"
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {currentIndex < chatMessages.length - 1 && started && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="flex justify-start gap-1 p-2"
            >
              <div className="w-2 h-2 bg-primary/30 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-primary/30 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 bg-primary/30 rounded-full animate-bounce [animation-delay:0.4s]" />
            </motion.div>
          )}
        </div>

        {currentIndex === chatMessages.length - 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 pt-6 border-t border-dashed border-primary/20 text-center"
          >
            <p className="font-romantic text-2xl text-primary animate-pulse italic">
              I'm fighting to win you back, because you're worth it. 🕯️
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default StorySection;
