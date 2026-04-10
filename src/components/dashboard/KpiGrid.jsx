import { ProgressBar } from "@tremor/react";
import { AlertTriangle } from "lucide-react";

// ─── Dados Políticos ──────────────────────────────────────────────────────────
const KPI_DATA = {
  projecaoTotal:    { value: 14, total: 100 },
  novosHoje:        { count: 38 },
  qtdeVoluntario:   { value: 94 },
  pontoDeAtencao:   { count: 15 },
};

// ─── Card base Deep Slate ─────────────────────────────────────────────────────
function KpiCard({ children, className = "", accentColor = "border-t-emerald-500" }) {
  return (
    <div
      className={[
        "bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-[#334155]",
        "rounded-xl p-5 flex-1 shadow-lg",
        "border-t-2", accentColor,
        "flex flex-col pointer-events-auto",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

// ─── Labels reutilizáveis ─────────────────────────────────────────────────────
const Label = ({ children }) => (
  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-widest mb-2">
    {children}
  </p>
);

const Value = ({ children, className = "" }) => (
  <p className={`text-3xl font-bold text-slate-900 dark:text-white leading-none ${className}`}>
    {children}
  </p>
);

// ─── KPI 1: Projeção Total ────────────────────────────────────────────────────
function ProjecaoCard({ value, total }) {
  const pct = Math.round((value / total) * 100);
  return (
    <KpiCard accentColor="border-t-emerald-500">
      <Label>Projeção Total</Label>
      <Value>{value}/{total} <span className="text-lg text-slate-500 dark:text-slate-400">(%)</span></Value>
      <div className="mt-3">
        <ProgressBar value={pct} color="emerald" className="h-1.5" />
      </div>
    </KpiCard>
  );
}

// ─── KPI 2: Novos Hoje ────────────────────────────────────────────────────────
function NovosHojeCard({ count }) {
  return (
    <KpiCard accentColor="border-t-blue-500">
      <Label>Novos Hoje</Label>
      <Value>{count}</Value>
    </KpiCard>
  );
}

// ─── KPI 3: Qtde Voluntário ───────────────────────────────────────────────────
function VoluntarioCard({ value }) {
  return (
    <KpiCard accentColor="border-t-violet-500">
      <Label>Qtde Voluntário</Label>
      <Value>{value}</Value>
    </KpiCard>
  );
}

// ─── KPI 4: Ponto de Atenção ──────────────────────────────────────────────────
function AtencaoCard({ count }) {
  return (
    <KpiCard accentColor="border-t-amber-500">
      <div className="flex items-center gap-1.5 mb-2">
        <AlertTriangle className="h-3.5 w-3.5 text-amber-400 shrink-0" />
        <Label>Ponto de Atenção</Label>
      </div>
      <Value className="text-amber-400">{count}</Value>
    </KpiCard>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────
/**
 * KpiGrid
 * Faixa superior fixa — 4 KPI cards políticos (Deep Slate) com espaço uniforme.
 */
export default function KpiGrid() {
  const { projecaoTotal, novosHoje, qtdeVoluntario, pontoDeAtencao } = KPI_DATA;

  return (
    // pointer-events-none no wrapper: cliques em áreas vazias passam para o mapa
    <div
      className={[
        "fixed top-4 left-[88px] right-[416px]",
        "flex items-stretch gap-4",
        "z-30 pointer-events-none",
      ].join(" ")}
    >
      {/* 4 cards com pointer-events-auto, flex-1 → espaço 100% uniforme */}
      <ProjecaoCard  {...projecaoTotal} />
      <NovosHojeCard {...novosHoje} />
      <VoluntarioCard {...qtdeVoluntario} />
      <AtencaoCard   {...pontoDeAtencao} />
    </div>
  );
}
