import Link from "next/link";
import { cn, formaterDate } from "@/lib/utils";
import { Visuel, type VarianteVisuel } from "@/components/Visuel";
import { Etiquette, Fleche } from "@/components/ui";
import type { ApercuArticle } from "@/lib/articles-types";
import type { Acte } from "@/lib/actes";

/* -------------------------------------------------------------------------- */
/*  Carte « projet » — grande carte photographique                             */
/* -------------------------------------------------------------------------- */

export function CarteProjetVisuelle({
  titre,
  href,
  description,
  visuel,
  index = 0,
  className,
}: {
  titre: string;
  href: string;
  description: string;
  visuel: VarianteVisuel;
  index?: number;
  className?: string;
}) {
  return (
    <article
      className={cn("group relative", className)}
      data-reveal
      style={{ "--reveal-delay": `${(index % 3) * 90}ms` } as React.CSSProperties}
    >
      <Link href={href} className="block focus:outline-none">
        <span className="sr-only">{titre}</span>
        <div className="relative overflow-hidden rounded-lg">
          <Visuel
            variante={visuel}
            ratio="5 / 4"
            profondeur={false}
            masque={false}
            arrondi={false}
            className="transition-transform duration-[1100ms] ease-soft group-hover:scale-[1.045]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-3 bg-vert-nuit/0 transition-colors duration-700 ease-soft group-hover:bg-vert-nuit/12"
          />
        </div>

        <div className="pt-6">
          <span
            aria-hidden="true"
            className="mb-5 block h-px w-full origin-left bg-pierre transition-[background-color] duration-700 group-hover:bg-vert"
          />
          <h3
            className="flex items-start justify-between gap-4 text-[1.375rem] leading-tight tracking-[-0.015em] md:text-[1.5rem]"
            aria-hidden="true"
          >
            <span className="transition-transform duration-700 ease-soft group-hover:translate-x-1">
              {titre}
            </span>
            <Fleche className="mt-1.5 h-4 w-4 shrink-0 text-brume transition-all duration-700 ease-soft group-hover:translate-x-1 group-hover:text-vert" />
          </h3>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-gris pretty">
            {description}
          </p>
        </div>
      </Link>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*  Carte article                                                              */
/* -------------------------------------------------------------------------- */

export function CarteArticle({
  article,
  index = 0,
  compacte = false,
}: {
  article: ApercuArticle;
  index?: number;
  compacte?: boolean;
}) {
  return (
    <article
      className="group"
      data-reveal
      style={{ "--reveal-delay": `${(index % 3) * 90}ms` } as React.CSSProperties}
    >
      <Link href={`/conseils/${article.slug}`} className="block">
        {!compacte ? (
          <div className="relative overflow-hidden rounded-lg">
            <Visuel
              variante={article.visuel}
              ratio="16 / 10"
              profondeur={false}
              masque={false}
              arrondi={false}
              className="transition-transform duration-[1100ms] ease-soft group-hover:scale-[1.045]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ) : null}

        <div className={compacte ? "" : "pt-6"}>
          <div className="flex flex-wrap items-center gap-3">
            <Etiquette ton="vert">{article.categorie}</Etiquette>
            <span className="text-[0.75rem] text-gris chiffres">
              {article.minutes} min de lecture
            </span>
          </div>
          <h3 className="mt-4 text-[1.25rem] leading-snug tracking-[-0.015em] md:text-[1.375rem]">
            <span className="bg-linear-to-r from-vert to-vert bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-700 ease-soft group-hover:bg-[length:100%_1px]">
              {article.titre}
            </span>
          </h3>
          <p className="mt-3 line-clamp-3 text-[0.9375rem] leading-relaxed text-gris pretty">
            {article.chapo}
          </p>
          <p className="mt-4 text-[0.75rem] text-gris">
            Mis à jour le {formaterDate(article.miseAJour)}
          </p>
        </div>
      </Link>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*  Carte acte — liste dense                                                   */
/* -------------------------------------------------------------------------- */

export function CarteActe({ acte, index = 0 }: { acte: Acte; index?: number }) {
  return (
    <Link
      href={`/actes/${acte.slug}`}
      className="group relative flex flex-col justify-between gap-4 rounded-lg border border-pierre/60 bg-ivoire-pur p-6 transition-[border-color,box-shadow,transform] duration-600 ease-soft hover:-translate-y-0.5 hover:border-vert/40 hover:shadow-relief md:p-7"
      data-reveal
      style={{ "--reveal-delay": `${(index % 3) * 70}ms` } as React.CSSProperties}
    >
      <div>
        <h3 className="text-[1.1875rem] leading-snug tracking-[-0.01em]">
          {acte.titre}
        </h3>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-gris pretty">
          {acte.resume}
        </p>
      </div>
      <span className="flex items-center gap-2 text-[0.8125rem] text-vert">
        Consulter la fiche
        <Fleche className="h-3.5 w-3.5 transition-transform duration-600 ease-soft group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
