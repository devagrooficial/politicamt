/**
 * tailwind.config.mjs — REFERÊNCIA para plugins e tooling
 *
 * ⚠️  Este projeto usa Tailwind CSS v4 com @tailwindcss/vite.
 *     A configuração principal é feita via @theme em src/styles/global.css.
 *     Este arquivo existe para compatibilidade com ferramentas de IDE,
 *     linting e plugins que ainda requerem o formato v3.
 *
 * Plugins ativos:
 *   - tailwindcss-animate  (animações utilitárias)
 *
 * Cores Tremor mapeadas via variáveis CSS — ver src/styles/global.css
 */

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    // Inclui componentes Tremor para que suas classes utilitárias sejam geradas
    "./node_modules/@tremor/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── Tremor — Brand ── */
        "tremor-brand-faint":    "var(--tremor-brand-faint)",
        "tremor-brand-muted":    "var(--tremor-brand-muted)",
        "tremor-brand-subtle":   "var(--tremor-brand-subtle)",
        "tremor-brand":          "var(--tremor-brand)",
        "tremor-brand-emphasis": "var(--tremor-brand-emphasis)",
        "tremor-brand-inverted": "var(--tremor-brand-inverted)",

        /* ── Tremor — Background ── */
        "tremor-background-muted":    "var(--tremor-background-muted)",
        "tremor-background-subtle":   "var(--tremor-background-subtle)",
        "tremor-background-default":  "var(--tremor-background-default)",
        "tremor-background-emphasis": "var(--tremor-background-emphasis)",

        /* ── Tremor — Ring ── */
        "tremor-ring": "var(--tremor-ring)",

        /* ── Tremor — Content ── */
        "tremor-content-subtle":   "var(--tremor-content-subtle)",
        "tremor-content-default":  "var(--tremor-content-default)",
        "tremor-content-emphasis": "var(--tremor-content-emphasis)",
        "tremor-content-strong":   "var(--tremor-content-strong)",
        "tremor-content-inverted": "var(--tremor-content-inverted)",

        /* ── Shadcn UI ── */
        border:     "var(--border)",
        input:      "var(--input)",
        ring:       "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT:    "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT:    "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT:    "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT:    "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT:    "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT:    "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT:    "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        /* Tremor default shadows */
        "tremor-input":  "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "tremor-card":   "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "tremor-dropdown": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
    },
  },
  plugins: [
    // tailwind-animate é gerenciado via tw-animate-css no global.css (Tailwind v4)
    // Para Tailwind v3 ou ferramentas legadas, descomente a linha abaixo:
    // require("tailwindcss-animate"),
  ],
};
