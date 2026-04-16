import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Mail, Heart } from "lucide-react";

const messages = [
  "Good morning beautiful! Just thinking about you ❤️",
  "You make every day brighter just by being in it ✨",
  "I can't wait to see your smile again! 🥰",
  "You're the best thing that ever happened to me 💙❤️",
  "Hope you have a day as amazing as you are 🌸",
  "Sending you a million virtual hugs and kisses! 😘",
  "You're my favorite notification 📱❤️",
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
    <section className="min-h-[50vh] flex flex-col items-center justify-center px-4 py-20 bg-gradient-to-b from-transparent to-love/10 overflow-hidden">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-romantic text-4xl md:text-5xl text-gradient-love mb-2">
          Your Daily Message 💌
        </h2>
        <p className="text-muted-foreground italic">
          Tap the envelope to see what I have to say today!
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
              className="bg-card w-48 h-32 rounded-lg shadow-xl flex items-center justify-center border-t-[40px] border-x-[20px] border-b-[20px] border-t-primary/20 border-x-primary/10 border-b-primary/5 relative"
            >
              <div className="absolute -top-10 text-primary animate-bounce">
                <Heart className="w-10 h-10 fill-primary" />
              </div>
              <Mail className="w-16 h-16 text-primary/50" />
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="bg-white max-w-sm w-full p-8 rounded-[2rem] shadow-2xl border-2 border-primary/20 text-center relative z-10"
            >
              <motion.div 
                className="absolute -top-6 -right-6"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <span className="text-5xl drop-shadow-md">✨</span>
              </motion.div>
              
              <p className="font-romantic text-3xl text-primary mb-6 leading-relaxed">
                "{message}"
              </p>
              
              <button 
                className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors underline decoration-wavy"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
              >
                Close it for now
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default DailyMessageSection;
