import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { pagesProjets, projetParSlug } from "@/lib/projets";
import { acteParSlug } from "@/lib/actes";
import { listerArticles } from "@/lib/articles";
import { url, avertissementPedagogique } from "@/lib/site";
import { EnTetePage } from "@/components/EnTetePage";
import { Visuel } from "@/components/Visuel";
import { CarteArticle, CarteActe } from "@/components/Cartes";
import { BandeauContact, Question } from "@/components/sections";
import { SchemasSeparation } from "@/components/SchemasPatrimoine";
import { OutilSeparation } from "@/components/OutilSeparation";
import {
  Bouton,
  Section,
  Surtitre,
  TitreLignes,
  Avertissement,
} from "@/components/ui";

export function generateStaticParams() {
  return pagesProjets.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const projet = projetParSlug(slug);
  if (!projet) return {};

  return {
    title: projet.metaTitre,
    description: projet.metaDescription,
    alternates: { canonical: `/vos-projets/${projet.slug}` },
    openGraph: {
      title: projet.metaTitre,
      description: projet.metaDescription,
      url: url(`/vos-projets/${projet.slug}`),
      type: "article",
    },
  };
}

export default async function PageProjet({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projet = projetParSlug(slug);
  if (!projet) notFound();

  const tousArticles = await listerArticles();
  const articles = projet.articles
    .map((s) => tousArticles.find((a) => a.slug === s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));
  const actes = projet.actes
    .map((s) => acteParSlug(s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const estSeparation = projet.slug === "separation";

  const donnees = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": url(`/vos-projets/${projet.slug}#faq`),
    mainEntity: projet.questions.map((q) => ({
      "@type": "Question",
      name: q.q,
      acceptedAnswer: { "@type": "Answer", text: q.r },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
      />

      <EnTetePage
        surtitre={projet.surtitre}
        titreLignes={projet.titreLignes}
        chapo={projet.chapo}
        miettes={[
          { libelle: "Vos projets", href: "/vos-projets" },
          { libelle: projet.libelle, href: `/vos-projets/${projet.slug}` },
        ]}
        visuel={projet.visuel}
        variante={estSeparation ? "sombre" : "clair"}
        enfants={
          <div className="flex flex-wrap gap-3">
            <Bouton
              href="/contact"
              variante={estSeparation ? "clair" : "primaire"}
              fleche
            >
              Parler de votre projet
            </Bouton>
            <Bouton
              href="/preparer-mon-rendez-vous"
              variante="secondaire"
              className={
                estSeparation
                  ? "border-ivoire/25 text-ivoire hover:border-ivoire hover:bg-ivoire hover:text-vert-sombre"
                  : undefined
              }
            >
              Préparer mon rendez-vous
            </Bouton>
          </div>
        }
      />

      {/* -------- Situations -------- */}
      <Section fond="ivoire">
        <div className="contenu">
          <div className="max-w-2xl">
            <Surtitre>Ce que cela recouvre</Surtitre>
            <TitreLignes
              lignes={["Dans quelle situation", "êtes-vous ?"]}
              as="h2"
              className="mt-7 text-display-3"
            />
          </div>

          <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {projet.situations.map((s, i) => (
              <article
                key={s.titre}
                data-reveal
                style={
                  { "--reveal-delay": `${(i % 2) * 90}ms` } as React.CSSProperties
                }
              >
                <span
                  aria-hidden="true"
                  className="mb-5 block h-px w-10 bg-champagne"
                />
                <h3 className="text-titre leading-snug">{s.titre}</h3>
                <p className="mt-3 leading-relaxed text-gris pretty">
                  {s.texte}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* -------- Schémas + outil (dossier séparation) -------- */}
      {estSeparation ? (
        <>
          <Section fond="craie" id="comprendre">
            <div className="contenu">
              <div className="max-w-2xl">
                <Surtitre>Comprendre</Surtitre>
                <TitreLignes
                  lignes={["Trois statuts,", "trois façons de posséder."]}
                  as="h2"
                  className="mt-7 text-display-3"
                />
                <p
                  className="mt-7 text-lead text-ardoise pretty"
                  data-reveal
                  style={{ "--reveal-delay": "150ms" } as React.CSSProperties}
                >
                  Ces trois schémas résument ce qui change d’un statut à
                  l’autre. Ils sont volontairement simplifiés&nbsp;: la
                  réalité d’un dossier dépend toujours des actes signés.
                </p>
              </div>
              <div className="mt-14">
                <SchemasSeparation />
              </div>
            </div>
          </Section>

          <Section fond="ivoire" id="votre-situation">
            <div className="contenu">
              <div className="max-w-2xl">
                <Surtitre>Outil pédagogique</Surtitre>
                <TitreLignes
                  lignes={["Quelle est", "votre situation ?"]}
                  as="h2"
                  className="mt-7 text-display-3"
                />
                <p
                  className="mt-7 text-lead text-ardoise pretty"
                  data-reveal
                  style={{ "--reveal-delay": "150ms" } as React.CSSProperties}
                >
                  Deux questions, et la liste des sujets que votre dossier
                  devra aborder. Ce parcours n’établit aucun diagnostic
                  personnalisé&nbsp;: il indique où regarder.
                </p>
              </div>
              <div
                className="mt-12"
                data-reveal
                style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
              >
                <OutilSeparation />
              </div>
            </div>
          </Section>
        </>
      ) : null}

      {/* -------- Sections rédactionnelles -------- */}
      {projet.sections.map((section, index) => (
        <Section
          key={section.titre}
          id={section.id}
          fond={index % 2 === 0 && !estSeparation ? "craie" : "ivoire"}
        >
          <div className="contenu">
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
              <div className="lg:sticky lg:top-[calc(var(--entete-hauteur)+3rem)] lg:self-start">
                <TitreLignes
                  lignes={[section.titre]}
                  as="h2"
                  className="text-display-3"
                />
                {index === 0 ? (
                  <div className="mt-10 hidden lg:block">
                    <Visuel
                      variante={projet.visuelSecondaire}
                      ratio="4 / 3"
                      parallax={0.08}
                      sizes="35vw"
                    />
                  </div>
                ) : null}
              </div>

              <div>
                <div className="space-y-6 text-lead text-ardoise pretty">
                  {section.paragraphes.map((p, i) => (
                    <p
                      key={i}
                      data-reveal
                      style={
                        { "--reveal-delay": `${i * 80}ms` } as React.CSSProperties
                      }
                    >
                      {p}
                    </p>
                  ))}
                </div>

                {section.liste ? (
                  <dl className="mt-12 divide-y divide-pierre/60 border-y border-pierre/60">
                    {section.liste.map((item, i) => (
                      <div
                        key={item.titre}
                        className="grid gap-2 py-6 md:grid-cols-[0.42fr_1fr] md:gap-8"
                        data-reveal
                        style={
                          { "--reveal-delay": `${i * 70}ms` } as React.CSSProperties
                        }
                      >
                        <dt className="font-medium text-encre">{item.titre}</dt>
                        <dd className="leading-relaxed text-gris pretty">
                          {item.texte}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
              </div>
            </div>
          </div>
        </Section>
      ))}

      {/* -------- Actes concernés -------- */}
      <Section fond="craie">
        <div className="contenu">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <Surtitre>Actes & expertises</Surtitre>
              <TitreLignes
                lignes={["Les actes", "concernés."]}
                as="h2"
                className="mt-7 text-display-3"
              />
            </div>
            <Bouton href="/actes" variante="secondaire" fleche>
              Toutes les fiches
            </Bouton>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {actes.map((acte, i) => (
              <CarteActe key={acte.slug} acte={acte} index={i} />
            ))}
          </div>
        </div>
      </Section>

      {/* -------- Questions -------- */}
      <Section fond="ivoire" id="questions">
        <div className="contenu">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div className="lg:sticky lg:top-[calc(var(--entete-hauteur)+3rem)] lg:self-start">
              <Surtitre>Questions fréquentes</Surtitre>
              <TitreLignes
                lignes={["Ce que l’on", "nous demande", "le plus souvent."]}
                as="h2"
                className="mt-7 text-display-3"
              />
              <div className="mt-8">
                <Bouton href="/faq" variante="secondaire" fleche>
                  Toutes les questions
                </Bouton>
              </div>
            </div>

            <div>
              <div data-reveal>
                {projet.questions.map((q, i) => (
                  <Question key={q.q} question={q.q} ouvert={i === 0}>
                    <p>{q.r}</p>
                  </Question>
                ))}
              </div>
              <div className="mt-10">
                <Avertissement texte={avertissementPedagogique} />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* -------- Articles liés -------- */}
      {articles.length > 0 ? (
        <Section fond="craie">
          <div className="contenu">
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <Surtitre>Pour aller plus loin</Surtitre>
                <TitreLignes
                  lignes={["À lire", "sur le sujet."]}
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
              {articles.map((article, i) => (
                <CarteArticle key={article.slug} article={article} index={i} />
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      <BandeauContact
        titre={["Votre situation", "est unique."]}
        texte="Ces pages donnent des repères généraux. Un rendez-vous permet de les confronter à vos actes, à vos chiffres et à votre calendrier."
      />
    </>
  );
}
