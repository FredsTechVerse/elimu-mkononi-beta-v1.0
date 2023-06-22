/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    screens: {
      phone: "300px",
      tablet: "568px",
      laptop: "1024px",
      desktop: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        primary: "#006adb",
        secondary: "#F0F7FF",
        card: "#F1F1F1",
      },
    },
  },
  plugins: [require(`@tailwindcss/forms`)],
};
