import type { Metadata } from "next";
import Link from "next/link";
import { cartesProjets, pagesProjets } from "@/lib/projets";
import { url } from "@/lib/site";
import { EnTetePage } from "@/components/EnTetePage";
import { Visuel } from "@/components/Visuel";
import { BandeauContact } from "@/components/sections";
import {
  Bouton,
  Section,
  Surtitre,
  TitreLignes,
  Fleche,
  Avertissement,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Vos projets — notaire à Combrit, Finistère Sud",
  description:
    "Achat, vente, mariage, PACS, séparation, transmission, entreprise : six situations de vie expliquées simplement par l’office notarial Marine Le Treut à Combrit.",
  alternates: { canonical: "/vos-projets" },
  openGraph: {
    title: "Vos projets — notaire à Combrit",
    description:
      "Six situations de vie, expliquées simplement : ce qui se joue, les actes concernés, les questions à se poser.",
    url: url("/vos-projets"),
  },
};

export default function PageProjets() {
  return (
    <>
      <EnTetePage
        surtitre="Vos projets"
        titreLignes={["Six situations,", "six chemins."]}
        chapo="On ne consulte pas un notaire pour « faire un acte ». On le consulte parce que l’on achète, que l’on s’unit, que l’on se sépare, que l’on transmet ou que l’on entreprend. Ce site part de là."
        miettes={[{ libelle: "Vos projets", href: "/vos-projets" }]}
      />

      {/* -------- Les six portes d’entrée -------- */}
      <Section fond="ivoire">
        <div className="contenu">
          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {cartesProjets.map((carte, i) => (
              <article
                key={carte.href}
                className="group"
                data-reveal
                style={
                  { "--reveal-delay": `${(i % 3) * 90}ms` } as React.CSSProperties
                }
              >
                <Link href={carte.href} className="block">
                  <div className="relative overflow-hidden rounded-lg">
                    <Visuel
                      variante={carte.visuel}
                      ratio="4 / 3"
                      profondeur={false}
                      masque={false}
                      arrondi={false}
                      className="transition-transform duration-[1100ms] ease-soft group-hover:scale-[1.05]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <span
                    aria-hidden="true"
                    className="mt-6 block h-px w-full bg-pierre transition-colors duration-700 group-hover:bg-vert"
                  />
                  <h2 className="mt-5 flex items-start justify-between gap-4 text-[1.375rem] leading-tight tracking-[-0.015em]">
                    <span className="transition-transform duration-700 ease-soft group-hover:translate-x-1">
                      {carte.titre}
                    </span>
                    <Fleche className="mt-1.5 h-4 w-4 shrink-0 text-brume transition-all duration-700 ease-soft group-hover:translate-x-1 group-hover:text-vert" />
                  </h2>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-gris pretty">
                    {carte.description}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* -------- Vue d’ensemble détaillée -------- */}
      <Section fond="craie">
        <div className="contenu">
          <div className="max-w-3xl">
            <Surtitre>Vue d’ensemble</Surtitre>
            <TitreLignes
              lignes={["Ce que vous trouverez", "dans chaque dossier."]}
              as="h2"
              className="mt-7 text-display-3"
            />
          </div>

          <div className="mt-14 space-y-px overflow-hidden rounded-lg border border-pierre/60 bg-pierre/60">
            {pagesProjets.map((projet, i) => (
              <Link
                key={projet.slug}
                href={`/vos-projets/${projet.slug}`}
                className="group flex flex-col gap-4 bg-ivoire p-7 transition-colors duration-500 hover:bg-ivoire-pur md:flex-row md:items-center md:gap-10 md:p-9"
                data-reveal
                style={
                  { "--reveal-delay": `${i * 70}ms` } as React.CSSProperties
                }
              >
                <span className="w-10 shrink-0 text-[0.75rem] tracking-[0.16em] text-champagne-sombre chiffres">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="md:w-64 md:shrink-0">
                  <span className="block font-display text-[1.5rem] leading-tight tracking-[-0.02em] transition-transform duration-600 ease-soft group-hover:translate-x-1">
                    {projet.libelle}
                  </span>
                </span>
                <span className="flex-1 text-[0.9375rem] leading-relaxed text-gris pretty">
                  {projet.chapo}
                </span>
                <Fleche className="hidden h-4 w-4 shrink-0 text-brume transition-all duration-600 ease-soft group-hover:translate-x-1 group-hover:text-vert md:block" />
              </Link>
            ))}
          </div>

          <div
            className="mt-12 flex flex-wrap gap-3"
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          >
            <Bouton href="/actes" variante="secondaire" fleche>
              Voir tous les actes
            </Bouton>
            <Bouton href="/mon-projet-en-60-secondes" variante="lien">
              Mon projet en 60 secondes
            </Bouton>
          </div>

          <div className="mt-14">
            <Avertissement className="max-w-3xl" />
          </div>
        </div>
      </Section>

      <BandeauContact />
    </>
  );
}
