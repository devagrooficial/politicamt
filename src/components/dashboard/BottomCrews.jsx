import { useStore } from "@nanostores/react";
import { TrendingUp } from "lucide-react";
import { selectedCandidate } from "@/lib/store";

// ─── Dados dos candidatos ─────────────────────────────────────────────────────
const CANDIDATES = [
  {
    id: "mauro",
    initials: "M",
    name: "Mauro Mendes",
    coalition: "PL, MDB",
    projection: "20.000 votos",
    avatarBg: "bg-blue-800 text-white",
  },
  {
    id: "pedro",
    initials: "P",
    name: "Pedro Taques",
    coalition: "PSB, PT",
    projection: "25.000 votos",
    avatarBg: "bg-emerald-800 text-white",
  },
];

// ─── Card de candidato ────────────────────────────────────────────────────────
function CandidateCard({ candidate, isActive }) {
  const { id, initials, name, coalition, projection, avatarBg } = candidate;

  return (
    <div
      onClick={() => selectedCandidate.set(id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && selectedCandidate.set(id)}
      aria-pressed={isActive}
      aria-label={`${name} — ${isActive ? "Selecionado" : "Selecionar"}`}
      className={[
        "w-80 p-5 rounded-xl shadow-xl",
        "bg-white dark:bg-[#1e293b]",
        "flex flex-col gap-4",
        "cursor-pointer select-none",
        "transition-all duration-200",
        "hover:scale-[1.02] hover:-translate-y-0.5",
        isActive
          ? [
              "border-2 border-lime-500",
              "shadow-[0_0_20px_rgba(132,204,22,0.22)]",
            ].join(" ")
          : "border border-slate-200 dark:border-[#334155] hover:border-slate-300 dark:hover:border-slate-500",
      ].join(" ")}
    >
      {/* ── Topo: avatar + nome + badge ── */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          {/* Avatar */}
          <div
            className={[
              "h-12 w-12 rounded-full flex items-center justify-center",
              "text-lg font-bold shrink-0",
              avatarBg,
            ].join(" ")}
            aria-hidden
          >
            {initials}
          </div>

          <div className="min-w-0">
            <p className="font-semibold text-base text-slate-900 dark:text-white leading-tight">
              {name}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
              {coalition}
            </p>
          </div>
        </div>

        {/* Badge de estado */}
        {isActive ? (
          <span className="shrink-0 flex items-center gap-1 text-[10px] font-semibold text-lime-600 dark:text-lime-400 bg-lime-500/10 border border-lime-500/30 px-2 py-0.5 rounded-full whitespace-nowrap">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-500 animate-pulse" />
            Ativo
          </span>
        ) : (
          <span className="shrink-0 text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-[#334155] px-2 py-0.5 rounded-full whitespace-nowrap">
            Standby
          </span>
        )}
      </div>

      {/* ── Divisor ── */}
      <div className="h-px bg-slate-200 dark:bg-[#334155]" />

      {/* ── Rodapé: projeção ── */}
      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        <TrendingUp
          className={[
            "h-4 w-4 shrink-0",
            isActive ? "text-lime-500 dark:text-lime-400" : "text-slate-400 dark:text-slate-500",
          ].join(" ")}
        />
        <span>
          Projeção:{" "}
          <span className={isActive ? "text-lime-600 dark:text-lime-400 font-semibold" : "text-slate-700 dark:text-slate-300"}>
            {projection}
          </span>
        </span>
      </div>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────
/**
 * BottomCrews (agora: CandidateSelector)
 * Cards inferiores dos candidatos — reativo via nanostores.
 * Clicar em um card dispara selectedCandidate.set(id), atualizando
 * qualquer componente que consuma a mesma store.
 *
 * Renderizar com `client:load` no layout Astro.
 */
export default function BottomCrews() {
  const activeCandidate = useStore(selectedCandidate);

  return (
    <div
      className={[
        "fixed bottom-4 left-[88px]",
        "flex gap-6",
        "z-30 pointer-events-auto",
      ].join(" ")}
      aria-label="Candidatos"
    >
      {CANDIDATES.map((candidate) => (
        <CandidateCard
          key={candidate.id}
          candidate={candidate}
          isActive={activeCandidate === candidate.id}
        />
      ))}
    </div>
  );
}
