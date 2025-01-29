/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#B32624',
          dark: '#8B1E1D'
        }
      },
      animation: {
        'pulse-blue': 'pulse-blue 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-blue': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(6, 163, 241, 0.4)',
            borderColor: 'rgba(6, 163, 241, 0.8)'
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(6, 163, 241, 0.6)',
            borderColor: 'rgba(6, 163, 241, 1)'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px theme("colors.primary.DEFAULT")' },
          '50%': { boxShadow: '0 0 30px theme("colors.primary.DEFAULT")' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}