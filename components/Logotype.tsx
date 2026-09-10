import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * Signature typographique de l’étude.
 * À remplacer par le logo de l’office lorsqu’il sera disponible :
 * il suffit d’y placer une <Image src="/images/logo.svg" …/>.
 */
export function Logotype({
  className,
  ton = "encre",
  taille = "md",
}: {
  className?: string;
  ton?: "encre" | "ivoire";
  taille?: "sm" | "md" | "lg";
}) {
  const tailles = {
    sm: { nom: "text-[1.0625rem]", sous: "text-[0.5625rem]" },
    md: { nom: "text-[1.1875rem] md:text-[1.3125rem]", sous: "text-[0.625rem]" },
    lg: { nom: "text-2xl md:text-[1.75rem]", sous: "text-[0.6875rem]" },
  }[taille];

  return (
    <span className={cn("flex flex-col leading-none", className)}>
      <span
        className={cn(
          "font-display font-normal tracking-[-0.015em]",
          tailles.nom,
          ton === "ivoire" ? "text-ivoire" : "text-encre",
        )}
      >
        Marine Le Treut
      </span>
      <span
        className={cn(
          "mt-1.5 flex items-center gap-2 font-medium uppercase tracking-[0.2em]",
          tailles.sous,
          ton === "ivoire" ? "text-ivoire/60" : "text-gris",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "block h-px w-4",
            ton === "ivoire" ? "bg-ivoire/40" : "bg-champagne",
          )}
        />
        {site.fonction} — {site.adresse.ville}
      </span>
    </span>
  );
}
