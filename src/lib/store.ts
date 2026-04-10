import { atom } from "nanostores";

/**
 * selectedCandidate
 * Atom global que controla qual candidato está selecionado no dashboard.
 * Valor inicial: 'mauro' (Mauro Mendes).
 *
 * Consumir com:
 *   import { useStore } from '@nanostores/react';
 *   import { selectedCandidate } from '@/lib/store';
 *   const active = useStore(selectedCandidate);
 *
 * Alterar com:
 *   selectedCandidate.set('pedro');
 */
export const selectedCandidate = atom("mauro");

/**
 * selectedMapCity
 * Atom global que controla qual município está selecionado no mapa (popup aberto).
 * Valor inicial: null (nenhum popup aberto).
 *
 * Consumir com:
 *   import { useStore } from '@nanostores/react';
 *   import { selectedMapCity } from '@/lib/store';
 *   const city = useStore(selectedMapCity);
 *
 * Alterar com:
 *   selectedMapCity.set(municipioObj); // abre popup
 *   selectedMapCity.set(null);         // fecha popup
 */
export const selectedMapCity = atom<import("./mockData").MunicipioMT | null>(null);

/**
 * theme
 * Controle de tema Light/Dark com persistência.
 */
export const theme = atom(
  typeof window !== "undefined" && localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : "dark"
);

// ── Sincronização imediata no primeiro carregamento ──────────────────────────
// `theme.listen` só dispara em mudanças futuras; na hidratação inicial o DOM
// já precisa ter a classe correta antes que qualquer componente monte.
if (typeof window !== "undefined") {
  const current = theme.get();
  if (current === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

theme.listen((value) => {
  if (typeof window !== "undefined") {
    if (value === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", value);
  }
});

