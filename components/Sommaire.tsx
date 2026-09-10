"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Sommaire collant, avec mise en évidence de la section lue. */
export function Sommaire({
  entrees,
}: {
  entrees: { id: string; titre: string }[];
}) {
  const [actif, setActif] = useState<string | null>(entrees[0]?.id ?? null);

  useEffect(() => {
    if (entrees.length === 0) return;

    const observateur = new IntersectionObserver(
      (entries) => {
        const visibles = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visibles[0]) setActif(visibles[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    for (const entree of entrees) {
      const el = document.getElementById(entree.id);
      if (el) observateur.observe(el);
    }
    return () => observateur.disconnect();
  }, [entrees]);

  if (entrees.length === 0) return null;

  return (
    <nav aria-label="Sommaire de l’article">
      <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-gris">
        Sommaire
      </p>
      <ol className="mt-5 space-y-1 border-l border-pierre">
        {entrees.map((entree) => (
          <li key={entree.id}>
            <a
              href={`#${entree.id}`}
              aria-current={actif === entree.id ? "true" : undefined}
              className={cn(
                "-ml-px block border-l py-1.5 pl-5 text-[0.875rem] leading-snug transition-colors duration-400",
                actif === entree.id
                  ? "border-vert text-vert"
                  : "border-transparent text-gris hover:text-encre",
              )}
            >
              {entree.titre}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
