// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        aurora: "aurora 60s linear infinite",
      },
      keyframes: {
        aurora: {
          "0%": {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          "100%": {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
    },
  },
};