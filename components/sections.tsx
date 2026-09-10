import Link from "next/link";
import { site, adressePostale } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Bouton, Surtitre, TitreLignes, Fleche } from "@/components/ui";
import { Visuel } from "@/components/Visuel";

/* -------------------------------------------------------------------------- */
/*  « Votre rendez-vous, simplement » — chronologie                            */
/* -------------------------------------------------------------------------- */

const etapesRendezVous = [
  {
    titre: "Vous nous expliquez votre situation",
    texte:
      "Un échange, par téléphone ou à l’étude. Vous racontez ; nous écoutons avant de proposer quoi que ce soit.",
  },
  {
    titre: "Nous identifions les enjeux",
    texte:
      "Ce qui est juridiquement en jeu, ce qui presse, ce qui peut attendre, et ce que chaque option implique concrètement.",
  },
  {
    titre: "Nous réunissons les pièces nécessaires",
    texte:
      "Une liste claire, adaptée à votre dossier. L’étude se charge de tout ce qui peut être obtenu directement.",
  },
  {
    titre: "L’étude prépare et sécurise l’acte",
    texte:
      "Vérifications, interrogations des administrations, rédaction. Le projet vous est adressé avant la signature.",
  },
  {
    titre: "Nous vous accompagnons jusqu’à la signature",
    texte:
      "Et au-delà : formalités, conservation de l’acte, et un interlocuteur disponible pour la suite.",
  },
];

export function Chronologie({
  fond = "craie",
}: {
  fond?: "craie" | "ivoire" | "vert";
}) {
  const sombre = fond === "vert";
  return (
    <section
      className={cn(
        "py-20 md:py-28 lg:py-36",
        fond === "craie" && "bg-craie",
        fond === "ivoire" && "bg-ivoire",
        sombre && "bg-vert-sombre text-ivoire",
      )}
    >
      <div className="contenu">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-[calc(var(--entete-hauteur)+3rem)] lg:self-start">
            <Surtitre ton={sombre ? "clair" : "gris"}>Comment ça se passe</Surtitre>
            <TitreLignes
              lignes={["Votre rendez-vous,", "simplement."]}
              className="mt-7 text-display-2"
            />
            <p
              className={cn(
                "mt-7 max-w-md text-lead pretty",
                sombre ? "text-ivoire/70" : "text-gris",
              )}
              data-reveal
              style={{ "--reveal-delay": "150ms" } as React.CSSProperties}
            >
              Cinq étapes, toujours les mêmes, quel que soit le dossier. Rien
              d’impressionnant : de la méthode, et des explications à
              chaque passage.
            </p>
            <div
              className="mt-9"
              data-reveal
              style={{ "--reveal-delay": "250ms" } as React.CSSProperties}
            >
              <Bouton
                href="/preparer-mon-rendez-vous"
                variante={sombre ? "clair" : "secondaire"}
                fleche
              >
                Préparer mon rendez-vous
              </Bouton>
            </div>
          </div>

          <ol className="relative">
            <span
              aria-hidden="true"
              data-reveal="filet-vertical"
              className={cn(
                "absolute left-[1.4rem] top-3 hidden h-[calc(100%-3rem)] w-px sm:block",
                sombre ? "bg-ivoire/20" : "bg-pierre",
              )}
            />
            {etapesRendezVous.map((etape, i) => (
              <li
                key={etape.titre}
                className="relative flex gap-6 pb-10 last:pb-0 sm:gap-8"
                data-reveal
                style={
                  { "--reveal-delay": `${i * 110}ms` } as React.CSSProperties
                }
              >
                <span
                  className={cn(
                    "relative z-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-[0.75rem] chiffres",
                    sombre
                      ? "border-ivoire/25 bg-vert-sombre text-ivoire/70"
                      : "border-pierre bg-ivoire text-gris",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="pt-1.5">
                  <h3 className="text-titre leading-snug">{etape.titre}</h3>
                  <p
                    className={cn(
                      "mt-3 max-w-xl leading-relaxed pretty",
                      sombre ? "text-ivoire/65" : "text-gris",
                    )}
                  >
                    {etape.texte}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Bandeau de contact                                                         */
/* -------------------------------------------------------------------------- */

export function BandeauContact({
  titre = ["Parlons", "de votre projet."],
  texte = "Décrivez votre situation en quelques lignes, ou appelez l’étude. Un premier échange suffit souvent à y voir plus clair.",
  visuel = "seuil",
}: {
  titre?: string[];
  texte?: string;
  visuel?: "seuil" | "maree" | "horizon";
}) {
  return (
    <section className="relative overflow-hidden bg-vert-nuit text-ivoire">
      <div className="absolute inset-0 opacity-45">
        <Visuel
          variante={visuel}
          ratio="auto"
          parallax={0.06}
          masque={false}
          arrondi={false}
          className="h-full w-full"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-r from-vert-nuit via-vert-nuit/85 to-vert-nuit/40" />

      <div className="contenu relative py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <Surtitre ton="clair">Contact</Surtitre>
            <TitreLignes
              lignes={titre}
              className="mt-7 text-display-2 text-ivoire"
            />
            <p
              className="mt-7 max-w-lg text-lead text-ivoire/70 pretty"
              data-reveal
              style={{ "--reveal-delay": "150ms" } as React.CSSProperties}
            >
              {texte}
            </p>
            <div
              className="mt-9 flex flex-wrap gap-3"
              data-reveal
              style={{ "--reveal-delay": "250ms" } as React.CSSProperties}
            >
              <Bouton href="/contact" variante="clair" fleche>
                Écrire à l’étude
              </Bouton>
              <Bouton
                href={`tel:${site.telephoneLien}`}
                variante="secondaire"
                className="border-ivoire/25 text-ivoire hover:border-ivoire hover:bg-ivoire hover:text-vert-sombre"
              >
                {site.telephone}
              </Bouton>
            </div>
          </div>

          <div
            className="border-t border-ivoire/15 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0"
            data-reveal
            style={{ "--reveal-delay": "180ms" } as React.CSSProperties}
          >
            <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-ivoire/40">
              L’étude
            </p>
            <address className="mt-4 space-y-1 text-lg not-italic leading-relaxed text-ivoire/85">
              <p>{site.nom}</p>
              <p className="text-ivoire/60">{adressePostale}</p>
            </address>
            <Link
              href="/contact#acces"
              className="group mt-6 inline-flex items-center gap-2 text-[0.875rem] text-ivoire/70 transition-colors hover:text-ivoire"
            >
              Voir le plan d’accès
              <Fleche className="h-3.5 w-3.5 transition-transform duration-600 ease-soft group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Accordéon question / réponse (sans JavaScript)                             */
/* -------------------------------------------------------------------------- */

export function Question({
  id,
  question,
  children,
  ouvert = false,
  ton = "clair",
}: {
  id?: string;
  question: string;
  children: React.ReactNode;
  ouvert?: boolean;
  ton?: "clair" | "sombre";
}) {
  return (
    <details
      id={id}
      open={ouvert}
      className={cn(
        "accordeon group border-b",
        ton === "sombre" ? "border-ivoire/12" : "border-pierre/60",
      )}
    >
      <summary
        className={cn(
          "flex cursor-pointer items-start justify-between gap-6 py-6 text-left transition-colors duration-400",
          ton === "sombre"
            ? "text-ivoire hover:text-ivoire/70"
            : "text-encre hover:text-vert",
        )}
      >
        <h3 className="text-[1.0625rem] font-medium leading-snug md:text-[1.125rem]">
          {question}
        </h3>
        <span
          aria-hidden="true"
          className={cn(
            "accordeon-signe relative mt-1 block h-4 w-4 shrink-0",
            ton === "sombre" ? "text-ivoire/50" : "text-brume",
          )}
        >
          <span className="absolute left-0 top-1/2 block h-px w-4 -translate-y-1/2 bg-current" />
          <span className="absolute left-1/2 top-0 block h-4 w-px -translate-x-1/2 bg-current" />
        </span>
      </summary>
      <div className="accordeon-corps">
        <div>
          <div
            className={cn(
              "max-w-3xl space-y-4 pb-7 pr-8 leading-relaxed pretty",
              ton === "sombre" ? "text-ivoire/65" : "text-ardoise",
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </details>
  );
}
