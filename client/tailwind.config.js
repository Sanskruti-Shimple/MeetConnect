/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#1E293B",
        accent: "#4F46E5",
        background: "#F8FAFC",
        darkSection: "#0F172A",
        borderColor: "#E2E8F0",
        success: "#16A34A",
        error: "#DC2626",
      },
    },
  },
  plugins: [],
};