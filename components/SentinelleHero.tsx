/**
 * Repère invisible placé en haut d’un hero.
 * Tant qu’il est visible, l’entête reste transparent ; dès qu’il sort du
 * champ, l’entête bascule en verre ivoire. `ton` indique à l’entête s’il
 * doit s’afficher en clair (hero sombre) ou en encre (hero clair).
 */
export function SentinelleHero({ ton = "clair" }: { ton?: "clair" | "sombre" }) {
  return (
    <div
      aria-hidden="true"
      data-hero-sentinelle=""
      data-hero-ton={ton}
      className="pointer-events-none absolute left-0 top-0 h-[calc(var(--entete-hauteur)+2rem)] w-px"
    />
  );
}
