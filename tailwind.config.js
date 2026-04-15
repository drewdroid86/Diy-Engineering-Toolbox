/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#111827',
        text: '#F9FAFB',
        card: {
          DEFAULT: '#1F2937',
          foreground: '#F9FAFB',
        },
        muted: {
          DEFAULT: '#1F2937',
          foreground: '#9CA3AF',
        },
        accent: {
            DEFAULT: '#3B82F6',
            foreground: '#F9FAFB',
        },
        border: '#374151',
        input: '#374151',
        ring: '#3B82F6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
