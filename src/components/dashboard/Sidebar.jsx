import { useState } from "react";
import {
  Circle,
  LayoutDashboard,
  FileText,
  Users,
  TrendingUp,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react";
import { useStore } from "@nanostores/react";
import { theme } from "@/lib/store";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const NAV_ITEMS = [
  { id: "dashboard", name: "Dashboard",             icon: LayoutDashboard },
  { id: "dossie",    name: "Dossiê",                 icon: FileText        },
  { id: "eleitorado",name: "Eleitorados",             icon: Users           },
  { id: "analises",  name: "Análises e Projeções",   icon: TrendingUp      },
  { id: "settings",  name: "Configurações",           icon: Settings        },
];

/**
 * Sidebar
 * Navegação lateral esquerda expansível (w-20 ↔ w-64) com transição suave.
 * Renderizar com `client:load` no layout Astro.
 */
export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeId, setActiveId] = useState("dashboard");

  return (
    <TooltipProvider delayDuration={200}>
      <aside
        className={[
          "pointer-events-auto",
          "fixed left-0 top-0 h-screen",
          "bg-slate-50 dark:bg-[#0f172a] border-r border-slate-200 dark:border-[#334155]",
          "z-[999] flex flex-col justify-between",
          "transition-all duration-300 ease-in-out overflow-hidden",
          isExpanded ? "w-64" : "w-20",
        ].join(" ")}
        aria-label="Navegação principal"
      >
        {/* ═══════════════════════════════════════
            TOPO — Logo
        ═══════════════════════════════════════ */}
        <div>
          <div className="h-20 flex items-center border-b border-slate-200 dark:border-[#334155] px-5 shrink-0">
            {/* Ícone do logo */}
            <div className="w-10 h-10 rounded-xl bg-emerald-950 flex items-center justify-center text-emerald-500 shrink-0">
              <Circle className="w-6 h-6" fill="currentColor" />
            </div>

            {/* Nome — visível apenas expandido */}
            <span
              className={[
                "ml-3 text-xl font-bold text-slate-900 dark:text-white whitespace-nowrap",
                "transition-all duration-200",
                isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none w-0",
              ].join(" ")}
            >
              Política
            </span>
          </div>

          {/* ═══════════════════════════════════════
              MEIO — Navegação
          ═══════════════════════════════════════ */}
          <nav className="mt-2 flex flex-col" aria-label="Menu principal">
            {NAV_ITEMS.map(({ id, name, icon: Icon }) => {
              const isActive = activeId === id;

              // ── Recolhido: só ícone com tooltip ──
              if (!isExpanded) {
                return (
                  <Tooltip key={id}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => setActiveId(id)}
                        aria-label={name}
                        aria-current={isActive ? "page" : undefined}
                        className="flex items-center justify-center w-full py-3 transition-colors"
                      >
                        <div
                          className={[
                            "p-3 rounded-xl transition-colors duration-150",
                            isActive
                              ? "bg-slate-200 dark:bg-[#334155] text-slate-900 dark:text-white"
                              : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1e293b]",
                          ].join(" ")}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-white dark:bg-[#1e293b] border-slate-200 dark:border-[#334155] text-slate-900 dark:text-white">
                      <p>{name}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              }

              // ── Expandido: ícone + label, linha toda clicável ──
              return (
                <button
                  key={id}
                  onClick={() => setActiveId(id)}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "flex items-center w-full px-5 py-4 gap-3",
                    "cursor-pointer transition-colors duration-150 text-left",
                    isActive
                      ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-lime-500"
                      : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#1e293b]",
                  ].join(" ")}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className="text-sm font-semibold whitespace-nowrap">
                    {name}
                  </span>

                  {/* Dot indicador de ativo */}
                  {isActive && (
                    <span className="ml-auto w-2 h-2 rounded-full bg-lime-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* ═══════════════════════════════════════
            BASE — Theme toggle + Expand toggle
        ═══════════════════════════════════════ */}
        <div className="border-t border-slate-200 dark:border-[#334155] p-4 flex flex-col gap-3 shrink-0">
          {/* Theme toggle */}
          {isExpanded ? (
            <div className="flex items-center justify-between px-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
                Tema
              </span>
              <button
                onClick={() => theme.set(theme.get() === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1e293b] transition-colors"
                aria-label="Alternar tema"
              >
                {useStore(theme) === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </div>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex justify-center">
                  <button
                    onClick={() => theme.set(theme.get() === "dark" ? "light" : "dark")}
                    className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1e293b] transition-colors"
                    aria-label="Alternar tema"
                  >
                    {useStore(theme) === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </button>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-white dark:bg-[#1e293b] border-slate-200 dark:border-[#334155] text-slate-900 dark:text-white">
                <p>Alternar tema</p>
              </TooltipContent>
            </Tooltip>
          )}

          {/* Botão de expand/collapse */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setIsExpanded((v) => !v)}
                aria-label={isExpanded ? "Recolher menu" : "Expandir menu"}
                className={[
                  "flex items-center gap-3 w-full rounded-lg px-3 py-2.5",
                  "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1e293b]",
                  "transition-colors duration-150",
                  !isExpanded && "justify-center",
                ].join(" ")}
              >
                {isExpanded ? (
                  <>
                    <ChevronLeft className="h-4 w-4 shrink-0" />
                    <span className="text-xs font-medium whitespace-nowrap">
                      Recolher
                    </span>
                  </>
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            </TooltipTrigger>
            {!isExpanded && (
              <TooltipContent side="right" className="bg-white dark:bg-[#1e293b] border-slate-200 dark:border-[#334155] text-slate-900 dark:text-white">
                <p>Expandir menu</p>
              </TooltipContent>
            )}
          </Tooltip>
        </div>
      </aside>
    </TooltipProvider>
  );
}
