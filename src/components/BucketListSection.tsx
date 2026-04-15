import { motion, AnimatePresence } from "framer-motion";
import { Check, Heart } from "lucide-react";
import { useState } from "react";

const initialItems = [
  { id: 1, icon: "🌅", text: "Watch a sunrise on the beach", completed: true, rot: -2 },
  { id: 2, icon: "✈️", text: "Travel to another country together", completed: false, rot: 3 },
  { id: 3, icon: "🧺", text: "Have a picnic in a park", completed: true, rot: -4 },
  { id: 4, icon: "👩‍🍳", text: "Cook a 3-course dinner together", completed: false, rot: 2 },
  { id: 5, icon: "🚗", text: "Go on a spontaneous road trip", completed: false, rot: -3 },
  { id: 6, icon: "💍", text: "Say 'I do' one day...", completed: false, rot: 4 },
];

const BucketListSection = () => {
  const [items, setItems] = useState(initialItems);
  const [celebratingId, setCelebratingId] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          if (!item.completed) {
            setCelebratingId(id);
            setTimeout(() => setCelebratingId(null), 1500);
          }
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-love/5 overflow-hidden">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-romantic text-4xl md:text-6xl text-gradient-love mb-4 drop-shadow-sm">
          Our Future Vision Board ✨
        </h2>
        <p className="text-muted-foreground italic text-lg max-w-md mx-auto">
          Tap any card to mark our dreams as reality! ❤️
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl w-full perspective-[2000px]">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
            className="relative h-56 w-full"
            style={{ perspective: 1000 }}
          >
            <motion.div
              className="w-full h-full cursor-pointer relative"
              style={{
                transformStyle: "preserve-3d",
              }}
              initial={{ rotate: item.rot }}
              whileHover={{ scale: 1.05, rotate: 0 }}
              animate={{ rotateY: item.completed ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 60, damping: 15 }}
              onClick={() => toggleItem(item.id)}
            >
              {/* Front of Card */}
              <div
                className="absolute inset-0 bg-card shadow-xl rounded-3xl p-6 flex flex-col items-center justify-center text-center border border-border/60"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="text-6xl mb-4 bg-secondary/30 p-4 rounded-full shadow-inner">
                  {item.icon}
                </div>
                <p className="text-lg font-medium text-foreground leading-tight">
                  {item.text}
                </p>

                <AnimatePresence>
                  {celebratingId === item.id && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 2 }}
                      exit={{ opacity: 0 }}
                    >
                      <Heart className="w-32 h-32 text-primary fill-primary opacity-30" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Back of Card (Completed) */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-primary/10 to-romantic-light/40 shadow-xl rounded-3xl p-6 flex flex-col items-center justify-center text-center border-2 border-primary/40"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <motion.div 
                  className="bg-white p-4 rounded-full shadow-lg mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: item.completed ? 1 : 0 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <Check className="w-10 h-10 text-primary" strokeWidth={3} />
                </motion.div>
                <h3 className="font-romantic text-4xl text-primary mb-2">Done!</h3>
                <p className="text-sm font-semibold text-foreground/80">{item.text}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BucketListSection;
