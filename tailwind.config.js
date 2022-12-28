/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./lib/*.{js,ts}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            "code::before": false,
            "code::after": false,
            // blockquote: false,
          },
        },
      },
      screens: {
        standalone: {
          raw: "(display-mode: standalone)",
        },
      },
      spacing: {
        "safe-top": "env(safe-area-inset-top)",
        "safe-bottom": "env(safe-area-inset-bottom)",
        "safe-left": "env(safe-area-inset-left)",
        "safe-right": "env(safe-area-inset-right)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

// theme: {
//   extend: {
//     typography: {
//       DEFAULT: {
//         css: {
//           color: '#333',
//           a: {
//             color: '#3182ce',
//             '&:hover': {
//               color: '#2c5282',
//             },
//           },
//         },
//       },
//     },
//   },
// },
