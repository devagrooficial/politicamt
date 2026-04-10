import { RefreshCw, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { rankingMT } from "@/lib/mockData";

// ─── Badge de status dinâmico ─────────────────────────────────────────────────
const BADGE_STYLES = {
  "contabilizado": "bg-lime-500/10 text-lime-600 dark:text-lime-500 border-lime-500/20",
  "em andamento":  "bg-amber-500/10 text-amber-600 dark:text-amber-500 border-amber-500/20",
  "não iniciado":  "bg-slate-200 dark:bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-500/20",
};

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function StatusBadge({ status }) {
  return (
    <span
      className={[
        "px-2 py-1 rounded text-xs font-medium border whitespace-nowrap shrink-0",
        BADGE_STYLES[status] ?? BADGE_STYLES["não iniciado"],
      ].join(" ")}
    >
      {capitalize(status)}
    </span>
  );
}

// ─── Card individual de cidade ────────────────────────────────────────────────
function CityCard({ city }) {
  return (
    <div
      className={[
        "bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-[#334155] rounded-xl p-4",
        "flex gap-4 items-start mb-3 shadow-sm",
        "transition-colors duration-150 hover:border-slate-300 dark:hover:border-slate-600",
      ].join(" ")}
    >
      {/* Posição no ranking */}
      <div className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center bg-slate-100 dark:bg-[#334155] text-slate-900 dark:text-white font-bold text-sm">
        {city.id}
      </div>

      {/* Dados da cidade */}
      <div className="flex-1 min-w-0">
        <p className="text-slate-900 dark:text-white font-semibold leading-tight truncate">
          {city.name}
        </p>
        <div className="flex items-center gap-1.5 mt-1 text-slate-500 dark:text-slate-400 text-sm">
          <Users className="w-4 h-4 shrink-0" />
          <span>{city.voters} eleitores</span>
        </div>
      </div>

      {/* Badge de status */}
      <StatusBadge status={city.status} />
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────
/**
 * ScheduleSidebar — Ranking Atual (Sprint 16)
 * Dados do Mato Grosso centralizados em src/lib/mockData.ts.
 *
 * Layout:
 *   Header fixo → lista de cidades com scroll → botão "Atualizar Dados"
 *
 * Renderizar com `client:load` no layout Astro.
 */
export default function ScheduleSidebar() {
  return (
    <aside
      className={[
        "fixed top-4 right-4 bottom-4 w-96",
        "flex flex-col",
        "bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-[#334155]",
        "shadow-2xl rounded-xl",
        "z-30 pointer-events-auto overflow-hidden",
      ].join(" ")}
      aria-label="Ranking Atual"
    >
      {/* ── Header ── */}
      <div className="shrink-0 p-6 border-b border-slate-200 dark:border-[#334155] flex items-center justify-between bg-slate-50 dark:bg-[#0f172a]">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-wide">
          Ranking Atual
        </h2>
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          {rankingMT.length} municípios
        </span>
      </div>

      {/* ── Lista de cidades com scroll ── */}
      <div
        className="flex-1 overflow-y-auto p-4"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#334155 transparent",
        }}
      >
        {rankingMT.map((city) => (
          <CityCard key={city.id} city={city} />
        ))}
      </div>

      {/* ── Footer: Botão fixo ── */}
      <div className="shrink-0 p-4 border-t border-slate-200 dark:border-[#334155] bg-slate-50 dark:bg-[#0f172a]">
        <Button
          id="atualizar-dados-btn"
          className={[
            "w-full h-11 gap-2 font-bold text-sm",
            "bg-lime-500 hover:bg-lime-400 text-black",
            "shadow-md shadow-lime-500/25 transition-all duration-200",
            "hover:shadow-lime-500/40 hover:shadow-lg hover:scale-[1.01]",
          ].join(" ")}
        >
          <RefreshCw className="h-4 w-4" />
          Atualizar Dados
        </Button>
      </div>
    </aside>
  );
}
