import type { Metadata } from "next";
import { Suspense } from "react";
import { construireIndexRecherche } from "@/lib/index-recherche";
import { EnTetePage } from "@/components/EnTetePage";
import { RechercheDetaillee } from "@/components/RechercheDetaillee";
import { BandeauContact } from "@/components/sections";
import { Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Recherche sur le site",
  description:
    "Rechercher un acte, un article ou une réponse sur le site de l’office notarial Marine Le Treut, à Combrit.",
  alternates: { canonical: "/recherche" },
  robots: { index: false, follow: true },
};

export default async function PageRecherche() {
  const index = await construireIndexRecherche();

  return (
    <>
      <EnTetePage
        surtitre="Recherche"
        titreLignes={["Chercher", "sur le site."]}
        chapo="Tapez ce que vous cherchez avec vos mots : « séparation maison », « donation enfant », « acheter à deux ». La recherche parcourt les fiches, les articles et les questions fréquentes."
        miettes={[{ libelle: "Recherche", href: "/recherche" }]}
      />

      <Section fond="ivoire" className="pt-12 md:pt-14">
        <div className="contenu">
          <div className="mx-auto max-w-4xl">
            <Suspense
              fallback={
                <p className="py-10 text-center text-gris">
                  Chargement de la recherche…
                </p>
              }
            >
              <RechercheDetaillee index={index} />
            </Suspense>
          </div>
        </div>
      </Section>

      <BandeauContact />
    </>
  );
}
