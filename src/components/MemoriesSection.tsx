import { motion } from "framer-motion";

const memories = [
  {
    type: "image",
    src: "/beach.jpg",
    caption: "Our sunset at the beach 🏖️",
    date: "August 2025",
    size: "tall",
  },
  {
    type: "image",
    src: "/movie.jpeg",
    caption: "Movie nights at Pathé 🍿",
    date: "October 2025",
    size: "normal",
  },
  {
    type: "image",
    src: "/500a1223-87c9-4dc1-95ff-daecb1047c5f.jpg",
    caption: "Sweet moments at the café ☕",
    date: "January 2025",
    className: "rotate-90 md:rotate-0",
    size: "normal",
  },
  {
    type: "video",
    src: "/Our special moment.mp4",
    caption: "Our special moment 🎥",
    date: "23/12/2025",
    size: "wide",
  },
  {
    type: "video",
    src: "/When I realized it was more.mp4",
    caption: "When I realized it was more",
    date: "Forever",
    size: "normal",
  },
  {
    type: "image",
    src: "/classico.jpg",
    caption: "The Clásico where Barça won 💙❤️ (Our first talk!)",
    date: "26/10/2024",
    size: "normal",
  },
];

const MemoriesSection = () => {
  return (
    <section
      id="memories"
      className="min-h-screen flex flex-col items-center px-4 py-24 section-dark relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/3 w-72 h-72 rounded-full bg-gold/5 blur-[100px]" />
      </div>

      {/* Heading */}
      <motion.div
        className="text-center mb-16 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-xs uppercase tracking-[0.3em] text-gold font-semibold mb-4">📸 Our Gallery</p>
        <h2 className="font-display text-4xl md:text-6xl text-foreground mb-4">
          Moments I{" "}
          <span className="text-gradient-love italic">Cherish</span>
        </h2>
        <p className="text-muted-foreground italic font-display text-base max-w-sm mx-auto leading-relaxed">
          Looking at these memories makes me so happy we're together again. Can't wait to make a million more with you.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl w-full relative z-10">
        {memories.map((mem, i) => (
          <motion.div
            key={i}
            className="group relative rounded-3xl overflow-hidden shadow-glass cursor-pointer"
            style={{
              background: "hsl(258, 25%, 10%)",
              border: "1px solid rgba(255,255,255,0.07)",
              gridColumn: mem.size === "wide" ? "span 2" : undefined,
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, type: "spring", stiffness: 80 }}
            whileHover={{ y: -8, boxShadow: "0 24px 60px rgba(0,0,0,0.5), 0 0 40px hsl(340 80% 65% / 0.12)" }}
          >
            {/* Media */}
            <div
              className="w-full overflow-hidden flex items-center justify-center bg-black/20 relative"
              style={{ aspectRatio: mem.size === "wide" ? "16/9" : "4/5" }}
            >
              {mem.type === "image" && (
                <img
                  src={mem.src}
                  alt={mem.caption}
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 ${mem.className || ""}`}
                  loading="lazy"
                />
              )}
              {mem.type === "video" && (
                <video
                  src={mem.src}
                  controls
                  className="w-full h-full object-cover"
                  poster="/placeholder.svg"
                />
              )}

              {/* Date badge */}
              {mem.date && (
                <div
                  className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-primary shadow-sm"
                  style={{
                    background: "rgba(10,8,20,0.7)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {mem.date}
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-5">
                <p className="text-white font-display italic text-sm leading-snug translate-y-3 group-hover:translate-y-0 transition-transform duration-400">
                  {mem.caption}
                </p>
              </div>
            </div>

            {/* Caption bar */}
            <div className="px-5 py-4">
              <p className="text-sm font-medium text-foreground/80 leading-tight group-hover:text-foreground transition-colors">
                {mem.caption}
              </p>
              {mem.date && (
                <p className="text-xs text-muted-foreground/50 mt-1 uppercase tracking-widest">
                  {mem.date}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom quote */}
      <motion.p
        className="mt-16 font-script text-3xl text-primary/60 text-center relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Every photo tells a story worth a thousand words ❤️
      </motion.p>
    </section>
  );
};

export default MemoriesSection;
