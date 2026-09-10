import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { cartesProjets } from "@/lib/projets";
import { actes } from "@/lib/actes";
import { questionsFaq, faqVedette } from "@/lib/faq";
import { listerArticles } from "@/lib/articles";
import { Visuel } from "@/components/Visuel";
import { SentinelleHero } from "@/components/SentinelleHero";
import { Compteur } from "@/components/Compteur";
import { CarteProjetVisuelle, CarteArticle } from "@/components/Cartes";
import { Chronologie, BandeauContact, Question } from "@/components/sections";
import {
  Bouton,
  Surtitre,
  TitreLignes,
  Section,
  Fleche,
  Avertissement,
} from "@/components/ui";

export const metadata: Metadata = {
  title:
    "Notaire à Combrit (29) — Office notarial Marine Le Treut, Finistère Sud",
  description:
    "Office notarial de Maître Marine Le Treut, 1 impasse Saint-Tudy à Combrit. Achat et vente immobilière, mariage et PACS, séparation, donation, succession, entreprise en Finistère Sud.",
  alternates: { canonical: "/" },
};

const principes = [
  {
    titre: "Écouter",
    texte: "Comprendre la situation avant de proposer une solution.",
  },
  {
    titre: "Expliquer",
    texte: "Transformer la complexité juridique en décisions compréhensibles.",
  },
  {
    titre: "Sécuriser",
    texte: "Anticiper les conséquences et protéger les intérêts des parties.",
  },
  {
    titre: "Accompagner",
    texte: "Rester présent de la première question jusqu’à la signature et au-delà.",
  },
];

export default async function Accueil() {
  const articles = await listerArticles();
  const aLaUne = articles.filter((a) => a.aLaUne).slice(0, 3);
  const selection = aLaUne.length >= 3 ? aLaUne : articles.slice(0, 3);
  const questions = faqVedette(6);

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative flex min-h-[92svh] items-end overflow-hidden bg-vert-nuit text-ivoire">
        <SentinelleHero ton="sombre" />

        <div className="absolute inset-0">
          <Visuel
            variante="maree"
            ratio="auto"
            parallax={0.07}
            masque={false}
            arrondi={false}
            priority
            className="h-full w-full"
            sizes="100vw"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-vert-nuit via-vert-nuit/55 to-vert-nuit/25"
        />

        <div className="contenu relative w-full pb-20 pt-[calc(var(--entete-hauteur)+5rem)] md:pb-28">
          <p
            className="surtitre text-ivoire/55"
            style={{ animation: "voile 900ms var(--ease-soft) 120ms both" }}
          >
            <span aria-hidden="true" className="block h-px w-8 bg-ivoire/35" />
            Office notarial à {site.adresse.ville} — Finistère Sud
          </p>

          <h1 className="mt-8 max-w-[16ch] text-display-1 text-ivoire">
            <span className="ligne-masque">
              <span
                style={{
                  animation: "glisse 1200ms var(--ease-soft) 220ms both",
                }}
              >
                Vos projets méritent
              </span>
            </span>
            <span className="ligne-masque">
              <span
                style={{
                  animation: "glisse 1200ms var(--ease-soft) 340ms both",
                }}
              >
                plus qu’une signature.
              </span>
            </span>
          </h1>

          <p
            className="mt-8 max-w-2xl text-lead text-ivoire/75 pretty"
            style={{ animation: "voile 1000ms var(--ease-soft) 620ms both" }}
          >
            Maître Marine Le Treut vous accompagne dans les moments qui
            construisent, transforment et transmettent votre patrimoine.
          </p>

          <div
            className="mt-10 flex flex-wrap items-center gap-3"
            style={{ animation: "voile 1000ms var(--ease-soft) 760ms both" }}
          >
            <Bouton href="/contact" variante="clair" taille="lg" fleche>
              Parler de votre projet
            </Bouton>
            <Bouton
              href="/etude"
              variante="secondaire"
              taille="lg"
              className="border-ivoire/25 text-ivoire hover:border-ivoire hover:bg-ivoire hover:text-vert-sombre"
            >
              Découvrir l’étude
            </Bouton>
          </div>
        </div>

        <span
          aria-hidden="true"
          className="absolute bottom-8 right-[var(--gouttiere)] hidden h-16 w-px overflow-hidden bg-ivoire/15 md:block"
        >
          <span
            className="block h-8 w-px bg-ivoire/70"
            style={{
              animation:
                "descente-indice 2600ms var(--ease-calme) 1400ms infinite",
            }}
          />
        </span>
      </section>

      {/* ================= POSITIONNEMENT ================= */}
      <Section fond="ivoire" className="overflow-hidden">
        <div className="contenu">
          <div className="grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-24">
            <div>
              <Surtitre>À vos côtés</Surtitre>
              <TitreLignes
                lignes={[
                  "Acheter. Transmettre.",
                  "S’unir. Se séparer.",
                  "Entreprendre.",
                ]}
                as="h2"
                className="mt-8 text-display-2"
              />
              <div className="mesure mt-10 space-y-6 text-lead text-ardoise pretty">
                <p
                  data-reveal
                  style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
                >
                  Derrière chacun de ces mots, il y a rarement un dossier. Il y
                  a une maison que l’on visite trois fois avant d’oser
                  une offre. Une conversation repoussée depuis deux ans entre
                  frères et sœurs. Un couple qui ne sait pas comment se dire les
                  choses.
                </p>
                <p
                  data-reveal
                  style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
                >
                  Ces décisions engagent bien plus qu’un patrimoine. Elles
                  engagent des équilibres familiaux, des projets de vie, parfois
                  des années de travail. Le droit les encadre&nbsp;; notre rôle
                  est de vous aider à les comprendre, puis à les prendre
                  sereinement.
                </p>
                <p
                  data-reveal
                  style={{ "--reveal-delay": "280ms" } as React.CSSProperties}
                >
                  C’est pourquoi ce site parle d’abord de situations,
                  et seulement ensuite de droit.
                </p>
              </div>
              <div
                className="mt-10"
                data-reveal
                style={{ "--reveal-delay": "340ms" } as React.CSSProperties}
              >
                <Bouton href="/vos-projets" variante="secondaire" fleche>
                  Voir toutes les situations
                </Bouton>
              </div>
            </div>

            <div className="relative lg:pt-16">
              <Visuel
                variante="dune"
                ratio="4 / 5"
                parallax={0.1}
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div
                className="mt-6 border-l border-champagne pl-5"
                data-reveal
                style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
              >
                <p className="text-[0.9375rem] leading-relaxed text-gris">
                  L’étude reçoit à Combrit, à quelques minutes de
                  Sainte-Marine, de Pont-l’Abbé et de Bénodet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ================= VOTRE PROJET ================= */}
      <Section fond="craie" id="votre-projet">
        <div className="contenu">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <Surtitre>Votre projet</Surtitre>
              <TitreLignes
                lignes={["Qu’est-ce qui", "vous amène ?"]}
                as="h2"
                className="mt-7 text-display-2"
              />
            </div>
            <p
              className="max-w-sm text-[0.9375rem] leading-relaxed text-gris pretty"
              data-reveal
              style={{ "--reveal-delay": "150ms" } as React.CSSProperties}
            >
              Six situations, six chemins. Choisissez la vôtre&nbsp;: vous y
              trouverez ce qui se joue, les actes concernés et les questions à
              se poser avant le premier rendez-vous.
            </p>
          </div>

          <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {cartesProjets.map((carte, i) => (
              <CarteProjetVisuelle key={carte.href} index={i} {...carte} />
            ))}
          </div>

          <div
            className="mt-16"
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          >
            <Avertissement className="mx-auto max-w-3xl" />
          </div>
        </div>
      </Section>

      {/* ================= L’ÉTUDE ================= */}
      <Section fond="ivoire">
        <div className="contenu">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div className="order-2 lg:order-1">
              <Visuel
                variante="portrait"
                ratio="4 / 5"
                parallax={0.08}
                legende="Emplacement réservé au portrait de Maître Marine Le Treut."
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>

            <div className="order-1 lg:order-2 lg:pt-8">
              <Surtitre>L’étude</Surtitre>
              <TitreLignes
                lignes={["Le droit est technique.", "La relation ne devrait", "pas l’être."]}
                as="h2"
                className="mt-7 text-display-3"
              />
              <p
                className="mesure mt-8 text-lead text-ardoise pretty"
                data-reveal
                style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
              >
                Un office notarial, ce n’est pas seulement un lieu où
                l’on signe. C’est un endroit où l’on doit pouvoir
                poser une question naïve, revenir sur une explication, et
                repartir en ayant vraiment compris.
              </p>

              <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {principes.map((principe, i) => (
                  <li
                    key={principe.titre}
                    data-reveal
                    style={
                      { "--reveal-delay": `${i * 90}ms` } as React.CSSProperties
                    }
                  >
                    <span
                      aria-hidden="true"
                      className="mb-4 block h-px w-10 bg-champagne"
                    />
                    <h3 className="font-display text-[1.375rem] tracking-[-0.015em]">
                      {principe.titre}
                    </h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-gris pretty">
                      {principe.texte}
                    </p>
                  </li>
                ))}
              </ul>

              <div
                className="mt-12"
                data-reveal
                style={{ "--reveal-delay": "180ms" } as React.CSSProperties}
              >
                <Bouton href="/etude" variante="secondaire" fleche>
                  Découvrir l’étude
                </Bouton>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ================= CHRONOLOGIE ================= */}
      <Chronologie fond="craie" />

      {/* ================= CONSEILS ================= */}
      <Section fond="ivoire">
        <div className="contenu">
          <div className="grid gap-8 border-b border-pierre/60 pb-12 sm:grid-cols-3">
            {[
              { valeur: actes.length, libelle: "fiches d’actes détaillées" },
              { valeur: articles.length, libelle: "articles pour comprendre" },
              {
                valeur: questionsFaq.length,
                libelle: "questions fréquentes, avec leurs réponses",
              },
            ].map((repere, i) => (
              <div
                key={repere.libelle}
                data-reveal
                style={
                  { "--reveal-delay": `${i * 100}ms` } as React.CSSProperties
                }
              >
                <p className="font-display text-[3rem] leading-none tracking-[-0.03em] text-vert md:text-[3.75rem]">
                  <Compteur valeur={repere.valeur} />
                </p>
                <p className="mt-3 text-[0.9375rem] leading-snug text-gris">
                  {repere.libelle}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <Surtitre>Conseils & articles</Surtitre>
              <TitreLignes
                lignes={["Comprendre", "avant de décider."]}
                as="h2"
                className="mt-7 text-display-2"
              />
            </div>
            <Link
              href="/conseils"
              className="group inline-flex items-center gap-2.5 text-[0.9375rem] text-vert"
              data-reveal
            >
              Tous les articles
              <Fleche className="transition-transform duration-600 ease-soft group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-3">
            {selection.map((article, i) => (
              <CarteArticle key={article.slug} article={article} index={i} />
            ))}
          </div>
        </div>
      </Section>

      {/* ================= FAQ ================= */}
      <Section fond="sable">
        <div className="contenu">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div className="lg:sticky lg:top-[calc(var(--entete-hauteur)+3rem)] lg:self-start">
              <Surtitre>Questions fréquentes</Surtitre>
              <TitreLignes
                lignes={["Les questions", "que l’on n’ose", "pas toujours poser."]}
                as="h2"
                className="mt-7 text-display-3"
              />
              <p
                className="mt-7 max-w-sm leading-relaxed text-ardoise pretty"
                data-reveal
                style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
              >
                Aucune question n’est trop simple. Celles-ci reviennent
                presque à chaque rendez-vous.
              </p>
              <div
                className="mt-8"
                data-reveal
                style={{ "--reveal-delay": "220ms" } as React.CSSProperties}
              >
                <Bouton href="/faq" variante="secondaire" fleche>
                  Toutes les questions
                </Bouton>
              </div>
            </div>

            <div data-reveal>
              {questions.map((q, i) => (
                <Question key={q.id} question={q.question} ouvert={i === 0}>
                  {q.reponse.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                  {q.lien ? (
                    <p>
                      <Link
                        href={q.lien.href}
                        className="text-vert underline underline-offset-4"
                      >
                        {q.lien.libelle}
                      </Link>
                    </p>
                  ) : null}
                </Question>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <BandeauContact />
    </>
  );
}
