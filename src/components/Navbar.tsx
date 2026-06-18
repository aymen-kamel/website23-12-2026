import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

const navItems = [
  { emoji: "🏠", label: "Home", href: "#hero" },
  { emoji: "💬", label: "Our Story", href: "#story" },
  { emoji: "📸", label: "Memories", href: "#memories" },
  { emoji: "🗺️", label: "Bucket List", href: "#bucket-list" },
  { emoji: "💌", label: "Love Letter", href: "#love-letter" },
];

const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 60);
      if (currentY < 80) {
        setVisible(true);
      } else if (currentY > lastScrollY + 10) {
        setVisible(false);
      } else if (currentY < lastScrollY - 10) {
        setVisible(true);
      }
      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
          role="navigation"
          aria-label="Main navigation"
        >
          <div
            className={`flex items-center gap-1 px-3 py-2 rounded-full transition-all duration-300 ${
              scrolled
                ? "glass-strong shadow-glass"
                : "glass shadow-glass"
            }`}
          >
            {/* Logo */}
            <motion.div
              className="flex items-center gap-1.5 px-3 py-1.5 mr-1"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
              >
                <Heart className="w-4 h-4 fill-primary text-primary" />
              </motion.div>
              <span className="font-script text-lg text-primary leading-none">R</span>
            </motion.div>

            {/* Divider */}
            <div className="w-px h-5 bg-white/10 mx-1" />

            {/* Nav Items */}
            {navItems.map((item) => (
              <motion.button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="relative flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={item.label}
                title={item.label}
              >
                <span className="text-base">{item.emoji}</span>
                <span className="hidden sm:block text-xs font-medium">{item.label}</span>
                {/* Hover glow */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary/10"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
