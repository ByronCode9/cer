/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors: {
            lightBlack: "#1c1c24",
            black: "#13131a",
            gray: {100: "#FAFAFB", 400: "#292932"},
            primary: "#0062ff",
         },
         fontFamily: {
            sans: ["Inter", "sans-serif"],
         },
      },
      container: {
         center: true,
         padding: {
            DEFAULT: "1rem",
         },
      },
      screens: {
         sm: "600px",
         md: "768px",
         lg: "1020px",
         xl: "1200px",
         "2xl": "1400px",
         "3xl": "1600px",
      },
   },
   plugins: [],
};
