import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  listerSlugsArticles,
  lireArticle,
  articlesLies,
} from "@/lib/articles";
import { acteParSlug } from "@/lib/actes";
import { site, url, avertissementPedagogique } from "@/lib/site";
import { formaterDate } from "@/lib/utils";
import { Visuel } from "@/components/Visuel";
import { Sommaire } from "@/components/Sommaire";
import { CarteArticle } from "@/components/Cartes";
import { BandeauContact, Question } from "@/components/sections";
import {
  Bouton,
  Section,
  Surtitre,
  TitreLignes,
  FilAriane,
  Etiquette,
  Fleche,
  Avertissement,
} from "@/components/ui";

export async function generateStaticParams() {
  const slugs = await listerSlugsArticles();
  return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await lireArticle(slug);
  if (!article) return {};

  return {
    title: article.titre,
    description: article.description,
    alternates: { canonical: `/conseils/${slug}` },
    openGraph: {
      type: "article",
      title: article.titre,
      description: article.description,
      url: url(`/conseils/${slug}`),
      publishedTime: article.publication,
      modifiedTime: article.miseAJour,
      section: article.categorie,
      authors: [site.nom],
    },
  };
}

export default async function PageArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await lireArticle(slug);
  if (!article) notFound();

  const associes = await articlesLies(article.articles, slug, 3);
  const actes = (article.actes ?? [])
    .map((s) => acteParSlug(s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const donnees = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": url(`/conseils/${slug}#article`),
        headline: article.titre,
        description: article.description,
        articleSection: article.categorie,
        datePublished: article.publication,
        dateModified: article.miseAJour,
        inLanguage: "fr-FR",
        author: { "@id": url("/#office") },
        publisher: { "@id": url("/#office") },
        mainEntityOfPage: url(`/conseils/${slug}`),
        wordCount: article.minutes * 240,
      },
      ...(article.faq && article.faq.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": url(`/conseils/${slug}#faq`),
              mainEntity: article.faq.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.r },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
      />

      {/* ---------- Hero éditorial ---------- */}
      <header className="relative overflow-hidden bg-craie">
        <div
          className="contenu relative pb-14 md:pb-16"
          style={{ paddingTop: "calc(var(--entete-hauteur) + 3rem)" }}
        >
          <FilAriane
            miettes={[
              { libelle: "Conseils & articles", href: "/conseils" },
              { libelle: article.titre, href: `/conseils/${slug}` },
            ]}
          />

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <Etiquette ton="vert">{article.categorie}</Etiquette>
                <span className="text-[0.8125rem] text-gris chiffres">
                  {article.minutes} min de lecture
                </span>
                <span aria-hidden="true" className="text-pierre">
                  ·
                </span>
                <span className="text-[0.8125rem] text-gris">
                  Mis à jour le{" "}
                  <time dateTime={article.miseAJour}>
                    {formaterDate(article.miseAJour)}
                  </time>
                </span>
              </div>

              <TitreLignes
                lignes={[article.titre]}
                as="h1"
                className="mt-7 text-display-2"
              />
              <p
                className="mt-7 max-w-2xl text-lead text-ardoise pretty"
                data-reveal
                style={{ "--reveal-delay": "150ms" } as React.CSSProperties}
              >
                {article.chapo}
              </p>
            </div>

            <div>
              <Visuel
                variante={article.visuel}
                ratio="4 / 3"
                profondeur={0.78}
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </div>
        </div>
      </header>

      {/* ---------- Corps ---------- */}
      <Section fond="ivoire" className="pt-14 md:pt-16">
        <div className="contenu">
          <div className="grid gap-12 lg:grid-cols-[0.3fr_1fr] lg:gap-16">
            <aside className="lg:sticky lg:top-[calc(var(--entete-hauteur)+3rem)] lg:self-start">
              <Sommaire entrees={article.sommaire} />

              <div className="mt-10 border-t border-pierre/60 pt-6">
                <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-gris">
                  Une question ?
                </p>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-gris pretty">
                  L’étude répond aux questions posées par écrit sous
                  quelques jours.
                </p>
                <Bouton
                  href="/contact"
                  variante="secondaire"
                  taille="sm"
                  className="mt-4"
                  fleche
                >
                  Écrire à l’étude
                </Bouton>
              </div>
            </aside>

            <div>
              <div
                className="prose-etude"
                dangerouslySetInnerHTML={{ __html: article.html }}
              />

              <div className="mt-14">
                <Avertissement texte={avertissementPedagogique} />
              </div>

              {/* Actes liés */}
              {actes.length > 0 ? (
                <div className="mt-14 border-t border-pierre/60 pt-10">
                  <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-gris">
                    Les fiches correspondantes
                  </p>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {actes.map((acte) => (
                      <li key={acte.slug}>
                        <Link
                          href={`/actes/${acte.slug}`}
                          className="group flex items-center justify-between gap-4 rounded-lg border border-pierre/60 px-5 py-4 transition-[border-color,background-color] duration-500 hover:border-vert/40 hover:bg-craie"
                        >
                          <span className="text-[0.9375rem] leading-snug">
                            {acte.titre}
                          </span>
                          <Fleche className="h-3.5 w-3.5 shrink-0 text-brume transition-transform duration-500 group-hover:translate-x-1" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {/* FAQ */}
              {article.faq && article.faq.length > 0 ? (
                <div className="mt-14 border-t border-pierre/60 pt-10">
                  <h2 className="font-display text-[1.75rem] tracking-[-0.02em] md:text-[2rem]">
                    Questions fréquentes
                  </h2>
                  <div className="mt-6">
                    {article.faq.map((f, i) => (
                      <Question key={f.q} question={f.q} ouvert={i === 0}>
                        <p>{f.r}</p>
                      </Question>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* CTA final */}
              <div className="mt-14 rounded-lg bg-vert-sombre p-8 text-ivoire md:p-10">
                <h2 className="font-display text-[1.625rem] leading-snug tracking-[-0.02em] md:text-[1.875rem]">
                  Votre situation mérite mieux qu’un article.
                </h2>
                <p className="mt-4 max-w-xl leading-relaxed text-ivoire/70 pretty">
                  Ce texte donne des repères généraux. Pour savoir ce qui
                  s’applique à vous, un rendez-vous reste indispensable —
                  et le premier échange suffit souvent à y voir clair.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Bouton href="/contact" variante="clair" fleche>
                    Parler de votre situation
                  </Bouton>
                  <Bouton
                    href={`tel:${site.telephoneLien}`}
                    variante="secondaire"
                    className="border-ivoire/25 text-ivoire hover:border-ivoire hover:bg-ivoire hover:text-vert-sombre"
                  >
                    {site.telephone}
                  </Bouton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ---------- Articles associés ---------- */}
      {associes.length > 0 ? (
        <Section fond="craie">
          <div className="contenu">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <Surtitre>À lire ensuite</Surtitre>
                <TitreLignes
                  lignes={["Articles", "associés."]}
                  as="h2"
                  className="mt-7 text-display-3"
                />
              </div>
              <Link
                href="/conseils"
                className="text-[0.9375rem] text-vert underline underline-offset-4"
              >
                Tous les articles
              </Link>
            </div>
            <div className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-3">
              {associes.map((a, i) => (
                <CarteArticle key={a.slug} article={a} index={i} />
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      <BandeauContact />
    </>
  );
}
