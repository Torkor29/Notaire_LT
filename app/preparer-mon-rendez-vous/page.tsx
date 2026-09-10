import type { Metadata } from "next";
import { url } from "@/lib/site";
import { EnTetePage } from "@/components/EnTetePage";
import { ParcoursPreparation } from "@/components/ParcoursPreparation";
import { Chronologie, BandeauContact } from "@/components/sections";
import { Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Préparer mon rendez-vous chez le notaire",
  description:
    "Trois questions, et la liste des documents à réunir avant votre rendez-vous à l’office notarial Marine Le Treut : achat, vente, mariage, séparation, donation, succession, entreprise.",
  alternates: { canonical: "/preparer-mon-rendez-vous" },
  openGraph: {
    title: "Préparer mon rendez-vous chez le notaire",
    description:
      "La liste des documents à réunir, selon votre projet et votre situation.",
    url: url("/preparer-mon-rendez-vous"),
  },
};

export default function PagePreparation() {
  return (
    <>
      <EnTetePage
        surtitre="Outil"
        titreLignes={["Préparer", "mon rendez-vous."]}
        chapo="Choisissez votre projet, puis votre situation : le site établit la liste des documents habituellement utiles. Vous pouvez la cocher au fur et à mesure, et l’imprimer."
        miettes={[
          { libelle: "Préparer mon rendez-vous", href: "/preparer-mon-rendez-vous" },
        ]}
      />

      <Section fond="ivoire" className="pt-12 md:pt-14">
        <div className="contenu">
          <ParcoursPreparation />
        </div>
      </Section>

      <Chronologie fond="craie" />

      <BandeauContact
        titre={["Votre dossier", "est prêt ?"]}
        texte="Il n’est pas nécessaire d’avoir tout réuni pour prendre rendez-vous. L’étude vous dira ce qui manque, et se charge de ce qu’elle peut obtenir directement."
      />
    </>
  );
}
