import type { Metadata } from "next";
import { site, adressePostale, mentionProfessionnelle, url } from "@/lib/site";
import { EnTetePage } from "@/components/EnTetePage";
import { Visuel } from "@/components/Visuel";
import { Chronologie, BandeauContact } from "@/components/sections";
import { Bouton, Section, Surtitre, TitreLignes, Filet } from "@/components/ui";

export const metadata: Metadata = {
  title: "L’étude — Maître Marine Le Treut, notaire à Combrit",
  description:
    "L’office notarial de Maître Marine Le Treut à Combrit (29120) : écouter, expliquer, sécuriser, accompagner. Une étude à taille humaine en Finistère Sud.",
  alternates: { canonical: "/etude" },
  openGraph: {
    title: "L’étude — Maître Marine Le Treut, notaire à Combrit",
    description:
      "Écouter, expliquer, sécuriser, accompagner : la façon de travailler de l’office notarial de Combrit.",
    url: url("/etude"),
  },
};

const principes = [
  {
    numero: "01",
    titre: "Écouter",
    texte:
      "Comprendre la situation avant de proposer une solution. Un projet immobilier, une séparation ou une transmission ne se résument jamais à une question juridique : il y a des personnes, un calendrier, des contraintes, parfois des non-dits.",
  },
  {
    numero: "02",
    titre: "Expliquer",
    texte:
      "Transformer la complexité juridique en décisions compréhensibles. Un acte que l’on signe sans l’avoir compris est un acte que l’on subit. Le rôle du notaire est de rendre chaque conséquence lisible, avant la signature.",
  },
  {
    numero: "03",
    titre: "Sécuriser",
    texte:
      "Anticiper les conséquences et protéger les intérêts des parties. Vérifier, interroger, croiser les informations : c’est la part invisible du travail, et c’est celle qui évite les litiges dix ans plus tard.",
  },
  {
    numero: "04",
    titre: "Accompagner",
    texte:
      "Rester présent de la première question jusqu’à la signature et au-delà. L’étude conserve vos actes et reste votre interlocuteur pour les étapes suivantes de votre vie patrimoniale.",
  },
];

const donneesEtude = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": url("/etude#page"),
  name: "L’étude",
  url: url("/etude"),
  about: { "@id": url("/#office") },
};

export default function PageEtude() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donneesEtude) }}
      />

      <EnTetePage
        surtitre="L’étude"
        titreLignes={[
          "Le droit est technique.",
          "La relation ne devrait",
          "pas l’être.",
        ]}
        chapo="L’office notarial de Maître Marine Le Treut reçoit à Combrit, à quelques minutes de Sainte-Marine, de Pont-l’Abbé et de Bénodet. Une étude à taille humaine, pensée pour que l’on puisse y poser ses questions sans détour."
        miettes={[{ libelle: "L’étude", href: "/etude" }]}
        visuel="portrait"
      />

      {/* ---------------- Portrait ---------------- */}
      <Section fond="ivoire">
        <div className="contenu">
          <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            <div>
              <Visuel
                variante="portrait"
                ratio="3 / 4"
                parallax={0.08}
                legende="Emplacement réservé au portrait professionnel de Maître Marine Le Treut."
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <p className="mt-4 text-[0.8125rem] leading-relaxed text-gris">
                Cette page ne comporte volontairement aucune information de
                parcours, de diplôme ou de spécialité : seules les données
                communiquées par l’étude y figureront.
              </p>
            </div>

            <div className="lg:pt-6">
              <Surtitre>Le titulaire</Surtitre>
              <TitreLignes
                lignes={["Maître", "Marine Le Treut"]}
                as="h2"
                className="mt-7 text-display-3"
              />
              <div className="mesure mt-8 space-y-6 text-lead text-ardoise pretty">
                <p data-reveal>
                  Notaire, Maître Marine Le Treut exerce à Combrit, dans le
                  Finistère Sud. Le notaire est un officier public&nbsp;: il
                  confère l’authenticité aux actes qu’il reçoit,
                  conserve leur original et engage sa responsabilité sur les
                  conseils qu’il donne.
                </p>
                <p
                  data-reveal
                  style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
                >
                  C’est une fonction singulière&nbsp;: à la fois
                  officier public, chargé d’une mission de service public,
                  et professionnel libéral que l’on choisit librement,
                  auprès duquel on revient souvent à chaque étape de sa vie.
                </p>
              </div>

              <div className="mt-12">
                <Filet />
                <dl className="mt-8 grid gap-8 sm:grid-cols-2">
                  <div data-reveal>
                    <dt className="text-[0.6875rem] uppercase tracking-[0.16em] text-gris">
                      Adresse
                    </dt>
                    <dd className="mt-3 leading-relaxed text-encre">
                      {site.adresse.rue}
                      <br />
                      {site.adresse.codePostal} {site.adresse.ville}
                    </dd>
                  </div>
                  <div
                    data-reveal
                    style={{ "--reveal-delay": "90ms" } as React.CSSProperties}
                  >
                    <dt className="text-[0.6875rem] uppercase tracking-[0.16em] text-gris">
                      Contact
                    </dt>
                    <dd className="mt-3 leading-relaxed text-encre">
                      <a
                        href={`tel:${site.telephoneLien}`}
                        className="block transition-colors hover:text-vert"
                      >
                        {site.telephone}
                      </a>
                      <a
                        href={`mailto:${site.email}`}
                        className="block break-all transition-colors hover:text-vert"
                      >
                        {site.email}
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------- Principes ---------------- */}
      <Section fond="craie">
        <div className="contenu">
          <div className="max-w-3xl">
            <Surtitre>Notre façon de travailler</Surtitre>
            <TitreLignes
              lignes={["Quatre principes,", "appliqués à chaque dossier."]}
              as="h2"
              className="mt-7 text-display-2"
            />
          </div>

          <div className="mt-16 grid gap-x-12 gap-y-14 md:grid-cols-2">
            {principes.map((principe, i) => (
              <article
                key={principe.titre}
                data-reveal
                style={
                  { "--reveal-delay": `${(i % 2) * 100}ms` } as React.CSSProperties
                }
              >
                <p className="text-[0.75rem] tracking-[0.16em] text-champagne-sombre chiffres">
                  {principe.numero}
                </p>
                <h3 className="mt-4 font-display text-[1.75rem] tracking-[-0.02em] md:text-[2rem]">
                  {principe.titre}
                </h3>
                <span
                  aria-hidden="true"
                  className="mt-5 block h-px w-12 bg-champagne"
                />
                <p className="mt-5 leading-relaxed text-ardoise pretty">
                  {principe.texte}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* ---------------- Équipe (emplacement) ---------------- */}
      <Section fond="ivoire">
        <div className="contenu">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:items-center">
            <div>
              <Surtitre>L’équipe</Surtitre>
              <TitreLignes
                lignes={["Les personnes", "que vous aurez", "au téléphone."]}
                as="h2"
                className="mt-7 text-display-3"
              />
              <p
                className="mesure mt-8 text-lead text-ardoise pretty"
                data-reveal
              >
                Cet emplacement est réservé à la présentation des
                collaborateurs de l’étude&nbsp;: prénom, fonction, domaines
                suivis, coordonnées directes.
              </p>
              <p
                className="mesure mt-5 leading-relaxed text-gris pretty"
                data-reveal
                style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
              >
                Aucun nom, aucune fonction et aucun parcours n’a été
                inventé pour remplir cette page. Les informations seront
                ajoutées lorsqu’elles auront été communiquées par
                l’office.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="rounded-lg border border-dashed border-pierre bg-craie/50 p-6"
                  data-reveal
                  style={
                    { "--reveal-delay": `${i * 100}ms` } as React.CSSProperties
                  }
                >
                  <div className="aspect-square rounded-md bg-sable/60" />
                  <p className="mt-5 text-[0.6875rem] uppercase tracking-[0.16em] text-gris">
                    Emplacement libre
                  </p>
                  <p className="mt-2 text-[0.9375rem] text-gris">
                    Prénom, fonction et domaines suivis.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Chronologie fond="craie" />

      {/* ---------------- Mention professionnelle ---------------- */}
      <Section fond="ivoire" className="py-16 md:py-20">
        <div className="contenu">
          <div className="mx-auto max-w-3xl border-l-2 border-champagne pl-6">
            <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-gris">
              Le notariat
            </p>
            <p className="mt-4 leading-relaxed text-ardoise pretty">
              {mentionProfessionnelle}
            </p>
            <p className="mt-6 text-[0.875rem] text-gris">
              {site.nom} — {adressePostale}
            </p>
            <div className="mt-8">
              <Bouton href="/contact" variante="secondaire" fleche>
                Contacter l’étude
              </Bouton>
            </div>
          </div>
        </div>
      </Section>

      <BandeauContact
        titre={["Une première", "question suffit."]}
        texte="Vous n’avez pas besoin d’un dossier complet pour appeler. Décrivez simplement votre situation : l’étude vous dira ce qui doit être préparé."
      />
    </>
  );
}
