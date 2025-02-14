import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        selectorSelectedBackground: "var(--selectorSelectedBackground)",
        selectorHoverBackground: "var(--selectorHoverBackground)",
        greenButtonBackground: "var(--greenButtonBackground)",
        secondaryBackground: "var(--secondaryBackground)",
        selectorBackground: "var(--selectorBackground)",
        selectorBorder: "var(--selectorBorder)",
        footerBackground: "var(--footerBackground)",
      },
      transitionTimingFunction: {
        'custom-bounce': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
      },
    },
  },
  plugins: [],
} satisfies Config;
