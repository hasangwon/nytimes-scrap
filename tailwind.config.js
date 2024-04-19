/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3478F6",
          light: "#82B0F4",
        },
        neutral: {
          DEFAULT: "#C4C4C4",
          light: "#F0F1F4",
          dark: "#6D6D6D",
        },
      },
    },
  },
  plugins: [],
};
