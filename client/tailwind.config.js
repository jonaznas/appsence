module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        default: {
          primary: "#8109b5",
          secondary: "#444444",
          accent: "#252525",
          neutral: "#8109b5",
          "base-100": "#171717",
          "light-100": "#d1d1d1",
        }
      }
    ]
  }
}
