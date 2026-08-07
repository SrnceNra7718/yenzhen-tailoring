/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fef9f0',
          100: '#fdf0d6',
          200: '#f9dfb3',
          300: '#f3c974',
          400: '#eab543',
          500: '#e4a31c',
          600: '#c48b16',
          700: '#9a6b10',
          800: '#75500d',
          900: '#432e05',
        },
        dark: {
          50: '#e8e5e0',
          100: '#c5c2bc',
          200: '#918f88',
          300: '#6b6862',
          400: '#504d48',
          500: '#3a3733',
          600: '#2c2a26',
          700: '#211f1c',
          800: '#1a1816',
          900: '#11100f',
          950: '#090909',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      '--radius': '12px',
    },
  },
  plugins: [],
}
