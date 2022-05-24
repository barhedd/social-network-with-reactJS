const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        'u-sm': '320px',
      },
      colors: {
        lightgreen: "#6CC471",
        darkgreen: "#509154",
        orange: "#E9721A",
      },
      fontFamily: {
        normal: ["Varela"],
        round: ["Varela Round"],
        styled: ["Pacifico"],
      },
      backgroundImage: {
        loginpattern: "url('/src/Assets/login_background.svg')",
      },
      minHeight: {
        '600': '600px',
        '690': '690px'
      }
    },
  },
  variants: {
    extend: {
      visibility: ["group-hover"],
      backdropBlur: ['hover', 'focus', 'group-hover'],
    },
  },
  plugins: [],
};
