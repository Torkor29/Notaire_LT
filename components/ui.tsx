import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { avertissementPedagogique, url } from "@/lib/site";

/* -------------------------------------------------------------------------- */
/*  Icônes                                                                     */
/* -------------------------------------------------------------------------- */

export function Fleche({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-[1.05em] w-[1.05em] shrink-0", className)}
      aria-hidden="true"
    >
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function Chevron({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4 shrink-0", className)}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Bouton                                                                     */
/* -------------------------------------------------------------------------- */

type VarianteBouton = "primaire" | "secondaire" | "clair" | "lien" | "discret";
type TailleBouton = "md" | "lg" | "sm";

const basesBouton =
  "group/btn relative inline-flex items-center justify-center gap-2.5 font-medium " +
  "transition-[background-color,color,border-color,box-shadow,transform] duration-500 ease-soft " +
  "active:scale-[0.985] disabled:pointer-events-none disabled:opacity-45";

const variantesBouton: Record<VarianteBouton, string> = {
  primaire:
    "rounded-full bg-vert text-ivoire shadow-douce hover:bg-vert-sombre hover:shadow-relief",
  secondaire:
    "rounded-full border border-encre/15 bg-transparent text-encre hover:border-encre/40 hover:bg-encre hover:text-ivoire",
  clair:
    "rounded-full bg-ivoire text-vert-sombre shadow-douce hover:bg-ivoire-pur hover:shadow-relief",
  lien: "text-vert underline-offset-[0.35em] decoration-vert/30 hover:decoration-vert underline decoration-1",
  discret:
    "text-encre/70 hover:text-vert underline underline-offset-[0.35em] decoration-encre/20 decoration-1 hover:decoration-vert",
};

const taillesBouton: Record<TailleBouton, string> = {
  sm: "px-5 py-2.5 text-[0.875rem]",
  md: "px-7 py-3.5 text-[0.9375rem]",
  lg: "px-8 py-4 text-base",
};

interface BoutonCommun {
  variante?: VarianteBouton;
  taille?: TailleBouton;
  fleche?: boolean;
  className?: string;
  children: ReactNode;
}

export function Bouton({
  href,
  variante = "primaire",
  taille = "md",
  fleche = false,
  className,
  children,
  ...props
}: BoutonCommun &
  Omit<ComponentPropsWithoutRef<"a">, "href" | "children" | "className"> & {
    href: string;
  }) {
  const externe = /^(https?:|mailto:|tel:)/.test(href);
  const classes = cn(
    basesBouton,
    variantesBouton[variante],
    variante === "lien" || variante === "discret" ? "" : taillesBouton[taille],
    className,
  );
  const contenu = (
    <>
      <span>{children}</span>
      {fleche ? (
        <Fleche className="transition-transform duration-500 ease-soft group-hover/btn:translate-x-1" />
      ) : null}
    </>
  );

  if (externe) {
    return (
      <a href={href} className={classes} {...props}>
        {contenu}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...props}>
      {contenu}
    </Link>
  );
}

export function BoutonAction({
  variante = "primaire",
  taille = "md",
  fleche = false,
  className,
  children,
  ...props
}: BoutonCommun & ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={cn(
        basesBouton,
        variantesBouton[variante],
        variante === "lien" || variante === "discret" ? "" : taillesBouton[taille],
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {fleche ? (
        <Fleche className="transition-transform duration-500 ease-soft group-hover/btn:translate-x-1" />
      ) : null}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Mise en page éditoriale                                                    */
/* -------------------------------------------------------------------------- */

export function Section({
  children,
  className,
  fond = "ivoire",
  id,
  filet = false,
  ...props
}: {
  children: ReactNode;
  className?: string;
  fond?: "ivoire" | "craie" | "vert" | "sable" | "transparent";
  id?: string;
  filet?: boolean;
} & Omit<ComponentPropsWithoutRef<"section">, "className" | "id">) {
  const fonds: Record<string, string> = {
    ivoire: "bg-ivoire text-encre",
    craie: "bg-craie text-encre",
    sable: "bg-sable text-encre",
    vert: "bg-vert-sombre text-ivoire",
    transparent: "",
  };
  return (
    <section
      id={id}
      className={cn(
        "relative py-20 md:py-28 lg:py-36",
        fonds[fond],
        filet && "border-t border-pierre/60",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

export function Surtitre({
  children,
  className,
  ton = "gris",
}: {
  children: ReactNode;
  className?: string;
  ton?: "gris" | "clair" | "vert";
}) {
  const tons = {
    gris: "text-gris",
    clair: "text-ivoire/60",
    vert: "text-vert",
  };
  return (
    <p className={cn("surtitre", tons[ton], className)} data-reveal>
      <span
        aria-hidden="true"
        className={cn(
          "block h-px w-8",
          ton === "clair" ? "bg-ivoire/35" : "bg-champagne",
        )}
      />
      {children}
    </p>
  );
}

/**
 * Titre révélé ligne par ligne. Les lignes sont fournies explicitement :
 * la césure reste maîtrisée typographiquement plutôt que laissée au hasard.
 */
export function TitreLignes({
  lignes,
  as: Balise = "h2",
  className,
  delai = 0,
}: {
  lignes: ReactNode[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delai?: number;
}) {
  return (
    <Balise className={className} data-reveal="lignes">
      {lignes.map((ligne, i) => (
        <span className="ligne-masque" key={i}>
          <span
            style={
              { "--ligne-delai": `${delai + i * 105}ms` } as React.CSSProperties
            }
          >
            {ligne}
          </span>
        </span>
      ))}
    </Balise>
  );
}

export function Filet({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      data-reveal="filet"
      className={cn("block h-px w-full bg-pierre", className)}
    />
  );
}

export function Etiquette({
  children,
  className,
  ton = "sable",
}: {
  children: ReactNode;
  className?: string;
  ton?: "sable" | "vert" | "contour" | "champagne";
}) {
  const tons = {
    sable: "bg-sable/70 text-ardoise",
    vert: "bg-vert-pale text-vert",
    contour: "border border-encre/12 text-gris",
    champagne: "bg-champagne-pale text-champagne-sombre",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.12em]",
        tons[ton],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Fil d’Ariane                                                               */
/* -------------------------------------------------------------------------- */

export type Miette = { libelle: string; href: string };

export function FilAriane({
  miettes,
  ton = "clair",
}: {
  miettes: Miette[];
  ton?: "clair" | "sombre";
}) {
  const complet: Miette[] = [{ libelle: "Accueil", href: "/" }, ...miettes];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: complet.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: m.libelle,
      item: url(m.href),
    })),
  };

  return (
    <nav
      aria-label="Fil d’Ariane"
      className={cn(
        "text-[0.8125rem]",
        ton === "sombre" ? "text-ivoire/60" : "text-gris",
      )}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {complet.map((m, i) => {
          const dernier = i === complet.length - 1;
          return (
            <li key={m.href} className="flex items-center gap-2">
              {dernier ? (
                <span aria-current="page" className="text-encre/80">
                  {m.libelle}
                </span>
              ) : (
                <Link
                  href={m.href}
                  className="underline-offset-4 transition-colors duration-300 hover:text-vert hover:underline"
                >
                  {m.libelle}
                </Link>
              )}
              {!dernier ? (
                <span aria-hidden="true" className="text-pierre">
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* -------------------------------------------------------------------------- */
/*  Avertissement pédagogique                                                  */
/* -------------------------------------------------------------------------- */

export function Avertissement({
  texte = avertissementPedagogique,
  className,
  ton = "clair",
}: {
  texte?: string;
  className?: string;
  ton?: "clair" | "sombre";
}) {
  return (
    <aside
      className={cn(
        "flex gap-4 rounded-md border-l-2 px-5 py-4 text-[0.875rem] leading-relaxed",
        ton === "sombre"
          ? "border-champagne/70 bg-ivoire/5 text-ivoire/75"
          : "border-champagne bg-champagne-pale/50 text-ardoise",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        className={cn(
          "mt-0.5 h-5 w-5 shrink-0",
          ton === "sombre" ? "text-champagne" : "text-champagne-sombre",
        )}
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8h.01M11 12h1v4h1" strokeLinecap="round" />
      </svg>
      <p>
        <strong className="font-semibold">Information générale.</strong> {texte}
      </p>
    </aside>
  );
}

/* -------------------------------------------------------------------------- */
/*  Encadré « À retenir »                                                      */
/* -------------------------------------------------------------------------- */

export function ARetenir({
  titre = "À retenir",
  children,
  className,
}: {
  titre?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-md rounded-l-none border-l-2 border-vert bg-craie px-6 py-5",
        className,
      )}
      data-reveal
    >
      <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-vert">
        {titre}
      </p>
      <div className="space-y-2 text-[0.9375rem] leading-relaxed text-ardoise">
        {children}
      </div>
    </div>
  );
}
