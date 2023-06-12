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
      theme: {
        extend: {
          keyframes: {
            shimmer: {
              "100%": {
                transform: "translateX(100%)",
              },
            },
          },
        },
      },
      colors: {
        white: "#ffffff",
        primary: "#0068D9",
        secondary: "#F0F7FF",
      },

      // height: {
      //   "h-auto": "auto",
      //   "h-1/2": " 50%",
      //   "h-1/3": " 33.333333%",
      //   "h-2/3": " 66.666667%",
      //   "h-1/4": " 25%",
      //   "h-2/4": " 50%",
      //   "h-3/4	": " 75%",
      //   "h-1/5": " 20%",
      //   "h-2/5	": " 40%",
      //   "h-3/5": " 60%",
      //   "h-4/5": " 80%",

      //   "h-full": " 100%",
      //   "h-screen": " 100vh",
      //   "h-min": " min-content",
      //   "h-max": " max-content",
      //   "h-fit": " fit-content",
      // },
      // width: {
      //   "w-auto": "auto",
      //   "w-1/2": " 50%",
      //   "w-1/3": " 33.333333%",
      //   "w-2/3": " 66.666667%",
      //   "w-1/4": " 25%",
      //   "w-2/4": " 50%",
      //   "w-3/4	": " 75%",
      //   "w-1/5": " 20%",
      //   "w-2/5	": " 40%",
      //   "w-3/5": " 60%",
      //   "w-4/5": " 80%",
      //   "w-1/6": " 16.666667%",
      //   "w-2/6": " 33.333333%",
      //   "w-3/6": " 50%",
      //   "w-4/6": " 66.666667%",
      //   "w-5/6	": " 83.333333%",
      //   "w-full": " 100%",
      //   "w-screen": " 100vw",
      //   "w-min": " min-content",
      //   "w-max": " max-content",
      //   "w-fit": " fit-content",
      // },
    },
  },
  plugins: [require(`@tailwindcss/forms`)],
};
