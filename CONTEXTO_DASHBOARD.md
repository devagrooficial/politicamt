# CONTEXTO DO PROJETO — Dashboard de Roteamento Logístico

## Visão Geral

Este projeto é um **Dashboard de Roteamento Logístico** construído com **Astro 6**, **React 19**, **Tailwind CSS v4**, **Tremor** e **Shadcn UI**.

A interface central é um **mapa full-screen** renderizado com **Mapbox GL JS**, servindo de plano de fundo para toda a aplicação. Sobre o mapa, painéis laterais e inferiores flutuam como **overlays transparentes/glassmorphism**, criando uma experiência imersiva e de alta densidade de informação.

---

## Stack Técnica

| Camada | Tecnologia |
|---|---|
| **Framework** | Astro 6 (SSG/SSR híbrido) |
| **UI Components** | React 19 (ilhas interativas) |
| **Estilização** | Tailwind CSS v4 (`@tailwindcss/vite`) |
| **Design System** | Shadcn UI (New York, Base: Slate) |
| **Componentes de Dados** | Tremor v3 |
| **Ícones** | Lucide React |
| **Mapa** | Mapbox GL JS |
| **Utilitários CSS** | `clsx`, `tailwind-merge`, `tw-animate-css` |

---

## Arquitetura de Layout

```
┌─────────────────────────────────────────────────────┐
│              MAPA FULL-SCREEN (Mapbox)              │
│                                                     │
│  ┌──────────────┐              ┌───────────────┐    │
│  │  Painel      │              │  Painel Info  │    │
│  │  Lateral     │              │  (Overlay)    │    │
│  │  (Overlay)   │              └───────────────┘    │
│  │              │                                   │
│  └──────────────┘                                   │
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │         Painel Inferior (Overlay)           │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

Os overlays usam `backdrop-blur`, `bg-background/80` e `border` para um efeito glassmorphism consistente em ambos os temas.

---

## Requisitos Obrigatórios

- ✅ **Dark/Light Mode** — suporte completo via variáveis CSS (`@custom-variant dark`) e classe `.dark`
- ✅ **Mapa Full-Screen** — Mapbox GL JS ocupando 100% do viewport como layer base
- ✅ **Painéis Flutuantes** — overlays posicionados com `absolute`/`fixed` sobre o mapa
- ✅ **Design System Integrado** — variáveis Shadcn + cores Tremor unificadas em `global.css`
- ✅ **Responsive** — painéis colapsáveis em mobile

---

## Estrutura de Pastas

```
src/
├── components/
│   ├── ui/           # Componentes Shadcn (Button, Card, etc.)
│   └── dashboard/    # Componentes específicos do dashboard (RoutePanel, StatsOverlay, etc.)
├── layouts/          # Layouts Astro (MapLayout.astro com Mapbox)
├── lib/              # Utilitários (cn(), mapbox helpers, etc.)
├── pages/            # Rotas Astro
└── styles/
    └── global.css    # Design tokens: Shadcn + Tremor + animações
```

---

## Paleta de Cores (Design Tokens)

As cores são definidas como variáveis CSS em `global.css` e mapeadas para o `@theme` do Tailwind v4.

### Shadcn (base Slate)
Geradas pelo Shadcn init — `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, `--border`, etc.

### Tremor
- **Brand**: `--tremor-brand` — cor de destaque para gráficos e KPIs
- **Background**: `--tremor-background-default`, `--tremor-background-subtle`, `--tremor-background-muted`,  `--tremor-background-emphasis`
- **Ring**: `--tremor-ring`
- **Content**: `--tremor-content-default`, `--tremor-content-subtle`, `--tremor-content-strong`, `--tremor-content-inverted`, `--tremor-content-emphasis`

---

## Convenções de Código

- Componentes React interativos em `src/components/` com extensão `.tsx`
- Páginas e layouts em `.astro`
- Utilitário `cn()` de `@/lib/utils` para combinar classes
- Sem `tailwind.config.mjs` — configuração via `@theme` no `global.css` (Tailwind v4)
- `components.json` gerencia o Shadcn (alias `@/*` → `./src/*`)