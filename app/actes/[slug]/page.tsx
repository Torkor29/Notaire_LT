import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  actes,
  acteParSlug,
  actesParCategorie,
  categorieParSlug,
} from "@/lib/actes";
import { projetParSlug } from "@/lib/projets";
import { listerArticles } from "@/lib/articles";
import { url, avertissementPedagogique } from "@/lib/site";
import { EnTetePage } from "@/components/EnTetePage";
import { CarteArticle } from "@/components/Cartes";
import { BandeauContact } from "@/components/sections";
import {
  Bouton,
  Section,
  Surtitre,
  TitreLignes,
  Fleche,
  Avertissement,
} from "@/components/ui";

export function generateStaticParams() {
  return actes.map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const acte = acteParSlug(slug);
  if (!acte) return {};

  const titre = `${acte.titre} — notaire à Combrit`;
  return {
    title: titre,
    description: acte.resume,
    alternates: { canonical: `/actes/${acte.slug}` },
    openGraph: {
      title: titre,
      description: acte.resume,
      url: url(`/actes/${acte.slug}`),
      type: "article",
    },
  };
}

const RUBRIQUES = [
  { cle: "quoi", titre: "De quoi s’agit-il ?", id: "de-quoi-s-agit-il" },
  { cle: "quand", titre: "Quand faut-il y penser ?", id: "quand-y-penser" },
  {
    cle: "pourquoi",
    titre: "Pourquoi consulter un notaire ?",
    id: "pourquoi-un-notaire",
  },
  {
    cle: "deroule",
    titre: "Comment se déroule le rendez-vous ?",
    id: "le-rendez-vous",
  },
  {
    cle: "documents",
    titre: "Quels documents préparer ?",
    id: "documents",
  },
] as const;

export default async function PageActe({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const acte = acteParSlug(slug);
  if (!acte) notFound();

  const categorie = categorieParSlug(acte.categorie);
  const projet = acte.projet ? projetParSlug(acte.projet) : undefined;
  const voisins = actesParCategorie(acte.categorie)
    .filter((a) => a.slug !== acte.slug)
    .slice(0, 4);

  const tousArticles = await listerArticles();
  const articles = (acte.articles ?? [])
    .map((s) => tousArticles.find((a) => a.slug === s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const donnees = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": url(`/actes/${acte.slug}#service`),
    name: acte.titre,
    description: acte.resume,
    serviceType: categorie?.titre,
    provider: { "@id": url("/#office") },
    areaServed: { "@type": "AdministrativeArea", name: "Finistère" },
    url: url(`/actes/${acte.slug}`),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
      />

      <EnTetePage
        surtitre={categorie?.titre ?? "Actes & expertises"}
        titreLignes={[acte.titre]}
        chapo={acte.resume}
        miettes={[
          { libelle: "Actes & expertises", href: "/actes" },
          { libelle: acte.titre, href: `/actes/${acte.slug}` },
        ]}
        enfants={
          <div className="flex flex-wrap gap-3">
            <Bouton href="/contact" fleche>
              Poser une question à l’étude
            </Bouton>
            {projet ? (
              <Bouton
                href={`/vos-projets/${projet.slug}`}
                variante="secondaire"
              >
                Le dossier {projet.libelle.toLowerCase()}
              </Bouton>
            ) : null}
          </div>
        }
      />

      <Section fond="ivoire" className="pt-14 md:pt-16">
        <div className="contenu">
          <div className="grid gap-12 lg:grid-cols-[0.32fr_1fr] lg:gap-16">
            {/* Sommaire */}
            <nav
              aria-label="Sommaire de la fiche"
              className="lg:sticky lg:top-[calc(var(--entete-hauteur)+3rem)] lg:self-start"
            >
              <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-gris">
                Sur cette fiche
              </p>
              <ol className="mt-5 space-y-3 border-l border-pierre pl-5">
                {RUBRIQUES.map((r) => (
                  <li key={r.id}>
                    <a
                      href={`#${r.id}`}
                      className="text-[0.875rem] leading-snug text-gris transition-colors duration-300 hover:text-vert"
                    >
                      {r.titre}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* Rubriques */}
            <div className="space-y-16">
              {RUBRIQUES.map((rubrique, index) => {
                const contenu = acte[rubrique.cle];
                const estDocuments = rubrique.cle === "documents";
                return (
                  <section
                    key={rubrique.id}
                    id={rubrique.id}
                    className="scroll-mt-[calc(var(--entete-hauteur)+2rem)]"
                    data-reveal
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="text-[0.75rem] tracking-[0.16em] text-champagne-sombre chiffres">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h2 className="text-display-3">{rubrique.titre}</h2>
                    </div>

                    {estDocuments ? (
                      <>
                        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                          {contenu.map((doc) => (
                            <li
                              key={doc}
                              className="flex gap-3 rounded-md border border-pierre/60 bg-craie/50 px-4 py-3.5 text-[0.9375rem] leading-snug text-ardoise"
                            >
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mt-0.5 h-4 w-4 shrink-0 text-vert"
                                aria-hidden="true"
                              >
                                <path d="m5 12 5 5L19 7" />
                              </svg>
                              {doc}
                            </li>
                          ))}
                        </ul>
                        <p className="mt-5 text-[0.875rem] text-gris">
                          Liste indicative.{" "}
                          <Link
                            href="/preparer-mon-rendez-vous"
                            className="text-vert underline underline-offset-4"
                          >
                            Générer ma liste personnalisée
                          </Link>
                          .
                        </p>
                      </>
                    ) : (
                      <div className="mt-6 space-y-5 text-lead text-ardoise pretty">
                        {contenu.map((p, i) => (
                          <p key={i}>{p}</p>
                        ))}
                      </div>
                    )}
                  </section>
                );
              })}

              <div data-reveal>
                <Avertissement texte={avertissementPedagogique} />
              </div>

              <div
                className="rounded-lg bg-craie p-8 md:p-10"
                data-reveal
              >
                <h2 className="font-display text-[1.625rem] leading-snug tracking-[-0.02em]">
                  Une question sur {acte.titre.toLowerCase()}&nbsp;?
                </h2>
                <p className="mt-3 max-w-xl leading-relaxed text-gris pretty">
                  Décrivez votre situation en quelques lignes. L’étude vous
                  répond et vous indique, le cas échéant, les documents à
                  réunir.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Bouton href="/contact" fleche>
                    Poser une question à l’étude
                  </Bouton>
                  <Bouton href="/contact#rendez-vous" variante="secondaire">
                    Prendre rendez-vous
                  </Bouton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Fiches voisines */}
      {voisins.length > 0 ? (
        <Section fond="craie">
          <div className="contenu">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <Surtitre>{categorie?.titre}</Surtitre>
                <TitreLignes
                  lignes={["Les fiches", "de la même rubrique."]}
                  as="h2"
                  className="mt-7 text-display-3"
                />
              </div>
              <Link
                href="/actes"
                className="text-[0.9375rem] text-vert underline underline-offset-4"
              >
                Toutes les fiches
              </Link>
            </div>

            <ul className="mt-12 divide-y divide-pierre/60 border-y border-pierre/60">
              {voisins.map((voisin, i) => (
                <li
                  key={voisin.slug}
                  data-reveal
                  style={
                    { "--reveal-delay": `${i * 70}ms` } as React.CSSProperties
                  }
                >
                  <Link
                    href={`/actes/${voisin.slug}`}
                    className="group flex items-center justify-between gap-6 py-5"
                  >
                    <span>
                      <span className="block text-[1.125rem] leading-snug transition-transform duration-600 ease-soft group-hover:translate-x-1">
                        {voisin.titre}
                      </span>
                      <span className="mt-1 block text-[0.875rem] text-gris">
                        {voisin.resume}
                      </span>
                    </span>
                    <Fleche className="h-4 w-4 shrink-0 text-brume transition-all duration-600 ease-soft group-hover:translate-x-1 group-hover:text-vert" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      {/* Articles liés */}
      {articles.length > 0 ? (
        <Section fond="ivoire">
          <div className="contenu">
            <Surtitre>Pour aller plus loin</Surtitre>
            <TitreLignes
              lignes={["À lire sur le sujet."]}
              as="h2"
              className="mt-7 text-display-3"
            />
            <div className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-3">
              {articles.map((article, i) => (
                <CarteArticle key={article.slug} article={article} index={i} />
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      <BandeauContact />
    </>
  );
}
