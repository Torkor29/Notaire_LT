import { cn } from "@/lib/utils";
import { FilAriane, Surtitre, TitreLignes, type Miette } from "@/components/ui";
import { Visuel, type VarianteVisuel } from "@/components/Visuel";
import { SentinelleHero } from "@/components/SentinelleHero";

/**
 * En-tête commun aux pages intérieures : fil d’Ariane, surtitre, titre
 * révélé ligne par ligne, chapô, et visuel optionnel.
 */
export function EnTetePage({
  surtitre,
  titreLignes,
  chapo,
  miettes,
  visuel,
  variante = "clair",
  enfants,
}: {
  surtitre: string;
  titreLignes: string[];
  chapo?: string;
  miettes: Miette[];
  visuel?: VarianteVisuel;
  variante?: "clair" | "sombre";
  enfants?: React.ReactNode;
}) {
  const sombre = variante === "sombre";

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        sombre ? "bg-vert-nuit text-ivoire" : "bg-craie text-encre",
      )}
    >
      {sombre ? <SentinelleHero ton="sombre" /> : null}

      {sombre && visuel ? (
        <>
          <div className="absolute inset-0 opacity-50">
            <Visuel
              variante={visuel}
              ratio="auto"
              parallax={0.06}
              masque={false}
              arrondi={false}
              priority
              className="h-full w-full"
              sizes="100vw"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-vert-nuit via-vert-nuit/80 to-vert-nuit/45"
          />
        </>
      ) : null}

      <div
        className="contenu relative pb-16 md:pb-20 lg:pb-24"
        style={{ paddingTop: "calc(var(--entete-hauteur) + 3rem)" }}
      >
        <FilAriane miettes={miettes} ton={sombre ? "sombre" : "clair"} />

        <div
          className={cn(
            "grid gap-12",
            visuel && !sombre ? "lg:grid-cols-[1.15fr_0.85fr] lg:gap-20" : "",
          )}
        >
          <div className={cn(visuel && !sombre ? "lg:pt-6" : "")}>
            <div className="mt-10">
              <Surtitre ton={sombre ? "clair" : "gris"}>{surtitre}</Surtitre>
            </div>
            <TitreLignes
              lignes={titreLignes}
              as="h1"
              className={cn(
                "mt-7 text-display-2",
                sombre && "text-ivoire",
              )}
            />
            {chapo ? (
              <p
                className={cn(
                  "mt-8 max-w-2xl text-lead pretty",
                  sombre ? "text-ivoire/75" : "text-ardoise",
                )}
                data-reveal
                style={{ "--reveal-delay": "180ms" } as React.CSSProperties}
              >
                {chapo}
              </p>
            ) : null}
            {enfants ? <div className="mt-9">{enfants}</div> : null}
          </div>

          {visuel && !sombre ? (
            <div className="lg:pt-10">
              <Visuel
                variante={visuel}
                ratio="4 / 5"
                parallax={0.09}
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
