"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { acteParSlug } from "@/lib/actes";
import {
  statutsSeparation,
  patrimoinesSeparation,
  resultatsSeparation,
  type StatutSeparation,
  type PatrimoineSeparation,
} from "@/lib/outils";
import { Bouton, Fleche, Avertissement } from "@/components/ui";

/**
 * « Quelle est votre situation ? »
 * Outil strictement pédagogique : il indique les sujets à examiner, jamais
 * une conclusion juridique. Le message d’avertissement est affiché avec le
 * résultat, et non caché derrière un lien.
 */
export function OutilSeparation() {
  const [statut, setStatut] = useState<StatutSeparation | null>(null);
  const [patrimoine, setPatrimoine] = useState<PatrimoineSeparation | null>(
    null,
  );

  const resultat =
    statut && patrimoine
      ? resultatsSeparation[`${statut}|${patrimoine}`]
      : undefined;

  const etape = !statut ? 1 : !patrimoine ? 2 : 3;

  return (
    <div className="overflow-hidden rounded-xl border border-pierre/60 bg-ivoire-pur">
      {/* Progression */}
      <div className="flex items-center gap-4 border-b border-pierre/60 px-6 py-4 md:px-8">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex flex-1 items-center gap-3">
            <span
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[0.6875rem] chiffres transition-colors duration-500",
                etape >= n
                  ? "border-vert bg-vert text-ivoire"
                  : "border-pierre text-brume",
              )}
            >
              {n}
            </span>
            <span
              className={cn(
                "hidden text-[0.8125rem] sm:block",
                etape >= n ? "text-encre" : "text-gris",
              )}
            >
              {n === 1 ? "Votre statut" : n === 2 ? "Vos biens" : "Les sujets"}
            </span>
            {n < 3 ? (
              <span
                aria-hidden="true"
                className={cn(
                  "hidden h-px flex-1 transition-colors duration-500 sm:block",
                  etape > n ? "bg-vert" : "bg-pierre",
                )}
              />
            ) : null}
          </div>
        ))}
      </div>

      <div className="p-6 md:p-8">
        {/* Étape 1 */}
        <fieldset>
          <legend className="text-[0.6875rem] uppercase tracking-[0.16em] text-gris">
            Étape 1 — Vous étiez
          </legend>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {statutsSeparation.map((s) => (
              <button
                key={s.id}
                type="button"
                aria-pressed={statut === s.id}
                onClick={() => {
                  setStatut(s.id);
                  setPatrimoine(null);
                }}
                className={cn(
                  "rounded-lg border p-4 text-left transition-[border-color,background-color,transform] duration-400 ease-soft hover:-translate-y-0.5",
                  statut === s.id
                    ? "border-vert bg-vert-pale"
                    : "border-pierre/70 hover:border-vert/50",
                )}
              >
                <span className="block font-medium text-encre">{s.libelle}</span>
                <span className="mt-1.5 block text-[0.8125rem] leading-snug text-gris">
                  {s.detail}
                </span>
              </button>
            ))}
          </div>
        </fieldset>

        {/* Étape 2 */}
        {statut ? (
          <fieldset
            className="mt-8"
            style={{ animation: "voile 600ms var(--ease-soft) both" }}
          >
            <legend className="text-[0.6875rem] uppercase tracking-[0.16em] text-gris">
              Étape 2 — Vous êtes
            </legend>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {patrimoinesSeparation.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={patrimoine === p.id}
                  onClick={() => setPatrimoine(p.id)}
                  className={cn(
                    "rounded-lg border p-4 text-left transition-[border-color,background-color,transform] duration-400 ease-soft hover:-translate-y-0.5",
                    patrimoine === p.id
                      ? "border-vert bg-vert-pale"
                      : "border-pierre/70 hover:border-vert/50",
                  )}
                >
                  <span className="block font-medium text-encre">
                    {p.libelle}
                  </span>
                  <span className="mt-1.5 block text-[0.8125rem] leading-snug text-gris">
                    {p.detail}
                  </span>
                </button>
              ))}
            </div>
          </fieldset>
        ) : null}

        {/* Étape 3 */}
        <div aria-live="polite">
          {resultat ? (
            <div
              className="mt-10 border-t border-pierre/60 pt-8"
              style={{ animation: "voile 700ms var(--ease-soft) both" }}
            >
              <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-gris">
                Les sujets à examiner
              </p>
              <h3 className="mt-3 font-display text-[1.625rem] leading-snug tracking-[-0.02em] md:text-[1.875rem]">
                {resultat.titre}
              </h3>

              <ol className="mt-8 grid gap-6 sm:grid-cols-2">
                {resultat.sujets.map((sujet, i) => (
                  <li key={sujet.titre} className="flex gap-4">
                    <span className="mt-1 text-[0.6875rem] text-champagne-sombre chiffres">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block font-medium text-encre">
                        {sujet.titre}
                      </span>
                      <span className="mt-1.5 block text-[0.9375rem] leading-relaxed text-ardoise pretty">
                        {sujet.texte}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>

              {resultat.actes.length > 0 ? (
                <div className="mt-8">
                  <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-gris">
                    Les fiches correspondantes
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {resultat.actes.map((slug) => (
                      <li key={slug}>
                        <Link
                          href={`/actes/${slug}`}
                          className="group inline-flex items-center gap-2 rounded-full border border-pierre/70 px-4 py-2 text-[0.8125rem] text-ardoise transition-colors duration-400 hover:border-vert hover:bg-vert-pale hover:text-vert"
                        >
                          {acteParSlug(slug)?.titre ?? slug}
                          <Fleche className="h-3 w-3 transition-transform duration-400 group-hover:translate-x-0.5" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="mt-8">
                <Avertissement texte="Ces éléments sont donnés à titre pédagogique et ne constituent pas un diagnostic de votre situation. Seul l’examen de vos actes, de vos financements et de vos documents permet de déterminer ce qui s’applique réellement à vous." />
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Bouton href="/contact" fleche>
                  En parler avec l’étude
                </Bouton>
                <button
                  type="button"
                  onClick={() => {
                    setStatut(null);
                    setPatrimoine(null);
                  }}
                  className="rounded-full px-5 py-2.5 text-[0.875rem] text-gris underline underline-offset-4 transition-colors hover:text-vert"
                >
                  Recommencer
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
