import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const navItems = [
  { emoji: "🏠", label: "Home", href: "hero" },
  { emoji: "💬", label: "Story", href: "story" },
  { emoji: "📸", label: "Memories", href: "memories" },
  { emoji: "🗺️", label: "Plans", href: "bucket-list" },
  { emoji: "💌", label: "Letter", href: "love-letter" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Highlight active section
      for (const item of [...navItems].reverse()) {
        const el = document.getElementById(item.href);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveHref(item.href);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 pb-2 px-3"
      style={{
        background: scrolled
          ? "linear-gradient(to bottom, rgba(10,6,20,0.95) 70%, transparent)"
          : "linear-gradient(to bottom, rgba(10,6,20,0.6) 60%, transparent)",
        backdropFilter: scrolled ? "blur(16px)" : "blur(8px)",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "blur(8px)",
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-between w-full max-w-sm">
        {/* Logo / brand */}
        <button
          onClick={() => handleNavClick("hero")}
          className="flex items-center gap-1.5 px-2 py-1 rounded-full touch-manipulation"
          style={{ minHeight: 44 }}
          aria-label="Go to top"
        >
          <motion.div
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.5 }}
          >
            <Heart className="w-4 h-4 fill-primary text-primary" />
          </motion.div>
          <span className="font-script text-xl text-primary leading-none">Ranoummm</span>
        </button>

        {/* Nav buttons — emoji icons only, always visible */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeHref === item.href;
            return (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                aria-label={item.label}
                title={item.label}
                className="relative flex items-center justify-center rounded-full transition-all duration-200 touch-manipulation"
                style={{
                  width: 44,
                  height: 44,
                  background: isActive
                    ? "hsl(340 80% 65% / 0.18)"
                    : "transparent",
                  border: isActive
                    ? "1px solid hsl(340 80% 65% / 0.35)"
                    : "1px solid transparent",
                }}
              >
                <span className="text-xl leading-none">{item.emoji}</span>
                {/* Active dot */}
                {isActive && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
