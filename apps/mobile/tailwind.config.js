module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "../../packages/ui-mobile/src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: { extend: {} },
  plugins: [],
};
