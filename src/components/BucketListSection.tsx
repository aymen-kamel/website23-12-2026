import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { useState } from "react";

const initialItems = [
  { id: 1, icon: "🌅", text: "Watch a sunrise on the beach (again)", completed: false, rot: -2 },
  { id: 2, icon: "✈️", text: "Finally travel the world with you", completed: false, rot: 3 },
  { id: 3, icon: "🧺", text: "Have that picnic we always talked about", completed: false, rot: -4 },
  { id: 4, icon: "👩‍🍳", text: "Cook a 3-course dinner for you", completed: false, rot: 2 },
  { id: 5, icon: "🚗", text: "Go on a road trip just to talk", completed: false, rot: -3 },
  { id: 6, icon: "💍", text: "Grow old together and never let go", completed: false, rot: 4 },
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

  const completedCount = items.filter((i) => i.completed).length;
  const progressPct = (completedCount / items.length) * 100;

  return (
    <section
      id="bucket-list"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-24 section-alt relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-gold/5 blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/6 blur-[100px]" />
      </div>

      {/* Heading */}
      <motion.div
        className="text-center mb-6 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-xs uppercase tracking-[0.3em] text-gold font-semibold mb-4">Our Future</p>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
          Things We{" "}
          <span className="text-gradient-love italic">WILL</span> Do Together ❤️
        </h2>
        <p className="text-muted-foreground italic font-display text-base max-w-sm mx-auto">
          Our future is so bright. I can't wait to check all of these off with you!
        </p>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className="relative z-10 w-full max-w-md mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-2 text-xs text-muted-foreground">
          <span>Progress</span>
          <span className="text-primary font-semibold">{completedCount} / {items.length}</span>
        </div>
        <div
          className="h-2 rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, hsl(var(--romantic)), hsl(var(--gold)))",
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </motion.div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full relative z-10">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            className="relative h-64 cursor-pointer"
            style={{ perspective: 1200, touchAction: "manipulation" }}
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, type: "spring", stiffness: 100 }}
          >
            <motion.div
              className="w-full h-full relative"
              style={{ transformStyle: "preserve-3d" }}
              initial={{ rotate: item.rot }}
              whileHover={{ scale: 1.04, rotate: 0 }}
              animate={{ rotateY: item.completed ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 60, damping: 15 }}
              onClick={() => toggleItem(item.id)}
            >
              {/* Front */}
              <div
                className="absolute inset-0 rounded-3xl p-6 flex flex-col items-center justify-center text-center"
                style={{
                  backfaceVisibility: "hidden",
                  background:
                    "linear-gradient(160deg, hsl(258, 25%, 14%) 0%, hsl(258, 20%, 10%) 100%)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                }}
              >
                {/* Icon */}
                <div
                  className="text-5xl mb-4 w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  {item.icon}
                </div>
                <p className="text-base font-medium text-foreground/90 leading-snug">{item.text}</p>

                {/* Tap hint */}
                <p className="text-xs text-muted-foreground/30 mt-3 uppercase tracking-wider">Tap to mark</p>

                {/* Celebration burst */}
                <AnimatePresence>
                  {celebratingId === item.id && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center pointer-events-none rounded-3xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 2.5, opacity: [0, 0.3, 0] }}
                        transition={{ duration: 1.2 }}
                      >
                        <Heart className="w-24 h-24 text-primary fill-primary" />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Back (completed) */}
              <div
                className="absolute inset-0 rounded-3xl p-6 flex flex-col items-center justify-center text-center"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  background:
                    "linear-gradient(135deg, hsl(340, 80%, 22%) 0%, hsl(340, 80%, 14%) 100%)",
                  border: "1px solid hsl(340 80% 40% / 0.4)",
                  boxShadow: "0 8px 32px hsl(340 80% 65% / 0.2)",
                }}
              >
                <motion.div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                  style={{ background: "hsl(340 80% 55% / 0.2)" }}
                  initial={{ scale: 0 }}
                  animate={{ scale: item.completed ? 1 : 0 }}
                  transition={{ delay: 0.3, type: "spring" }}
                >
                  <Heart className="w-7 h-7 text-primary fill-primary" />
                </motion.div>
                <h3 className="font-script text-3xl text-primary mb-2">I'm so excited for this!</h3>
                <p className="text-sm text-foreground/70">{item.text}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BucketListSection;
