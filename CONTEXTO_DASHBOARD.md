# Projeto: Dashboard Logístico de Roteamento (GSD)

## 🎯 Objetivo Principal
Criar um dashboard de logística web com visualização de rotas em mapa full-screen, idêntico aos mockups de referência. O layout baseia-se em elementos sobrepostos (overlays) ao mapa, navegação lateral e painéis de dados em tempo real.

## 🛠️ Tech Stack Escohida
* **Framework Core:** Astro (SSR/SSG focado em performance)
* **UI Framework:** React (Integrado ao Astro para suportar os componentes interativos)
* **Estilização:** Tailwind CSS
* **Componentes UI:** Shadcn UI + Tremor.so (para gráficos e cards de métricas)
* **Mapas:** Mapbox GL JS (ou `react-map-gl`)
* **Ícones:** Lucide React

## 📐 Diretrizes de Arquitetura Visual (Obrigatório)
1.  **O Mapa é o Fundo:** O container do mapa (`div` do Mapbox) deve ser `w-full h-screen absolute top-0 left-0 z-0`.
2.  **Overlays:** Todos os painéis (Sidebar, Top Cards, Right Schedule, Bottom Crews) devem usar posicionamento absoluto/fixo (`fixed` ou `absolute`) com `z-index` superior ao mapa (ex: `z-10`, `z-20`).
3.  **Tematização:** Suporte rigoroso a Light e Dark mode utilizando as classes padrão do Tailwind (`dark:bg-slate-900`, etc.) e as variáveis de cores do Shadcn/Tremor.
4.  **Glassmorphism/Transparência:** Os painéis não devem bloquear a visão total; onde aplicável nos mockups, prever uma cor de fundo com leve transparência nas bordas ou sombras bem definidas (`shadow-lg`, `shadow-xl`) para destacar do mapa.

---

## 🏃‍♂️ Roadmap de Sprints (Formato GSD)

### Sprint 1: Setup & Infraestrutura (A Fundação)
* [ ] Inicializar projeto Astro vazio.
* [ ] Instalar e configurar integrações: `@astrojs/react` e `@astrojs/tailwind`.
* [ ] Inicializar o `shadcn-ui` no projeto com a paleta de cores base (Slate/Zinc).
* [ ] Instalar o `tremor.so` e configurar seu preset no `tailwind.config.mjs`.
* [ ] Configurar a estrutura básica de pastas (`/src/components`, `/src/layouts`, `/src/pages`).
* [ ] Configurar o toggle de Dark Mode.

### Sprint 2: Core Layout & Mapbox (O Palco)
* [ ] Criar o componente `MapBackground.jsx`.
* [ ] Inserir o token do Mapbox nas variáveis de ambiente (`.env`).
* [ ] Renderizar o mapa full-screen na `index.astro`.
* [ ] Criar o `DashboardLayout.astro` que abrigará os slots para os overlays.

### Sprint 3: Navegação Lateral - Left Sidebar (A Bússola)
* [ ] Criar o componente lateral esquerdo (Logo, Dashboard, Routes, Crews, Settings).
* [ ] Implementar o toggle de recolher/expandir (ícones com labels ou apenas ícones).
* [ ] Posicionar no canto esquerdo da tela flutuando sobre o mapa.

### Sprint 4: Top KPI Cards - Tremor (O Radar)
* [ ] Utilizar cards do Tremor para criar a fileira superior.
* [ ] Componentes: Stops Completed (progresso), Active Crews, Avg Efficiency, Active Alerts.
* [ ] Botão de ação primária `+ Add Stop` no canto superior direito.

### Sprint 5: Painel de Agendamento - Right Sidebar (A Linha do Tempo)
* [ ] Criar o container do lado direito "Today's Schedule".
* [ ] Desenvolver o componente de "Timeline/Lista" com os status: Completed (verde), In Progress (amarelo), Pending (cinza).
* [ ] Adicionar botão "Optimize Route" fixo na base deste painel lateral.

### Sprint 6: Painel Inferior de Equipes - Bottom Cards (A Frota)
* [ ] Criar a barra inferior (acima dos créditos do mapa) com os cards de seleção de veículos/equipes (Crew Alpha, Crew Bravo, Truck 3).
* [ ] Adicionar estado de "Ativo/Selecionado" (borda e texto destacados, ex: verde para Crew Alpha).

### Sprint 7: Mock de Dados & Refinamento GSD (A Entrega)
* [ ] Criar arquivo de mock de dados `.json` ou `.ts` para alimentar os cards, timeline e veículos de forma dinâmica.
* [ ] Revisão final de responsividade e transições do Dark/Light mode em todos os componentes.