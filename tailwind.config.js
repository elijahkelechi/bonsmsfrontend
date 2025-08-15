// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}', // main app file
    './screens/**/*.{js,jsx,ts,tsx}', // all files in pages folder
    './src/**/*.{js,jsx,ts,tsx}', // existing src folder
    './*.{js,jsx,ts,tsx}', // all JS/TS files in the project root
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F97316', // Main bright orange (buttons, icons, highlights)
          light: '#FDBA74', // Lighter shade for hover/active states
          dark: '#EA580C', // Darker shade for pressed buttons
        },
        secondary: {
          DEFAULT: '#374151', // Dark gray for text
          light: '#6B7280', // Mid gray for secondary text
          dark: '#111827', // Almost black
        },
        background: {
          DEFAULT: '#F3F4F6', // Light gray background
          card: '#FFFFFF', // White for cards and surfaces
        },
        success: '#22C55E', // Active status
        warning: '#FACC15', // Warnings
        danger: '#EF4444', // Errors
      },
    },
  },
  plugins: [],
};
