import { useCallback, useMemo } from "react";
import Map, { Marker, Popup, Source, Layer } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { Users, UserCheck, Target, AlertTriangle, MapPin, Phone } from "lucide-react";
import { useStore } from "@nanostores/react";
import { theme, selectedMapCity } from "@/lib/store";
import { rankingMT } from "@/lib/mockData";

const MAPBOX_TOKEN = import.meta.env.PUBLIC_MAPBOX_TOKEN;

// ─── Viewport centrado no Mato Grosso ─────────────────────────────────────────
const INITIAL_VIEW = {
  longitude: -56.0,
  latitude:  -13.0,
  zoom:       6.2,
};

// ─── Cores dos pins por status ────────────────────────────────────────────────
const PIN_STYLES = {
  "contabilizado": "bg-lime-500  text-black border-lime-700",
  "em andamento":  "bg-amber-500 text-black border-amber-700",
  "não iniciado":  "bg-[#334155] text-white border-slate-700",
};

// ─── Converte voters string ("415.000") → número inteiro (415000) ─────────────
function parseVoters(str) {
  return parseInt(str.replace(/\./g, ""), 10);
}

// ─── GeoJSON FeatureCollection dos municípios ─────────────────────────────────
function buildGeoJSON(cities) {
  return {
    type: "FeatureCollection",
    features: cities.map((city) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [city.lng, city.lat],
      },
      properties: {
        id:     city.id,
        name:   city.name,
        voters: parseVoters(city.voters),
        status: city.status,
      },
    })),
  };
}

// ─── Configuração da Layer de círculos de calor ───────────────────────────────
const heatCircleLayer = {
  id:   "heat-circles",
  type: "circle",
  paint: {
    // Raio escala com o zoom
    "circle-radius": [
      "interpolate", ["linear"], ["zoom"],
      5,  18,   // zoom 5 → raio 18px
      8,  40,   // zoom 8 → raio 40px
      12, 80,   // zoom 12 → raio 80px
    ],
    // Transparência suave
    "circle-opacity": 0.55,
    // Blur dá o efeito "glow/calor"
    "circle-blur": 0.7,
    // Cor baseada no volume de eleitores
    //   ≤ 50.000    → Vermelho  #ef4444
    //   ≤ 150.000   → Verde     #22c55e
    //   > 150.000   → Laranja   #f97316
    "circle-color": [
      "step",
      ["get", "voters"],
      "#ef4444",   // default → vermelho (baixo, < primeiro break)
      50000,  "#22c55e",   // ≥ 50.000 → verde (médio)
      150000, "#f97316",   // ≥ 150.000 → laranja (alto)
    ],
    // Stroke sutil para depth
    "circle-stroke-width": 0,
  },
};

// ─── Pin visual ───────────────────────────────────────────────────────────────
function CityPin({ city, isActive, onPinClick }) {
  const colorClass = PIN_STYLES[city.status] ?? PIN_STYLES["não iniciado"];

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${city.id}. ${city.name} — ver dossiê`}
      className="group relative cursor-pointer focus:outline-none"
      onClick={(e) => {
        e.stopPropagation();        // bloqueia o onClick do mapa (fecha popup)
        onPinClick(city);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.stopPropagation();
          onPinClick(city);
        }
      }}
    >
      {/* Pulso para cidades em andamento */}
      {city.status === "em andamento" && (
        <span className="absolute inset-0 rounded-full bg-amber-400/40 animate-ping pointer-events-none" />
      )}

      <div
        className={[
          "relative w-8 h-8 rounded-full",
          "flex items-center justify-center",
          "font-bold text-sm shadow-xl border-2",
          "transition-transform duration-150",
          "group-hover:scale-125 group-focus:scale-125",
          colorClass,
          isActive ? "scale-125 ring-2 ring-white/70 ring-offset-1 ring-offset-transparent" : "",
        ].join(" ")}
      >
        {city.id}
      </div>

      {/* Seta abaixo do pin */}
      <div
        className={[
          "mx-auto w-0 h-0",
          "border-l-[5px] border-l-transparent",
          "border-r-[5px] border-r-transparent",
          "border-t-[6px]",
          city.status === "contabilizado"
            ? "border-t-lime-700"
            : city.status === "em andamento"
            ? "border-t-amber-700"
            : "border-t-slate-700",
        ].join(" ")}
      />
    </div>
  );
}

// ─── Badge de status ──────────────────────────────────────────────────────────
const STATUS_BADGE = {
  "contabilizado": "bg-lime-500/20 text-lime-400 border border-lime-500/40",
  "em andamento":  "bg-amber-500/20 text-amber-400 border border-amber-500/40",
  "não iniciado":  "bg-slate-600/50 text-slate-400 border border-slate-600/40",
};

const STATUS_LABEL = {
  "contabilizado": "Contabilizado",
  "em andamento":  "Em andamento",
  "não iniciado":  "Não iniciado",
};

// ─── Linha de informação do dossiê ────────────────────────────────────────────
function InfoRow({ icon: Icon, label, value, multiline = false }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="mt-0.5 shrink-0 w-7 h-7 rounded-lg bg-slate-700/60 flex items-center justify-center">
        <Icon className="w-3.5 h-3.5 text-slate-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-0.5">{label}</p>
        <p className={`text-sm text-slate-200 leading-snug ${multiline ? "" : "truncate"}`}>{value}</p>
      </div>
    </div>
  );
}

// ─── Popup de dossiê pixel-perfect ───────────────────────────────────────────
function DossierPopup({ city, onClose }) {
  return (
    <Popup
      longitude={city.lng}
      latitude={city.lat}
      anchor="bottom"
      offset={[0, -46]}
      onClose={onClose}
      closeButton={false}
      closeOnClick={false}
      className="city-dossier-popup"
      maxWidth="360px"
      style={{ zIndex: 50 }}
    >
      <div
        className="
          bg-[#0f172a]/97 backdrop-blur-xl
          border border-slate-700/80
          rounded-2xl overflow-hidden
          shadow-[0_25px_60px_rgba(0,0,0,0.7)]
          min-w-[320px] w-[340px]
          text-white
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="px-5 pt-5 pb-4 border-b border-slate-700/60">
          <div className="flex items-start justify-between gap-3 mb-1">
            <h3 className="text-xl font-bold text-white leading-tight">{city.name}</h3>
            <span className={`shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide ${STATUS_BADGE[city.status]}`}>
              {STATUS_LABEL[city.status]}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <MapPin className="w-3 h-3" />
            <span>Mato Grosso · #{city.id}</span>
            <span className="mx-1 text-slate-600">·</span>
            <Users className="w-3 h-3" />
            <span>{city.voters} eleitores</span>
          </div>
        </div>

        {/* ── Body: campos do dossiê ── */}
        <div className="px-5 py-4 space-y-3.5">
          <InfoRow
            icon={UserCheck}
            label="Responsável"
            value={city.responsavel}
          />
          <InfoRow
            icon={Users}
            label="Voluntários"
            value={`${city.voluntarios} ativos`}
          />
          <InfoRow
            icon={Target}
            label="Objetivo"
            value={city.objetivo}
            multiline
          />
          <InfoRow
            icon={AlertTriangle}
            label="Pontos de Atenção"
            value={city.pontosAtencao}
          />
          <InfoRow
            icon={MapPin}
            label="Principal Ponto de Apoio"
            value={city.pontoApoio}
          />
        </div>

        {/* ── Footer: CTA ── */}
        <div className="px-5 pb-5">
          <button
            className="
              w-full flex items-center justify-center gap-2
              border border-slate-600 rounded-xl
              px-4 py-2.5
              text-sm font-medium text-slate-300
              hover:bg-slate-700/60 hover:text-white hover:border-slate-500
              active:scale-[0.98]
              transition-all duration-150
            "
            onClick={(e) => { e.stopPropagation(); }}
          >
            <Phone className="w-3.5 h-3.5" />
            Falar com Responsável
          </button>
        </div>
      </div>
    </Popup>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────
/**
 * MapBackground (Sprint 22)
 * – Camada base: Source+Layer de círculos de calor coloridos por volume eleitoral
 * – Camada topo: Markers numéricos interativos
 *
 * Ordem de renderização garante que os círculos ficam ATRÁS dos pins.
 * Deve ser montado com `client:only="react"` no layout Astro.
 */
export default function MapBackground({
  initialViewState = INITIAL_VIEW,
}) {
  const currentTheme  = useStore(theme);
  const activePopupCity = useStore(selectedMapCity);

  // Memoiza o GeoJSON para não re-computar a cada render
  const geojsonData = useMemo(() => buildGeoJSON(rankingMT), []);

  const handlePinClick = useCallback((city) => {
    // Toggle: se clicar no mesmo pin, fecha; caso contrário abre o novo
    selectedMapCity.set(activePopupCity?.id === city.id ? null : city);
  }, [activePopupCity]);

  const handleMapClick = useCallback(() => {
    selectedMapCity.set(null);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full z-0">
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={initialViewState}
        style={{ width: "100%", height: "100%" }}
        mapStyle={currentTheme === "dark" ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/light-v11"}
        attributionControl={false}
        reuseMaps
        onClick={handleMapClick}
      >
        {/* ══ CAMADA 1: Círculos de calor (atrás dos pins) ══ */}
        <Source id="municipios" type="geojson" data={geojsonData}>
          <Layer {...heatCircleLayer} />
        </Source>

        {/* ══ CAMADA 2: 20 Pins numerados (sobre os círculos) ══ */}
        {rankingMT.map((city) => (
          <Marker
            key={city.id}
            longitude={city.lng}
            latitude={city.lat}
            anchor="bottom"
          >
            <CityPin
              city={city}
              isActive={activePopupCity?.id === city.id}
              onPinClick={handlePinClick}
            />
          </Marker>
        ))}

        {/* ══ CAMADA 3: Popup de Dossiê do município selecionado ══ */}
        {activePopupCity && (
          <DossierPopup
            city={activePopupCity}
            onClose={() => selectedMapCity.set(null)}
          />
        )}
      </Map>
    </div>
  );
}
