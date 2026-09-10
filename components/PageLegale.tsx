import type { ReactNode } from "react";
import { EnTetePage } from "@/components/EnTetePage";
import { Section } from "@/components/ui";
import type { Miette } from "@/components/ui";

export function PageLegale({
  surtitre,
  titreLignes,
  chapo,
  miettes,
  miseAJour,
  children,
}: {
  surtitre: string;
  titreLignes: string[];
  chapo?: string;
  miettes: Miette[];
  miseAJour?: string;
  children: ReactNode;
}) {
  return (
    <>
      <EnTetePage
        surtitre={surtitre}
        titreLignes={titreLignes}
        chapo={chapo}
        miettes={miettes}
      />
      <Section fond="ivoire" className="pt-12 md:pt-14">
        <div className="contenu">
          <div className="prose-etude mx-auto max-w-3xl">{children}</div>
          {miseAJour ? (
            <p className="mx-auto mt-12 max-w-3xl text-[0.8125rem] text-gris">
              Dernière mise à jour&nbsp;: {miseAJour}.
            </p>
          ) : null}
        </div>
      </Section>
    </>
  );
}

/** Bloc « à compléter » : rend visible une information non encore fournie. */
export function ACompleter({ children }: { children: ReactNode }) {
  return (
    <div className="encadre" style={{ borderLeftColor: "var(--color-champagne)" }}>
      <p className="encadre-titre" style={{ color: "var(--color-champagne-sombre)" }}>
        À compléter avant mise en ligne
      </p>
      {children}
    </div>
  );
}
