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
 * theme
 * Controle de tema Light/Dark com persistência.
 */
export const theme = atom(
  typeof window !== "undefined" && localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : "dark"
);

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

