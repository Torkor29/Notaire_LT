import type { Metadata } from "next";
import { url } from "@/lib/site";
import { EnTetePage } from "@/components/EnTetePage";
import { Questionnaire60s } from "@/components/Questionnaire60s";
import { BandeauContact } from "@/components/sections";
import { Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Mon projet en 60 secondes",
  description:
    "Deux questions pour trouver les pages du site qui correspondent à votre situation : immobilier, couple, séparation, transmission, entreprise.",
  alternates: { canonical: "/mon-projet-en-60-secondes" },
  openGraph: {
    title: "Mon projet en 60 secondes",
    description: "Quelques questions pour trouver la bonne page.",
    url: url("/mon-projet-en-60-secondes"),
  },
};

export default function PageOrientation() {
  return (
    <>
      <EnTetePage
        surtitre="Outil"
        titreLignes={["Mon projet", "en 60 secondes."]}
        chapo="Deux questions, et le site vous indique les pages à lire en priorité. Aucune donnée n’est enregistrée, aucune réponse n’est transmise à l’étude."
        miettes={[
          {
            libelle: "Mon projet en 60 secondes",
            href: "/mon-projet-en-60-secondes",
          },
        ]}
      />

      <Section fond="ivoire" className="pt-12 md:pt-14">
        <div className="contenu">
          <Questionnaire60s />
        </div>
      </Section>

      <BandeauContact
        titre={["Vous préférez", "en parler ?"]}
        texte="Un parcours en ligne ne remplace pas une conversation. Décrivez votre situation en quelques lignes : l’étude vous répond."
        visuel="maree"
      />
    </>
  );
}
