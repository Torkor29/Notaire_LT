"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { chercher } from "@/lib/moteur-recherche";
import type { EntreeRecherche } from "@/lib/recherche-types";
import { Fleche } from "@/components/ui";

const SUGGESTIONS = [
  "séparation maison",
  "donation enfant",
  "acheter à deux",
  "soulte",
  "contrat de mariage",
  "succession",
  "SCI",
  "compromis de vente",
];

export function RechercheDetaillee({ index }: { index: EntreeRecherche[] }) {
  const parametres = useSearchParams();
  const [requete, setRequete] = useState(parametres.get("q") ?? "");

  const resultats = useMemo(
    () => chercher(requete, index, 40),
    [requete, index],
  );

  return (
    <div>
      <div className="relative">
        <label htmlFor="recherche-site" className="sr-only">
          Rechercher sur le site
        </label>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-brume"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          id="recherche-site"
          type="search"
          value={requete}
          onChange={(e) => setRequete(e.target.value)}
          placeholder="Séparation maison, donation enfant, acheter à deux…"
          autoFocus
          className="w-full rounded-full border border-pierre/70 bg-ivoire-pur py-4 pl-14 pr-5 text-[1rem] outline-none transition-colors duration-300 placeholder:text-gris focus:border-vert"
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setRequete(s)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-[0.8125rem] transition-colors duration-400",
              requete === s
                ? "border-vert bg-vert-pale text-vert"
                : "border-pierre/70 text-ardoise hover:border-vert/50 hover:text-vert",
            )}
          >
            {s}
          </button>
        ))}
      </div>

      <div aria-live="polite" className="mt-12">
        {requete.trim().length < 2 ? (
          <p className="text-gris">
            Saisissez au moins deux caractères, ou choisissez une recherche
            fréquente ci-dessus.
          </p>
        ) : resultats.length === 0 ? (
          <div className="rounded-lg border border-dashed border-pierre py-16 text-center">
            <p className="text-ardoise">
              Aucun résultat pour «&nbsp;{requete}&nbsp;».
            </p>
            <p className="mt-2 text-[0.9375rem] text-gris">
              <Link
                href="/contact"
                className="text-vert underline underline-offset-4"
              >
                Posez directement votre question à l’étude
              </Link>
              .
            </p>
          </div>
        ) : (
          <>
            <p className="text-[0.875rem] text-gris">
              {resultats.length} résultat{resultats.length > 1 ? "s" : ""}
            </p>
            <ul className="mt-6 divide-y divide-pierre/60 border-y border-pierre/60">
              {resultats.map((r) => (
                <li key={`${r.type}-${r.href}`}>
                  <Link
                    href={r.href}
                    className="group flex flex-col gap-2 py-6 md:flex-row md:items-baseline md:gap-8"
                  >
                    <span className="w-24 shrink-0 text-[0.6875rem] uppercase tracking-[0.12em] text-champagne-sombre">
                      {r.type}
                    </span>
                    <span className="flex-1">
                      <span className="block text-[1.0625rem] leading-snug transition-transform duration-600 ease-soft group-hover:translate-x-1">
                        {r.titre}
                      </span>
                      <span className="mt-1.5 block text-[0.9375rem] leading-relaxed text-gris pretty">
                        {r.extrait}
                      </span>
                    </span>
                    <Fleche className="hidden h-4 w-4 shrink-0 self-center text-brume transition-all duration-600 ease-soft group-hover:translate-x-1 group-hover:text-vert md:block" />
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
