/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#22130C",
        "primary-container": "#39271F",
        "on-primary": "#FFFFFF",
        "on-primary-container": "#A78D82",
        
        secondary: "#735A30",
        "secondary-container": "#FDDBA6",
        "secondary-fixed": "#FFDEAB",
        "secondary-fixed-dim": "#E2C28F",
        "on-secondary": "#FFFFFF",
        "on-secondary-container": "#785F34",
        "on-secondary-fixed": "#271900",

        tertiary: "#290F0C",
        "tertiary-container": "#41231F",
        "tertiary-fixed-dim": "#EDBBB4",
        "on-tertiary": "#FFFFFF",

        surface: "#FDF9F1",
        "surface-bright": "#FDF9F1",
        "surface-dim": "#DDDAD2",
        "surface-container-lowest": "#FFFFFF",
        "surface-container-low": "#F7F3EB",
        "surface-container": "#F1EDE6",
        "surface-container-high": "#ECE8E0",
        "surface-container-highest": "#E6E2DA",
        "on-surface": "#1C1C17",
        "on-surface-variant": "#4F4540",
        "inverse-surface": "#31302B",
        "inverse-on-surface": "#F4F0E8",

        outline: "#817470",
        "outline-variant": "#D3C3BE",
        error: "#BA1A1A",
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        headline: ["Playfair Display", "serif"],
        body: ["DM Sans", "sans-serif"],
        label: ["DM Sans", "sans-serif"],
      },
      spacing: {
        "margin-mobile": "1.25rem",
        margin: "4rem",
        "space-xs": "0.375rem",
        "space-sm": "0.75rem",
        "space-md": "1.5rem",
        "space-lg": "2.5rem",
        "space-xl": "4.5rem",
        gutter: "1.5rem",
        "gutter-mobile": "1rem",
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem",
      }
    },
  },
  plugins: [],
};
