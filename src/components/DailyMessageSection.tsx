import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Mail, Heart } from "lucide-react";

const messages = [
  "I'm so sorry for everything. I never meant to hurt the person I love most. 💔",
  "I miss your smile every single second of the day. Please forgive me. 😔",
  "I was stupid, and I hate myself for what I did to us. I want to fix this. ❤️‍🩹",
  "You are the best thing that ever happened to me, and I threw it away. I'm so sorry. 🥀",
  "I promise to spend every day making it up to you if you give me one more chance. 🕯️",
  "My life feels empty without you. I'm truly sorry, Ranoummm. 🖤",
  "I've learned my lesson the hardest way possible. I need you back. 🙏",
];

const DailyMessageSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Pick a random message for today
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    setMessage(randomMsg);
  }, []);

  return (
    <section className="min-h-[50vh] flex flex-col items-center justify-center px-4 py-20 bg-gradient-to-b from-transparent to-primary/5 overflow-hidden">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-romantic text-4xl md:text-5xl text-primary mb-2">
          A Message from My Heart 🥀
        </h2>
        <p className="text-muted-foreground italic">
          Click the envelope to see my apology for today...
        </p>
      </motion.div>

      <div className="relative cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="envelope"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0, rotate: -10 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="bg-card w-48 h-32 rounded-lg shadow-2xl flex items-center justify-center border-t-[40px] border-x-[20px] border-b-[20px] border-t-primary/10 border-x-primary/5 border-b-primary/5 relative"
            >
              <div className="absolute -top-10 text-primary animate-pulse">
                <Heart className="w-10 h-10 fill-primary opacity-50" />
              </div>
              <Mail className="w-16 h-16 text-primary/30" />
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="bg-card max-w-sm w-full p-8 rounded-[2rem] shadow-2xl border-2 border-primary/20 text-center relative z-10"
            >
              <motion.div 
                className="absolute -top-6 -right-6"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <span className="text-5xl drop-shadow-md">🥀</span>
              </motion.div>
              
              <p className="font-romantic text-3xl text-primary mb-6 leading-relaxed">
                "{message}"
              </p>
              
              <button 
                className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors underline decoration-dotted"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
              >
                Close it
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default DailyMessageSection;
