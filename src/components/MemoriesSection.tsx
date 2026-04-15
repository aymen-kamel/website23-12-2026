import { motion } from "framer-motion";

const memories = [
  { emoji: "💬", caption: "Our first random conversation" },
  { emoji: "⚽", caption: "The Barca vs Real debate" },
  { emoji: "😂", caption: "Late night laughs" },
  { emoji: "❤️", caption: "When I realized it was more" },
  { emoji: "🌙", caption: "Endless midnight talks" },
  { emoji: "✨", caption: "From random talks… to something I never expected ❤️" },
];

const MemoriesSection = () => {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20">
      <motion.h2
        className="font-romantic text-4xl md:text-5xl text-gradient-love text-center mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Our Memories 📸
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl w-full">
        {memories.map((mem, i) => (
          <motion.div
            key={i}
            className="bg-card rounded-2xl p-6 flex flex-col items-center gap-3 shadow-md border border-border"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <span className="text-4xl">{mem.emoji}</span>
            <p className="text-sm text-center text-muted-foreground">{mem.caption}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MemoriesSection;
