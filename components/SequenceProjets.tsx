"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { cartesProjets } from "@/lib/projets";
import { Visuel } from "@/components/Visuel";
import { Fleche } from "@/components/ui";

/**
 * Séquence épinglée : la section reste fixée pendant que le défilement fait
 * défiler les six situations, image et texte enchaînés.
 *
 * Sur mobile et sous `prefers-reduced-motion`, on retombe sur une liste
 * classique de cartes empilées — même contenu, sans épinglage.
 */
export function SequenceProjets() {
  const [actif, setActif] = useState(0);
  const [epingle, setEpingle] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const n = cartesProjets.length;

  useEffect(() => {
    const assezLarge = window.matchMedia("(min-width: 1024px)");
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!assezLarge.matches || reduit.matches) return;

    setEpingle(true);
    let attente = false;

    const calculer = () => {
      attente = false;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const course = rect.height - window.innerHeight;
      if (course <= 0) return;
      const t = Math.min(1, Math.max(0, -rect.top / course));
      setActif(Math.min(n - 1, Math.floor(t * n * 0.999)));
    };

    const planifier = () => {
      if (attente) return;
      attente = true;
      requestAnimationFrame(calculer);
    };

    window.addEventListener("scroll", planifier, { passive: true });
    window.addEventListener("resize", planifier, { passive: true });
    calculer();
    return () => {
      window.removeEventListener("scroll", planifier);
      window.removeEventListener("resize", planifier);
    };
  }, [n]);

  /* ------------------------- Repli : cartes empilées ---------------------- */
  if (!epingle) {
    return (
      <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
        {cartesProjets.map((carte, i) => (
          <article
            key={carte.href}
            className="group"
            data-reveal
            style={{ "--reveal-delay": `${(i % 2) * 90}ms` } as React.CSSProperties}
          >
            <Link href={carte.href} className="block">
              <div className="relative overflow-hidden rounded-lg">
                <Visuel
                  variante={carte.visuel}
                  ratio="5 / 4"
                  profondeur={false}
                  masque={false}
                  arrondi={false}
                  interactif
                  className="transition-transform duration-[1100ms] ease-soft group-hover:scale-[1.05]"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <span className="absolute left-4 top-4 z-4 rounded-full bg-ivoire/90 px-3 py-1 text-[0.6875rem] chiffres text-vert">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-6 flex items-start justify-between gap-4 text-[1.5rem] leading-tight tracking-[-0.015em]">
                <span className="transition-transform duration-700 ease-soft group-hover:translate-x-1">
                  {carte.titre}
                </span>
                <Fleche className="mt-1.5 h-4 w-4 shrink-0 text-brume transition-all duration-700 ease-soft group-hover:translate-x-1 group-hover:text-vert" />
              </h3>
              <p className="mt-3 leading-relaxed text-gris pretty">
                {carte.description}
              </p>
            </Link>
          </article>
        ))}
      </div>
    );
  }

  /* --------------------------- Séquence épinglée -------------------------- */
  return (
    <div ref={ref} style={{ height: `${n * 68}vh` }} className="relative">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="contenu w-full">
          <div className="grid grid-cols-[1fr_1.05fr] items-center gap-16">
            {/* Colonne texte */}
            <div className="relative">
              <ol className="space-y-1">
                {cartesProjets.map((carte, i) => {
                  const courant = i === actif;
                  return (
                    <li key={carte.href}>
                      <Link
                        href={carte.href}
                        onFocus={() => setActif(i)}
                        onMouseEnter={() => setActif(i)}
                        className={cn(
                          "group flex items-baseline gap-6 border-b py-5 transition-colors duration-500",
                          courant ? "border-vert/40" : "border-pierre/40",
                        )}
                      >
                        <span
                          className={cn(
                            "w-8 shrink-0 text-[0.75rem] chiffres transition-colors duration-500",
                            courant ? "text-champagne-sombre" : "text-gris",
                          )}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1">
                          <span
                            className={cn(
                              "block font-display text-[clamp(1.5rem,2.4vw,2.375rem)] leading-tight tracking-[-0.02em] transition-[color,transform,opacity] duration-500 ease-soft",
                              courant
                                ? "translate-x-2 text-encre"
                                : "text-encre/55",
                            )}
                          >
                            {carte.titre}
                          </span>
                          <span
                            className={cn(
                              "grid transition-[grid-template-rows,opacity] duration-600 ease-soft",
                              courant
                                ? "grid-rows-[1fr] opacity-100"
                                : "grid-rows-[0fr] opacity-0",
                            )}
                          >
                            <span className="overflow-hidden">
                              <span className="block pt-3 text-[0.9375rem] leading-relaxed text-gris">
                                {carte.description}
                              </span>
                            </span>
                          </span>
                        </span>
                        <Fleche
                          className={cn(
                            "h-4 w-4 shrink-0 self-center transition-all duration-500",
                            courant
                              ? "translate-x-0 text-vert opacity-100"
                              : "-translate-x-2 opacity-0",
                          )}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ol>

              {/* Progression */}
              <div className="mt-8 flex items-center gap-4">
                <span className="h-px flex-1 bg-pierre">
                  <span
                    className="block h-px bg-vert transition-[width] duration-600 ease-soft"
                    style={{ width: `${((actif + 1) / n) * 100}%` }}
                  />
                </span>
                <span className="text-[0.75rem] chiffres text-gris">
                  {String(actif + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Colonne image */}
            <div className="relative aspect-4/5 max-h-[74vh] overflow-hidden rounded-xl">
              {cartesProjets.map((carte, i) => (
                <div
                  key={carte.href}
                  aria-hidden={i !== actif}
                  className={cn(
                    "absolute inset-0 transition-[opacity,transform] duration-[900ms] ease-soft",
                    i === actif
                      ? "scale-100 opacity-100"
                      : "scale-[1.06] opacity-0",
                  )}
                >
                  <Visuel
                    variante={carte.visuel}
                    ratio="4 / 5"
                    profondeur={i === actif ? 1.2 : false}
                    masque={false}
                    arrondi={false}
                    className="h-full w-full"
                    sizes="50vw"
                  />
                </div>
              ))}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-4 rounded-xl ring-1 ring-inset ring-encre/10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
