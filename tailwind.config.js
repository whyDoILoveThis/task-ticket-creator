/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
       

         // 🔴 Reds / Pinks
        "its-gradient-red-to-br": "linear-gradient(to bottom right, #f87171, #ef4444, #f43f5e)",
        "its-gradient-rose-to-br": "linear-gradient(to bottom right, #fda4af, #fb7185, #e11d48)",
        "its-gradient-pink-to-br": "linear-gradient(to bottom right, #f9a8d4, #ec4899, #db2777)",

        // 🟠 Oranges / Ambers
        "its-gradient-orange-to-br": "linear-gradient(to bottom right, #fdba74, #fb923c, #f97316)",
        "its-gradient-amber-to-br": "linear-gradient(to bottom right, #fcd34d, #f59e0b, #d97706)",

        // 🟡 Yellows / Limes
        "its-gradient-yellow-to-br": "linear-gradient(to bottom right, #fde047, #facc15, #ca8a04)",
        "its-gradient-lime-to-br": "linear-gradient(to bottom right, #bef264, #84cc16, #4d7c0f)",

        // 🟢 Greens / Emeralds
        "its-gradient-green-to-br": "linear-gradient(to bottom right, #38b2ac, #10b981, #298952)",
        "its-gradient-emerald-to-br": "linear-gradient(to bottom right, #6ee7b7, #10b981, #047857)",

        // 🔵 Blues / Cyans
        "its-gradient-blue-to-br": "linear-gradient(to bottom right, #60a5fa, #3b82f6, #2563eb)",
        "its-gradient-cyan-to-br": "linear-gradient(to bottom right, #67e8f9, #06b6d4, #0e7490)",

        // 🟣 Purples / Violets / Indigos
        "its-gradient-purple-to-br": "linear-gradient(to bottom right, #c084fc, #a855f7, #7e22ce)",
        "its-gradient-violet-to-br": "linear-gradient(to bottom right, #a78bfa, #8b5cf6, #6d28d9)",
        "its-gradient-indigo-to-br": "linear-gradient(to bottom right, #818cf8, #4f46e5, #3730a3)",

        // ⚫ Grays / Neutrals
        "its-gradient-slate-to-br": "linear-gradient(to bottom right, #cbd5e1, #64748b, #1e293b)",
        "its-gradient-zinc-to-br": "linear-gradient(to bottom right, #d4d4d8, #71717a, #27272a)",
        "its-gradient-neutral-to-br": "linear-gradient(to bottom right, #e5e5e5, #737373, #171717)",

        // 🌈 Fun mixes
        "its-gradient-rainbow-to-br": "linear-gradient(to bottom right, #f87171, #facc15, #4ade80, #60a5fa, #a78bfa, #f472b6)",
        "its-gradient-fire-to-br": "linear-gradient(to bottom right, #f97316, #dc2626, #7f1d1d)",
        "its-gradient-ocean-to-br": "linear-gradient(to bottom right, #06b6d4, #3b82f6, #3730a3)",
        "its-gradient-forest-to-br": "linear-gradient(to bottom right, #22c55e, #15803d, #14532d)",

      },
      colors: {
        nav: '#18222f', 
        page: '#2b3441',
        card: '#47566a',
        "card-hover": '#4f5e74',
        'default-text': '#f1f3f5',
        'blu-text': '#a8cefd',
        'blu-accent': '#2841ff57',
        'blu-accent-hover': '#0051ff',
        'grn-text': '#8fff8f',
        'grn-accent': '#2069274d',
        'grn-accent-hover': '#43b74f4d',
      },
    },
  },
  plugins: [],
}
