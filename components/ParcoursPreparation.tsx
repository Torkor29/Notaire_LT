"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { projetsPreparation } from "@/lib/outils";
import { Bouton, Fleche, Avertissement } from "@/components/ui";

/**
 * « Préparer mon rendez-vous »
 * Mon projet → Ma situation → Ce que je possède déjà → checklist imprimable.
 * La liste produite est indicative : elle ne remplace pas l’examen du dossier.
 */
export function ParcoursPreparation() {
  const [projetId, setProjetId] = useState<string | null>(null);
  const [situationId, setSituationId] = useState<string | null>(null);
  const [possedes, setPossedes] = useState<string[]>([]);

  const projet = projetsPreparation.find((p) => p.id === projetId);
  const situation = projet?.situations.find((s) => s.id === situationId);

  const documents = useMemo(() => {
    if (!projet) return [];
    return [...projet.documentsCommuns, ...(situation?.documents ?? [])];
  }, [projet, situation]);

  const manquants = documents.filter((d) => !possedes.includes(d));
  const etape = !projetId ? 1 : !situationId ? 2 : 3;

  const basculer = (doc: string) =>
    setPossedes((liste) =>
      liste.includes(doc) ? liste.filter((d) => d !== doc) : [...liste, doc],
    );

  return (
    <div className="overflow-hidden rounded-xl border border-pierre/60 bg-ivoire-pur">
      {/* Progression */}
      <div className="sans-impression flex items-center gap-4 border-b border-pierre/60 px-6 py-4 md:px-8">
        {["Mon projet", "Ma situation", "Mes documents"].map((label, i) => (
          <div key={label} className="flex flex-1 items-center gap-3">
            <span
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[0.6875rem] chiffres transition-colors duration-500",
                etape >= i + 1
                  ? "border-vert bg-vert text-ivoire"
                  : "border-pierre text-brume",
              )}
            >
              {i + 1}
            </span>
            <span
              className={cn(
                "hidden text-[0.8125rem] sm:block",
                etape >= i + 1 ? "text-encre" : "text-gris",
              )}
            >
              {label}
            </span>
            {i < 2 ? (
              <span
                aria-hidden="true"
                className={cn(
                  "hidden h-px flex-1 transition-colors duration-500 sm:block",
                  etape > i + 1 ? "bg-vert" : "bg-pierre",
                )}
              />
            ) : null}
          </div>
        ))}
      </div>

      <div className="p-6 md:p-8">
        {/* Étape 1 */}
        <fieldset className="sans-impression">
          <legend className="text-[0.6875rem] uppercase tracking-[0.16em] text-gris">
            Étape 1 — Votre projet
          </legend>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {projetsPreparation.map((p) => (
              <button
                key={p.id}
                type="button"
                aria-pressed={projetId === p.id}
                onClick={() => {
                  setProjetId(p.id);
                  setSituationId(null);
                  setPossedes([]);
                }}
                className={cn(
                  "rounded-lg border p-4 text-left transition-[border-color,background-color,transform] duration-400 ease-soft hover:-translate-y-0.5",
                  projetId === p.id
                    ? "border-vert bg-vert-pale"
                    : "border-pierre/70 hover:border-vert/50",
                )}
              >
                <span className="block font-medium text-encre">{p.titre}</span>
                <span className="mt-1.5 block text-[0.8125rem] leading-snug text-gris">
                  {p.description}
                </span>
              </button>
            ))}
          </div>
        </fieldset>

        {/* Étape 2 */}
        {projet ? (
          <fieldset
            className="sans-impression mt-8"
            style={{ animation: "voile 600ms var(--ease-soft) both" }}
          >
            <legend className="text-[0.6875rem] uppercase tracking-[0.16em] text-gris">
              Étape 2 — Votre situation
            </legend>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {projet.situations.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={situationId === s.id}
                  onClick={() => {
                    setSituationId(s.id);
                    setPossedes([]);
                  }}
                  className={cn(
                    "rounded-lg border p-4 text-left transition-[border-color,background-color,transform] duration-400 ease-soft hover:-translate-y-0.5",
                    situationId === s.id
                      ? "border-vert bg-vert-pale"
                      : "border-pierre/70 hover:border-vert/50",
                  )}
                >
                  <span className="block font-medium text-encre">
                    {s.titre}
                  </span>
                </button>
              ))}
            </div>
          </fieldset>
        ) : null}

        {/* Étape 3 */}
        <div aria-live="polite">
          {projet && situation ? (
            <div
              className="mt-10 border-t border-pierre/60 pt-8"
              style={{ animation: "voile 700ms var(--ease-soft) both" }}
            >
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-gris">
                    Étape 3 — Votre checklist
                  </p>
                  <h3 className="mt-3 font-display text-[1.625rem] leading-snug tracking-[-0.02em] md:text-[1.875rem]">
                    {projet.titre} — {situation.titre.toLowerCase()}
                  </h3>
                </div>
                <p className="chiffres text-[0.875rem] text-gris">
                  {possedes.length} / {documents.length} document
                  {documents.length > 1 ? "s" : ""} réuni
                  {possedes.length > 1 ? "s" : ""}
                </p>
              </div>

              {/* Barre de progression */}
              <div
                className="sans-impression mt-5 h-1 w-full overflow-hidden rounded-full bg-sable"
                role="progressbar"
                aria-valuenow={possedes.length}
                aria-valuemin={0}
                aria-valuemax={documents.length}
                aria-label="Documents réunis"
              >
                <span
                  className="block h-full rounded-full bg-vert transition-[width] duration-700 ease-soft"
                  style={{
                    width: `${documents.length ? (possedes.length / documents.length) * 100 : 0}%`,
                  }}
                />
              </div>

              <ul className="mt-8 space-y-2">
                {documents.map((doc) => {
                  const coche = possedes.includes(doc);
                  return (
                    <li key={doc}>
                      <label
                        className={cn(
                          "flex cursor-pointer items-start gap-3 rounded-md border px-4 py-3.5 transition-[border-color,background-color] duration-400",
                          coche
                            ? "border-vert/40 bg-vert-pale/60"
                            : "border-pierre/60 hover:border-vert/30",
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={coche}
                          onChange={() => basculer(doc)}
                          className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-vert)]"
                        />
                        <span
                          className={cn(
                            "text-[0.9375rem] leading-snug",
                            coche ? "text-gris line-through" : "text-ardoise",
                          )}
                        >
                          {doc}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>

              {situation.remarque ? (
                <p className="mt-6 rounded-md border-l-2 border-champagne bg-champagne-pale/50 px-5 py-4 text-[0.9375rem] leading-relaxed text-ardoise">
                  {situation.remarque}
                </p>
              ) : null}

              {manquants.length > 0 ? (
                <p className="mt-6 text-[0.9375rem] text-gris">
                  Il vous reste{" "}
                  <strong className="font-semibold text-encre chiffres">
                    {manquants.length}
                  </strong>{" "}
                  document{manquants.length > 1 ? "s" : ""} à réunir. Ce
                  n’est pas bloquant&nbsp;: vous pouvez venir avec ce que
                  vous avez.
                </p>
              ) : (
                <p className="mt-6 text-[0.9375rem] text-vert">
                  Votre dossier est complet. L’étude pourra travailler dès
                  le premier rendez-vous.
                </p>
              )}

              <div className="mt-8">
                <Avertissement texte="Cette liste est indicative et générée à partir de situations courantes. Selon votre dossier, d’autres pièces pourront être demandées — ou certaines se révéler inutiles." />
              </div>

              <div className="sans-impression mt-8 flex flex-wrap items-center gap-3">
                <Bouton href="/contact#rendez-vous" fleche>
                  Prendre rendez-vous
                </Bouton>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="rounded-full border border-encre/15 px-6 py-3 text-[0.875rem] transition-colors duration-500 hover:border-encre/40 hover:bg-encre hover:text-ivoire"
                >
                  Imprimer ma liste
                </button>
                <Link
                  href={projet.page}
                  className="inline-flex items-center gap-2 px-2 text-[0.875rem] text-vert underline underline-offset-4"
                >
                  En savoir plus sur ce projet
                  <Fleche className="h-3.5 w-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setProjetId(null);
                    setSituationId(null);
                    setPossedes([]);
                  }}
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
