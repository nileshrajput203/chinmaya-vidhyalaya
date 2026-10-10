/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border, 38 18% 88%))",
        background: "hsl(var(--background, 43 40% 98%))",
        foreground: "hsl(var(--foreground, 210 14% 11%))",
        muted: {
          DEFAULT: "hsl(var(--muted, 40 20% 95%))",
          foreground: "hsl(var(--muted-foreground, 0 0% 45%))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary, 24 80% 49%))",
          foreground: "hsl(var(--primary-foreground, 0 0% 100%))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary, 40 20% 95%))",
          foreground: "hsl(var(--secondary-foreground, 210 14% 11%))",
        },
        card: {
          DEFAULT: "hsl(var(--card, 0 0% 100%))",
          foreground: "hsl(var(--card-foreground, 210 14% 11%))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive, 0 84% 60%))",
          foreground: "hsl(var(--destructive-foreground, 0 0% 98%))",
        },
        ring: "hsl(var(--ring, 24 80% 49%))",
        input: "hsl(var(--input, 38 18% 88%))",
        palette: {
          teal: "#64C9CF",
          tealLight: "#8EE0E4",
          tealSoft: "#BAECEF",
          cream: "#FDE49C",
          creamLight: "#FEECB8",
          creamSoft: "#FFF7DF",
          amber: "#FFB740",
          amberLight: "#FFC769",
          amberSoft: "#FFDA9B",
          terracotta: "#DF711B",
          terracottaLight: "#E8873E",
          terracottaDark: "#C45B0E",
        },
        brand: {
          navy: "#0B1D30",
          navyMuted: "#12304A",
          navyLight: "#1B4368",
          blue: "#64C9CF",
          teal: "#64C9CF",
          ochre: "#DF711B",
          ochreDark: "#C45B0E",
          gold: "#FFB740",
          cream: "#FFF7DF",
          butter: "#FDE49C",
          ivory: "#FCFBF7",
          charcoal: "#181C20",
          charcoalLight: "#363C44",
          border: "#E7E2D8",
          borderDark: "#303A44"
        }
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
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        serif: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        cinzel: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
        display: ['Archivo Black', 'Plus Jakarta Sans', 'sans-serif'],
        condensed: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        header: '0 4px 24px rgba(11, 29, 48, 0.06)',
        card: '0 4px 20px -2px rgba(11, 29, 48, 0.05)',
        cardHover: '0 20px 40px -8px rgba(11, 29, 48, 0.12)',
        float: '0 30px 60px -12px rgba(11, 29, 48, 0.18)',
        glow: '0 0 40px rgba(217, 119, 69, 0.25)',
      }
    },
  },
  plugins: [],
}

