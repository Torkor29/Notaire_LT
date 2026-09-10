import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { site, url, adressePostale } from "@/lib/site";
import { EnTetePage } from "@/components/EnTetePage";
import { FormulaireContact } from "@/components/FormulaireContact";
import { CarteLieu } from "@/components/CarteLieu";
import { Bouton, Section, Surtitre, TitreLignes } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact — office notarial Marine Le Treut, Combrit",
  description:
    "Contacter l’office notarial de Maître Marine Le Treut : 1 impasse Saint-Tudy, 29120 Combrit. Téléphone 02 79 40 02 12. Formulaire de demande et prise de rendez-vous.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — notaire à Combrit",
    description: "Parlons de votre projet. 1 impasse Saint-Tudy, 29120 Combrit.",
    url: url("/contact"),
  },
};

const donnees = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": url("/contact#page"),
  name: "Contact",
  url: url("/contact"),
  mainEntity: { "@id": url("/#office") },
};

const moyens = [
  {
    titre: "Par téléphone",
    detail: site.telephone,
    href: `tel:${site.telephoneLien}`,
    texte:
      "Pour une question rapide, ou pour convenir d’un rendez-vous à l’étude.",
  },
  {
    titre: "Par e-mail",
    detail: site.email,
    href: `mailto:${site.email}`,
    texte:
      "Pour transmettre des documents ou exposer une situation en détail.",
  },
  {
    titre: "À l’étude",
    detail: adressePostale,
    href: "#acces",
    texte: "Les rendez-vous sont reçus sur rendez-vous, à Combrit.",
  },
];

export default function PageContact() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
      />

      <EnTetePage
        surtitre="Contact"
        titreLignes={["Parlons", "de votre projet."]}
        chapo="Vous n’avez pas besoin d’un dossier complet, ni du bon vocabulaire. Décrivez simplement ce que vous envisagez : l’étude vous répond et vous indique la suite."
        miettes={[{ libelle: "Contact", href: "/contact" }]}
      />

      {/* -------- Moyens de contact -------- */}
      <Section fond="ivoire" className="pt-12 md:pt-14">
        <div className="contenu">
          <div className="grid gap-8 md:grid-cols-3">
            {moyens.map((moyen, i) => (
              <a
                key={moyen.titre}
                href={moyen.href}
                className="group rounded-lg border border-pierre/60 p-7 transition-[border-color,box-shadow,transform] duration-600 ease-soft hover:-translate-y-0.5 hover:border-vert/40 hover:shadow-relief"
                data-reveal
                style={
                  { "--reveal-delay": `${i * 90}ms` } as React.CSSProperties
                }
              >
                <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-gris">
                  {moyen.titre}
                </p>
                <p className="mt-4 font-display text-[1.375rem] leading-snug tracking-[-0.015em] text-encre transition-colors duration-500 group-hover:text-vert">
                  {moyen.detail}
                </p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-gris pretty">
                  {moyen.texte}
                </p>
              </a>
            ))}
          </div>

          <p className="mt-8 text-[0.875rem] leading-relaxed text-gris">
            Les horaires d’ouverture de l’étude ne sont pas encore
            publiés sur ce site. Le téléphone reste le moyen le plus sûr de
            convenir d’un créneau.
          </p>
        </div>
      </Section>

      {/* -------- Formulaire -------- */}
      <Section fond="craie" id="rendez-vous">
        <div className="contenu">
          <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <Surtitre>Votre demande</Surtitre>
              <TitreLignes
                lignes={["Écrire à l’étude,", "ou prendre", "rendez-vous."]}
                as="h2"
                className="mt-7 text-display-3"
              />
              <p
                className="mt-7 max-w-md leading-relaxed text-ardoise pretty"
                data-reveal
              >
                Ce formulaire sert aussi bien à poser une question qu’à
                demander un rendez-vous. Plus votre message est précis, plus la
                réponse pourra l’être.
              </p>

              <div className="mt-10 space-y-7 border-t border-pierre/60 pt-8">
                <div data-reveal>
                  <h3 className="text-[1.0625rem] font-medium">
                    Ce qui aide à préparer la réponse
                  </h3>
                  <ul className="mt-3 space-y-2 text-[0.9375rem] leading-relaxed text-gris">
                    <li>— La nature du projet et son calendrier.</li>
                    <li>— Votre situation familiale, si elle est en jeu.</li>
                    <li>— Les documents dont vous disposez déjà.</li>
                    <li>— Ce que vous souhaiteriez comprendre en priorité.</li>
                  </ul>
                </div>

                <div
                  data-reveal
                  style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
                >
                  <h3 className="text-[1.0625rem] font-medium">
                    Avant votre rendez-vous
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-gris pretty">
                    L’outil «&nbsp;Préparer mon rendez-vous&nbsp;» établit
                    en trois questions la liste des documents utiles à votre
                    dossier.
                  </p>
                  <Bouton
                    href="/preparer-mon-rendez-vous"
                    variante="secondaire"
                    taille="sm"
                    className="mt-4"
                    fleche
                  >
                    Préparer mon rendez-vous
                  </Bouton>
                </div>
              </div>
            </div>

            <div
              className="rounded-xl border border-pierre/60 bg-ivoire p-6 md:p-9"
              data-reveal
              style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            >
              <Suspense
                fallback={
                  <p className="py-10 text-center text-gris">
                    Chargement du formulaire…
                  </p>
                }
              >
                <FormulaireContact />
              </Suspense>
            </div>
          </div>
        </div>
      </Section>

      {/* -------- Accès -------- */}
      <Section fond="ivoire" id="acces">
        <div className="contenu">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <Surtitre>Venir à l’étude</Surtitre>
              <TitreLignes
                lignes={["1 impasse", "Saint-Tudy,", "Combrit."]}
                as="h2"
                className="mt-7 text-display-3"
              />
              <address className="mt-8 space-y-1 text-lead not-italic leading-relaxed text-ardoise">
                <p>{site.nom}</p>
                <p>{site.adresse.rue}</p>
                <p>
                  {site.adresse.codePostal} {site.adresse.ville}
                </p>
              </address>
              <div className="mt-6 space-y-1">
                <p>
                  <a
                    href={`tel:${site.telephoneLien}`}
                    className="text-vert underline underline-offset-4"
                  >
                    {site.telephone}
                  </a>
                </p>
                <p>
                  <a
                    href={`mailto:${site.email}`}
                    className="break-all text-vert underline underline-offset-4"
                  >
                    {site.email}
                  </a>
                </p>
              </div>

              <p className="mt-8 text-[0.9375rem] leading-relaxed text-gris pretty">
                Combrit se situe entre Pont-l’Abbé et Bénodet, à quelques
                minutes de Sainte-Marine. L’étude reçoit sur rendez-vous.
              </p>

              <p className="mt-6 text-[0.875rem] leading-relaxed text-gris">
                Une signature à distance est possible dans les cas prévus par la
                réglementation&nbsp;:{" "}
                <Link
                  href="/faq#signature-a-distance"
                  className="text-vert underline underline-offset-4"
                >
                  en savoir plus
                </Link>
                .
              </p>
            </div>

            <CarteLieu
              latitude={site.adresse.latitude}
              longitude={site.adresse.longitude}
              libelle={site.nom}
              adresse={adressePostale}
              hauteur="h-[24rem] lg:h-[32rem]"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
