import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        romantic: ['Great Vibes', 'cursive'],
        script: ['Great Vibes', 'cursive'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Brand tokens
        romantic: "hsl(var(--romantic))",
        "romantic-light": "hsl(var(--romantic-light))",
        "romantic-dark": "hsl(var(--romantic-dark))",
        love: "hsl(var(--love))",
        blush: "hsl(var(--blush))",
        gold: "hsl(var(--gold))",
        midnight: "hsl(var(--midnight))",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "shimmer-slide": {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 15px hsl(340 80% 65% / 0.3)" },
          "50%": { boxShadow: "0 0 35px hsl(340 80% 65% / 0.6), 0 0 60px hsl(340 80% 65% / 0.2)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "heartbeat": {
          "0%, 100%": { transform: "scale(1)" },
          "15%": { transform: "scale(1.2)" },
          "30%": { transform: "scale(1)" },
          "45%": { transform: "scale(1.1)" },
        },
        "sparkle": {
          "0%, 100%": { opacity: "0", transform: "scale(0) rotate(0deg)" },
          "50%": { opacity: "1", transform: "scale(1) rotate(180deg)" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "petal-fall": {
          "0%": { transform: "translateY(-10px) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "0.6" },
          "100%": { transform: "translateY(110vh) rotate(720deg)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "shimmer-slide": "shimmer-slide 3s linear infinite",
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
        "float": "float 4s ease-in-out infinite",
        "heartbeat": "heartbeat 1.5s ease-in-out infinite",
        "sparkle": "sparkle 2s ease-in-out infinite",
        "gradient-shift": "gradient-shift 4s ease infinite",
        "petal-fall": "petal-fall var(--duration, 8s) ease-in forwards",
      },
      boxShadow: {
        "rose": "0 4px 24px hsl(340 80% 65% / 0.35)",
        "rose-lg": "0 8px 40px hsl(340 80% 65% / 0.4), 0 0 80px hsl(340 80% 65% / 0.15)",
        "gold": "0 4px 24px hsl(42 95% 62% / 0.35)",
        "glass": "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        "card-hover": "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px hsl(340 80% 65% / 0.15)",
      },
      backgroundImage: {
        "romantic-gradient": "linear-gradient(135deg, hsl(340, 80%, 65%), hsl(42, 95%, 62%))",
        "dark-gradient": "linear-gradient(135deg, hsl(256, 28%, 7%), hsl(280, 25%, 10%))",
        "rose-shimmer": "linear-gradient(90deg, transparent, hsl(340 80% 65% / 0.3), hsl(42 95% 62% / 0.3), transparent)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
