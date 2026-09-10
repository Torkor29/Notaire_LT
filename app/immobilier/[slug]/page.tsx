import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { listerBiens, bienParSlug } from "@/lib/biens";
import { site, url } from "@/lib/site";
import { formaterPrix } from "@/lib/utils";
import { GalerieBien } from "@/components/GalerieBien";
import { CarteLieu } from "@/components/CarteLieu";
import { EchelleDpe } from "@/components/Dpe";
import { BandeauContact } from "@/components/sections";
import {
  Bouton,
  Section,
  Surtitre,
  FilAriane,
  Etiquette,
  TitreLignes,
} from "@/components/ui";

export async function generateStaticParams() {
  const biens = await listerBiens();
  return biens.map((b) => ({ slug: b.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const bien = await bienParSlug(slug);
  if (!bien) return {};

  const titre = `${bien.titre} — ${bien.commune}`;
  const description = `${bien.type} de ${bien.surface} m², ${bien.pieces} pièces, ${bien.chambres} chambres à ${bien.commune} (${bien.codePostal}). Vente par l’office notarial Marine Le Treut.`;

  return {
    title: titre,
    description,
    alternates: { canonical: `/immobilier/${slug}` },
    robots: bien.demonstration ? { index: false, follow: false } : undefined,
    openGraph: { title: titre, description, url: url(`/immobilier/${slug}`) },
  };
}

export default async function PageBien({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const bien = await bienParSlug(slug);
  if (!bien) notFound();

  const caracteristiques = [
    { libelle: "Type", valeur: bien.type },
    { libelle: "Surface habitable", valeur: `${bien.surface} m²` },
    bien.terrain
      ? { libelle: "Terrain", valeur: `${bien.terrain} m²` }
      : null,
    { libelle: "Pièces", valeur: String(bien.pieces) },
    { libelle: "Chambres", valeur: String(bien.chambres) },
    { libelle: "Commune", valeur: `${bien.commune} (${bien.codePostal})` },
    { libelle: "Référence", valeur: bien.reference },
  ].filter((c): c is { libelle: string; valeur: string } => Boolean(c));

  const donnees = bien.demonstration
    ? null
    : {
        "@context": "https://schema.org",
        "@type": "RealEstateListing",
        "@id": url(`/immobilier/${slug}#annonce`),
        name: bien.titre,
        url: url(`/immobilier/${slug}`),
        datePosted: new Date().toISOString().slice(0, 10),
        offers: {
          "@type": "Offer",
          price: bien.prix,
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          seller: { "@id": url("/#office") },
        },
        about: {
          "@type": bien.type === "Appartement" ? "Apartment" : "House",
          numberOfRooms: bien.pieces,
          numberOfBedrooms: bien.chambres,
          floorSize: {
            "@type": "QuantitativeValue",
            value: bien.surface,
            unitCode: "MTK",
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: bien.commune,
            postalCode: bien.codePostal,
            addressCountry: "FR",
          },
        },
      };

  return (
    <>
      {donnees ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
        />
      ) : null}

      <div
        className="contenu"
        style={{ paddingTop: "calc(var(--entete-hauteur) + 2rem)" }}
      >
        <FilAriane
          miettes={[
            { libelle: "Immobilier", href: "/immobilier" },
            { libelle: bien.titre, href: `/immobilier/${slug}` },
          ]}
        />
      </div>

      {/* ---------- Galerie ---------- */}
      <section className="contenu mt-8">
        {bien.demonstration ? (
          <p className="mb-5 rounded-md border-l-2 border-champagne bg-champagne-pale/60 px-5 py-4 text-[0.875rem] text-ardoise">
            <strong className="font-semibold">
              Annonce de démonstration.
            </strong>{" "}
            Ce bien n’existe pas. Cette fiche sert uniquement à visualiser
            la mise en page ; elle est exclue de l’indexation.
          </p>
        ) : null}
        <GalerieBien photos={bien.photos} titre={bien.titre} />
      </section>

      {/* ---------- Informations ---------- */}
      <Section fond="ivoire" className="pt-14 md:pt-16">
        <div className="contenu">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <Etiquette ton="vert">{bien.type}</Etiquette>
                <span className="text-[0.875rem] text-gris">
                  {bien.commune} ({bien.codePostal})
                </span>
              </div>

              <TitreLignes
                lignes={[bien.titre]}
                as="h1"
                className="mt-6 text-display-3"
              />

              <p className="mt-6 font-display text-[2.5rem] leading-none tracking-[-0.03em] text-vert chiffres md:text-[3rem]">
                {formaterPrix(bien.prix)}
              </p>
              <p className="mt-3 text-[0.875rem] leading-relaxed text-gris">
                {bien.honoraires === "vendeur"
                  ? "Honoraires de négociation à la charge du vendeur."
                  : `Dont ${formaterPrix(bien.honorairesMontant ?? 0)} d’honoraires de négociation à la charge de l’acquéreur, soit ${formaterPrix(bien.prixHorsHonoraires ?? bien.prix)} hors honoraires.`}{" "}
                Hors frais d’acquisition (droits, débours et émoluments).
              </p>

              <div className="mt-10 space-y-5 text-lead text-ardoise pretty">
                {bien.description.map((p, i) => (
                  <p key={i} data-reveal>
                    {p}
                  </p>
                ))}
              </div>

              {bien.atouts.length > 0 ? (
                <ul className="mt-10 grid gap-3 sm:grid-cols-2">
                  {bien.atouts.map((atout) => (
                    <li
                      key={atout}
                      className="flex gap-3 text-[0.9375rem] text-ardoise"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mt-1 h-4 w-4 shrink-0 text-vert"
                        aria-hidden="true"
                      >
                        <path d="m5 12 5 5L19 7" />
                      </svg>
                      {atout}
                    </li>
                  ))}
                </ul>
              ) : null}

              <dl className="mt-12 grid gap-x-8 gap-y-5 border-t border-pierre/60 pt-8 sm:grid-cols-2">
                {caracteristiques.map((c) => (
                  <div
                    key={c.libelle}
                    className="flex items-baseline justify-between gap-4 border-b border-pierre/40 pb-3"
                  >
                    <dt className="text-[0.875rem] text-gris">{c.libelle}</dt>
                    <dd className="text-[0.9375rem] font-medium text-encre chiffres">
                      {c.valeur}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Colonne latérale */}
            <aside className="lg:sticky lg:top-[calc(var(--entete-hauteur)+2rem)] lg:self-start">
              <div className="rounded-xl border border-pierre/60 bg-craie/60 p-6 md:p-7">
                <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-gris">
                  Ce bien vous intéresse
                </p>
                <p className="mt-3 leading-relaxed text-ardoise pretty">
                  L’étude organise les visites et répond à vos questions
                  sur le bien comme sur le financement.
                </p>
                <div className="mt-6 grid gap-3">
                  <Bouton
                    href={`/contact?objet=visite&bien=${bien.reference}`}
                    fleche
                  >
                    Demander une visite
                  </Bouton>
                  <Bouton
                    href={`/contact?objet=rappel&bien=${bien.reference}`}
                    variante="secondaire"
                  >
                    Être rappelé
                  </Bouton>
                  <a
                    href={`tel:${site.telephoneLien}`}
                    className="mt-1 text-center text-[0.875rem] text-gris underline underline-offset-4 transition-colors hover:text-vert"
                  >
                    Appeler le {site.telephone}
                  </a>
                </div>
              </div>

              {bien.dpe ? (
                <div className="mt-6 rounded-xl border border-pierre/60 p-6 md:p-7">
                  <div className="grid gap-8 sm:grid-cols-2">
                    <EchelleDpe
                      classe={bien.dpe.classe}
                      titre="Diagnostic de performance énergétique"
                    />
                    <EchelleDpe
                      classe={bien.dpe.ges}
                      titre="Émissions de gaz à effet de serre"
                    />
                  </div>
                  {bien.dpe.coutMin && bien.dpe.coutMax ? (
                    <p className="mt-6 text-[0.8125rem] leading-relaxed text-gris">
                      Montant estimé des dépenses annuelles d’énergie pour
                      un usage standard&nbsp;: entre{" "}
                      {formaterPrix(bien.dpe.coutMin)} et{" "}
                      {formaterPrix(bien.dpe.coutMax)} par an
                      {bien.dpe.anneeReference
                        ? `, prix moyens des énergies indexés au ${bien.dpe.anneeReference}`
                        : ""}
                      .
                    </p>
                  ) : null}
                </div>
              ) : null}

              {bien.copropriete ? (
                <div className="mt-6 rounded-xl border border-pierre/60 p-6 md:p-7">
                  <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-gris">
                    Copropriété
                  </p>
                  <ul className="mt-4 space-y-2 text-[0.875rem] text-ardoise">
                    <li className="chiffres">
                      {bien.copropriete.lots} lots au total
                    </li>
                    <li className="chiffres">
                      Charges annuelles prévisionnelles&nbsp;:{" "}
                      {formaterPrix(bien.copropriete.chargesAnnuelles)}
                    </li>
                    <li>
                      {bien.copropriete.procedureEnCours
                        ? "Une procédure est en cours à l’encontre du syndicat des copropriétaires."
                        : "Aucune procédure en cours à l’encontre du syndicat des copropriétaires."}
                    </li>
                  </ul>
                </div>
              ) : null}
            </aside>
          </div>
        </div>
      </Section>

      {/* ---------- Situation ---------- */}
      <Section fond="craie">
        <div className="contenu">
          <Surtitre>Situation</Surtitre>
          <TitreLignes
            lignes={["Où se trouve", "ce bien ?"]}
            as="h2"
            className="mt-7 text-display-3"
          />
          <div className="mt-10">
            <CarteLieu
              latitude={bien.latitude ?? site.adresse.latitude}
              longitude={bien.longitude ?? site.adresse.longitude}
              libelle={bien.titre}
              adresse={`${bien.commune} (${bien.codePostal})`}
              zoom={0.03}
            />
            <p className="mt-4 text-[0.8125rem] text-gris">
              La localisation affichée est indicative et correspond au secteur
              du bien, non à son adresse exacte.
            </p>
          </div>
        </div>
      </Section>

      {/* ---------- Mentions ---------- */}
      <Section fond="ivoire" className="py-14 md:py-16">
        <div className="contenu">
          <div className="max-w-3xl border-l-2 border-champagne pl-6">
            <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-gris">
              Informations obligatoires
            </p>
            <div className="mt-4 space-y-3 text-[0.875rem] leading-relaxed text-gris pretty">
              <p>
                Annonce diffusée par {site.nom}, {site.adresse.rue},{" "}
                {site.adresse.codePostal} {site.adresse.ville}, dans le cadre de
                son activité de négociation immobilière.
              </p>
              <p>
                Le prix indiqué s’entend{" "}
                {bien.honoraires === "vendeur"
                  ? "honoraires de négociation à la charge du vendeur inclus"
                  : "honoraires de négociation inclus, à la charge de l’acquéreur"}
                , hors frais d’acquisition (droits d’enregistrement,
                débours et émoluments), qui restent dus par l’acquéreur.
              </p>
              <p>
                Les informations relatives aux risques auxquels ce bien est
                exposé sont disponibles sur le site Géorisques&nbsp;:{" "}
                <a
                  href="https://www.georisques.gouv.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-vert underline underline-offset-4"
                >
                  georisques.gouv.fr
                </a>
                .
              </p>
              <p>
                Descriptif non contractuel. Les surfaces et caractéristiques
                sont communiquées sous réserve des mesurages et diagnostics
                annexés à l’avant-contrat.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/immobilier"
                className="text-[0.9375rem] text-vert underline underline-offset-4"
              >
                Revenir à tous les biens
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <BandeauContact
        titre={["Visiter", "ce bien."]}
        texte="Les visites sont organisées par l’étude, sur rendez-vous. Vous pouvez aussi demander à être rappelé pour en parler d’abord au téléphone."
      />
    </>
  );
}
