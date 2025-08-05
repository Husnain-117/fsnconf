import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate"

const config = {
  darkMode: ["class", "media"],
  content: [
    "./src/**/*.{ts,tsx}",
    "./index.html",
  ],
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
      colors: {
        brand: {
          dark: "#25274D",  // Deep Navy
          slate: "#464866", // Slate Gray
          light: "#AAABB8", // Light Gray
          cyan: "#2E9CCA",  // Bright Cyan accent
          teal: "#29648A",  // Deep Teal accent
        },
        // Custom colors for your header
        'primary-dark': '#25274D',
        'secondary-grey': '#464866',
        'light-grey': '#AAABB8',
        'accent-blue': '#2E9CCA',
        'accent-teal': '#29648A',
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },

        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Professional Conference Color Palette
        conference: {
          primary: "#320E3B",    // Russian Violet - Main brand color
          secondary: "#4C2A85",  // Tekhelet - Secondary actions
          accent: "#6B7FD7",     // Glaucous - Highlights and links
          light: "#BCEDF6",     // Non Photo Blue - Light backgrounds
          success: "#DDFBD2",   // Nyanza - Success states
          50: "#F8F6FF",        // Very light tint
          100: "#EFEAFF",       // Light tint
          200: "#DDD4FF",       // Lighter
          300: "#C4B5FF",       // Light
          400: "#9B85FF",       // Medium light
          500: "#6B7FD7",       // Base (Glaucous)
          600: "#4C2A85",       // Medium dark (Tekhelet)
          700: "#320E3B",       // Dark (Russian Violet)
          800: "#2A0B32",       // Darker
          900: "#1F0825",       // Darkest
          950: "#140518",       // Very dark
        },
        // Semantic color overrides for professional look
        primary: {
          DEFAULT: "#320E3B",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#4C2A85",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#6B7FD7",
          foreground: "#FFFFFF",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config

export default config
