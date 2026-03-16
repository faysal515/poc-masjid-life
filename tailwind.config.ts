import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          950: '#0D2119',
          900: '#1F5C3A',
          800: '#2E7D4F',
          700: '#3D9E65',
          600: '#52BB7A',
          100: '#D1FAE5',
          50:  '#F0F7F2',
        },
        gold: {
          600: '#B45309',
          500: '#C9A84C',
          400: '#D4A853',
          100: '#FEF9C3',
          50:  '#FFFBEB',
        },
        danger: {
          600: '#DC2626',
          100: '#FEF2F2',
          50:  '#FFF5F5',
        },
      },
      fontFamily: {
        sans: ['var(--font-bornomala)', 'var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
