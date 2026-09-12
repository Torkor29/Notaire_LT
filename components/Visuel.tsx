import type { CSSProperties } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { scenes, type NomScene } from "@/components/scenes";

/**
 * SYSTÈME VISUEL
 * --------------
 * Les images du site sont des illustrations vectorielles composées pour ce
 * projet : le littoral de Combrit et de Sainte-Marine, l'anse, l'architecture
 * bretonne, la pinède, le granit. Chacune est construite en cinq plans de
 * profondeur animés séparément au défilement.
 *
 * Dès qu'une photographie réelle est disponible, la déposer dans
 * `public/images/` et passer `src="/images/mon-fichier.jpg"` : le composant
 * bascule sur next/image (AVIF/WebP, tailles responsives, lazy loading) en
 * conservant révélations et parallax.
 */

/** Anciens noms conservés pour ne rien casser dans les pages existantes. */
const alias: Record<string, NomScene> = {
  horizon: "estran",
  dune: "pinede",
  facade: "maison",
  maree: "phare",
  voile: "estuaire",
  bocage: "bourg",
  granit: "granit",
  seuil: "seuil",
  portrait: "portrait",
};

export type VarianteVisuel = NomScene | keyof typeof alias;

export interface VisuelProps {
  variante: VarianteVisuel;
  /** Photographie réelle, si elle est disponible dans `public/images/`. */
  src?: string;
  alt?: string;
  ratio?: string;
  className?: string;
  /** Intensité du relief entre les plans (0 = plat). */
  profondeur?: number | false;
  /** Révélation par masque au scroll. */
  masque?: "bas" | "gauche" | false;
  legende?: string;
  priority?: boolean;
  sizes?: string;
  arrondi?: boolean;
  /** Teinte appliquée au survol par la carte parente. */
  interactif?: boolean;
}

export function Visuel({
  variante,
  src,
  alt,
  ratio = "4 / 5",
  className,
  profondeur = 1,
  masque = "bas",
  legende,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  arrondi = true,
  interactif = false,
}: VisuelProps) {
  const nom = (alias[variante] ?? variante) as NomScene;
  const Scene = scenes[nom] ?? scenes.estran;

  const attributsMasque =
    masque === false
      ? {}
      : { "data-reveal": masque === "gauche" ? "masque-lateral" : "masque" };

  return (
    <figure
      className={cn(
        "relative overflow-hidden bg-craie grain",
        arrondi && "rounded-lg",
        className,
      )}
      style={{ aspectRatio: ratio }}
      {...attributsMasque}
    >
      <div
        className={cn("absolute inset-0", masque !== false && "masque-contenu")}
      >
        <div
          className="absolute inset-0"
          {...(profondeur === false
            ? {}
            : { "data-scene": String(profondeur) })}
          style={
            profondeur === false
              ? undefined
              : ({ "--scene-zoom": "1.08" } as CSSProperties)
          }
        >
          {src ? (
            <Image
              src={src}
              alt={alt ?? ""}
              fill
              sizes={sizes}
              priority={priority}
              className="h-full w-full scale-[var(--scene-zoom,1)] object-cover"
            />
          ) : (
            <svg
              viewBox="0 0 1600 1200"
              preserveAspectRatio="xMidYMid slice"
              className="h-full w-full scale-[var(--scene-zoom,1)]"
              role={alt ? "img" : "presentation"}
              aria-label={alt || undefined}
              aria-hidden={alt ? undefined : true}
              focusable="false"
            >
              {alt ? <title>{alt}</title> : null}
              <defs>
                <radialGradient id="vz-vignette" cx="0.5" cy="0.45" r="0.78">
                  <stop offset="55%" stopColor="#000000" stopOpacity="0" />
                  <stop offset="100%" stopColor="#0d1a16" stopOpacity="0.3" />
                </radialGradient>
              </defs>
              <Scene />
              <rect
                width="1600"
                height="1200"
                fill="url(#vz-vignette)"
                pointerEvents="none"
              />
            </svg>
          )}
        </div>
      </div>

      {interactif ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-3 bg-vert-nuit/0 transition-colors duration-700 ease-soft group-hover:bg-vert-nuit/15"
        />
      ) : null}

      {legende ? (
        <figcaption className="absolute inset-x-0 bottom-0 z-4 bg-linear-to-t from-encre/70 to-transparent px-5 pb-4 pt-16 text-xs leading-snug text-ivoire/95">
          {legende}
        </figcaption>
      ) : null}
    </figure>
  );
}
