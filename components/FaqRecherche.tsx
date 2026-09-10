"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { cn, normaliser } from "@/lib/utils";
import {
  questionsFaq,
  categoriesFaq,
  type CategorieFaq,
} from "@/lib/faq";
import { Question } from "@/components/sections";

export function FaqRecherche() {
  const [requete, setRequete] = useState("");
  const [categorie, setCategorie] = useState<CategorieFaq | "Toutes">("Toutes");

  const resultats = useMemo(() => {
    const q = normaliser(requete);
    return questionsFaq.filter((item) => {
      if (categorie !== "Toutes" && item.categorie !== categorie) return false;
      if (q.length < 2) return true;
      return normaliser(
        `${item.question} ${item.reponse.join(" ")} ${item.categorie}`,
      ).includes(q);
    });
  }, [requete, categorie]);

  const groupes = categoriesFaq
    .map((cat) => ({
      categorie: cat,
      questions: resultats.filter((q) => q.categorie === cat),
    }))
    .filter((g) => g.questions.length > 0);

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="relative">
          <label htmlFor="recherche-faq" className="sr-only">
            Rechercher une question
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
            id="recherche-faq"
            type="search"
            value={requete}
            onChange={(e) => setRequete(e.target.value)}
            placeholder="Soulte, donation, compromis, indivision…"
            className="w-full rounded-full border border-pierre/70 bg-ivoire-pur py-4 pl-14 pr-5 text-[1rem] outline-none transition-colors duration-300 placeholder:text-gris focus:border-vert"
          />
        </div>

        <div
          role="tablist"
          aria-label="Filtrer par thème"
          className="-mx-1 flex gap-1 overflow-x-auto px-1"
        >
          {(["Toutes", ...categoriesFaq] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={categorie === cat}
              onClick={() => setCategorie(cat)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-[0.8125rem] transition-[background-color,border-color,color] duration-400",
                categorie === cat
                  ? "border-vert bg-vert text-ivoire"
                  : "border-pierre/70 text-ardoise hover:border-vert/50 hover:text-vert",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div aria-live="polite" className="mt-12">
        <p className="sr-only">
          {resultats.length} question{resultats.length > 1 ? "s" : ""} affichée
          {resultats.length > 1 ? "s" : ""}.
        </p>

        {groupes.length === 0 ? (
          <div className="rounded-lg border border-dashed border-pierre py-16 text-center">
            <p className="text-ardoise">
              Aucune question ne correspond à «&nbsp;{requete}&nbsp;».
            </p>
            <p className="mt-2 text-[0.9375rem] text-gris">
              <Link
                href="/contact"
                className="text-vert underline underline-offset-4"
              >
                Posez la vôtre à l’étude
              </Link>
              , elle rejoindra peut-être cette page.
            </p>
          </div>
        ) : (
          <div className="space-y-14">
            {groupes.map((groupe) => (
              <section key={groupe.categorie}>
                <h2 className="font-display text-[1.5rem] tracking-[-0.02em] md:text-[1.75rem]">
                  {groupe.categorie}
                </h2>
                <div className="mt-4">
                  {groupe.questions.map((q) => (
                    <Question key={q.id} id={q.id} question={q.question}>
                      {q.reponse.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                      {q.lien ? (
                        <p>
                          <Link
                            href={q.lien.href}
                            className="text-vert underline underline-offset-4"
                          >
                            {q.lien.libelle}
                          </Link>
                        </p>
                      ) : null}
                    </Question>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
