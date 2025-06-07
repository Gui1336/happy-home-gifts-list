/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        sage: {
          50: '#f4f6f4',
          100: '#e9ede9',
          200: '#d3dbd3',
          300: '#bdc9bd',
          400: '#a7b7a7',
          500: '#91a591',
          600: '#6c7f6d',
          700: '#576657',
          800: '#424c42',
          900: '#2d332d',
          950: '#1a1e1a',
        },
        accent: {
          DEFAULT: '#6c7f6d',
          foreground: '#ffffff',
        },
        background: '#ffffff',
        foreground: '#1a1e1a',
        primary: {
          DEFAULT: '#6c7f6d',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#f4f6f4',
          foreground: '#1a1e1a',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#f4f6f4',
          foreground: '#576657',
        },
        card: {
          DEFAULT: '#ffffff',
          foreground: '#1a1e1a',
        },
        popover: {
          DEFAULT: '#ffffff',
          foreground: '#1a1e1a',
        },
        border: '#e9ede9',
        input: '#e9ede9',
        ring: '#6c7f6d',
      },
      borderRadius: {
        lg: '0.75rem',
        md: '0.5rem',
        sm: '0.375rem',
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        "fade-out": {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        "falling-leaf": {
          '0%': {
            transform: 'translateY(-10%) rotate(0deg)',
            opacity: 0,
          },
          '10%': {
            opacity: 0.3,
          },
          '90%': {
            opacity: 0.3,
          },
          '100%': {
            transform: 'translateY(1000%) rotate(360deg)',
            opacity: 0,
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "fade-out": "fade-out 0.3s ease-out",
        "falling-leaf": "falling-leaf linear infinite",
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} 