"use client";

import { useMemo, useState } from "react";
import { cn, normaliser } from "@/lib/utils";
import {
  categoriesArticles,
  type ApercuArticle,
} from "@/lib/articles-types";
import { CarteArticle } from "@/components/Cartes";

export function FiltreArticles({ articles }: { articles: ApercuArticle[] }) {
  const [categorie, setCategorie] = useState<string>("Toutes");
  const [requete, setRequete] = useState("");

  const utilisees = useMemo(
    () =>
      categoriesArticles.filter((c) => articles.some((a) => a.categorie === c)),
    [articles],
  );

  const resultats = useMemo(() => {
    const q = normaliser(requete);
    return articles.filter((a) => {
      if (categorie !== "Toutes" && a.categorie !== categorie) return false;
      if (q.length < 2) return true;
      return normaliser(
        `${a.titre} ${a.chapo} ${a.motsCles ?? ""} ${a.categorie}`,
      ).includes(q);
    });
  }, [articles, categorie, requete]);

  return (
    <div>
      <div className="flex flex-col gap-5 border-y border-pierre/60 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="tablist"
          aria-label="Filtrer par catégorie"
          className="-mx-1 flex gap-1 overflow-x-auto px-1"
        >
          {["Toutes", ...utilisees].map((cat) => (
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

        <div className="relative lg:w-72">
          <label htmlFor="recherche-articles" className="sr-only">
            Rechercher un article
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
            id="recherche-articles"
            type="search"
            value={requete}
            onChange={(e) => setRequete(e.target.value)}
            placeholder="Chercher un article…"
            className="w-full rounded-full border border-pierre/70 bg-ivoire-pur py-2.5 pl-10 pr-4 text-[0.875rem] outline-none transition-colors duration-300 placeholder:text-gris focus:border-vert"
          />
        </div>
      </div>

      <div aria-live="polite" className="mt-14">
        {resultats.length === 0 ? (
          <div className="rounded-lg border border-dashed border-pierre py-16 text-center">
            <p className="text-ardoise">Aucun article ne correspond.</p>
            <button
              type="button"
              onClick={() => {
                setCategorie("Toutes");
                setRequete("");
              }}
              className="mt-3 text-[0.9375rem] text-vert underline underline-offset-4"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {resultats.map((article, i) => (
              <CarteArticle key={article.slug} article={article} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
