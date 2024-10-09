/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        fira: ["Fira Sans", "sans-serif"],
        paytone: ["Paytone One"],
      },
      colors: {
        "gandaya-gray": "#656565",
        "gandaya-green": "#d5ff5c",
        "gandaya-black": "#181818",
      },
    },
  },
  plugins: [],
};
