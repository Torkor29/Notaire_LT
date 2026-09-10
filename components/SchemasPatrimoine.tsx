import { cn } from "@/lib/utils";

/**
 * Schémas pédagogiques : qui possède quoi, selon le statut du couple.
 * Chaque schéma est doublé d’une description textuelle lue par les
 * technologies d’assistance ; aucune information n’est portée par la
 * seule couleur.
 */

const C = {
  sable: "var(--color-sable, #ebe3d6)",
  pierre: "var(--color-pierre, #dbd1c0)",
  vert: "var(--color-vert, #2c4a40)",
  vertPale: "var(--color-vert-pale, #e4ebe6)",
  champagne: "var(--color-champagne, #b99b62)",
  gris: "var(--color-gris, #6b645b)",
  encre: "var(--color-encre, #191814)",
  ivoire: "var(--color-ivoire-pur, #fffefb)",
};

interface SchemaProps {
  titre: string;
  description: string;
  legende: { couleur: string; libelle: string }[];
  children: React.ReactNode;
  className?: string;
}

function Cadre({ titre, description, legende, children, className }: SchemaProps) {
  return (
    <figure
      className={cn(
        "rounded-lg border border-pierre/60 bg-ivoire-pur p-6 md:p-7",
        className,
      )}
      data-reveal
    >
      <figcaption className="mb-5">
        <h3 className="text-[1.0625rem] font-medium leading-snug text-encre">
          {titre}
        </h3>
      </figcaption>
      <svg
        viewBox="0 0 320 180"
        className="w-full"
        role="img"
        aria-label={description}
      >
        <title>{description}</title>
        {children}
      </svg>
      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
        {legende.map((l) => (
          <li
            key={l.libelle}
            className="flex items-center gap-2 text-[0.75rem] text-gris"
          >
            <span
              aria-hidden="true"
              className="block h-2.5 w-2.5 rounded-[2px] border border-encre/10"
              style={{ backgroundColor: l.couleur }}
            />
            {l.libelle}
          </li>
        ))}
      </ul>
      <p className="sr-only">{description}</p>
    </figure>
  );
}

function Personne({ x, label }: { x: number; label: string }) {
  return (
    <g>
      <circle cx={x} cy={26} r="13" fill="none" stroke={C.gris} strokeWidth="1.4" />
      <text
        x={x}
        y={57}
        textAnchor="middle"
        fontSize="11"
        fill={C.gris}
        fontFamily="var(--font-sans)"
      >
        {label}
      </text>
    </g>
  );
}

export function SchemaCommunaute() {
  return (
    <Cadre
      titre="Mariés sans contrat — communauté réduite aux acquêts"
      description="Deux patrimoines propres, l’un pour chaque époux, contenant ce que chacun possédait avant le mariage ou a reçu par donation et succession. Entre les deux, une masse commune plus large regroupe tout ce qui est acquis pendant le mariage, quel que soit celui qui l’a financé."
      legende={[
        { couleur: C.sable, libelle: "Biens propres" },
        { couleur: C.vertPale, libelle: "Biens communs" },
      ]}
    >
      <Personne x={40} label="Époux A" />
      <Personne x={280} label="Époux B" />
      <rect x="14" y="76" width="54" height="80" rx="3" fill={C.sable} />
      <rect x="252" y="76" width="54" height="80" rx="3" fill={C.sable} />
      <rect x="86" y="76" width="148" height="80" rx="3" fill={C.vertPale} stroke={C.vert} strokeWidth="1.2" />
      <text x="41" y="120" textAnchor="middle" fontSize="9.5" fill={C.gris}>Propres</text>
      <text x="279" y="120" textAnchor="middle" fontSize="9.5" fill={C.gris}>Propres</text>
      <text x="160" y="112" textAnchor="middle" fontSize="11" fill={C.vert} fontWeight="600">Communauté</text>
      <text x="160" y="129" textAnchor="middle" fontSize="9.5" fill={C.vert}>Acquis pendant le mariage</text>
      <path d="M40 62V76M280 62V76" stroke={C.pierre} strokeWidth="1.2" />
      <path d="M52 58H150M268 58H170" stroke={C.champagne} strokeWidth="1" strokeDasharray="3 3" />
    </Cadre>
  );
}

export function SchemaSeparation() {
  return (
    <Cadre
      titre="Séparation de biens, PACS, concubinage"
      description="Chaque personne conserve son propre patrimoine, sans masse commune. Un bien acheté ensemble est détenu en indivision, selon les quotes-parts inscrites dans l’acte d’achat : ici soixante pour cent pour l’un et quarante pour cent pour l’autre."
      legende={[
        { couleur: C.sable, libelle: "Patrimoine personnel" },
        { couleur: C.vertPale, libelle: "Bien indivis" },
      ]}
    >
      <Personne x={40} label="Personne A" />
      <Personne x={280} label="Personne B" />
      <rect x="14" y="76" width="82" height="80" rx="3" fill={C.sable} />
      <rect x="224" y="76" width="82" height="80" rx="3" fill={C.sable} />
      <rect x="112" y="86" width="96" height="60" rx="3" fill={C.vertPale} stroke={C.vert} strokeWidth="1.2" />
      <path d="M169.6 86V146" stroke={C.vert} strokeWidth="1" strokeDasharray="3 3" />
      <text x="140" y="112" textAnchor="middle" fontSize="10" fill={C.vert} fontWeight="600">60 %</text>
      <text x="189" y="112" textAnchor="middle" fontSize="10" fill={C.vert} fontWeight="600">40 %</text>
      <text x="160" y="134" textAnchor="middle" fontSize="9" fill={C.vert}>Indivision</text>
      <text x="55" y="120" textAnchor="middle" fontSize="9.5" fill={C.gris}>À A seul</text>
      <text x="265" y="120" textAnchor="middle" fontSize="9.5" fill={C.gris}>À B seul</text>
      <path d="M40 62V76M280 62V76" stroke={C.pierre} strokeWidth="1.2" />
    </Cadre>
  );
}

export function SchemaSoulte() {
  return (
    <Cadre
      titre="Le calcul d’une soulte, étape par étape"
      description="On part de la valeur actuelle du bien, on retranche le capital restant dû sur le prêt pour obtenir la valeur nette, puis on répartit cette valeur nette selon les droits de chacun. Celui qui conserve le bien verse à l’autre la valeur de ses droits, corrigée des créances éventuelles."
      legende={[
        { couleur: C.vertPale, libelle: "Valeur nette" },
        { couleur: C.pierre, libelle: "Capital restant dû" },
      ]}
    >
      <text x="8" y="20" fontSize="9.5" fill={C.gris}>Valeur du bien</text>
      <rect x="8" y="28" width="304" height="26" rx="3" fill={C.vertPale} stroke={C.vert} strokeWidth="1" />
      <text x="8" y="76" fontSize="9.5" fill={C.gris}>− Capital restant dû</text>
      <rect x="8" y="84" width="304" height="26" rx="3" fill={C.sable} />
      <rect x="8" y="84" width="118" height="26" rx="3" fill={C.pierre} />
      <text x="67" y="101" textAnchor="middle" fontSize="9.5" fill={C.gris}>Prêt</text>
      <text x="219" y="101" textAnchor="middle" fontSize="9.5" fill={C.encre}>Valeur nette</text>
      <text x="8" y="132" fontSize="9.5" fill={C.gris}>= Répartition des droits</text>
      <rect x="126" y="140" width="186" height="26" rx="3" fill={C.vertPale} stroke={C.vert} strokeWidth="1" />
      <path d="M219 140V166" stroke={C.vert} strokeWidth="1" strokeDasharray="3 3" />
      <text x="172" y="157" textAnchor="middle" fontSize="9.5" fill={C.vert}>Part de A</text>
      <text x="265" y="157" textAnchor="middle" fontSize="9.5" fill={C.vert}>Part de B</text>
      <text x="8" y="157" fontSize="9" fill={C.champagne}>
        Soulte versée
      </text>
      <path
        d="M74 153H112"
        stroke={C.champagne}
        strokeWidth="1.2"
        strokeDasharray="3 3"
      />
      <path
        d="M108 150l6 3-6 3"
        fill="none"
        stroke={C.champagne}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Cadre>
  );
}

export function SchemasSeparation() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <SchemaCommunaute />
      <SchemaSeparation />
      <SchemaSoulte />
    </div>
  );
}
