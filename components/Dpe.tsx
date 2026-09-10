import { cn } from "@/lib/utils";
import type { ClasseDpe } from "@/lib/biens";

const COULEURS: Record<ClasseDpe, { fond: string; texte: string }> = {
  A: { fond: "#1f7a4d", texte: "#ffffff" },
  B: { fond: "#3d9a52", texte: "#ffffff" },
  C: { fond: "#7fb043", texte: "#14251f" },
  D: { fond: "#d5c04a", texte: "#14251f" },
  E: { fond: "#dfa03a", texte: "#14251f" },
  F: { fond: "#d97a34", texte: "#ffffff" },
  G: { fond: "#c14a35", texte: "#ffffff" },
};

const CLASSES: ClasseDpe[] = ["A", "B", "C", "D", "E", "F", "G"];

export function EtiquetteDpe({
  classe,
  label,
  className,
}: {
  classe: ClasseDpe;
  label: string;
  className?: string;
}) {
  const couleur = COULEURS[classe];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm px-2 py-1 text-[0.6875rem] font-semibold",
        className,
      )}
      style={{ backgroundColor: couleur.fond, color: couleur.texte }}
    >
      <span className="sr-only">{label} : classe</span>
      <span aria-hidden="true" className="opacity-70">
        {label}
      </span>
      {classe}
    </span>
  );
}

/** Échelle complète, telle qu’elle doit figurer dans une annonce. */
export function EchelleDpe({
  classe,
  titre,
}: {
  classe: ClasseDpe;
  titre: string;
}) {
  return (
    <div>
      <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-gris">
        {titre}
      </p>
      <ul className="mt-3 space-y-1" role="list">
        {CLASSES.map((c) => {
          const actif = c === classe;
          const couleur = COULEURS[c];
          return (
            <li key={c} className="flex items-center gap-3">
              <span
                className={cn(
                  "flex h-6 items-center rounded-sm px-2 text-[0.6875rem] font-semibold transition-opacity",
                  actif ? "opacity-100" : "opacity-30",
                )}
                style={{
                  backgroundColor: couleur.fond,
                  color: couleur.texte,
                  width: `${34 + CLASSES.indexOf(c) * 9}%`,
                }}
              >
                {c}
              </span>
              {actif ? (
                <span className="text-[0.75rem] font-medium text-encre">
                  Classe {c}
                </span>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
