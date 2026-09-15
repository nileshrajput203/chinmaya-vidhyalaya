/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
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
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        cinzel: ['Cinzel', 'serif'],
        mono: ['Space Grotesk', 'monospace'],
        display: ['Playfair Display', 'Georgia', 'serif'],
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
