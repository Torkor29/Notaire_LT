import type { Metadata } from "next";
import Link from "next/link";
import { listerArticles } from "@/lib/articles";
import { url } from "@/lib/site";
import { formaterDate } from "@/lib/utils";
import { EnTetePage } from "@/components/EnTetePage";
import { Visuel } from "@/components/Visuel";
import { FiltreArticles } from "@/components/FiltreArticles";
import { BandeauContact } from "@/components/sections";
import { Section, Etiquette, Fleche, Bouton } from "@/components/ui";

export const metadata: Metadata = {
  title: "Conseils & articles — comprendre avant de décider",
  description:
    "Immobilier, couple, séparation, famille, succession, patrimoine, entreprise : les articles de l’office notarial Marine Le Treut à Combrit, écrits pour être lus par tout le monde.",
  alternates: { canonical: "/conseils" },
  openGraph: {
    title: "Conseils & articles — notaire à Combrit",
    description: "Comprendre avant de décider.",
    url: url("/conseils"),
  },
};

export default async function PageConseils() {
  const articles = await listerArticles();
  const une = articles.find((a) => a.aLaUne) ?? articles[0];
  const reste = articles.filter((a) => a.slug !== une?.slug);

  const donnees = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": url("/conseils#blog"),
    name: "Conseils & articles",
    url: url("/conseils"),
    publisher: { "@id": url("/#office") },
    blogPost: articles.map((a) => ({
      "@type": "BlogPosting",
      headline: a.titre,
      url: url(`/conseils/${a.slug}`),
      datePublished: a.publication,
      dateModified: a.miseAJour,
      articleSection: a.categorie,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
      />

      <EnTetePage
        surtitre="Conseils & articles"
        titreLignes={["Comprendre", "avant de décider."]}
        chapo="Un magazine juridique sans jargon : ce qui se joue vraiment dans un achat, une union, une séparation ou une transmission — et ce qu’il faut savoir avant de signer."
        miettes={[{ libelle: "Conseils & articles", href: "/conseils" }]}
      />

      {/* À la une */}
      {une ? (
        <Section fond="ivoire" className="pb-0 pt-14 md:pt-16">
          <div className="contenu">
            <article className="group" data-reveal>
              <Link
                href={`/conseils/${une.slug}`}
                className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16"
              >
                <div className="relative overflow-hidden rounded-lg">
                  <Visuel
                    variante={une.visuel}
                    ratio="16 / 10"
                    profondeur={false}
                    masque={false}
                    arrondi={false}
                    className="transition-transform duration-[1200ms] ease-soft group-hover:scale-[1.04]"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Etiquette ton="champagne">À la une</Etiquette>
                    <Etiquette ton="vert">{une.categorie}</Etiquette>
                    <span className="text-[0.75rem] text-gris chiffres">
                      {une.minutes} min de lecture
                    </span>
                  </div>
                  <h2 className="mt-6 text-display-3">
                    <span className="bg-linear-to-r from-vert to-vert bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-700 ease-soft group-hover:bg-[length:100%_1px]">
                      {une.titre}
                    </span>
                  </h2>
                  <p className="mt-5 max-w-xl text-lead text-gris pretty">
                    {une.chapo}
                  </p>
                  <p className="mt-6 flex items-center gap-2 text-[0.875rem] text-vert">
                    Lire l’article
                    <Fleche className="transition-transform duration-600 ease-soft group-hover:translate-x-1" />
                  </p>
                  <p className="mt-4 text-[0.75rem] text-gris">
                    Mis à jour le {formaterDate(une.miseAJour)}
                  </p>
                </div>
              </Link>
            </article>
          </div>
        </Section>
      ) : null}

      {/* Tous les articles */}
      <Section fond="ivoire" className="pt-16 md:pt-20">
        <div className="contenu">
          <FiltreArticles articles={reste} />

          <div className="mt-20 rounded-lg bg-craie p-8 md:p-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <h2 className="font-display text-[1.625rem] leading-snug tracking-[-0.02em] md:text-[2rem]">
                  Un sujet que vous aimeriez voir traité&nbsp;?
                </h2>
                <p className="mt-3 leading-relaxed text-gris pretty">
                  Les articles de cette rubrique sont écrits à partir des
                  questions réellement posées à l’étude. Si la vôtre
                  n’y figure pas, écrivez-nous.
                </p>
              </div>
              <Bouton href="/contact" fleche>
                Proposer un sujet
              </Bouton>
            </div>
          </div>
        </div>
      </Section>

      <BandeauContact visuel="maree" />
    </>
  );
}
