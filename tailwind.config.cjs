/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    fontFamily: {
      primary: ["Lexend Deca", "sans-serif"],
    },
    screens: {
      phone: "300px",
      tablet: "568px",
      laptop: "1025px",
    },
    extend: {
      colors: {
        primary: "#006adb",
        secondary: "#F0F7FF",
        card: "#F1F1F1",
      },
      aspectRatio: {
        "2/3": "2 / 3",
      },
    },
  },
  plugins: [require(`@tailwindcss/forms`)],
};
