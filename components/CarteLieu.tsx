"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Carte interactive OpenStreetMap chargée uniquement à la demande :
 * aucune requête vers un service tiers tant que l’internaute ne l’a pas
 * expressément demandé. Un lien d’itinéraire reste disponible sans carte.
 */
export function CarteLieu({
  latitude,
  longitude,
  libelle,
  adresse,
  zoom = 0.012,
  className,
  hauteur = "h-[26rem]",
}: {
  latitude: number;
  longitude: number;
  libelle: string;
  adresse: string;
  zoom?: number;
  className?: string;
  hauteur?: string;
}) {
  const [chargee, setChargee] = useState(false);

  const bbox = [
    longitude - zoom,
    latitude - zoom * 0.6,
    longitude + zoom,
    latitude + zoom * 0.6,
  ].join("%2C");

  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latitude}%2C${longitude}`;
  const lien = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=16/${latitude}/${longitude}`;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-pierre/60 bg-craie",
        hauteur,
        className,
      )}
    >
      {chargee ? (
        <iframe
          src={src}
          title={`Carte — ${libelle}`}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="h-full w-full border-0"
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-5 p-8 text-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            className="h-9 w-9 text-brume"
            aria-hidden="true"
          >
            <path
              d="M12 21s7-5.686 7-11a7 7 0 1 0-14 0c0 5.314 7 11 7 11Z"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          <div>
            <p className="font-medium text-encre">{libelle}</p>
            <p className="mt-1 text-[0.875rem] text-gris">{adresse}</p>
          </div>
          <button
            type="button"
            onClick={() => setChargee(true)}
            className="rounded-full bg-vert px-6 py-3 text-[0.875rem] font-medium text-ivoire transition-colors duration-500 hover:bg-vert-sombre"
          >
            Afficher la carte
          </button>
          <p className="max-w-xs text-[0.75rem] leading-relaxed text-gris">
            La carte est fournie par OpenStreetMap. Elle n’est chargée que
            si vous le demandez, afin qu’aucune donnée ne soit transmise
            sans votre accord.
          </p>
        </div>
      )}

      <a
        href={lien}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-3 rounded-full bg-ivoire/95 px-4 py-2 text-[0.75rem] text-encre shadow-douce transition-colors hover:bg-ivoire-pur"
      >
        Ouvrir l’itinéraire
      </a>
    </div>
  );
}
