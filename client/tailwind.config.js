export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
      colors: {
        dark: "#0f172a",
        panel: "#111827",
        primary: "#06b6d4",
        accent: "#8b5cf6",
      },
    },
  },
  plugins: [],
};
