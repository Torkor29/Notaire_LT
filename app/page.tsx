import type { Metadata } from "next";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { site, adressePostale } from "@/lib/site";
import { pagesProjets } from "@/lib/projets";
import { actes, categoriesActes } from "@/lib/actes";
import { questionsFaq, faqVedette } from "@/lib/faq";
import { listerArticles } from "@/lib/articles";
import { Visuel } from "@/components/Visuel";
import { SentinelleHero } from "@/components/SentinelleHero";
import { Compteur } from "@/components/Compteur";
import { CarteArticle } from "@/components/Cartes";
import { SequenceProjets } from "@/components/SequenceProjets";
import { TitreAnime, BandeauDefilant, ChiffreFantome } from "@/components/motion";
import { Chronologie, BandeauContact, Question } from "@/components/sections";
import { CarteLieu } from "@/components/CarteLieu";
import {
  Bouton,
  Surtitre,
  Section,
  Fleche,
  Avertissement,
  Etiquette,
} from "@/components/ui";

export const metadata: Metadata = {
  title:
    "Notaire à Combrit (29) — Office notarial Marine Le Treut, Finistère Sud",
  description:
    "Office notarial de Maître Marine Le Treut, 1 impasse Saint-Tudy à Combrit. Achat et vente immobilière, mariage et PACS, séparation, donation, succession, entreprise en Finistère Sud.",
  alternates: { canonical: "/" },
};

const principes = [
  { titre: "Écouter", texte: "Comprendre la situation avant de proposer une solution." },
  { titre: "Expliquer", texte: "Transformer la complexité juridique en décisions compréhensibles." },
  { titre: "Sécuriser", texte: "Anticiper les conséquences et protéger les intérêts des parties." },
  { titre: "Accompagner", texte: "Rester présent de la première question à la signature, et au-delà." },
];

const outils = [
  {
    titre: "Préparer mon rendez-vous",
    href: "/preparer-mon-rendez-vous",
    texte: "Trois questions, et la liste exacte des documents à réunir pour votre dossier. Cochez au fur et à mesure, imprimez-la.",
    action: "Établir ma liste",
    visuel: "granit" as const,
  },
  {
    titre: "Mon projet en 60 secondes",
    href: "/mon-projet-en-60-secondes",
    texte: "Vous ne savez pas par où commencer ? Deux questions suffisent à vous orienter vers les bonnes pages du site.",
    action: "Lancer le parcours",
    visuel: "seuil" as const,
  },
  {
    titre: "Quelle est votre situation ?",
    href: "/vos-projets/separation#votre-situation",
    texte: "Pour une séparation : votre statut, vos biens, et la liste des sujets que votre dossier devra aborder.",
    action: "Ouvrir l’outil",
    visuel: "estran" as const,
  },
];

const communes = [
  "Combrit",
  "Sainte-Marine",
  "Pont-l’Abbé",
  "Bénodet",
  "Île-Tudy",
  "Plomeur",
  "Tréméoc",
  "Loctudy",
  "Pluguffan",
  "Plonéour-Lanvern",
  "Quimper",
  "Fouesnant",
];

export default async function Accueil() {
  const articles = await listerArticles();
  const selection = [
    ...articles.filter((a) => a.aLaUne),
    ...articles.filter((a) => !a.aLaUne),
  ].slice(0, 6);
  const questions = faqVedette(8);

  return (
    <>
      {/* ══════════════════════ HERO ══════════════════════ */}
      <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-vert-nuit text-ivoire">
        <SentinelleHero ton="sombre" />

        <div className="absolute inset-0">
          <Visuel
            variante="phare"
            ratio="auto"
            profondeur={1.4}
            masque={false}
            arrondi={false}
            priority
            className="h-full w-full rounded-none"
            sizes="100vw"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-vert-nuit via-vert-nuit/55 to-vert-nuit/10"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-vert-nuit/75 via-transparent to-transparent"
        />

        <div className="contenu relative w-full pb-10 pt-[calc(var(--entete-hauteur)+6rem)]">
          <p
            className="surtitre text-ivoire/70"
            style={{ animation: "voile 900ms var(--ease-soft) 120ms both" }}
          >
            <span aria-hidden="true" className="block h-px w-10 bg-champagne" />
            Office notarial à {site.adresse.ville} — Finistère Sud
          </p>

          <h1 className="mt-8 max-w-[17ch] text-display-1 text-ivoire">
            <span className="ligne-masque">
              <span style={{ animation: "glisse 1300ms var(--ease-soft) 240ms both" }}>
                Vos projets méritent
              </span>
            </span>
            <span className="ligne-masque">
              <span style={{ animation: "glisse 1300ms var(--ease-soft) 380ms both" }}>
                plus qu’une signature.
              </span>
            </span>
          </h1>

          <p
            className="mt-8 max-w-2xl text-lead text-ivoire/80 pretty"
            style={{ animation: "voile 1000ms var(--ease-soft) 700ms both" }}
          >
            Maître Marine Le Treut vous accompagne dans les moments qui
            construisent, transforment et transmettent votre patrimoine.
          </p>

          <div
            className="mt-10 flex flex-wrap items-center gap-3"
            style={{ animation: "voile 1000ms var(--ease-soft) 840ms both" }}
          >
            <span data-magnetique="0.2" className="inline-flex">
              <Bouton href="/contact" variante="clair" taille="lg" fleche>
                Parler de votre projet
              </Bouton>
            </span>
            <Bouton
              href="/etude"
              variante="secondaire"
              taille="lg"
              className="border-ivoire/30 text-ivoire hover:border-ivoire hover:bg-ivoire hover:text-vert-sombre"
            >
              Découvrir l’étude
            </Bouton>
          </div>
        </div>

        {/* Bandeau d'informations pratiques */}
        <div
          className="relative border-t border-ivoire/15"
          style={{ animation: "voile 1000ms var(--ease-soft) 1000ms both" }}
        >
          <div className="contenu">
            <dl className="grid divide-y divide-ivoire/10 py-2 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {[
                { t: "Adresse", v: adressePostale, href: "/contact#acces" },
                { t: "Téléphone", v: site.telephone, href: `tel:${site.telephoneLien}` },
                {
                  t: "Rendez-vous",
                  v: "Sur rendez-vous, à l’étude ou à distance",
                  href: "/contact#rendez-vous",
                },
              ].map((item, i) => (
                <div key={item.t} className={cn("py-4", i > 0 && "sm:pl-8")}>
                  <dt className="text-[0.625rem] uppercase tracking-[0.18em] text-ivoire/70">
                    {item.t}
                  </dt>
                  <dd className="mt-1.5 text-[0.9375rem] text-ivoire/90">
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-2"
                    >
                      <span className="lien-souligne">{item.v}</span>
                      <Fleche className="h-3.5 w-3.5 shrink-0 opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-70" />
                    </Link>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <span
          aria-hidden="true"
          className="absolute bottom-36 right-[var(--gouttiere)] hidden h-20 w-px overflow-hidden bg-ivoire/20 lg:block"
        >
          <span
            className="block h-10 w-px bg-champagne"
            style={{ animation: "descente-indice 2600ms var(--ease-calme) 1600ms infinite" }}
          />
        </span>
      </section>

      {/* ══════════════════════ BANDEAU DÉFILANT ══════════════════════ */}
      <BandeauDefilant
        ton="vert"
        vitesse={46}
        mots={[
          "Acheter",
          "Transmettre",
          "S’unir",
          "Se séparer",
          "Entreprendre",
          "Organiser",
          "Protéger",
          "Anticiper",
        ]}
      />

      {/* ══════════════════════ POSITIONNEMENT ══════════════════════ */}
      <Section fond="ivoire" className="overflow-hidden">
        <div className="contenu">
          <div className="grid gap-14 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
            <div>
              <Surtitre>À vos côtés</Surtitre>
              <TitreAnime
                lignes={["Acheter. Transmettre.", "S’unir. Se séparer.", "Entreprendre."]}
                className="mt-8 text-display-2"
                delai={60}
              />
              <div className="mesure mt-10 space-y-6 text-lead text-ardoise pretty">
                <p data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
                  Derrière chacun de ces mots, il y a rarement un dossier. Il y a
                  une maison que l’on visite trois fois avant d’oser une offre.
                  Une conversation repoussée depuis deux ans entre frères et
                  sœurs. Un couple qui ne sait pas comment se dire les choses.
                </p>
                <p data-reveal style={{ "--reveal-delay": "200ms" } as React.CSSProperties}>
                  Ces décisions engagent bien plus qu’un patrimoine. Elles
                  engagent des équilibres familiaux, des projets de vie, parfois
                  des années de travail. Le droit les encadre ; notre rôle est de
                  vous aider à les comprendre, puis à les prendre sereinement.
                </p>
                <p data-reveal style={{ "--reveal-delay": "280ms" } as React.CSSProperties}>
                  C’est pourquoi ce site parle d’abord de situations, et
                  seulement ensuite de droit.
                </p>
              </div>

              {/* Repères chiffrés */}
              <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-pierre/60 pt-10 sm:grid-cols-4">
                {[
                  { v: actes.length, l: "fiches d’actes détaillées", s: "" },
                  { v: articles.length, l: "articles pour comprendre", s: "" },
                  { v: questionsFaq.length, l: "questions fréquentes", s: "" },
                  { v: 5, l: "étapes, de la question à la signature", s: "" },
                ].map((r, i) => (
                  <div
                    key={r.l}
                    data-reveal
                    style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
                  >
                    <dt className="font-display text-[clamp(2.5rem,5vw,3.5rem)] leading-none tracking-[-0.03em] text-vert">
                      <Compteur valeur={r.v} suffixe={r.s} />
                    </dt>
                    <dd className="mt-3 text-[0.875rem] leading-snug text-gris">
                      {r.l}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative lg:pt-10">
              <Visuel
                variante="estuaire"
                ratio="3 / 4"
                profondeur={1.2}
                sizes="(max-width: 1024px) 100vw, 38vw"
                legende="L’anse de Sainte-Marine, à quelques minutes de l’étude."
              />
              <div
                className="mt-6 border-l-2 border-champagne pl-5"
                data-reveal
                style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
              >
                <p className="text-[0.9375rem] leading-relaxed text-gris pretty">
                  L’étude reçoit à Combrit, entre Pont-l’Abbé et Bénodet, à
                  quelques minutes de Sainte-Marine et de l’Île-Tudy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ══════════════════════ SÉQUENCE ÉPINGLÉE ══════════════════════ */}
      <section className="relative bg-craie" id="votre-projet">
        <div className="contenu pb-4 pt-20 md:pt-28">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <Surtitre>Votre projet</Surtitre>
              <TitreAnime
                lignes={["Qu’est-ce qui", "vous amène ?"]}
                className="mt-7 text-display-2"
              />
            </div>
            <p
              className="max-w-sm text-[0.9375rem] leading-relaxed text-gris pretty"
              data-reveal
              style={{ "--reveal-delay": "150ms" } as React.CSSProperties}
            >
              Six situations, six chemins. Choisissez la vôtre : vous y
              trouverez ce qui se joue, les actes concernés et les questions à
              se poser avant le premier rendez-vous.
            </p>
          </div>
        </div>

        <SequenceProjets />

        <div className="contenu pb-20 md:pb-24">
          <Avertissement className="mx-auto max-w-3xl" />
        </div>
      </section>

      {/* ══════════════════════ TOUS LES ACTES ══════════════════════ */}
      <Section fond="ivoire" className="relative overflow-hidden">
        <ChiffreFantome className="-right-4 top-8 lg:right-6">26</ChiffreFantome>
        <div className="contenu relative">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <Surtitre>Actes & expertises</Surtitre>
              <TitreAnime
                lignes={["Tout ce que l’étude", "reçoit, expliqué", "avant d’être signé."]}
                className="mt-7 text-display-2"
              />
            </div>
            <Bouton href="/actes" variante="secondaire" fleche>
              Explorer les fiches
            </Bouton>
          </div>

          <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
            {categoriesActes.map((categorie, ci) => (
              <div
                key={categorie.slug}
                data-reveal
                style={{ "--reveal-delay": `${ci * 90}ms` } as React.CSSProperties}
              >
                <span aria-hidden="true" className="block h-px w-full bg-pierre" />
                <h3 className="mt-5 font-display text-[1.375rem] tracking-[-0.015em]">
                  {categorie.titre}
                </h3>
                <p className="mt-2.5 text-[0.875rem] leading-relaxed text-gris pretty">
                  {categorie.intro}
                </p>
                <ul className="mt-5 space-y-0.5">
                  {actes
                    .filter((a) => a.categorie === categorie.slug)
                    .map((acte) => (
                      <li key={acte.slug}>
                        <Link
                          href={`/actes/${acte.slug}`}
                          className="group/l flex items-baseline gap-2 py-1.5 text-[0.9375rem] leading-snug text-ardoise transition-colors duration-400 hover:text-vert"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-px w-2.5 shrink-0 bg-champagne transition-[width] duration-500 group-hover/l:w-5"
                          />
                          <span>{acte.titre}</span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══════════════════════ L'ÉTUDE ══════════════════════ */}
      <Section fond="craie">
        <div className="contenu">
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div className="order-2 lg:order-1">
              <Visuel
                variante="portrait"
                ratio="4 / 5"
                profondeur={0.9}
                legende="Emplacement réservé au portrait de Maître Marine Le Treut."
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>

            <div className="order-1 lg:order-2 lg:pt-8">
              <Surtitre>L’étude</Surtitre>
              <TitreAnime
                lignes={["Le droit est technique.", "La relation ne devrait", "pas l’être."]}
                className="mt-7 text-display-2"
              />
              <p
                className="mesure mt-8 text-lead text-ardoise pretty"
                data-reveal
                style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
              >
                Un office notarial, ce n’est pas seulement un lieu où l’on
                signe. C’est un endroit où l’on doit pouvoir poser une question
                naïve, revenir sur une explication, et repartir en ayant
                vraiment compris.
              </p>

              <ol className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {principes.map((principe, i) => (
                  <li
                    key={principe.titre}
                    data-reveal
                    style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
                  >
                    <span className="text-[0.6875rem] chiffres text-champagne-sombre">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 font-display text-[1.5rem] tracking-[-0.015em]">
                      {principe.titre}
                    </h3>
                    <span aria-hidden="true" className="mt-3 block h-px w-10 bg-champagne" />
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-gris pretty">
                      {principe.texte}
                    </p>
                  </li>
                ))}
              </ol>

              <div
                className="mt-12 flex flex-wrap gap-3"
                data-reveal
                style={{ "--reveal-delay": "180ms" } as React.CSSProperties}
              >
                <Bouton href="/etude" variante="secondaire" fleche>
                  Découvrir l’étude
                </Bouton>
                <Bouton href="/vos-projets" variante="lien">
                  Voir toutes les situations
                </Bouton>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ══════════════════════ CHRONOLOGIE ══════════════════════ */}
      <Chronologie fond="ivoire" />

      {/* ══════════════════════ OUTILS ══════════════════════ */}
      <Section fond="vert">
        <div className="contenu">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <Surtitre ton="clair">Outils</Surtitre>
              <TitreAnime
                lignes={["Trois outils pour", "arriver préparé."]}
                className="mt-7 text-display-2 text-ivoire"
              />
            </div>
            <p
              className="max-w-sm text-[0.9375rem] leading-relaxed text-ivoire/65 pretty"
              data-reveal
            >
              Gratuits, sans inscription, et conçus pour vous faire gagner du
              temps — pas pour remplacer un rendez-vous.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {outils.map((outil, i) => (
              <Link
                key={outil.href}
                href={outil.href}
                className="group carte-relief relative overflow-hidden rounded-xl border border-ivoire/15 bg-ivoire/5 p-7 md:p-8"
                data-reveal
                style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
              >
                <span className="absolute -right-10 -top-10 h-40 w-40 opacity-25 transition-opacity duration-700 group-hover:opacity-45">
                  <Visuel
                    variante={outil.visuel}
                    ratio="1 / 1"
                    profondeur={false}
                    masque={false}
                    arrondi={false}
                    className="h-full w-full rounded-full"
                    sizes="160px"
                  />
                </span>
                <span className="relative block">
                  <span className="text-[0.6875rem] chiffres text-champagne">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-[1.5rem] leading-tight tracking-[-0.02em] text-ivoire">
                    {outil.titre}
                  </h3>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-ivoire/65 pretty">
                    {outil.texte}
                  </p>
                  <span className="mt-7 inline-flex items-center gap-2 text-[0.875rem] text-champagne">
                    {outil.action}
                    <Fleche className="transition-transform duration-600 ease-soft group-hover:translate-x-1.5" />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* ══════════════════════ CONSEILS ══════════════════════ */}
      <Section fond="ivoire">
        <div className="contenu">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <Surtitre>Conseils & articles</Surtitre>
              <TitreAnime
                lignes={["Comprendre", "avant de décider."]}
                className="mt-7 text-display-2"
              />
            </div>
            <Link
              href="/conseils"
              className="groupe-lien inline-flex items-center gap-2.5 text-[0.9375rem] text-vert"
              data-reveal
            >
              <span className="lien-souligne">Tous les articles</span>
              <Fleche className="transition-transform duration-600 ease-soft group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {selection.map((article, i) => (
              <CarteArticle key={article.slug} article={article} index={i} />
            ))}
          </div>
        </div>
      </Section>

      {/* ══════════════════════ FAQ ══════════════════════ */}
      <Section fond="craie">
        <div className="contenu">
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
            <div className="lg:sticky lg:top-[calc(var(--entete-hauteur)+3rem)] lg:self-start">
              <Surtitre>Questions fréquentes</Surtitre>
              <TitreAnime
                lignes={["Les questions", "que l’on n’ose", "pas toujours poser."]}
                className="mt-7 text-display-3"
              />
              <p
                className="mt-7 max-w-sm leading-relaxed text-ardoise pretty"
                data-reveal
                style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
              >
                Aucune question n’est trop simple. Celles-ci reviennent presque
                à chaque rendez-vous, et leurs réponses sont écrites pour être
                comprises du premier coup.
              </p>
              <div
                className="mt-8"
                data-reveal
                style={{ "--reveal-delay": "220ms" } as React.CSSProperties}
              >
                <Bouton href="/faq" variante="secondaire" fleche>
                  Les {questionsFaq.length} questions
                </Bouton>
              </div>
            </div>

            <div data-reveal>
              {questions.map((q, i) => (
                <Question key={q.id} question={q.question} ouvert={i === 0}>
                  {q.reponse.map((paragraphe, j) => (
                    <p key={j}>{paragraphe}</p>
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

      {/* ══════════════════════ ANCRAGE LOCAL ══════════════════════ */}
      <Section fond="ivoire" id="ou-nous-trouver">
        <div className="contenu">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <div>
              <Surtitre>Finistère Sud</Surtitre>
              <TitreAnime
                lignes={["Une étude", "ancrée dans", "le Pays bigouden."]}
                className="mt-7 text-display-3"
              />
              <p
                className="mt-8 text-lead text-ardoise pretty"
                data-reveal
                style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
              >
                Combrit et Sainte-Marine, l’estuaire de l’Odet, les communes du
                Pays bigouden : l’étude connaît les particularités locales —
                divisions de parcelles, servitudes de passage, zones littorales,
                biens de famille transmis sur plusieurs générations.
              </p>

              <div
                className="mt-10"
                data-reveal
                style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
              >
                <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-gris">
                  Secteur d’intervention
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {communes.map((commune) => (
                    <li key={commune}>
                      <Etiquette ton="contour">{commune}</Etiquette>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[0.8125rem] leading-relaxed text-gris">
                  Le notaire exerce sur l’ensemble du territoire national : vous
                  pouvez faire appel à l’étude où que se situe le bien concerné.
                </p>
              </div>

              <dl className="mt-10 grid gap-6 border-t border-pierre/60 pt-8 sm:grid-cols-2">
                <div>
                  <dt className="text-[0.6875rem] uppercase tracking-[0.16em] text-gris">
                    Adresse
                  </dt>
                  <dd className="mt-2.5 leading-relaxed text-encre">
                    {site.adresse.rue}
                    <br />
                    {site.adresse.codePostal} {site.adresse.ville}
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.6875rem] uppercase tracking-[0.16em] text-gris">
                    Contact
                  </dt>
                  <dd className="mt-2.5 leading-relaxed">
                    <a
                      href={`tel:${site.telephoneLien}`}
                      className="block text-encre transition-colors hover:text-vert"
                    >
                      {site.telephone}
                    </a>
                    <a
                      href={`mailto:${site.email}`}
                      className="block break-all text-encre transition-colors hover:text-vert"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
              <CarteLieu
                latitude={site.adresse.latitude}
                longitude={site.adresse.longitude}
                libelle={site.nom}
                adresse={adressePostale}
                hauteur="h-[26rem] lg:h-[34rem]"
              />
            </div>
          </div>
        </div>
      </Section>

      <BandeauContact />
    </>
  );
}
