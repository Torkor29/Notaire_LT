"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { cn, normaliser } from "@/lib/utils";
import {
  actes,
  categoriesActes,
  type CategorieActe,
} from "@/lib/actes";
import { Fleche } from "@/components/ui";

type Filtre = CategorieActe | "toutes";

export function ExplorateurActes() {
  const [filtre, setFiltre] = useState<Filtre>("toutes");
  const [requete, setRequete] = useState("");

  const resultats = useMemo(() => {
    const q = normaliser(requete);
    return actes.filter((a) => {
      if (filtre !== "toutes" && a.categorie !== filtre) return false;
      if (q.length < 2) return true;
      return normaliser(`${a.titre} ${a.resume} ${a.motsCles}`).includes(q);
    });
  }, [filtre, requete]);

  const groupes = categoriesActes
    .map((cat) => ({
      categorie: cat,
      actes: resultats.filter((a) => a.categorie === cat.slug),
    }))
    .filter((g) => g.actes.length > 0);

  return (
    <div>
      {/* Barre de filtres */}
      <div className="sticky top-[var(--entete-hauteur)] z-20 -mx-[var(--gouttiere)] verre px-[var(--gouttiere)] py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="tablist"
            aria-label="Filtrer par catégorie"
            className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1"
          >
            {(
              [
                { slug: "toutes" as const, titre: "Toutes les fiches" },
                ...categoriesActes,
              ] as { slug: Filtre; titre: string }[]
            ).map((cat) => (
              <button
                key={cat.slug}
                type="button"
                role="tab"
                aria-selected={filtre === cat.slug}
                onClick={() => setFiltre(cat.slug)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-[0.8125rem] transition-[background-color,border-color,color] duration-400",
                  filtre === cat.slug
                    ? "border-vert bg-vert text-ivoire"
                    : "border-pierre/70 text-ardoise hover:border-vert/50 hover:text-vert",
                )}
              >
                {cat.titre}
              </button>
            ))}
          </div>

          <div className="relative lg:w-72">
            <label htmlFor="recherche-actes" className="sr-only">
              Rechercher un acte
            </label>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brume"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              id="recherche-actes"
              type="search"
              value={requete}
              onChange={(e) => setRequete(e.target.value)}
              placeholder="Chercher un acte…"
              className="w-full rounded-full border border-pierre/70 bg-ivoire-pur py-2.5 pl-10 pr-4 text-[0.875rem] outline-none transition-colors duration-300 placeholder:text-gris focus:border-vert"
            />
          </div>
        </div>
      </div>

      {/* Résultats */}
      <div aria-live="polite" className="mt-14">
        <p className="sr-only">
          {resultats.length} fiche{resultats.length > 1 ? "s" : ""} affichée
          {resultats.length > 1 ? "s" : ""}.
        </p>

        {groupes.length === 0 ? (
          <div className="rounded-lg border border-dashed border-pierre py-16 text-center">
            <p className="text-ardoise">
              Aucune fiche ne correspond à «&nbsp;{requete}&nbsp;».
            </p>
            <p className="mt-2 text-[0.9375rem] text-gris">
              Votre situation ne rentre peut-être pas dans une case&nbsp;:{" "}
              <Link
                href="/contact"
                className="text-vert underline underline-offset-4"
              >
                posez votre question à l’étude
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="space-y-20">
            {groupes.map((groupe) => (
              <section key={groupe.categorie.slug} id={groupe.categorie.slug}>
                <div className="flex flex-col gap-3 border-b border-pierre/60 pb-6 md:flex-row md:items-end md:justify-between">
                  <h2 className="font-display text-[1.75rem] tracking-[-0.02em] md:text-[2.125rem]">
                    {groupe.categorie.titre}
                  </h2>
                  <p className="max-w-md text-[0.9375rem] leading-relaxed text-gris pretty">
                    {groupe.categorie.intro}
                  </p>
                </div>

                <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {groupe.actes.map((acte) => (
                    <li key={acte.slug}>
                      <Link
                        href={`/actes/${acte.slug}`}
                        className="group flex h-full flex-col justify-between gap-5 rounded-lg border border-pierre/60 bg-ivoire-pur p-6 transition-[border-color,box-shadow,transform] duration-600 ease-soft hover:-translate-y-0.5 hover:border-vert/40 hover:shadow-relief"
                      >
                        <div>
                          <h3 className="text-[1.125rem] leading-snug tracking-[-0.01em]">
                            {acte.titre}
                          </h3>
                          <p className="mt-3 text-[0.9375rem] leading-relaxed text-gris pretty">
                            {acte.resume}
                          </p>
                        </div>
                        <span className="flex items-center gap-2 text-[0.8125rem] text-vert">
                          Consulter la fiche
                          <Fleche className="h-3.5 w-3.5 transition-transform duration-600 ease-soft group-hover:translate-x-1" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
