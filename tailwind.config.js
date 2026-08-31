/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0B1D30",
          navyMuted: "#12304A",
          navyLight: "#1B4368",
          blue: "#2A6F97",
          ochre: "#D97745",
          ochreDark: "#C8652D",
          gold: "#D4AF37",
          cream: "#F7F3EB",
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
