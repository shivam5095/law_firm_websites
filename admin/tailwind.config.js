/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#F4F7FA',
          100: '#E8EDF4',
          700: '#0A2540',
          800: '#002B49',
          900: '#001A30',
        },
        gold: {
          400: '#E5C158',
          500: '#D4AF37',
          600: '#C29F2B',
        },
        ivory: {
          50: '#FAF9F6',
          100: '#F5F2EB',
          200: '#EAE5D8',
        },
        charcoal: {
          100: '#E1E1E1',
          500: '#757575',
          600: '#4A4A4A',
          700: '#2A2A2A',
        }
      },
    },
  },
  plugins: [],
}
