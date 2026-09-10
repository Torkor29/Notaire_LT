import type { Metadata } from "next";
import Link from "next/link";
import { navigation } from "@/lib/site";
import { Bouton, Surtitre, TitreLignes, Fleche } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

export default function Introuvable() {
  return (
    <section className="bg-craie">
      <div
        className="contenu pb-24 md:pb-32"
        style={{ paddingTop: "calc(var(--entete-hauteur) + 5rem)" }}
      >
        <div className="max-w-2xl">
          <Surtitre>Erreur 404</Surtitre>
          <TitreLignes
            lignes={["Cette page", "n’existe pas", "ou plus."]}
            as="h1"
            className="mt-7 text-display-2"
          />
          <p className="mt-8 text-lead text-ardoise pretty">
            Le lien est peut-être ancien, ou comporte une coquille. Les pages
            ci-dessous couvrent l’essentiel du site — et si vous cherchez
            une information précise, la recherche la trouvera plus vite que
            vous.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Bouton href="/" fleche>
              Revenir à l’accueil
            </Bouton>
            <Bouton href="/recherche" variante="secondaire">
              Rechercher sur le site
            </Bouton>
          </div>
        </div>

        <ul className="mt-16 divide-y divide-pierre/60 border-y border-pierre/60">
          {navigation
            .filter((l) => l.href !== "/")
            .map((lien) => (
              <li key={lien.href}>
                <Link
                  href={lien.href}
                  className="group flex items-center justify-between gap-6 py-5"
                >
                  <span>
                    <span className="block text-[1.125rem] leading-snug transition-transform duration-600 ease-soft group-hover:translate-x-1">
                      {lien.libelle}
                    </span>
                    {lien.description ? (
                      <span className="mt-1 block text-[0.875rem] text-gris">
                        {lien.description}
                      </span>
                    ) : null}
                  </span>
                  <Fleche className="h-4 w-4 shrink-0 text-brume transition-all duration-600 ease-soft group-hover:translate-x-1 group-hover:text-vert" />
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}
