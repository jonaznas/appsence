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
          primary: "#DA0037",
          secondary: "#444444",
          accent: "#EDEDED",
          neutral: "#252525",
          "base-100": "#171717"
        }
      }
    ]
  }
}
