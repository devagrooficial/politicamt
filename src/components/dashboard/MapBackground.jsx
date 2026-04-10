import { useState, useCallback, useMemo } from "react";
import Map, { Marker, Popup, Source, Layer } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { Users } from "lucide-react";
import { useStore } from "@nanostores/react";
import { theme } from "@/lib/store";
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
function CityPin({ city, isActive, onClick }) {
  const colorClass = PIN_STYLES[city.status] ?? PIN_STYLES["não iniciado"];

  return (
    <button
      onClick={() => onClick(city)}
      aria-label={`${city.id}. ${city.name}`}
      className="group relative focus:outline-none"
    >
      {/* Pulso para cidades em andamento */}
      {city.status === "em andamento" && (
        <span className="absolute inset-0 rounded-full bg-amber-400/40 animate-ping" />
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
    </button>
  );
}

// ─── Popup de detalhes ────────────────────────────────────────────────────────
const BADGE_POPUP = {
  "contabilizado": "bg-lime-500/15 text-lime-600 dark:text-lime-400 border border-lime-500/30",
  "em andamento":  "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30",
  "não iniciado":  "bg-slate-200 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-600/30",
};

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function CityPopup({ city, onClose }) {
  return (
    <Popup
      longitude={city.lng}
      latitude={city.lat}
      anchor="bottom"
      offset={[0, -50]}
      onClose={onClose}
      closeButton={false}
      closeOnClick={false}
      className="!p-0 !bg-transparent !shadow-none"
      maxWidth="220px"
    >
      <div
        className="rounded-xl border border-slate-200 dark:border-[#334155] shadow-2xl overflow-hidden bg-white dark:bg-[#0f172a]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-3 py-2 border-b border-slate-200 dark:border-[#334155] flex items-center justify-between gap-2">
          <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500">
            #{city.id} · MT
          </span>
          <span className={["text-[10px] font-semibold px-1.5 py-0.5 rounded-full", BADGE_POPUP[city.status]].join(" ")}>
            {capitalize(city.status)}
          </span>
        </div>
        <div className="px-3 py-3">
          <p className="font-bold text-sm text-slate-900 dark:text-white leading-tight">{city.name}</p>
          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Users className="h-3.5 w-3.5 shrink-0" />
            <span>{city.voters} eleitores</span>
          </div>
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
  const currentTheme = useStore(theme);
  const [activeCity, setActiveCity] = useState(null);

  // Memoiza o GeoJSON para não re-computar a cada render
  const geojsonData = useMemo(() => buildGeoJSON(rankingMT), []);

  const handlePinClick = useCallback((city) => {
    setActiveCity((prev) => (prev?.id === city.id ? null : city));
  }, []);

  const handleMapClick = useCallback(() => {
    setActiveCity(null);
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
              isActive={activeCity?.id === city.id}
              onClick={handlePinClick}
            />
          </Marker>
        ))}

        {/* ══ CAMADA 3: Popup do município selecionado ══ */}
        {activeCity && (
          <CityPopup
            city={activeCity}
            onClose={() => setActiveCity(null)}
          />
        )}
      </Map>
    </div>
  );
}
