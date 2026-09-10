"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { chercher } from "@/lib/moteur-recherche";
import type { EntreeRecherche, ResultatRecherche } from "@/lib/recherche-types";
import { Fleche } from "@/components/ui";

interface ContexteRecherche {
  ouvrir: () => void;
  fermer: () => void;
  ouverte: boolean;
}

const Contexte = createContext<ContexteRecherche>({
  ouvrir: () => {},
  fermer: () => {},
  ouverte: false,
});

export function useRecherche() {
  return useContext(Contexte);
}

const SUGGESTIONS = [
  "séparation maison",
  "donation enfant",
  "acheter à deux",
  "soulte",
  "contrat de mariage",
  "succession",
];

export function RechercheProvider({ children }: { children: React.ReactNode }) {
  const [ouverte, setOuverte] = useState(false);
  const [index, setIndex] = useState<EntreeRecherche[] | null>(null);
  const [requete, setRequete] = useState("");
  const [actif, setActif] = useState(0);
  const pathname = usePathname();
  const refInput = useRef<HTMLInputElement>(null);
  const refPanneau = useRef<HTMLDivElement>(null);
  const refDeclencheur = useRef<Element | null>(null);

  const ouvrir = useCallback(() => {
    refDeclencheur.current = document.activeElement;
    setOuverte(true);
  }, []);
  const fermer = useCallback(() => {
    setOuverte(false);
    setRequete("");
    setActif(0);
    (refDeclencheur.current as HTMLElement | null)?.focus?.();
  }, []);

  /* Index chargé à la demande : aucun poids ajouté au premier rendu. */
  useEffect(() => {
    if (!ouverte || index) return;
    let annule = false;
    fetch("/api/recherche")
      .then((r) => (r.ok ? r.json() : []))
      .then((d: EntreeRecherche[]) => {
        if (!annule) setIndex(d);
      })
      .catch(() => setIndex([]));
    return () => {
      annule = true;
    };
  }, [ouverte, index]);

  /* Raccourci clavier ⌘K / Ctrl+K */
  useEffect(() => {
    const surTouche = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOuverte((v) => !v);
      }
    };
    window.addEventListener("keydown", surTouche);
    return () => window.removeEventListener("keydown", surTouche);
  }, []);

  useEffect(() => {
    setOuverte(false);
  }, [pathname]);

  useEffect(() => {
    if (!ouverte) return;
    const { style } = document.body;
    const precedent = style.overflow;
    style.overflow = "hidden";
    refInput.current?.focus();
    return () => {
      style.overflow = precedent;
    };
  }, [ouverte]);

  const resultats: ResultatRecherche[] = useMemo(
    () => (index ? chercher(requete, index) : []),
    [requete, index],
  );

  useEffect(() => setActif(0), [requete]);

  const surTouchePanneau = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      fermer();
      return;
    }
    if (resultats.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActif((i) => (i + 1) % resultats.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActif((i) => (i - 1 + resultats.length) % resultats.length);
    } else if (e.key === "Enter") {
      const cible = resultats[actif];
      if (cible) {
        e.preventDefault();
        window.location.href = cible.href;
      }
    }
  };

  const valeur = useMemo(
    () => ({ ouvrir, fermer, ouverte }),
    [ouvrir, fermer, ouverte],
  );

  return (
    <Contexte.Provider value={valeur}>
      {children}

      {ouverte ? (
        <div
          className="fixed inset-0 z-90"
          role="dialog"
          aria-modal="true"
          aria-label="Recherche sur le site"
          onKeyDown={surTouchePanneau}
        >
          <button
            type="button"
            aria-label="Fermer la recherche"
            onClick={fermer}
            className="absolute inset-0 h-full w-full cursor-default bg-encre/40 backdrop-blur-[3px]"
            style={{ animation: "voile 400ms var(--ease-soft) both" }}
          />

          <div
            ref={refPanneau}
            className="relative mx-auto mt-[8vh] w-[calc(100%-2rem)] max-w-2xl overflow-hidden rounded-xl border border-pierre/60 bg-ivoire shadow-flottante"
            style={{ animation: "voile 520ms var(--ease-soft) both" }}
          >
            <div className="flex items-center gap-3 border-b border-pierre/60 px-5">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                className="h-5 w-5 shrink-0 text-brume"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                ref={refInput}
                type="search"
                value={requete}
                onChange={(e) => setRequete(e.target.value)}
                placeholder="Séparation, donation, acheter à deux…"
                aria-label="Votre recherche"
                className="w-full bg-transparent py-5 text-[1.0625rem] outline-none placeholder:text-gris"
                autoComplete="off"
                spellCheck={false}
              />
              <button
                type="button"
                onClick={fermer}
                className="shrink-0 rounded-full px-3 py-1.5 text-[0.6875rem] uppercase tracking-[0.12em] text-gris transition-colors hover:bg-craie hover:text-encre"
              >
                Échap
              </button>
            </div>

            <div className="max-h-[min(28rem,60vh)] overflow-y-auto overscroll-contain">
              {requete.trim().length < 2 ? (
                <div className="px-5 py-6">
                  <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-gris">
                    Recherches fréquentes
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setRequete(s)}
                        className="rounded-full border border-pierre/70 px-3.5 py-1.5 text-[0.8125rem] text-ardoise transition-colors duration-300 hover:border-vert hover:bg-vert-pale hover:text-vert"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : resultats.length === 0 ? (
                <div className="px-5 py-10 text-center">
                  <p className="text-ardoise">
                    Aucun résultat pour «&nbsp;{requete}&nbsp;».
                  </p>
                  <p className="mt-2 text-sm text-gris">
                    Vous pouvez{" "}
                    <Link
                      href="/contact"
                      className="text-vert underline underline-offset-4"
                    >
                      poser directement votre question à l’étude
                    </Link>
                    .
                  </p>
                </div>
              ) : (
                <ul className="p-2">
                  {resultats.map((r, i) => (
                    <li key={r.href + r.titre}>
                      <Link
                        href={r.href}
                        onMouseEnter={() => setActif(i)}
                        className={cn(
                          "flex items-start gap-4 rounded-lg px-3.5 py-3 transition-colors duration-200",
                          i === actif ? "bg-craie" : "hover:bg-craie/60",
                        )}
                      >
                        <span className="mt-0.5 w-20 shrink-0 text-[0.625rem] uppercase tracking-[0.12em] text-champagne-sombre">
                          {r.type}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[0.9375rem] font-medium text-encre">
                            {r.titre}
                          </span>
                          <span className="mt-0.5 block truncate text-[0.8125rem] text-gris">
                            {r.extrait}
                          </span>
                        </span>
                        <Fleche
                          className={cn(
                            "mt-1 h-4 w-4 shrink-0 text-brume transition-opacity",
                            i === actif ? "opacity-100" : "opacity-0",
                          )}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-pierre/60 bg-craie/60 px-5 py-3 text-[0.75rem] text-gris">
              <span className="hidden sm:inline">
                <kbd className="font-sans">↑</kbd>{" "}
                <kbd className="font-sans">↓</kbd> pour naviguer ·{" "}
                <kbd className="font-sans">↵</kbd> pour ouvrir
              </span>
              <Link
                href="/recherche"
                className="ml-auto underline underline-offset-4 hover:text-vert"
              >
                Recherche détaillée
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </Contexte.Provider>
  );
}
