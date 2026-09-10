import type { Metadata } from "next";
import { questionsFaq } from "@/lib/faq";
import { url } from "@/lib/site";
import { EnTetePage } from "@/components/EnTetePage";
import { FaqRecherche } from "@/components/FaqRecherche";
import { BandeauContact } from "@/components/sections";
import { Section, Avertissement, Bouton } from "@/components/ui";

export const metadata: Metadata = {
  title: "Questions fréquentes — notaire à Combrit",
  description:
    "Frais de notaire, soulte, indivision, donation, succession, contrat de mariage : les réponses aux questions les plus posées à l’office notarial Marine Le Treut.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Questions fréquentes — notaire à Combrit",
    description: "Les réponses aux questions posées le plus souvent à l’étude.",
    url: url("/faq"),
  },
};

const donnees = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": url("/faq#faq"),
  mainEntity: questionsFaq.map((q) => ({
    "@type": "Question",
    name: q.question,
    acceptedAnswer: { "@type": "Answer", text: q.reponse.join(" ") },
  })),
};

export default function PageFaq() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
      />

      <EnTetePage
        surtitre="Questions fréquentes"
        titreLignes={["Les questions", "que l’on n’ose pas", "toujours poser."]}
        chapo={`${questionsFaq.length} questions, réellement posées à l’étude, avec des réponses écrites pour être comprises du premier coup.`}
        miettes={[{ libelle: "Questions fréquentes", href: "/faq" }]}
        enfants={
          <Bouton href="/contact" fleche>
            Poser votre question
          </Bouton>
        }
      />

      <Section fond="ivoire" className="pt-12 md:pt-14">
        <div className="contenu">
          <div className="mx-auto max-w-4xl">
            <FaqRecherche />
            <div className="mt-16">
              <Avertissement />
            </div>
          </div>
        </div>
      </Section>

      <BandeauContact
        titre={["Votre question", "n’y figure pas ?"]}
        texte="Écrivez-la en quelques lignes. L’étude vous répond, et la question rejoindra peut-être cette page."
      />
    </>
  );
}
