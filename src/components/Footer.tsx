import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden py-16 px-4">
      {/* Top rose-petal divider */}
      <div className="section-divider mb-16" />

      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-gold/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Animated heart */}
        <motion.div
          className="flex justify-center mb-6"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 0.8 }}
        >
          <Heart className="w-8 h-8 fill-primary text-primary" />
        </motion.div>

        {/* Script title */}
        <motion.p
          className="font-script text-4xl text-primary mb-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Made with ∞ love for Ranoummm
        </motion.p>

        {/* Quote */}
        <motion.p
          className="font-display italic text-muted-foreground text-sm md:text-base mb-8 max-w-sm mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          "Every love story is beautiful, but ours is my favorite."
        </motion.p>

        {/* Floating sparkles row */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-8 text-muted-foreground/40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Sparkles className="w-3 h-3" />
          <span className="text-xs uppercase tracking-[0.3em] font-semibold">
            Forever & Always
          </span>
          <Sparkles className="w-3 h-3" />
        </motion.div>

        {/* Bottom line */}
        <motion.p
          className="text-xs text-muted-foreground/40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          © {currentYear} — Crafted with every beat of my heart ❤️
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
