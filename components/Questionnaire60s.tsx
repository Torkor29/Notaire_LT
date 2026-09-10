"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { etapesOrientation } from "@/lib/outils";
import { Bouton, Fleche, Avertissement } from "@/components/ui";

/**
 * « Mon projet en 60 secondes »
 * Un questionnaire d’orientation : il conduit vers des pages du site,
 * jamais vers une conclusion juridique.
 */
export function Questionnaire60s() {
  const [reponses, setReponses] = useState<Record<string, string>>({});

  const indexCourant = etapesOrientation.findIndex(
    (e) => !reponses[e.id],
  );
  const termine = indexCourant === -1;

  const destinations = termine
    ? etapesOrientation
        .flatMap((etape) => {
          const choix = etape.options.find((o) => o.id === reponses[etape.id]);
          return choix?.destinations ?? [];
        })
        .filter(
          (d, i, tableau) => tableau.findIndex((x) => x.href === d.href) === i,
        )
    : [];

  return (
    <div className="overflow-hidden rounded-xl border border-pierre/60 bg-ivoire-pur">
      <div className="flex items-center gap-3 border-b border-pierre/60 px-6 py-4 md:px-8">
        {etapesOrientation.map((etape, i) => (
          <span
            key={etape.id}
            aria-hidden="true"
            className={cn(
              "h-1 flex-1 rounded-full transition-colors duration-500",
              reponses[etape.id] || (!termine && i === indexCourant)
                ? "bg-vert"
                : "bg-sable",
            )}
          />
        ))}
        <span className="ml-2 text-[0.75rem] text-gris chiffres">
          {Math.min(Object.keys(reponses).length + (termine ? 0 : 1), etapesOrientation.length)}
          /{etapesOrientation.length}
        </span>
      </div>

      <div className="p-6 md:p-8">
        {etapesOrientation.map((etape, i) => {
          if (i > Object.keys(reponses).length) return null;
          return (
            <fieldset
              key={etape.id}
              className={cn(i > 0 && "mt-9 border-t border-pierre/60 pt-8")}
              style={
                i > 0
                  ? { animation: "voile 600ms var(--ease-soft) both" }
                  : undefined
              }
            >
              <legend className="font-display text-[1.375rem] tracking-[-0.015em] md:text-[1.625rem]">
                {etape.question}
              </legend>
              {etape.aide ? (
                <p className="mt-2 text-[0.875rem] text-gris">{etape.aide}</p>
              ) : null}
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {etape.options.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={reponses[etape.id] === option.id}
                    onClick={() =>
                      setReponses((r) => {
                        const suivant = { ...r, [etape.id]: option.id };
                        /* Modifier une réponse antérieure réinitialise la suite. */
                        for (const e of etapesOrientation.slice(i + 1)) {
                          if (r[etape.id] && r[etape.id] !== option.id) {
                            delete suivant[e.id];
                          }
                        }
                        return suivant;
                      })
                    }
                    className={cn(
                      "rounded-lg border p-4 text-left transition-[border-color,background-color,transform] duration-400 ease-soft hover:-translate-y-0.5",
                      reponses[etape.id] === option.id
                        ? "border-vert bg-vert-pale"
                        : "border-pierre/70 hover:border-vert/50",
                    )}
                  >
                    <span className="block font-medium text-encre">
                      {option.libelle}
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>
          );
        })}

        <div aria-live="polite">
          {termine ? (
            <div
              className="mt-10 border-t border-pierre/60 pt-8"
              style={{ animation: "voile 700ms var(--ease-soft) both" }}
            >
              <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-gris">
                Vos pages
              </p>
              <h3 className="mt-3 font-display text-[1.625rem] leading-snug tracking-[-0.02em] md:text-[1.875rem]">
                Voici par où commencer.
              </h3>

              <ul className="mt-8 divide-y divide-pierre/60 border-y border-pierre/60">
                {destinations.map((d) => (
                  <li key={d.href}>
                    <Link
                      href={d.href}
                      className="group flex items-center justify-between gap-6 py-5"
                    >
                      <span>
                        <span className="block text-[1.0625rem] leading-snug transition-transform duration-600 ease-soft group-hover:translate-x-1">
                          {d.titre}
                        </span>
                        <span className="mt-1 block text-[0.875rem] text-gris">
                          {d.raison}
                        </span>
                      </span>
                      <Fleche className="h-4 w-4 shrink-0 text-brume transition-all duration-600 ease-soft group-hover:translate-x-1 group-hover:text-vert" />
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Avertissement texte="Ce parcours oriente vers des contenus pédagogiques du site. Il ne produit ni consultation, ni conclusion juridique : seule l’étude peut apprécier votre situation." />
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Bouton href="/contact" fleche>
                  Parler de votre projet
                </Bouton>
                <button
                  type="button"
                  onClick={() => setReponses({})}
                  className="px-2 text-[0.875rem] text-gris underline underline-offset-4 transition-colors hover:text-vert"
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
