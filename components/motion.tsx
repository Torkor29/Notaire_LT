import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Titre révélé mot à mot                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Chaque mot apparaît avec un léger flou et une remontée, décalé dans le temps.
 * Les lignes sont fournies explicitement : la césure reste maîtrisée.
 */
export function TitreAnime({
  lignes,
  as: Balise = "h2",
  className,
  delai = 0,
  pas = 55,
}: {
  lignes: string[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delai?: number;
  pas?: number;
}) {
  let index = 0;
  return (
    <Balise className={className} data-reveal="lignes">
      {lignes.map((ligne, i) => (
        <span className="block" key={i}>
          {ligne.split(" ").map((mot, j) => {
            const d = delai + index * pas;
            index += 1;
            return (
              <span
                key={j}
                className="mot-revele"
                style={{ "--mot-delai": `${d}ms` } as CSSProperties}
              >
                {mot}
                {j < ligne.split(" ").length - 1 ? " " : ""}
              </span>
            );
          })}
        </span>
      ))}
    </Balise>
  );
}

/* -------------------------------------------------------------------------- */
/*  Bandeau de mots défilants                                                  */
/* -------------------------------------------------------------------------- */

export function BandeauDefilant({
  mots,
  vitesse = 44,
  ton = "clair",
  separateur = "·",
  className,
}: {
  mots: string[];
  vitesse?: number;
  ton?: "clair" | "sombre" | "vert";
  separateur?: string;
  className?: string;
}) {
  const tons = {
    clair: "bg-craie text-encre border-y border-pierre/60",
    sombre: "bg-vert-nuit text-ivoire",
    vert: "bg-vert text-ivoire",
  };
  const serie = (cle: string) => (
    <div className="flex shrink-0 items-center" key={cle} aria-hidden={cle !== "a"}>
      {mots.map((mot, i) => (
        <span key={i} className="flex items-center">
          <span className="whitespace-nowrap px-7 font-display text-[clamp(1.5rem,3.4vw,2.75rem)] tracking-[-0.02em]">
            {mot}
          </span>
          <span
            className={cn(
              "text-[1.25rem]",
              ton === "clair" ? "text-champagne" : "text-champagne/70",
            )}
          >
            {separateur}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "defilant-conteneur relative overflow-hidden py-6 md:py-8",
        tons[ton],
        className,
      )}
    >
      <div
        className="defilant"
        style={{ "--duree-defilement": `${vitesse}s` } as CSSProperties}
      >
        {serie("a")}
        {serie("b")}
      </div>
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r to-transparent",
          ton === "clair" ? "from-craie" : ton === "vert" ? "from-vert" : "from-vert-nuit",
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l to-transparent",
          ton === "clair" ? "from-craie" : ton === "vert" ? "from-vert" : "from-vert-nuit",
        )}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Grand chiffre en filigrane                                                 */
/* -------------------------------------------------------------------------- */

export function ChiffreFantome({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("chiffre-fantome absolute select-none", className)}
      data-reveal
    >
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Barre de progression de lecture                                            */
/* -------------------------------------------------------------------------- */

export function ProgressionLecture() {
  return (
    <div id="progression-lecture" aria-hidden="true" className="sans-impression">
      <span />
    </div>
  );
}
