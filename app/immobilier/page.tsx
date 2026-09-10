import type { Metadata } from "next";
import { listerBiens, demonstrationActive } from "@/lib/biens";
import { url } from "@/lib/site";
import { EnTetePage } from "@/components/EnTetePage";
import { ListeBiens } from "@/components/ListeBiens";
import { BandeauContact } from "@/components/sections";
import { Bouton, Section, Surtitre, TitreLignes } from "@/components/ui";

export const metadata: Metadata = {
  title: "Biens proposés par l’étude — notaire à Combrit (29)",
  description:
    "Les biens immobiliers proposés à la vente par la négociation notariale de l’office Marine Le Treut, à Combrit et en Finistère Sud.",
  alternates: { canonical: "/immobilier" },
  openGraph: {
    title: "Biens proposés par l’étude — notaire à Combrit",
    description:
      "Maisons, appartements et terrains vendus par l’étude en Finistère Sud.",
    url: url("/immobilier"),
  },
};

const avantages = [
  {
    titre: "Un seul interlocuteur",
    texte:
      "Le professionnel qui vous fait visiter est celui qui rédigera l’acte. Les informations données dès la première visite sont donc les bonnes.",
  },
  {
    titre: "Un dossier vérifié",
    texte:
      "Titre de propriété, urbanisme, servitudes, diagnostics : le dossier est examiné avant la mise en vente, pas après l’offre.",
  },
  {
    titre: "Un prix argumenté",
    texte:
      "L’estimation s’appuie sur les valeurs réellement constatées dans les actes, et non sur les seuls prix affichés.",
  },
];

export default async function PageImmobilier() {
  const biens = await listerBiens();

  return (
    <>
      <EnTetePage
        surtitre="Immobilier"
        titreLignes={["Biens proposés", "par l’étude."]}
        chapo="La négociation notariale réunit dans une même main la recherche d’acquéreur et la sécurité juridique de la vente. Les biens confiés à l’étude sont présentés ici."
        miettes={[{ libelle: "Immobilier", href: "/immobilier" }]}
        enfants={
          <div className="flex flex-wrap gap-3">
            <Bouton href="/contact" fleche>
              Confier un bien à l’étude
            </Bouton>
            <Bouton href="/vos-projets/immobilier" variante="secondaire">
              Préparer un achat
            </Bouton>
          </div>
        }
      />

      <Section fond="ivoire" className="pt-12 md:pt-14">
        <div className="contenu">
          {demonstrationActive ? (
            <p className="mb-8 rounded-md border-l-2 border-champagne bg-champagne-pale/60 px-5 py-4 text-[0.875rem] text-ardoise">
              <strong className="font-semibold">
                Mode démonstration activé.
              </strong>{" "}
              Les annonces ci-dessous sont fictives et ne servent qu’à
              visualiser l’interface. Retirez la variable
              <code className="mx-1 rounded bg-ivoire px-1.5 py-0.5 text-[0.8125rem]">
                NEXT_PUBLIC_DEMO_LISTINGS
              </code>
              avant toute mise en ligne.
            </p>
          ) : null}

          <ListeBiens biens={biens} />
        </div>
      </Section>

      <Section fond="craie">
        <div className="contenu">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <Surtitre>Négociation notariale</Surtitre>
              <TitreLignes
                lignes={["Vendre avec", "son notaire."]}
                as="h2"
                className="mt-7 text-display-3"
              />
              <p
                className="mt-7 leading-relaxed text-ardoise pretty"
                data-reveal
              >
                Confier la vente de son bien à son notaire, c’est réunir
                l’estimation, la recherche d’acquéreur et la rédaction
                de l’acte au même endroit. Le calendrier s’en trouve
                raccourci, et les informations transmises aux candidats sont
                exactes dès le premier jour.
              </p>
              <div
                className="mt-8"
                data-reveal
                style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
              >
                <Bouton href="/contact" variante="secondaire" fleche>
                  Demander une estimation
                </Bouton>
              </div>
            </div>

            <ul className="grid gap-8 sm:grid-cols-3">
              {avantages.map((a, i) => (
                <li
                  key={a.titre}
                  data-reveal
                  style={
                    { "--reveal-delay": `${i * 90}ms` } as React.CSSProperties
                  }
                >
                  <span
                    aria-hidden="true"
                    className="mb-4 block h-px w-10 bg-champagne"
                  />
                  <h3 className="text-[1.125rem] leading-snug">{a.titre}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-gris pretty">
                    {a.texte}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <BandeauContact
        titre={["Un projet", "immobilier ?"]}
        texte="Que vous achetiez ou que vous vendiez, un premier échange permet de fixer un calendrier réaliste et d’anticiper les points sensibles."
        visuel="horizon"
      />
    </>
  );
}
