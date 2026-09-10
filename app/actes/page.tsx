import type { Metadata } from "next";
import { actes, categoriesActes } from "@/lib/actes";
import { url } from "@/lib/site";
import { EnTetePage } from "@/components/EnTetePage";
import { ExplorateurActes } from "@/components/ExplorateurActes";
import { BandeauContact } from "@/components/sections";
import { Bouton, Section, Avertissement } from "@/components/ui";

export const metadata: Metadata = {
  title: "Actes & expertises — notaire à Combrit (29)",
  description:
    "Compromis, vente, contrat de mariage, PACS, divorce, donation, succession, entreprise : les actes reçus par l’étude, expliqués fiche par fiche.",
  alternates: { canonical: "/actes" },
  openGraph: {
    title: "Actes & expertises — office notarial Marine Le Treut",
    description:
      "Toutes les fiches pédagogiques de l’étude : de quoi s’agit-il, quand y penser, quels documents préparer.",
    url: url("/actes"),
  },
};

const donnees = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": url("/actes#page"),
  name: "Actes & expertises",
  url: url("/actes"),
  hasPart: actes.map((a) => ({
    "@type": "WebPage",
    name: a.titre,
    url: url(`/actes/${a.slug}`),
  })),
};

export default function PageActes() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
      />

      <EnTetePage
        surtitre="Actes & expertises"
        titreLignes={["Chaque acte,", "expliqué avant", "d’être signé."]}
        chapo={`${actes.length} fiches réparties en quatre domaines. Pour chacune : de quoi il s’agit, à quel moment y penser, pourquoi consulter un notaire, comment se déroule le rendez-vous et quels documents préparer.`}
        miettes={[{ libelle: "Actes & expertises", href: "/actes" }]}
        enfants={
          <div className="flex flex-wrap gap-3">
            <Bouton href="/contact" fleche>
              Poser une question à l’étude
            </Bouton>
            <Bouton href="/preparer-mon-rendez-vous" variante="secondaire">
              Préparer mon rendez-vous
            </Bouton>
          </div>
        }
      />

      <Section fond="ivoire" className="pt-10 md:pt-12 lg:pt-14">
        <div className="contenu">
          <nav aria-label="Domaines" className="mb-10">
            <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
              {categoriesActes.map((cat, i) => (
                <li
                  key={cat.slug}
                  data-reveal
                  style={
                    { "--reveal-delay": `${i * 80}ms` } as React.CSSProperties
                  }
                >
                  <span
                    aria-hidden="true"
                    className="mb-4 block h-px w-full bg-pierre"
                  />
                  <p className="font-display text-[1.25rem] tracking-[-0.015em]">
                    {cat.titre}
                  </p>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-gris pretty">
                    {cat.intro}
                  </p>
                </li>
              ))}
            </ul>
          </nav>

          <ExplorateurActes />

          <div className="mt-20">
            <Avertissement className="max-w-3xl" />
          </div>
        </div>
      </Section>

      <BandeauContact
        titre={["Une question", "sur un acte ?"]}
        texte="Vous ne savez pas quelle fiche correspond à votre situation ? Décrivez-la en quelques lignes : l’étude vous oriente."
        visuel="horizon"
      />
    </>
  );
}
