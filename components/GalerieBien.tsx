"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Visuel } from "@/components/Visuel";
import type { PhotoBien } from "@/lib/biens";

/** Galerie plein écran, navigable au clavier et refermable par Échap. */
export function GalerieBien({
  photos,
  titre,
}: {
  photos: PhotoBien[];
  titre: string;
}) {
  const [ouverte, setOuverte] = useState(false);
  const [index, setIndex] = useState(0);
  const refDeclencheur = useRef<HTMLElement | null>(null);

  const ouvrir = useCallback((i: number) => {
    refDeclencheur.current = document.activeElement as HTMLElement;
    setIndex(i);
    setOuverte(true);
  }, []);

  const fermer = useCallback(() => {
    setOuverte(false);
    refDeclencheur.current?.focus?.();
  }, []);

  const suivante = useCallback(
    () => setIndex((i) => (i + 1) % photos.length),
    [photos.length],
  );
  const precedente = useCallback(
    () => setIndex((i) => (i - 1 + photos.length) % photos.length),
    [photos.length],
  );

  useEffect(() => {
    if (!ouverte) return;
    const { style } = document.body;
    const precedent = style.overflow;
    style.overflow = "hidden";

    const surTouche = (e: KeyboardEvent) => {
      if (e.key === "Escape") fermer();
      if (e.key === "ArrowRight") suivante();
      if (e.key === "ArrowLeft") precedente();
    };
    document.addEventListener("keydown", surTouche);
    return () => {
      style.overflow = precedent;
      document.removeEventListener("keydown", surTouche);
    };
  }, [ouverte, fermer, suivante, precedente]);

  if (photos.length === 0) return null;
  const principale = photos[0];
  const secondaires = photos.slice(1, 5);

  return (
    <>
      <div className="grid gap-3 md:grid-cols-[1.6fr_1fr]">
        <button
          type="button"
          onClick={() => ouvrir(0)}
          className="group relative overflow-hidden rounded-lg"
        >
          <span className="sr-only">
            Ouvrir la galerie plein écran — {titre}
          </span>
          <Visuel
            variante={principale.variante ?? "facade"}
            src={principale.src}
            alt={principale.legende ?? titre}
            ratio="4 / 3"
            parallax={false}
            masque={false}
            arrondi={false}
            priority
            className="transition-transform duration-[1100ms] ease-soft group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
          <span className="absolute bottom-4 right-4 z-4 rounded-full bg-ivoire/95 px-4 py-2 text-[0.75rem] text-encre shadow-douce">
            {photos.length} photo{photos.length > 1 ? "s" : ""} — plein écran
          </span>
        </button>

        {secondaires.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-1 md:grid-rows-2">
            {secondaires.slice(0, 2).map((photo, i) => (
              <button
                key={i}
                type="button"
                onClick={() => ouvrir(i + 1)}
                className="group relative overflow-hidden rounded-lg"
              >
                <span className="sr-only">
                  Photographie {i + 2} — {titre}
                </span>
                <Visuel
                  variante={photo.variante ?? "granit"}
                  src={photo.src}
                  alt={photo.legende ?? titre}
                  ratio="4 / 3"
                  parallax={false}
                  masque={false}
                  arrondi={false}
                  className="h-full transition-transform duration-[1100ms] ease-soft group-hover:scale-[1.05]"
                  sizes="(max-width: 768px) 50vw, 30vw"
                />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {ouverte ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Galerie — ${titre}`}
          className="fixed inset-0 z-90 flex flex-col bg-vert-nuit/97"
          style={{ animation: "voile 350ms var(--ease-soft) both" }}
        >
          <div className="flex items-center justify-between px-5 py-4 text-ivoire md:px-8">
            <p className="text-[0.875rem] chiffres">
              {index + 1} / {photos.length}
            </p>
            <button
              type="button"
              onClick={fermer}
              autoFocus
              className="rounded-full px-4 py-2 text-[0.8125rem] uppercase tracking-[0.12em] text-ivoire/70 transition-colors hover:bg-ivoire/10 hover:text-ivoire"
            >
              Fermer
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-4 pb-6 md:px-16">
            <div className="max-h-full w-full max-w-5xl">
              <Visuel
                key={index}
                variante={photos[index].variante ?? "facade"}
                src={photos[index].src}
                alt={photos[index].legende ?? titre}
                ratio="3 / 2"
                parallax={false}
                masque={false}
                sizes="100vw"
              />
              {photos[index].legende ? (
                <p className="mt-4 text-center text-[0.875rem] text-ivoire/60">
                  {photos[index].legende}
                </p>
              ) : null}
            </div>

            {photos.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={precedente}
                  className={cn(
                    "absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-ivoire/10 p-3 text-ivoire transition-colors hover:bg-ivoire/20 md:left-6",
                  )}
                >
                  <span className="sr-only">Photographie précédente</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="m15 6-6 6 6 6" strokeLinecap="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={suivante}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-ivoire/10 p-3 text-ivoire transition-colors hover:bg-ivoire/20 md:right-6"
                >
                  <span className="sr-only">Photographie suivante</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="m9 6 6 6-6 6" strokeLinecap="round" />
                  </svg>
                </button>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
