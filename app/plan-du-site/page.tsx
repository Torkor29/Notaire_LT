import type { Metadata } from "next";
import Link from "next/link";
import { navigation, liensOutils, liensLegaux, url } from "@/lib/site";
import { actes, categoriesActes } from "@/lib/actes";
import { pagesProjets } from "@/lib/projets";
import { listerArticles } from "@/lib/articles";
import { listerBiens } from "@/lib/biens";
import { EnTetePage } from "@/components/EnTetePage";
import { Section, Fleche } from "@/components/ui";

export const metadata: Metadata = {
  title: "Plan du site",
  description:
    "Toutes les pages du site de l’office notarial Marine Le Treut à Combrit : projets, actes, articles, immobilier, outils et informations légales.",
  alternates: { canonical: "/plan-du-site" },
  openGraph: { title: "Plan du site", url: url("/plan-du-site") },
};

function Bloc({
  titre,
  liens,
  colonnes = 1,
}: {
  titre: string;
  liens: { libelle: string; href: string }[];
  colonnes?: number;
}) {
  return (
    <section data-reveal>
      <h2 className="font-display text-[1.5rem] tracking-[-0.02em] md:text-[1.75rem]">
        {titre}
      </h2>
      <span aria-hidden="true" className="mt-4 block h-px w-full bg-pierre" />
      <ul
        className={
          colonnes > 1
            ? "mt-5 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3"
            : "mt-5 space-y-2"
        }
      >
        {liens.map((lien) => (
          <li key={lien.href}>
            <Link
              href={lien.href}
              className="group inline-flex items-center gap-2 py-1 text-[0.9375rem] text-ardoise transition-colors duration-400 hover:text-vert"
            >
              {lien.libelle}
              <Fleche className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-400 group-hover:translate-x-0 group-hover:opacity-60" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function PagePlanDuSite() {
  const articles = await listerArticles();
  const biens = await listerBiens();

  return (
    <>
      <EnTetePage
        surtitre="Navigation"
        titreLignes={["Plan", "du site."]}
        chapo="Toutes les pages publiées, réunies sur un seul écran."
        miettes={[{ libelle: "Plan du site", href: "/plan-du-site" }]}
      />

      <Section fond="ivoire" className="pt-12 md:pt-14">
        <div className="contenu space-y-16">
          <Bloc
            titre="Pages principales"
            liens={navigation.map((l) => ({ libelle: l.libelle, href: l.href }))}
          />

          <Bloc
            titre="Vos projets"
            liens={pagesProjets.map((p) => ({
              libelle: p.libelle,
              href: `/vos-projets/${p.slug}`,
            }))}
          />

          {categoriesActes.map((cat) => (
            <Bloc
              key={cat.slug}
              titre={`Actes — ${cat.titre}`}
              colonnes={3}
              liens={actes
                .filter((a) => a.categorie === cat.slug)
                .map((a) => ({ libelle: a.titre, href: `/actes/${a.slug}` }))}
            />
          ))}

          <Bloc
            titre="Conseils & articles"
            colonnes={2}
            liens={articles.map((a) => ({
              libelle: a.titre,
              href: `/conseils/${a.slug}`,
            }))}
          />

          {biens.length > 0 ? (
            <Bloc
              titre="Biens proposés"
              colonnes={2}
              liens={biens.map((b) => ({
                libelle: b.titre,
                href: `/immobilier/${b.slug}`,
              }))}
            />
          ) : null}

          <Bloc
            titre="Outils"
            liens={[
              ...liensOutils.map((l) => ({ libelle: l.libelle, href: l.href })),
              { libelle: "Recherche sur le site", href: "/recherche" },
            ]}
          />

          <Bloc
            titre="Informations légales"
            liens={liensLegaux.map((l) => ({
              libelle: l.libelle,
              href: l.href,
            }))}
          />
        </div>
      </Section>
    </>
  );
}
