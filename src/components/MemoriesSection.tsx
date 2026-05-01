import { motion } from "framer-motion";

const memories = [
  { type: "image", src: "/beach.jpg", caption: "Our sunset at the beach 🏖️", date: "August 2025" },
  { type: "image", src: "/movie.jpeg", caption: "Movie nights at Pathé 🍿", date: "October 2025" },
  { type: "image", src: "/500a1223-87c9-4dc1-95ff-daecb1047c5f.jpg", caption: "Sweet moments at the café ☕", date: "January 2025", className: "rotate-90 md:rotate-0" },
  { type: "video", src: "/Our special moment.mp4", caption: "Our special moment 🎥", date: "23/12/2025" },
  { type: "video", src: "/When I realized it was more.mp4", caption: "When I realized it was more", date: "Forever" },
  { type: "image", src: "/classico.jpg", caption: " The Clásico where Barca won 💙❤️ (Our first talk!)", date: "26/10/2024" },
  ,
];

const MemoriesSection = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-background/50">
      <motion.h2
        className="font-romantic text-4xl md:text-5xl text-primary text-center mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Moments I Miss Every Day 📸
      </motion.h2>
      
      <p className="text-muted-foreground text-center max-w-md mb-16 italic">
        I look at these photos and videos every night, wishing I could go back and be the man you deserve.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {memories.map((mem, i) => (
          <motion.div
            key={i}
            className="group relative bg-card rounded-3xl overflow-hidden shadow-2xl border border-white/5 backdrop-blur-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -12, scale: 1.02 }}
          >
            <div className="aspect-[4/5] w-full overflow-hidden flex items-center justify-center bg-muted/20 relative">
              {mem.type === "image" && (
                <img
                  src={mem.src}
                  alt={mem.caption}
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0 ${mem.className || ""}`}
                />
              )}
              {mem.type === "video" && (
                <video
                  src={mem.src}
                  controls
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all"
                  poster="/placeholder.svg"
                />
              )}
              {mem.type === "emoji" && (
                <span className="text-8xl drop-shadow-2xl animate-pulse-slow">{mem.emoji}</span>
              )}

              {mem.date && (
                <div className="absolute top-4 left-4 bg-background/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-primary shadow-sm">
                  {mem.date}
                </div>
              )}
            </div>

            <div className="p-6 bg-gradient-to-t from-background via-background/95 to-transparent">
              <p className="text-lg text-center font-medium text-foreground leading-tight">
                {mem.caption}
              </p>
              {mem.date && (
                <p className="text-xs text-center text-muted-foreground mt-2 uppercase tracking-widest font-bold">
                  {mem.date}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MemoriesSection;
