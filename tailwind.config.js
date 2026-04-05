/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./hooks/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        base: {
          950: "#050505",
          900: "#0A0A0A",
          800: "#131313"
        },
        accent: {
          gold: "#F5B971",
          coral: "#FF7A59",
          mint: "#74E1C0"
        }
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.06), 0 18px 60px rgba(0,0,0,0.45)",
        card: "0 20px 60px rgba(0,0,0,0.35)"
      },
      backgroundImage: {
        "hero-mesh":
          "radial-gradient(circle at top, rgba(255,122,89,0.16), transparent 30%), radial-gradient(circle at 20% 20%, rgba(116,225,192,0.12), transparent 22%), radial-gradient(circle at 80% 0%, rgba(245,185,113,0.18), transparent 26%)"
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        pulseSoft: "pulseSoft 6s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": {
            transform: "translateY(0px)"
          },
          "50%": {
            transform: "translateY(-12px)"
          }
        },
        pulseSoft: {
          "0%, 100%": {
            opacity: "0.65"
          },
          "50%": {
            opacity: "1"
          }
        }
      }
    }
  },
  plugins: []
};

