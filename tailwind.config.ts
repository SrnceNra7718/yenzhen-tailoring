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
          50: '#f6f7f6',
          100: '#e3ebe3',
          200: '#c7d7c7',
          300: '#9bb89b',
          400: '#6b9b6b',
          500: '#4a8c4a',
          600: '#2d6a2d',
          700: '#1f4f1f',
          800: '#143514',
          900: '#0a1f0a',
          950: '#05140a',
        },
        gold: {
          50: '#fdfbf5',
          100: '#f9f3d8',
          200: '#f2e5a8',
          300: '#e8d07a',
          400: '#e4c15e',
          500: '#d4a843',
          600: '#b8922e',
          700: '#8c6d24',
          800: '#6b551d',
          900: '#4a3b15',
        },
        dark: {
          50: '#f6f7f6',
          100: '#e3ebe3',
          200: '#c7d7c7',
          300: '#9bb89b',
          400: '#6b9b6b',
          500: '#4a8c4a',
          600: '#2d6a2d',
          700: '#1f4f1f',
          800: '#143514',
          900: '#0a1f0a',
          950: '#05140a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'shimmer': 'shimmer 2.5s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
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
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(212, 168, 67, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(212, 168, 67, 0.4)' },
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      '--radius': '12px',
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(circle at 50% 50%, rgba(212, 168, 67, 0.08) 0%, transparent 60%)',
        'card-shine': 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%, rgba(255,255,255,0.01) 100%)',
      },
    },
  },
  plugins: [],
}