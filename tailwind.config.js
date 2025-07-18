/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFFFFF",
        secondary: "#000000",
        gray1: "#989696",
        gray2: "#44443C",
        gray3: "#7C6F6F",
        gray4: "#CAD2CF",
        gray5: "#D3D3D3",
        gray6: "#F1F1F1",
        accent: "#0F0F0F",
        orange: "#FF9900",
        transparent: "transparent",
        darkBg: "#181926",
        darkCard: "#232946",
        darkAccent: "#E94560",
        darkText: "#F4F4F4",
        lightBg: "#F8FAFC",
        lightCard: "#FFFFFF",
        lightAccent: "#FF6B6B",
        lightText: "#232946",
      },
      backgroundImage: {
        "main-gradient": "linear-gradient(135deg, #FFFFFF 0%, #989696 100%)",
        "glass-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0.44) 0%, rgba(0,0,0,0.44) 100%)",
        "orange-gradient": "linear-gradient(135deg, #FF9900 0%, #FFD580 100%)",
        "dark-gradient": "linear-gradient(135deg, #181926 0%, #232946 100%)",
        "pink-blue-gradient": "linear-gradient(135deg, #E94560 0%, #0038FF 100%)",
      },
    },
  },
  plugins: [],
};
